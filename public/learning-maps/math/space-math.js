// Perspective projection for the actual curriculum graph. No decorative/fake nodes.
export function position3D(topic,index){
 const angle=index*2.399963229728653;
 const radius=104+((index*29)%66);
 return {x:Math.cos(angle)*radius,y:260-(topic.y/1240)*530,z:Math.sin(angle)*radius};
}
export function project(p,yaw,pitch,zoom,width,height){
 const x=p.x*Math.cos(yaw)+p.z*Math.sin(yaw),z=-p.x*Math.sin(yaw)+p.z*Math.cos(yaw);
 const y=p.y*Math.cos(pitch)-z*Math.sin(pitch),depth=p.y*Math.sin(pitch)+z*Math.cos(pitch);
 const perspective=1000/(1000+depth);
 const fit=Math.min(width<700?width/520:width/880,height/690)*zoom;
 return {x:width*(width<700?.42:.64)+x*perspective*fit,y:height*.48+y*perspective*fit,depth,scale:perspective*fit};
}
