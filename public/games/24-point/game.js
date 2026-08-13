const suits = [
  { symbol: "♠", red: false },
  { symbol: "♥", red: true },
  { symbol: "♣", red: false },
  { symbol: "♦", red: true },
];

const operatorLabels = { "+": "+", "-": "−", "*": "×", "/": "÷" };
const STORAGE_KEYS = {
  unlockedLevel: "game24-unlocked-level",
  levelStars: "game24-level-stars",
  challengeBest: "game24-challenge-best",
};

const levelPuzzles = [
  [6, 6, 6, 6], [1, 2, 3, 4], [2, 4, 6, 8], [3, 3, 9, 9], [4, 4, 7, 9],
  [2, 3, 4, 9], [1, 5, 5, 5], [2, 5, 7, 10], [3, 4, 5, 6], [1, 3, 8, 8],
  [2, 2, 7, 7], [1, 4, 6, 8], [3, 5, 7, 9], [2, 3, 8, 10], [4, 5, 6, 9],
  [1, 6, 7, 10], [2, 6, 8, 9], [3, 4, 7, 8], [1, 5, 8, 10], [2, 5, 5, 10],
  [1, 3, 4, 6], [2, 3, 5, 9], [1, 4, 5, 6], [3, 3, 7, 8], [2, 4, 7, 7],
  [1, 5, 7, 8], [2, 3, 7, 7], [3, 5, 6, 8], [3, 3, 8, 8], [2, 5, 8, 8],
  [1, 1, 5, 7], [1, 3, 3, 10], [1, 3, 3, 6], [1, 3, 4, 10], [1, 4, 6, 7],
  [1, 6, 8, 8], [2, 2, 3, 3], [2, 2, 5, 5], [2, 3, 5, 10], [2, 3, 5, 8],
  [2, 4, 4, 7], [2, 5, 5, 9], [2, 6, 7, 8], [2, 8, 8, 8], [2, 8, 9, 10],
  [3, 4, 5, 9], [4, 5, 7, 7], [4, 6, 6, 9], [4, 8, 8, 8], [1, 2, 4, 5],
  [1, 2, 5, 5], [1, 4, 5, 7], [2, 2, 2, 4], [2, 2, 5, 10], [2, 2, 7, 8],
  [1, 2, 7, 7], [2, 2, 7, 10], [3, 3, 6, 6], [3, 5, 10, 10], [3, 8, 8, 10],
  [4, 4, 10, 10], [2, 5, 5, 8], [3, 3, 3, 9], [3, 7, 7, 9], [3, 9, 10, 10],
  [4, 4, 4, 5], [4, 5, 5, 7], [4, 5, 5, 8], [4, 5, 9, 9], [4, 7, 10, 10],
  [4, 7, 7, 7], [4, 7, 9, 9], [4, 8, 9, 9], [5, 6, 6, 6], [5, 6, 7, 7],
  [3, 5, 5, 9], [3, 6, 10, 10], [4, 5, 8, 8], [2, 9, 10, 10], [3, 3, 5, 5],
  [5, 5, 10, 10], [5, 5, 5, 5], [5, 5, 8, 8], [5, 5, 9, 9], [2, 5, 6, 9],
  [3, 6, 7, 10], [4, 5, 10, 10], [4, 7, 8, 10], [5, 7, 10, 10], [6, 9, 9, 10],
  [1, 1, 6, 8], [6, 6, 8, 8], [6, 7, 8, 9], [7, 8, 9, 10], [1, 3, 7, 9],
  [1, 6, 6, 8], [2, 4, 10, 10], [2, 7, 7, 10], [3, 3, 7, 7], [4, 4, 7, 7],
];

const state = {
  mode: null,
  phase: "menu",
  cards: [],
  initialCards: [],
  selectedCardId: null,
  operator: null,
  lastOperation: null,
  history: [],
  solution: "",
  solutionSteps: [],
  hintIndex: 0,
  round: 0,
  currentLevel: 1,
  unlockedLevel: readNumber(STORAGE_KEYS.unlockedLevel, 1),
  levelStars: readObject(STORAGE_KEYS.levelStars),
  score: 0,
  streak: 0,
  seconds: 0,
  timeLeft: 60,
  sound: true,
  solved: false,
  hintsUsed: 0,
  timerId: null,
  nextRoundId: null,
};

const el = (id) => document.getElementById(id);
const cardsEl = el("cards");
const expressionEl = el("expression");
const previewEl = el("resultPreview");
const feedbackEl = el("feedback");

