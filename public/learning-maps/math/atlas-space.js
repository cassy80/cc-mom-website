import {atlasNodes,atlasEdges,atlasById,inFilter} from './atlas-data.js';
import {ancestors,descendants} from './catalog.js';
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs={},text){const e=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);if(text)e.textContent=text;return e;}
export function createAtlas(svg,onSelect,onZoom){
 let state={selected:'',status:{},phase:'all',pathOnly:false},width=1200,height=700,zoom=1,camera={x:650,y:465},base=1,drag=false,moved=false,startNode=null;
 const edgeLayer=el('g',{'aria-hidden':'true'}),nodeLayer=el('g');svg.replaceChildren(edgeLayer,nodeLayer);
 const edgeEls=atlasEdges.map(e=>{const line=el('line',{class:`atlas-edge ${e.kind}`});edgeLayer.append(line);return {...e,line};});
 const nodes=atlasNodes.map(n=>{const g=el('g',{class:`atlas-node ${n.kind}`,'data-id':n.id,role:'button',tabindex:0,'aria-label':n.kind==='knowledge'?`${n.name}，参考年龄${n.age}岁`:`${n.name}，${n.kind==='domain'?'领域':n.filter?'含完整知识点':'主题范围，待完善'}`});
 const hit=el('circle',{r:23,fill:'transparent'}),halo=el('circle',{class:'atlas-halo',r:25}),core=el('circle',{class:'atlas-core',fill:n.color}),check=el('text',{'text-anchor':'middle',y:5,class:'atlas-check'},'✓'),label=el('text',{'text-anchor':'middle',class:'atlas-label'},n.name);
 g.append(hit,halo,core,check,label);nodeLayer.append(g);
 g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(n.id);}if(e.key==='Escape')g.blur();});
 g.addEventListener('focus',()=>g.classList.add('hovered'));g.addEventListener('blur',()=>g.classList.remove('hovered'));
 return {n,g,hit,halo,core,check,label};});
 let related=new Set(),engaged=false,initialized=false;
 const visible=n=>(!state.pathOnly||related.has(n.id));
 function fit(){const subset=atlasNodes;const xs=subset.map(n=>n.x),ys=subset.map(n=>n.y);const left=Math.min(...xs)-80,right=Math.max(...xs)+90,top=Math.min(...ys)-45,bottom=Math.max(...ys)+50;camera={x:(left+right)/2,y:(top+bottom)/2};base=Math.min(width/(right-left),height/(bottom-top));}
 const project=n=>({x:width/2+(n.x-camera.x)*base*zoom,y:height/2+(n.y-camera.y)*base*zoom});
 function draw(){const prior=ancestors(state.selected),next=descendants(state.selected);related=new Set([state.selected,...prior,...next]);for(const e of atlasEdges)if(e.from===state.selected||e.to===state.selected){related.add(e.from);related.add(e.to);}for(const id of [...related]){const n=atlasById.get(id);if(n?.parent)related.add(n.parent);if(n?.domain)related.add(n.domain);}const activeKnowledge=engaged&&atlasById.get(state.selected)?.kind==='knowledge';
 for(const e of edgeEls){const a=atlasById.get(e.from),b=atlasById.get(e.to),p=project(a),q=project(b);const show=visible(a)&&visible(b);const filtered=inFilter(a,state.phase)&&inFilter(b,state.phase);e.line.setAttribute('x1',p.x);e.line.setAttribute('y1',p.y);e.line.setAttribute('x2',q.x);e.line.setAttribute('y2',q.y);const selected=engaged&&(e.from===state.selected||e.to===state.selected||(prior.has(e.from)&&prior.has(e.to)));e.line.style.display=show?'':'none';e.line.classList.toggle('lit',selected);e.line.style.opacity=!filtered?.035:e.kind==='contains'?(selected?.7:.2):e.kind==='connection'?(selected?.8:.18):activeKnowledge?(selected?.95:.17):.48;}
 for(const {n,g,hit,halo,core,check,label} of nodes){const p=project(n),show=visible(n),active=engaged&&n.id===state.selected;g.style.display=show?'':'none';g.style.opacity=!inFilter(n,state.phase)?'.13':engaged&&!related.has(n.id)&&state.phase==='all'?'.35':'1';g.setAttribute('aria-hidden',!show);g.setAttribute('tabindex',show?'0':'-1');g.setAttribute('aria-pressed',active);g.setAttribute('transform',`translate(${p.x},${p.y})`);g.classList.toggle('selected',active);
 const radius=n.kind==='domain'?17:n.kind==='theme'?(n.filter?14:10):Math.max(7,Math.min(18,13*base*zoom));core.setAttribute('r',radius);hit.setAttribute('r',Math.max(radius+3,10));g.style.setProperty('--node-color',n.color);halo.setAttribute('r',radius+6);core.classList.toggle('pending',n.kind==='theme'&&!n.filter);label.setAttribute('y',radius+(n.kind==='domain'?29:20));
 g.classList.toggle('show-label',active&&engaged);g.classList.toggle('related',prior.has(n.id)||next.has(n.id));check.style.display=state.status[n.id]==='mastered'?'':'none';}
 }
 const resize=new ResizeObserver(()=>{const r=svg.parentElement.getBoundingClientRect();if(!r.width||!r.height)return;width=r.width;height=r.height;svg.setAttribute('viewBox',`0 0 ${width} ${height}`);fit();draw();});resize.observe(svg.parentElement);
 const touchEvents='ontouchstart' in window||navigator.maxTouchPoints>0;
 const pointers=new Map();let pinch=0,start={x:0,y:0};
 svg.addEventListener('pointerdown',e=>{if(touchEvents&&e.pointerType==='touch'||e.button&&e.pointerType==='mouse')return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});drag=true;moved=false;start={x:e.clientX,y:e.clientY};startNode=e.target.closest('[data-id]')?.dataset.id;try{svg.setPointerCapture(e.pointerId);}catch{}if(pointers.size===2){const[a,b]=[...pointers.values()];pinch=Math.hypot(a.x-b.x,a.y-b.y);moved=true;}});
 svg.addEventListener('pointermove',e=>{if(touchEvents&&e.pointerType==='touch')return;const p=pointers.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(Math.hypot(e.clientX-start.x,e.clientY-start.y)>4)moved=true;if(pointers.size===2){const[a,b]=[...pointers.values()],d=Math.hypot(a.x-b.x,a.y-b.y);if(pinch)onZoom(zoom*d/pinch);pinch=d;moved=true;}else if(moved){camera.x-=dx/(base*zoom);camera.y-=dy/(base*zoom);draw();}});
 for(const event of ['pointerup','pointercancel'])svg.addEventListener(event,e=>{if(touchEvents&&e.pointerType==='touch')return;if(event==='pointerup'&&drag&&!moved&&startNode)onSelect(startNode);pointers.delete(e.pointerId);if(!pointers.size){drag=false;startNode=null;}else moved=true;pinch=0;});
 // Mobile WebViews do not consistently deliver captured pointer events on SVG.
 // Handle real touch events directly and choose the closest visible dot on a tap.
 if(touchEvents){
  const touches=new Map();let touchStart={x:0,y:0},touchMoved=false,touchNode=null,touchPinch=0;
  const nearestNode=(x,y)=>{let best=null,distance=28;for(const {n,core} of nodes){if(!visible(n))continue;const r=core.getBoundingClientRect(),d=Math.hypot(x-r.left-r.width/2,y-r.top-r.height/2);if(d<distance){best=n.id;distance=d;}}return best;};
  svg.addEventListener('touchstart',e=>{if(e.cancelable)e.preventDefault();for(const t of Array.from(e.changedTouches))touches.set(t.identifier,{x:t.clientX,y:t.clientY});if(touches.size===1){const t=e.changedTouches[0];touchStart={x:t.clientX,y:t.clientY};touchMoved=false;touchNode=nearestNode(t.clientX,t.clientY)||e.target.closest?.('[data-id]')?.dataset.id;}else{touchMoved=true;touchNode=null;const[a,b]=[...touches.values()];touchPinch=Math.hypot(a.x-b.x,a.y-b.y);}}, {passive:false});
  svg.addEventListener('touchmove',e=>{if(e.cancelable)e.preventDefault();let dx=0,dy=0;for(const t of Array.from(e.changedTouches)){const old=touches.get(t.identifier);if(!old)continue;dx=t.clientX-old.x;dy=t.clientY-old.y;touches.set(t.identifier,{x:t.clientX,y:t.clientY});if(Math.hypot(t.clientX-touchStart.x,t.clientY-touchStart.y)>6)touchMoved=true;}if(touches.size===2){const[a,b]=[...touches.values()],d=Math.hypot(a.x-b.x,a.y-b.y);if(touchPinch)onZoom(zoom*d/touchPinch);touchPinch=d;touchMoved=true;}else if(touchMoved){camera.x-=dx/(base*zoom);camera.y-=dy/(base*zoom);draw();}}, {passive:false});
  const endTouch=e=>{if(e.cancelable)e.preventDefault();const tap=e.type==='touchend'&&touches.size===1&&!touchMoved;const t=e.changedTouches[0],id=tap&&(touchNode||nearestNode(t.clientX,t.clientY));for(const changed of Array.from(e.changedTouches))touches.delete(changed.identifier);if(!touches.size){touchNode=null;touchPinch=0;}if(id)onSelect(id);};
  svg.addEventListener('touchend',endTouch,{passive:false});svg.addEventListener('touchcancel',endTouch,{passive:false});
 }
 svg.addEventListener('wheel',e=>{e.preventDefault();onZoom(zoom*(e.deltaY>0?.9:1.1));},{passive:false});
 return {reveal(){engaged=true;},clearSelection(){engaged=false;draw();},update(options){const changed=options.phase!==state.phase;initialized=true;state={...state,...options};if(changed){engaged=false;zoom=1;fit();}draw();},setZoom(value){zoom=value;draw();},reset(){zoom=1;engaged=false;fit();draw();},focus(id){const n=atlasById.get(id);if(!n)return;camera={x:n.x,y:n.y};draw();},toggle(){return false;},get rotating(){return false;}};
}
