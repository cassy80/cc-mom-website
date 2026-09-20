import {topics,byId,ancestors,descendants} from './data.js';
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs={},text){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;}
export function renderGraph(svg,{selected,status,phase,pathOnly,onSelect}){
 svg.replaceChildren();svg.setAttribute('viewBox','0 0 820 1330');
 const prior=ancestors(selected),after=descendants(selected),related=new Set([...prior,...after,selected]);
 const visible=t=>(!pathOnly||related.has(t.id))&&(phase==='all'||t.stage===phase||phase==='intro'&&t.stage==='prepare');
 for(const [y,age,note]of [[40,'7–8 岁','相关基础'],[180,'8–9 岁','分数初识'],[505,'10–11 岁','意义与性质'],[985,'11–12 岁','运算与应用']]){
 svg.append(el('line',{x1:120,y1:y-18,x2:805,y2:y-18,class:'age-line'}));svg.append(el('text',{x:16,y:y+10,class:'age-label'},age));svg.append(el('text',{x:16,y:y+35,class:'age-note'},note));}
 svg.append(el('line',{x1:120,y1:25,x2:120,y2:1300,stroke:'#cedce4'}));
 for(const t of topics)for(const p of t.prereqs){const a=byId.get(p);if(pathOnly&&(!related.has(t.id)||!related.has(p)))continue;const isPrior=(prior.has(t.id)||t.id===selected)&&prior.has(p);const isNext=p===selected;const mid=(a.y+t.y)/2;const d=a.y===t.y?`M ${a.x} ${a.y+12} C ${a.x} ${a.y+75}, ${t.x} ${t.y+75}, ${t.x} ${t.y+12}`:`M ${a.x} ${a.y+12} C ${a.x} ${mid}, ${t.x} ${mid}, ${t.x} ${t.y-12}`;svg.append(el('path',{d,class:'edge'+(isPrior?' related':isNext?' next':''),opacity:visible(t)&&visible(a)?1:.08}));}
 for(const t of topics){if(pathOnly&&!related.has(t.id))continue;const g=el('g',{class:'node'+(t.id===selected?' selected':''),transform:`translate(${t.x},${t.y})`,tabindex:visible(t)?'0':'-1',role:'button','aria-label':`${t.name}，参考年龄${t.age}岁，${status[t.id]==='mastered'?'已掌握':'查看详情'}`,'aria-pressed':t.id===selected,'data-id':t.id,opacity:visible(t)?1:.14});g.append(el('circle',{r:23,fill:'transparent',class:'halo'}),el('circle',{r:22,fill:'transparent',class:'focus-ring'}),el('circle',{r:12,fill:status[t.id]==='mastered'?'#78ad78':status[t.id]==='review'?'#d6a446':t.color,class:'core'}));if(status[t.id]==='mastered')g.append(el('text',{x:0,y:5,'text-anchor':'middle',class:'check'},'✓'));g.append(el('text',{x:0,y:38,'text-anchor':'middle'},t.name));g.addEventListener('click',()=>onSelect(t.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(t.id);}});svg.append(g);}
}