function readNumber(key, fallback) {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function readObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function rankLabel(value) {
  return value === 1 ? "A" : formatNumber(value);
}

function cardLabel(card) {
  return card.isResult ? formatNumber(card.value) : rankLabel(card.value);
}

function solve24(values) {
  return solve24WithSteps(values)?.text || null;
}

function gcd(a, b) {
  return b ? gcd(b, a % b) : Math.abs(a);
}

function makeFraction(numerator, denominator = 1) {
  if (denominator < 0) {
    numerator *= -1;
    denominator *= -1;
  }
  const divisor = gcd(numerator, denominator) || 1;
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

function fractionLabel(item) {
  return item.denominator === 1 ? String(item.numerator) : `${item.numerator}/${item.denominator}`;
}

function solve24WithSteps(values) {
  const items = values.map((value) => ({ ...makeFraction(value), text: rankLabel(value), steps: [] }));
  const search = (list, allowFractions) => {
    if (list.length === 1) return list[0].numerator === 24 * list[0].denominator ? list[0] : null;
    for (let i = 0; i < list.length; i += 1) {
      for (let j = i + 1; j < list.length; j += 1) {
        const rest = list.filter((_, index) => index !== i && index !== j);
        const a = list[i];
        const b = list[j];
        const add = makeFraction(
          a.numerator * b.denominator + b.numerator * a.denominator,
          a.denominator * b.denominator,
        );
        const multiply = makeFraction(a.numerator * b.numerator, a.denominator * b.denominator);
        const options = [
          { ...multiply, text: `(${a.text}×${b.text})`, left: a, right: b, operator: "×" },
          { ...add, text: `(${a.text}+${b.text})`, left: a, right: b, operator: "+" },
        ];
        const comparison = a.numerator * b.denominator - b.numerator * a.denominator;
        if (comparison >= 0) {
          const subtract = makeFraction(comparison, a.denominator * b.denominator);
          options.push({ ...subtract, text: `(${a.text}-${b.text})`, left: a, right: b, operator: "−" });
        }
        if (comparison <= 0 && comparison !== 0) {
          const subtract = makeFraction(-comparison, a.denominator * b.denominator);
          options.push({ ...subtract, text: `(${b.text}-${a.text})`, left: b, right: a, operator: "−" });
        }
        if (b.numerator !== 0) {
          const divide = makeFraction(a.numerator * b.denominator, a.denominator * b.numerator);
          options.push({ ...divide, text: `(${a.text}÷${b.text})`, left: a, right: b, operator: "÷" });
        }
        if (a.numerator !== 0 && comparison !== 0) {
          const divide = makeFraction(b.numerator * a.denominator, b.denominator * a.numerator);
          options.push({ ...divide, text: `(${b.text}÷${a.text})`, left: b, right: a, operator: "÷" });
        }
        options.sort((left, right) => Number(left.denominator !== 1) - Number(right.denominator !== 1));
        for (const option of options) {
          if (!allowFractions && option.denominator !== 1) continue;
          const step = `${fractionLabel(option.left)} ${option.operator} ${fractionLabel(option.right)} = ${fractionLabel(option)}`;
          const next = { ...option, steps: [...option.left.steps, ...option.right.steps, step] };
          const result = search([next, ...rest], allowFractions);
          if (result) return result;
        }
      }
    }
    return null;
  };
  return search(items, false) || search(items, true);
}

function generatePuzzle() {
  let values;
  let solved;
  do {
    values = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10) + 1);
    solved = solve24WithSteps(values);
  } while (!solved);
  return { values, solution: solved.text, solutionSteps: solved.steps };
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

function loadPuzzle(values, solution, solutionSteps = null) {
  const solved = solutionSteps ? null : solve24WithSteps(values);
  state.cards = values.map((value, index) => makeCard(value, index));
  state.initialCards = cloneCards(state.cards);
  state.solution = solution || solved?.text || "";
  state.solutionSteps = solutionSteps || solved?.steps || [];
  state.hintIndex = 0;
  state.selectedCardId = null;
  state.operator = null;
  state.lastOperation = null;
  state.history = [];
  state.solved = false;
  state.hintsUsed = 0;
  el("hintButton").textContent = "给我提示";
  clearFeedback();
  render();
}

function showModeScreen() {
  clearTimers();
  state.mode = null;
  state.phase = "menu";
  el("modeScreen").hidden = false;
  el("gameView").hidden = true;
  el("homeButton").hidden = true;
  el("levelsButton").hidden = true;
  el("levelModal").hidden = true;
  el("challengeResult").hidden = true;
  el("countdownOverlay").hidden = true;
  el("brandSubtitle").textContent = "选择一种玩法，开始数字冒险";
  updateModeStatus();
}

function startProgressMode(level = state.unlockedLevel) {
  clearTimers();
  state.mode = "progress";
  state.phase = "playing";
  state.currentLevel = Math.min(Math.max(1, level), levelPuzzles.length);
  state.seconds = 0;
  state.score = totalStars();
  state.streak = 0;
  prepareGameView();
  el("levelsButton").hidden = false;
  el("levelProgress").hidden = false;
  el("metricOneLabel").textContent = "关卡";
  el("metricTwoLabel").textContent = "星星";
  el("timerLabel").textContent = "用时";
  el("brandSubtitle").textContent = "进阶闯关 · 一关一关解锁";
  el("newGameButton").textContent = "重新开始";
  loadProgressLevel();
  startElapsedTimer();
}

function loadProgressLevel() {
  const values = levelPuzzles[state.currentLevel - 1];
  state.seconds = 0;
  el("timer").textContent = "00:00";
  el("timer").classList.remove("urgent");
  el("roundLabel").textContent = `第 ${state.currentLevel} 关`;
  el("levelProgressFill").style.width = `${(state.currentLevel / levelPuzzles.length) * 100}%`;
  loadPuzzle(values, solve24(values));
}

function startChallengeMode() {
  clearTimers();
  state.mode = "challenge";
  state.phase = "countdown";
  state.score = 0;
  state.streak = 0;
  state.round = 0;
  state.timeLeft = 60;
  prepareGameView();
  el("levelsButton").hidden = true;
  el("levelProgress").hidden = true;
  el("metricOneLabel").textContent = "答对";
  el("metricTwoLabel").textContent = "连胜";
  el("timerLabel").textContent = "倒计时";
  el("brandSubtitle").textContent = "60秒挑战 · 和时间赛跑";
  el("newGameButton").textContent = "换一题";
  el("timer").textContent = "01:00";
  loadChallengeRound();
  runStartCountdown();
}

function prepareGameView() {
  el("modeScreen").hidden = true;
  el("gameView").hidden = false;
  el("homeButton").hidden = false;
  el("challengeResult").hidden = true;
  el("timer").classList.remove("urgent");
}

function runStartCountdown() {
  const overlay = el("countdownOverlay");
  const number = el("countdownNumber");
  overlay.hidden = false;
  let count = 3;
  number.textContent = count;
  playTone(440, 0.1, 0.05);
  state.timerId = setInterval(() => {
    count -= 1;
    if (count > 0) {
      number.textContent = count;
      number.classList.remove("pulse");
      void number.offsetWidth;
      number.classList.add("pulse");
      playTone(440, 0.1, 0.05);
      return;
    }
    clearInterval(state.timerId);
    state.timerId = null;
    number.textContent = "开始";
    playTone(784, 0.2, 0.07);
    setTimeout(() => {
      overlay.hidden = true;
      state.phase = "playing";
      startChallengeTimer();
      render();
    }, 450);
  }, 800);
}

function startElapsedTimer() {
  state.timerId = setInterval(() => {
    if (state.phase !== "playing" || state.solved) return;
    state.seconds += 1;
    el("timer").textContent = formatTime(state.seconds);
  }, 1000);
}

function startChallengeTimer() {
  state.timerId = setInterval(() => {
    if (state.phase !== "playing") return;
    state.timeLeft -= 1;
    el("timer").textContent = formatTime(state.timeLeft);
    if (state.timeLeft <= 10 && state.timeLeft > 0) showUrgentCountdown(state.timeLeft);
    if (state.timeLeft <= 0) finishChallenge();
  }, 1000);
}

function showUrgentCountdown(value) {
  el("timer").classList.add("urgent");
  const overlay = el("countdownOverlay");
  const number = el("countdownNumber");
  number.textContent = value;
  number.classList.remove("pulse");
  void number.offsetWidth;
  number.classList.add("pulse");
  overlay.classList.add("final-countdown");
  overlay.hidden = false;
  playTone(value <= 3 ? 760 : 520, 0.12, 0.055);
  setTimeout(() => {
    if (state.phase === "playing") overlay.hidden = true;
  }, 420);
}

function loadChallengeRound() {
  const puzzle = generatePuzzle();
  state.round += 1;
  el("roundLabel").textContent = `第 ${state.round} 题`;
  loadPuzzle(puzzle.values, puzzle.solution, puzzle.solutionSteps);
}

function finishChallenge() {
  clearTimers();
  state.phase = "result";
  state.solved = true;
  state.timeLeft = 0;
  el("timer").textContent = "00:00";
  el("countdownOverlay").hidden = true;
  el("countdownOverlay").classList.remove("final-countdown");
  const previousBest = readNumber(STORAGE_KEYS.challengeBest, 0);
  const isRecord = state.score > previousBest;
  const best = Math.max(previousBest, state.score);
  localStorage.setItem(STORAGE_KEYS.challengeBest, String(best));
  el("finalScore").textContent = state.score;
  el("recordMessage").textContent = isRecord && state.score > 0 ? `新纪录！之前最高 ${previousBest} 题` : `最高纪录：${best} 题`;
  el("challengeResult").hidden = false;
  render();
}

function clearTimers() {
  if (state.timerId) clearInterval(state.timerId);
  if (state.nextRoundId) clearTimeout(state.nextRoundId);
  state.timerId = null;
  state.nextRoundId = null;
}

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remaining = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function renderCards() {
  cardsEl.innerHTML = "";
  state.cards.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.cardId = card.id;
    button.className = `card${card.suit.red ? " red" : ""}${card.id === state.selectedCardId ? " selected" : ""}${card.isResult ? " result-card" : ""}`;
    button.disabled = state.solved || state.phase !== "playing";
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
    button.disabled = state.solved || state.phase !== "playing" || !state.selectedCardId;
  });
}

