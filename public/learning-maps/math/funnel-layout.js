// One continuous silhouette. Height is an editorial progression, not an age scale.
export function arrangeFunnel(nodes){
 const byId=new Map(nodes.map(n=>[n.id,n])),depths=new Map();
 function depth(n){if(depths.has(n.id))return depths.get(n.id);const d=Math.max(0,...(n.prereqs||[]).map(id=>depth(byId.get(id))+1));depths.set(n.id,d);return d;}
 const max=Math.max(...nodes.filter(n=>n.kind==='knowledge').map(depth));
 const score=n=>n.kind==='domain'?1.05:n.kind==='knowledge'?depth(n)/max:n.age.includes('10—12')||n.age.startsWith('5—6')?.85:n.age.includes('8—12')?.7:n.age.includes('8—10')?.5:.25;
 const ordered=[...nodes].sort((a,b)=>score(b)-score(a)||a.id.localeCompare(b.id));
 const rows=Math.max(9,Math.ceil(Math.sqrt(nodes.length)*1.1));
 const weights=Array.from({length:rows},(_,i)=>rows-i+2);
 const total=weights.reduce((a,b)=>a+b,0);
 const counts=weights.map(w=>Math.floor(nodes.length*w/total));
 for(let i=0,left=nodes.length-counts.reduce((a,b)=>a+b,0);left>0;left--,i=(i+1)%rows)counts[i]++;
 let offset=0;
 const placed=new Map();
 counts.forEach((count,row)=>{
 const batch=ordered.slice(offset,offset+count).sort((a,b)=>hash(a.id)-hash(b.id));offset+=count;
 batch.forEach((n,column)=>placed.set(n.id,{...n,x:600+(column-(count-1)/2)*43+(row%2?7:-7)+(hash(n.id)%9)-4,y:65+row*52+((hash(n.id)%17)-8)}));
 });
 if(offset!==nodes.length)throw Error('Funnel layout must account for every node');
 return nodes.map(n=>placed.get(n.id));
}
function hash(s){return [...s].reduce((v,c)=>(v*31+c.charCodeAt(0))>>>0,7);}
