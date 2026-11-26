// Floating hearts: a few drift up where you click or tap (and when you add to cart).
(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const st=document.createElement('style');st.textContent='.fh{position:fixed;z-index:60;pointer-events:none;width:22px;fill:none;stroke:#e9e4da;stroke-width:2;animation:fhup 1.8s ease-out forwards}@keyframes fhup{0%{opacity:0;transform:translate(0,0) scale(.4)}15%{opacity:.9}100%{opacity:0;transform:translate(var(--dx),-170px) scale(1.2) rotate(var(--r))}}';document.head.append(st);
const P='M22 30C20 20 4 18 4 8 4-1 17-2 22 8 27-2 40-1 40 8c0 10-16 12-18 22z';
function burst(x,y,n=3){for(let i=0;i<n;i++){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 44 32');s.setAttribute('class','fh');s.innerHTML='<path d="'+P+'"/>';
s.style.left=(x-11+(Math.random()-.5)*30)+'px';s.style.top=(y-10)+'px';s.style.setProperty('--dx',(Math.random()-.5)*80+'px');s.style.setProperty('--r',(Math.random()-.5)*50+'deg');s.style.animationDelay=i*.12+'s';document.body.append(s);setTimeout(()=>s.remove(),2200)}}
let last=0;addEventListener('pointerdown',e=>{const t=Date.now();if(t-last<400)return;last=t;burst(e.clientX,e.clientY,3)});
window.heartBurst=burst})();