function render() {
  renderCards();
  renderExpression();
  renderOperators();
  el("undoButton").disabled = state.solved || state.phase !== "playing" || (!state.history.length && !state.selectedCardId);
  el("clearButton").disabled = state.solved || state.phase !== "playing";
  el("hintButton").disabled = state.solved || state.phase !== "playing";
  el("newGameButton").disabled = state.phase !== "playing";
  if (state.mode === "progress") {
    el("score").textContent = state.currentLevel;
    el("streak").textContent = totalStars();
  } else {
    el("score").textContent = state.score;
    el("streak").textContent = state.streak;
  }
}

function selectCard(id) {
  if (state.solved || state.phase !== "playing") return;
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
  if (state.solved || state.phase !== "playing") return;
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
  state.history.push({ cards: cloneCards(state.cards), lastOperation: state.lastOperation ? { ...state.lastOperation } : null });
  const firstIndex = Math.min(state.cards.indexOf(leftCard), state.cards.indexOf(rightCard));
  const remaining = state.cards.filter((card) => card.id !== leftCard.id && card.id !== rightCard.id);
  const resultCard = makeCard(result, state.history.length, leftCard.suit);
  resultCard.isResult = true;
  remaining.splice(firstIndex, 0, resultCard);
  state.cards = remaining;
  state.lastOperation = { left: leftCard.value, operator: state.operator, right: rightCard.value, result };
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
  if (Math.abs(result - 24) >= 1e-9) {
    if (state.mode === "challenge") state.streak = 0;
    showFeedback(`最后结果是 ${formatNumber(result)}，点击“撤销”再试一次吧！`, "error");
    playTone(150, 0.12);
    return;
  }
  state.solved = true;
  showFeedback("太棒了！你成功算出了 24！", "success");
  celebrate();
  playVictorySound();
  if (state.mode === "progress") finishProgressLevel();
  if (state.mode === "challenge") finishChallengeRound();
}

