"use strict";
const $=id=>document.getElementById(id);
const canvas=$("tree"),ctx=canvas.getContext("2d");
let angle=0,last=0,phase=0,playing=true,soundOn=false,audio=null;
const rand=(a,b)=>a+Math.random()*(b-a);
const TAU=Math.PI*2;
const dots=[];
for(let i=0;i<2100;i++){
  const h=Math.random(),turn=rand(0,TAU),radius=(1-h)*rand(.68,1.06);
  dots.push({h,turn,radius,twinkle:rand(0,TAU),size:rand(.65,2.5),kind:Math.random()});
}
const ornaments=[];
for(let i=0;i<135;i++){
  const h=rand(.04,.94),a=rand(0,TAU);
  ornaments.push({h,a,r:rand(3.2,7.3),kind:i%5,tw:rand(0,TAU)});
}
const dust=Array.from({length:120},()=>({x:rand(30,730),y:rand(45,720),r:rand(.5,2.1),t:rand(0,TAU)}));
function glowDot(x,y,r,color,alpha=1,blur=12){
  ctx.globalAlpha=alpha;
  ctx.shadowColor=color;ctx.shadowBlur=blur;
  ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
  ctx.globalAlpha=1;ctx.shadowBlur=0;
}
function position(h,a,rad=1){
  const depth=Math.sin(a),width=246*(1-h)*rad;
  return {x:380+Math.cos(a)*width,y:645-h*550+depth*12,depth};
}
function render(t){
  const w=canvas.width,h=canvas.height;
  ctx.clearRect(0,0,w,h);
  const dt=Math.min(40,t-last||16);last=t;angle+=dt*.00032;phase+=dt*.0015;
  // Floating distant stars
  for(const d of dust)glowDot(d.x,d.y,d.r,"#f6d4a7",.16+.23*(1+Math.sin(phase*2+d.t))/2,7);
  // Velvet glow under the tree
  const halo=ctx.createRadialGradient(380,626,10,380,626,270);
  halo.addColorStop(0,"#d9b57b29");halo.addColorStop(.65,"#e7a7d00b");halo.addColorStop(1,"#e7a7d000");
  ctx.fillStyle=halo;ctx.beginPath();ctx.ellipse(380,620,280,95,0,0,TAU);ctx.fill();
  // Glowing base
  ctx.strokeStyle="#edca8b88";ctx.lineWidth=3;ctx.shadowColor="#ffd68d";ctx.shadowBlur=20;
  ctx.beginPath();ctx.ellipse(380,645,220,23,0,0,TAU);ctx.stroke();ctx.shadowBlur=0;
  // Rich dense fairy lights
  const all=dots.map(p=>({pos:position(p.h,p.turn+angle,p.radius/(1-p.h)),p}))
    .sort((a,b)=>a.pos.depth-b.pos.depth);
  for(const {pos,p} of all){
    const tw=.72+.28*Math.sin(phase*3+p.twinkle);
    const r=p.size*(.75+(pos.depth+1)*.32)*tw;
    const color=p.kind<.18?"#ff9fc6":p.kind<.41?"#ffdf9e":p.kind<.59?"#b7e4ff":p.kind<.75?"#fffaf0":"#b6f5c9";
    glowDot(pos.x,pos.y,Math.max(.55,r),color,.42+(pos.depth+1)*.26,7+r*3);
  }
  // Three luminous rotating spiral ribbons, made of light rather than solid strokes
  for(let ribbon=0;ribbon<3;ribbon++){
    for(let i=0;i<460;i++){
      const h=i/460*.97,a=angle+TAU*(h*3.8+ribbon/3)+ribbon*.38;
      const pos=position(h,a,1.025);
      const bright=.36+.64*Math.max(0,(pos.depth+1)/2);
      const color=ribbon===0?"#ffe6a5":ribbon===1?"#ffb5d8":"#e4efff";
      glowDot(pos.x,pos.y,1.1+bright*1.5,color,bright*.9,8);
    }
  }
  // Ornaments: jewels with halo and white highlight
  for(const o of ornaments){
    const q=position(o.h,o.a+angle,1.02);
    const color=["#ff668e","#ffe49c","#a8e4ff","#d9b7ff","#fff2d8"][o.kind];
    glowDot(q.x,q.y,o.r*(.75+(q.depth+1)*.15),color,.65+(q.depth+1)*.17,18);
    glowDot(q.x-o.r*.25,q.y-o.r*.25,1.1,"#ffffff",.8,3);
  }
  // Hanging star topper, layered radiant light and eight rays
  const sx=380,sy=69+Math.sin(phase*2)*3;
  for(let i=0;i<12;i++){
    const a=i*TAU/12+phase*.16,rr=39+Math.sin(phase*2)*4;
    ctx.strokeStyle="#ffe6a344";ctx.lineWidth=1.8;ctx.shadowColor="#ffe5a4";ctx.shadowBlur=13;
    ctx.beginPath();ctx.moveTo(sx+Math.cos(a)*13,sy+Math.sin(a)*13);
    ctx.lineTo(sx+Math.cos(a)*rr,sy+Math.sin(a)*rr);ctx.stroke();
  }
  ctx.shadowBlur=38;ctx.shadowColor="#ffda7b";ctx.fillStyle="#fff0b0";
  ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?12:28;const x=sx+Math.cos(a)*r,y=sy+Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.fill();
  ctx.shadowBlur=0;glowDot(sx,sy,5,"#ffffff",1,28);
  if(playing)requestAnimationFrame(render);
}
requestAnimationFrame(render);
const sky=$("sparkles");for(let i=0;i<85;i++){const e=document.createElement("i");e.className="particle";e.style.left=rand(0,100)+"%";e.style.top=rand(0,100)+"%";e.style.opacity=rand(.15,.7);e.style.animationDelay=rand(0,4)+"s";sky.appendChild(e);}
function show(id){for(const section of document.querySelectorAll("main > section"))section.hidden=section.id!==id;window.scrollTo({top:0,behavior:"smooth"});}
function hearts(){for(let i=0;i<35;i++){const e=document.createElement("span");e.className="float-heart";e.textContent=["♡","✧","💗","✦"][i%4];e.style.left=rand(0,100)+"%";e.style.top=rand(65,100)+"%";e.style.fontSize=rand(14,30)+"px";e.style.animationDelay=rand(0,1.2)+"s";document.body.appendChild(e);setTimeout(()=>e.remove(),4000);}}
function tone(freq=600,dur=.18){if(!soundOn)return;try{audio ||= new (window.AudioContext||window.webkitAudioContext)();const osc=audio.createOscillator(),gain=audio.createGain();osc.type="sine";osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.065,audio.currentTime+.025);gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+dur);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(audio.currentTime+dur+.01);}catch{}}
// User-supplied, properly licensed Vietnamese Christmas MP3.
// A silent Christmas experience: no music files, no playback controls.
let dragging=false,lastPointerX=0,secretClicks=0,transitioning=false;
const shell=document.querySelector(".tree-shell");
shell.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;dragging=true;lastPointerX=e.clientX;shell.classList.add("dragging");shell.setPointerCapture(e.pointerId);});
shell.addEventListener("pointermove",e=>{if(!dragging)return;angle+=(e.clientX-lastPointerX)*.009;lastPointerX=e.clientX;});
const stopDrag=()=>{dragging=false;shell.classList.remove("dragging");};
shell.addEventListener("pointerup",stopDrag);shell.addEventListener("pointercancel",stopDrag);
$("secretStar").addEventListener("click",()=>{secretClicks++;$("secretHint").textContent=secretClicks>=5?"Your tiny programmer girlfriend loves you ♡":"You found something Santa tried to hide... 👀";hearts();});
function magicalMorph(done){
 const c=$("morph"),g=c.getContext("2d"),start=performance.now(),duration=3000;
 const particles=Array.from({length:1100},(_,i)=>{
   const h=Math.random(),a=Math.random()*TAU,r=(1-h)*Math.sqrt(Math.random())*215;
   const sx=380+Math.cos(a)*r,sy=565-h*485;
   const t=Math.random()*TAU,u=Math.sqrt(Math.random());
   const hx=16*Math.pow(Math.sin(t),3),hy=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
   return {sx,sy,ex:380+hx*u*13,ey:315-hy*u*13,delay:Math.random()*.25,size:Math.random()*2.2+1.2,col:["#ffb4d5","#ffde94","#fff9ed","#e9c3ff"][i%4]};
 });
 function ease(x){return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;}
 function frame(now){const progress=Math.min(1,(now-start)/duration);g.clearRect(0,0,c.width,c.height);
  for(const p of particles){const k=ease(Math.max(0,Math.min(1,(progress-p.delay)/.75)));const x=p.sx+(p.ex-p.sx)*k,y=p.sy+(p.ey-p.sy)*k;
   const sparkle=.7+.3*Math.sin(now*.009+p.sx);g.fillStyle=p.col;g.globalAlpha=(progress>.86?(1-progress)/.14:1)*sparkle;g.shadowColor=p.col;g.shadowBlur=12;g.beginPath();g.arc(x,y,p.size*(1+.4*k),0,TAU);g.fill();}
  g.globalAlpha=1;g.shadowBlur=0;
  if(progress<1)requestAnimationFrame(frame);else done();
 }requestAnimationFrame(frame);
}
$("wishBtn").addEventListener("click",()=>{tone(660);show("wish");});
$("sendWish").addEventListener("click",()=>{
 if(transitioning)return;transitioning=true;
 const wish=$("wishText").value.trim();const w=$("jarodWish");
 w.hidden=!wish;if(wish)$("jarodWishText").textContent=wish;
 $("revealContent").hidden=true;$("magicTransition").hidden=false;
 show("reveal");hearts();
 magicalMorph(()=>{$("magicTransition").hidden=true;$("revealContent").hidden=false;hearts();transitioning=false;});
});
$("letterBtn").addEventListener("click",()=>{tone(880,.3);show("card");hearts();});
$("again").addEventListener("click",()=>{show("intro");});
$("psButton").addEventListener("click",()=>{$("psSecret").hidden=!$("psSecret").hidden;if(!$("psSecret").hidden)hearts();});
const CHRISTMAS_MEMORY_KEY="loveverse_christmas_memories_v1";
const WINTER_WALLET_KEY="loveverse_m02_rewards_v1";
const WINTER_VOUCHER_ID="christmas-winter-date-2026";
function collectWinterDate(){
 try{
  const stored=JSON.parse(localStorage.getItem(WINTER_WALLET_KEY)||"[]");
  const vouchers=Array.isArray(stored)?stored:[];
  if(!vouchers.some(item=>item && item.id===WINTER_VOUCHER_ID)){
   vouchers.push({id:WINTER_VOUCHER_ID,title:"One Cozy Winter Date ♡",description:"Chocolate bombs, baking, a cozy movie night, Christmas lights, or our own winter adventure. Your choice ♡",redeemed:false,createdAt:new Date().toISOString()});
   localStorage.setItem(WINTER_WALLET_KEY,JSON.stringify(vouchers));
  }
  $("winterStatus").textContent="Voucher collected! Find it in your Love Wallet ♡";
  $("collectWinter").textContent="Collected ✓";
  hearts();
 }catch(error){$("winterStatus").textContent="Couldn't save the voucher in this browser.";}
}
$("collectWinter").addEventListener("click",collectWinterDate);
try{const items=JSON.parse(localStorage.getItem(WINTER_WALLET_KEY)||"[]");if(Array.isArray(items)&&items.some(item=>item&&item.id===WINTER_VOUCHER_ID))$("collectWinter").textContent="Collected ✓";}catch{}

const CHRISTMAS_MEMORY_ID="christmas-first-2026";
function collectChristmasCard(){
 let items=[];
 try{const stored=JSON.parse(localStorage.getItem(CHRISTMAS_MEMORY_KEY)||"[]");if(Array.isArray(stored))items=stored;}catch{}
 const wish=$("wishText").value.trim();
 const memory={id:CHRISTMAS_MEMORY_ID,title:"Our First Christmas ♡",date:"25 December 2026",kind:"christmas_card",wish:wish.slice(0,300)};
 const idx=items.findIndex(x=>x&&x.id===CHRISTMAS_MEMORY_ID);
 if(idx>=0)items[idx]=memory;else items.push(memory);
 try{localStorage.setItem(CHRISTMAS_MEMORY_KEY,JSON.stringify(items));$("saveStatus").textContent="Saved! Your Christmas letter is in the Keepsake Drawer ♡";$("saveCard").textContent="Card saved ✓";hearts();}
 catch{$("saveStatus").textContent="Unable to save in this browser. Please check browser storage settings.";}
}
$("saveCard").addEventListener("click",collectChristmasCard);
