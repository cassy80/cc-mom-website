import {topics,quantityConnections,fractionTopics,quantityTopics} from './catalog.js';
import {entries} from './overview-data.js';
import {arrangeFunnel} from './funnel-layout.js';
export const domains=[
 {id:'A',name:'数与代数',description:'认识数、理解运算，在生活情境中表达数量之间的联系。',x:440,y:130,color:'#79a2ed'},
 {id:'G',name:'图形与几何',description:'从辨认图形到测量与计算，逐步理解形状、位置和空间。',x:1020,y:180,color:'#ed94b0'},
 {id:'S',name:'统计与概率',description:'分类、收集和表达数据，理解平均数、百分数与可能性。',x:280,y:720,color:'#9dcbd5'},
 {id:'P',name:'综合与实践',description:'在购物、时间安排、测量和项目活动中运用数学。',x:1010,y:710,color:'#e6cfab'}
];
const palette=Object.fromEntries(domains.map(d=>[d.id,d.color]));
const ready={A04:'fraction',A07:'quantity',...Object.fromEntries(entries.filter(e=>'GSP'.includes(e.id[0])).map(e=>[e.id,e.id[0]]))};
const aLocations={A01:[150,140],A02:[450,540],A03:[175,290],A04:[295,230],A05:[125,410],A06:[700,135],A07:[640,260],A08:[790,355],A09:[790,190]};
export const metaNodes=[...domains.map(d=>({...d,domain:d.id,kind:'domain',age:'6—12岁，按内容逐步深入'})),...entries.map(e=>{
 const domain=e.id[0],siblings=entries.filter(t=>t.id[0]===domain),i=siblings.indexOf(e),d=domains.find(d=>d.id===domain);
 const angle=-Math.PI*.9+i*Math.PI*1.8/Math.max(1,siblings.length-1);
 const [x,y]=aLocations[e.id]||[d.x+Math.cos(angle)*150,d.y+70+Math.sin(angle)*118];
 return {...e,domain,kind:'theme',x,y,color:palette[domain],filter:ready[e.id],parent:domain};
})];
const fractional=topics.filter(t=>!t.subject&&!['equal','division'].includes(t.id));
const quantitative=topics.filter(t=>t.subject==='quantity');
export const knowledgeNodes=topics.map(t=>{
 if(t.domain&&t.domain!=='A')return {...t,kind:'knowledge',x:0,y:0,color:palette[t.domain]};
 const shared=['equal','division'].includes(t.id),list=t.subject==='quantity'?quantitative:fractional,index=list.indexOf(t),angle=index*2.3999632297;
 const radius=35+Math.sqrt(Math.max(0,index))*21;
 const x=shared?420+(t.id==='division'?68:0):(t.subject==='quantity'?620:300)+Math.cos(angle)*radius;
 const y=shared?600:395+Math.sin(angle)*radius;
 return {...t,kind:'knowledge',domain:'A',parent:shared?'A02':t.subject==='quantity'?'A07':'A04',x,y,color:shared?'#d5e2f5':t.subject==='quantity'?'#9ebcef':'#5886df'};
});
export const atlasNodes=arrangeFunnel([...metaNodes,...knowledgeNodes]);
export const atlasById=new Map(atlasNodes.map(n=>[n.id,n]));
export const metaById=new Map(metaNodes.map(n=>[n.id,n]));
export const themeConnections=[
 {from:'A04',to:'S04',kind:'connection',reason:'分数表示整体中的一部分，帮助理解百分数表示的比例；不要求先完成整个分数专题。'},
 {from:'A03',to:'S04',kind:'connection',reason:'小数与百分数可以表示同一比例，联系数据情境理解不同表示。'},
 {from:'A02',to:'S03',kind:'connection',reason:'平均分和除法经验帮助计算平均数，还需要理解一组数据的代表意义。'},
 {from:'G01',to:'G04',kind:'connection',reason:'辨认所研究的平面图形，结合面积单位理解测量与计算。'},
 {from:'G02',to:'G05',kind:'connection',reason:'认识立体的结构，帮助理解所占空间与容纳大小。'},
 {from:'G04',to:'G05',kind:'connection',reason:'底面积与层的累积可以帮助理解一些立体的体积。'},
 {from:'A07',to:'P05',kind:'connection',reason:'数量关系帮助表达生活任务中的条件、目标和解决过程。'},
 {from:'S02',to:'P05',kind:'connection',reason:'收集与整理数据可以支持节水、营养等真实生活任务。'}
];
export const atlasEdges=[
 ...themeConnections,
 ...atlasNodes.filter(n=>n.parent).map(n=>({from:n.parent,to:n.id,kind:'contains'})),
 ...topics.flatMap(t=>t.prereqs.map(p=>({from:p,to:t.id,kind:'prerequisite'}))),
 ...Object.entries(quantityConnections).flatMap(([id,links])=>links.map(l=>({from:id,to:l.id,kind:'connection',reason:l.reason})))
];
export function inFilter(node,filter){
 if(filter==='all')return true;
 if(['A','G','S','P'].includes(filter))return node.domain===filter;
 const members=filter==='fraction'?fractionTopics:filter==='quantity'?quantityTopics:[];
 return node.id==='A'||node.id===(filter==='fraction'?'A04':'A07')||members.some(t=>t.id===node.id);
}