function finishProgressLevel() {
  const stars = state.hintsUsed === 0 && state.seconds <= 60 ? 3 : state.hintsUsed <= 1 ? 2 : 1;
  state.levelStars[state.currentLevel] = Math.max(Number(state.levelStars[state.currentLevel] || 0), stars);
  state.unlockedLevel = Math.min(levelPuzzles.length, Math.max(state.unlockedLevel, state.currentLevel + 1));
  localStorage.setItem(STORAGE_KEYS.unlockedLevel, String(state.unlockedLevel));
  localStorage.setItem(STORAGE_KEYS.levelStars, JSON.stringify(state.levelStars));
  showFeedback(`过关！获得 ${"★".repeat(stars)}${"☆".repeat(3 - stars)}`, "success");
  el("newGameButton").textContent = state.currentLevel === levelPuzzles.length ? "查看关卡" : "下一关";
  el("newGameButton").disabled = false;
  updateModeStatus();
  render();
}

function finishChallengeRound() {
  state.score += 1;
  state.streak += 1;
  render();
  state.nextRoundId = setTimeout(() => {
    if (state.mode === "challenge" && state.phase === "playing") loadChallengeRound();
  }, 650);
}

function undo() {
  if (state.solved || state.phase !== "playing") return;
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
  if (state.phase !== "playing") return;
  state.cards = cloneCards(state.initialCards);
  state.selectedCardId = null;
  state.operator = null;
  state.lastOperation = null;
  state.history = [];
  state.solved = false;
  clearFeedback();
  render();
}

