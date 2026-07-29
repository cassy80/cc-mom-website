const suits = [
  { symbol: "♠", red: false },
  { symbol: "♥", red: true },
  { symbol: "♣", red: false },
  { symbol: "♦", red: true },
];

const operatorLabels = { "+": "+", "-": "−", "*": "×", "/": "÷" };

const state = {
  cards: [],
  initialCards: [],
  selectedCardId: null,
  operator: null,
  lastOperation: null,
  history: [],
  solution: "",
  round: 0,
  score: 0,
  streak: 0,
  seconds: 0,
  sound: true,
  solved: false,
};

const el = (id) => document.getElementById(id);
const cardsEl = el("cards");
const expressionEl = el("expression");
const previewEl = el("resultPreview");
const feedbackEl = el("feedback");

function rankLabel(value) {
  return value === 1 ? "A" : formatNumber(value);
}

function cardLabel(card) {
  return card.isResult ? formatNumber(card.value) : rankLabel(card.value);
}

function solve24(values) {
  const items = values.map((value) => ({ value, text: rankLabel(value) }));
  const search = (list) => {
    if (list.length === 1) return Math.abs(list[0].value - 24) < 1e-9 ? list[0].text : null;
    for (let i = 0; i < list.length; i += 1) {
      for (let j = i + 1; j < list.length; j += 1) {
        const rest = list.filter((_, index) => index !== i && index !== j);
        const a = list[i];
        const b = list[j];
        const options = [
          { value: a.value + b.value, text: `(${a.text}+${b.text})` },
          { value: a.value - b.value, text: `(${a.text}-${b.text})` },
          { value: b.value - a.value, text: `(${b.text}-${a.text})` },
          { value: a.value * b.value, text: `(${a.text}×${b.text})` },
        ];
        if (Math.abs(b.value) > 1e-9) options.push({ value: a.value / b.value, text: `(${a.text}÷${b.text})` });
        if (Math.abs(a.value) > 1e-9) options.push({ value: b.value / a.value, text: `(${b.text}÷${a.text})` });
        for (const option of options) {
          const result = search([...rest, option]);
          if (result) return result;
        }
      }
    }
    return null;
  };
  return search(items);
}

function generatePuzzle() {
  let values;
  let solution;
  do {
    values = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10) + 1);
    solution = solve24(values);
  } while (!solution);
  return { values, solution };
}

function makeCard(value, index = 0, suit = null) {
  return {
    id: `${Date.now()}-${index}-${Math.random()}`,
    value,
    suit: suit || suits[Math.floor(Math.random() * suits.length)],
    isResult: false,
  };
}

function cloneCards(cards) {
  return cards.map((card) => ({ ...card, suit: { ...card.suit } }));
}

function newRound() {
  const puzzle = generatePuzzle();
  state.cards = puzzle.values.map((value, index) => makeCard(value, index));
  state.initialCards = cloneCards(state.cards);
  state.solution = puzzle.solution;
  state.selectedCardId = null;
  state.operator = null;
  state.lastOperation = null;
  state.history = [];
  state.round += 1;
  state.seconds = 0;
  state.solved = false;
  el("timer").textContent = "00:00";
  clearFeedback();
  el("roundLabel").textContent = `第 ${state.round} 题`;

  // 记录游戏次数（只在第一局时记录）
  if (state.round === 1) {
    fetch('/api/game-stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId: '24-point', action: 'play' })
    }).catch(() => {}); // 静默失败，不影响游戏
  }

  render();
}

function renderCards() {
  cardsEl.innerHTML = "";
  state.cards.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.cardId = card.id;
    button.className = `card${card.suit.red ? " red" : ""}${card.id === state.selectedCardId ? " selected" : ""}${card.isResult ? " result-card" : ""}`;
    button.disabled = state.solved;
    button.setAttribute("aria-pressed", String(card.id === state.selectedCardId));
    button.innerHTML = `
      <span class="card-rank">${cardLabel(card)}</span>
      <span class="card-suit-small">${card.suit.symbol}</span>
      <span class="card-suit">${card.suit.symbol}</span>
      <span class="card-corner">${cardLabel(card)} ${card.suit.symbol}</span>`;
    button.addEventListener("click", () => selectCard(card.id));
    cardsEl.appendChild(button);
  });
}

