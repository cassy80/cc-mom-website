import {topics as fractions,sources,statusLabels} from './data.js';
import {quantityNew,quantityConnections} from './quantity-data.js';
import {domainTopics} from './domain-data.js';
export {sources,statusLabels,quantityConnections};
export const fractionTopics=fractions;
export const quantityTopics=[...fractions.filter(t=>['equal','division'].includes(t.id)),...quantityNew];
export const topics=[...fractions,...quantityNew,...domainTopics];
export const byId=new Map(topics.map(t=>[t.id,t]));
export const subjectFor=id=>byId.get(id)?.subject==='quantity'?'quantity':'fraction';
export const topicHref=(id,preferred='fraction')=>byId.get(id)?.domain&&byId.get(id)?.domain!=='A'?`index.html#${encodeURIComponent(id)}`:`${(preferred==='quantity'&&quantityTopics.some(t=>t.id===id))?'quantity':subjectFor(id)}.html#${encodeURIComponent(id)}`;
export function ancestors(id,set=new Set()){for(const p of byId.get(id)?.prereqs??[]){if(!set.has(p)){set.add(p);ancestors(p,set);}}return set;}
export function descendants(id,set=new Set()){for(const t of topics.filter(t=>t.prereqs.includes(id))){if(!set.has(t.id)){set.add(t.id);descendants(t.id,set);}}return set;}
export function suggestedRoute(id,status={}){const output=[],seen=new Set();function visit(key){if(seen.has(key))return;seen.add(key);const t=byId.get(key);if(!t)return;for(const p of t.prereqs)visit(p);if(status[key]!=='mastered')output.push(t);}visit(id);return output;}