function handleRoundAction() {
  if (state.mode === "challenge") {
    if (!state.solved) state.streak = 0;
    if (state.nextRoundId) clearTimeout(state.nextRoundId);
    loadChallengeRound();
    return;
  }
  if (!state.solved) {
    resetRound();
    return;
  }
  if (state.currentLevel < levelPuzzles.length) {
    state.currentLevel += 1;
    el("newGameButton").textContent = "重新开始";
    loadProgressLevel();
  } else {
    openLevelModal();
  }
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
  const step = state.solutionSteps[state.hintIndex];
  if (!step) {
    const lastStep = state.solutionSteps[state.solutionSteps.length - 1];
    const message = lastStep
      ? `本题线索已经全部显示。最后一条线索：${lastStep}`
      : "这道题暂时没有可用线索，请点击换一题。";
    showFeedback(message, "info");
    playTone(360, 0.08, 0.035);
    return;
  }
  state.hintsUsed += 1;
  state.hintIndex += 1;
  showFeedback(`线索 ${state.hintIndex}：${step}`, "info");
  el("hintButton").textContent = state.hintIndex < state.solutionSteps.length ? "再给一个线索" : "线索已全部显示";
  render();
}

function totalStars() {
  return Object.values(state.levelStars).reduce((sum, value) => sum + Number(value || 0), 0);
}

function updateModeStatus() {
  el("progressStatus").textContent = `已解锁 ${state.unlockedLevel} / ${levelPuzzles.length} · 共 ${totalStars()} 星`;
  el("challengeStatus").textContent = `最高纪录 ${readNumber(STORAGE_KEYS.challengeBest, 0)} 题`;
}

function openLevelModal() {
  const grid = el("levelGrid");
  grid.innerHTML = "";
  levelPuzzles.forEach((_, index) => {
    const level = index + 1;
    const unlocked = level <= state.unlockedLevel;
    const stars = Number(state.levelStars[level] || 0);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `level-button${level === state.currentLevel ? " current" : ""}`;
    button.disabled = !unlocked;
    button.setAttribute("aria-label", unlocked ? `第 ${level} 关，${stars} 星` : `第 ${level} 关，未解锁`);
    button.innerHTML = `<strong>${level}</strong><span>${unlocked ? `${"★".repeat(stars)}${"☆".repeat(3 - stars)}` : "锁定"}</span>`;
    button.addEventListener("click", () => {
      el("levelModal").hidden = true;
      startProgressMode(level);
    });
    grid.appendChild(button);
  });
  el("levelModal").hidden = false;
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
  [523, 659, 784, 1047].forEach((frequency, index) => {
    setTimeout(() => playTone(frequency, 0.18, 0.06, "triangle"), index * 80);
  });
}

document.querySelectorAll("[data-token]").forEach((button) => {
  button.addEventListener("click", () => selectOperator(button.dataset.token));
});
el("undoButton").addEventListener("click", undo);
el("clearButton").addEventListener("click", resetRound);
el("hintButton").addEventListener("click", giveHint);
el("newGameButton").addEventListener("click", handleRoundAction);
el("progressModeButton").addEventListener("click", () => startProgressMode());
el("challengeModeButton").addEventListener("click", startChallengeMode);
el("homeButton").addEventListener("click", showModeScreen);
el("levelsButton").addEventListener("click", openLevelModal);
el("closeLevelsButton").addEventListener("click", () => { el("levelModal").hidden = true; });
el("retryChallengeButton").addEventListener("click", startChallengeMode);
el("resultHomeButton").addEventListener("click", showModeScreen);
el("soundButton").addEventListener("click", () => {
  state.sound = !state.sound;
  el("soundButton").classList.toggle("muted", !state.sound);
  el("soundButton").textContent = state.sound ? "♪" : "×";
});

document.addEventListener("keydown", (event) => {
  if (["+", "-", "*", "/"].includes(event.key)) selectOperator(event.key);
  if (event.key === "Backspace") undo();
  if (event.key === "Escape") {
    if (!el("levelModal").hidden) el("levelModal").hidden = true;
    else if (state.mode) showModeScreen();
  }
});

state.unlockedLevel = Math.min(Math.max(1, state.unlockedLevel), levelPuzzles.length);
updateModeStatus();
showModeScreen();
