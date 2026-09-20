import {byId,statusLabels} from './catalog.js';
export const KEY='fraction-growth-map-v1';
export function normalizeState(input){
 const state={version:1,status:{},plan:[]};
 if(!input||typeof input!=='object'||Array.isArray(input))return state;
 if(input.status&&typeof input.status==='object')for(const[id,value]of Object.entries(input.status)){if(byId.has(id)&&Object.hasOwn(statusLabels,value))state.status[id]=value;}
 if(Array.isArray(input.plan))state.plan=[...new Set(input.plan.filter(id=>typeof id==='string'&&byId.has(id)))];
 return state;
}
export function parseBackup(text){const raw=JSON.parse(text);if(raw?.version!==1||!Array.isArray(raw.plan)||!raw.status||typeof raw.status!=='object'||Array.isArray(raw.status))throw new Error('请选择本工具导出的有效备份文件。');return normalizeState(raw);}
export function mergeState(current,incoming){return normalizeState({status:{...current.status,...incoming.status},plan:[...current.plan,...incoming.plan]});}