function renderExpression() {
  const selected = state.cards.find((card) => card.id === state.selectedCardId);
  if (selected && state.operator) {
    expressionEl.innerHTML = `<span class="token-number">${cardLabel(selected)}</span><span class="token-op">${operatorLabels[state.operator]}</span><span class="placeholder small">请选择第二个数字</span>`;
    previewEl.textContent = `还剩 ${state.cards.length} 个数字`;
    return;
  }
  if (selected) {
    expressionEl.innerHTML = `<span class="token-number">${cardLabel(selected)}</span><span class="placeholder small">请选择运算符</span>`;
    previewEl.textContent = `还剩 ${state.cards.length} 个数字`;
    return;
  }
  if (state.lastOperation) {
    const operation = state.lastOperation;
    expressionEl.innerHTML = `<span class="token-number">${formatNumber(operation.left)}</span><span class="token-op">${operatorLabels[operation.operator]}</span><span class="token-number">${formatNumber(operation.right)}</span><span class="token-op">=</span><span class="token-number result-token">${formatNumber(operation.result)}</span>`;
    previewEl.textContent = state.solved ? "恭喜你算出 24！" : `合并完成，还剩 ${state.cards.length} 个数字`;
    return;
  }
  expressionEl.innerHTML = '<span class="placeholder">请先点击一个数字</span>';
  previewEl.textContent = `还剩 ${state.cards.length} 个数字`;
}

function renderOperators() {
  document.querySelectorAll("[data-token]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.token === state.operator);
    button.disabled = state.solved || !state.selectedCardId;
  });
}

function render() {
  renderCards();
  renderExpression();
  renderOperators();
  el("undoButton").disabled = state.solved || (!state.history.length && !state.selectedCardId);
  el("score").textContent = state.score;
  el("streak").textContent = state.streak;
}

function selectCard(id) {
  if (state.solved) return;
  const card = state.cards.find((item) => item.id === id);
  if (!card) return;

  if (!state.selectedCardId) {
    state.selectedCardId = id;
    state.operator = null;
    clearFeedback();
    playTone(420, 0.04);
    render();
    return;
  }

  if (state.selectedCardId === id) {
    state.selectedCardId = null;
    state.operator = null;
    clearFeedback();
    render();
    return;
  }

  if (!state.operator) {
    state.selectedCardId = id;
    showFeedback("已更换第一个数字，请选择运算符", "info");
    playTone(420, 0.04);
    render();
    return;
  }

  calculatePair(card);
}

function selectOperator(value) {
  if (state.solved) return;
  if (!state.selectedCardId) {
    showFeedback("请先点击一个数字", "error");
    playTone(150, 0.08);
    return;
  }
  state.operator = value;
  clearFeedback();
  playTone(320, 0.035);
  render();
}

function calculatePair(rightCard) {
  const leftCard = state.cards.find((card) => card.id === state.selectedCardId);
  if (!leftCard || !state.operator) return;
  if (state.operator === "/" && Math.abs(rightCard.value) < 1e-9) {
    showFeedback("除数不能为 0", "error");
    playTone(150, 0.12);
    return;
  }

  const result = calculate(leftCard.value, state.operator, rightCard.value);
  state.history.push({
    cards: cloneCards(state.cards),
    lastOperation: state.lastOperation ? { ...state.lastOperation } : null,
  });

  const firstIndex = Math.min(state.cards.indexOf(leftCard), state.cards.indexOf(rightCard));
  const remaining = state.cards.filter((card) => card.id !== leftCard.id && card.id !== rightCard.id);
  const resultCard = makeCard(result, state.history.length, leftCard.suit);
  resultCard.isResult = true;
  remaining.splice(firstIndex, 0, resultCard);

  state.cards = remaining;
  state.lastOperation = {
    left: leftCard.value,
    operator: state.operator,
    right: rightCard.value,
    result,
  };
  state.selectedCardId = null;
  state.operator = null;
  clearFeedback();
  playMergeSound();

  if (state.cards.length === 1) finishRound(result);
  render();
}

function calculate(left, operator, right) {
  if (operator === "+") return left + right;
  if (operator === "-") return left - right;
  if (operator === "*") return left * right;
  return left / right;
}

function finishRound(result) {
  if (Math.abs(result - 24) < 1e-9) {
    state.solved = true;
    state.streak += 1;
    state.score += Math.max(20, 100 - state.seconds) + Math.min(50, (state.streak - 1) * 10);
    showFeedback("🎉 太棒了！你成功算出了 24！", "success");
    celebrate();
    playVictorySound();
  } else {
    state.streak = 0;
    showFeedback(`最后结果是 ${formatNumber(result)}，点击“撤销”再试一次吧！`, "error");
    playTone(150, 0.12);
  }
}

function undo() {
  if (state.solved) return;
  if (state.selectedCardId) {
    state.selectedCardId = null;
    state.operator = null;
  } else if (state.history.length) {
    const previous = state.history.pop();
    state.cards = previous.cards;
    state.lastOperation = previous.lastOperation;
  }
  clearFeedback();
  render();
}

function resetRound() {
  if (state.solved) return;
  state.cards = cloneCards(state.initialCards);
  state.selectedCardId = null;
  state.operator = null;
  state.lastOperation = null;
  state.history = [];
  clearFeedback();
  render();
}

function formatNumber(number) {
  if (Math.abs(number - Math.round(number)) < 1e-9) return String(Math.round(number));
  return String(Math.round(number * 100) / 100);
}

function showFeedback(text, type) {
  feedbackEl.textContent = text;
  feedbackEl.className = `feedback ${type}`;
}

function clearFeedback() {
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
}

function giveHint() {
  showFeedback(`参考答案：${state.solution} = 24（按运算顺序逐步点击）`, "success");
  state.score = Math.max(0, state.score - 10);
  render();
}

function celebrate() {
  const colors = ["#eebd62", "#c94a43", "#28705b", "#ffffff", "#ff8bb3", "#66c7ff"];
  const box = el("celebration");
  box.innerHTML = "";
  for (let i = 0; i < 90; i += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    box.appendChild(piece);
  }
  document.querySelector(".table").classList.add("win");
  setTimeout(() => document.querySelector(".table").classList.remove("win"), 700);
  setTimeout(() => { box.innerHTML = ""; }, 2800);
}

let audioContext;
function playTone(frequency, duration, volume = 0.05, type = "sine") {
  if (!state.sound) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch { /* 浏览器不支持音效时静默继续 */ }
}

function playMergeSound() {
  playTone(440, 0.07, 0.04);
  setTimeout(() => playTone(660, 0.09, 0.04), 55);
}

function playVictorySound() {
  [523, 659, 784, 1047, 1319].forEach((frequency, index) => {
    setTimeout(() => playTone(frequency, 0.22, 0.075, index === 4 ? "triangle" : "sine"), index * 105);
  });
  setTimeout(() => {
    [1047, 1319, 1568].forEach((frequency) => playTone(frequency, 0.5, 0.04, "triangle"));
  }, 560);
}

document.querySelectorAll("[data-token]").forEach((button) => {
  button.addEventListener("click", () => selectOperator(button.dataset.token));
});
el("undoButton").addEventListener("click", undo);
el("clearButton").addEventListener("click", resetRound);
el("hintButton").addEventListener("click", giveHint);
el("newGameButton").addEventListener("click", () => {
  if (!state.solved) state.streak = 0;
  newRound();
});
el("soundButton").addEventListener("click", () => {
  state.sound = !state.sound;
  el("soundButton").classList.toggle("muted", !state.sound);
  el("soundButton").textContent = state.sound ? "♪" : "×";
});

document.addEventListener("keydown", (event) => {
  if (["+", "-", "*", "/"].includes(event.key)) selectOperator(event.key);
  if (event.key === "Backspace") undo();
  if (event.key === "Escape") resetRound();
});

setInterval(() => {
  if (state.solved) return;
  state.seconds += 1;
  const minutes = String(Math.floor(state.seconds / 60)).padStart(2, "0");
  const seconds = String(state.seconds % 60).padStart(2, "0");
  el("timer").textContent = `${minutes}:${seconds}`;
}, 1000);

newRound();
