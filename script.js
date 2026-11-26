const hd=document.querySelector('header'),nav=document.querySelector('nav'),mb=document.querySelector('.menu');
const f=()=>hd.classList.toggle('solid',scrollY>40);f();addEventListener('scroll',f,{passive:true});
mb.onclick=()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
nav.onclick=e=>{if(e.target.tagName==='A'){nav.classList.remove('open');mb.setAttribute('aria-expanded',false)}};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// Newsletter/contact form -> Web3Forms (key goes in the hidden access_key field)
const form=document.getElementById('signup'),msg=form.querySelector('.msg');
form.addEventListener('submit',async e=>{
  e.preventDefault();const k=form.access_key.value;
  if(!k||k==='YOUR_WEB3FORMS_KEY'){msg.textContent='Sign-up is not connected yet (preview mode).';return}
  msg.textContent='Sending…';
  try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
    const j=await r.json();if(j.success){form.reset();msg.textContent="You're on the list. Welcome to the standard."}else throw 0}
  catch{msg.textContent='Something went wrong. Please try again.'}
});
// scroll progress
const pb=document.createElement('div');pb.className='progress';document.body.append(pb);
addEventListener('scroll',()=>{pb.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%'},{passive:true});
// hero: globe of hearts (lit, curved, draggable, swells under the pointer)
(()=>{const c=document.getElementById('fx');if(!c)return;const x=c.getContext('2d'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const HP=new Path2D('M22 30C20 20 4 18 4 8 4-1 17-2 22 8 27-2 40-1 40 8c0 10-16 12-18 22z'),L=[-.45,-.55,.7],N=420,pts=[];
for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),t=i*2.399963;pts.push([Math.cos(t)*r,y,Math.sin(t)*r])}
let w,h,ry=0,vy=.004,drag=false,px=0,mx=-999,my=-999,on=true;const rx=-.3;
function size(){const d=devicePixelRatio||1;w=c.clientWidth;h=c.clientHeight;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0)}size();addEventListener('resize',size);
c.addEventListener('pointerdown',e=>{drag=true;px=e.clientX;c.setPointerCapture(e.pointerId);c.style.cursor='grabbing'});
c.addEventListener('pointerup',()=>{drag=false;c.style.cursor='grab'});
c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect();mx=e.clientX-b.left;my=e.clientY-b.top;if(drag){vy=(e.clientX-px)*.0025;ry+=(e.clientX-px)*.008;px=e.clientX}});
c.addEventListener('pointerleave',()=>{mx=my=-999});
new IntersectionObserver(e=>on=e[0].isIntersecting).observe(c);
function draw(){x.clearRect(0,0,w,h);const R=Math.min(w*.5,h)*.54,cx=w/2,cy=h/2,cY=Math.cos(ry),sY=Math.sin(ry),cX=Math.cos(rx),sX=Math.sin(rx);
 const q=pts.map(p=>{const X=p[0]*cY+p[2]*sY;let Z=-p[0]*sY+p[2]*cY;const Y=p[1]*cX-Z*sX;Z=p[1]*sX+Z*cX;return[X,Y,Z]}).sort((a,b)=>a[2]-b[2]);
 for(const p of q){const z=p[2];if(z<-.15)continue;const d=(z+1)/2,lit=Math.max(0,p[0]*L[0]+p[1]*L[1]+z*L[2]),X=cx+p[0]*R,Y=cy+p[1]*R;
  let k=.17+d*.26;const dd=Math.hypot(X-mx,Y-my);if(dd<110)k*=1+(1-dd/110)*1.1;
  const a=Math.atan2(p[1],p[0]),sq=Math.max(.25,z<0?.25:.3+.7*z),v=Math.round(70+lit*185*(.5+d*.5));
  x.save();x.translate(X,Y);x.rotate(a);x.scale(sq,1);x.rotate(-a);x.scale(k,k);x.translate(-22,-15);x.globalAlpha=z<0?.12:.2+d*.8;x.fillStyle=`rgb(${v},${v-3},${v-9})`;x.fill(HP);x.restore()}}
if(RM){draw()}else(function loop(){if(on){draw();if(!drag){vy+=(.004-vy)*.02;ry+=vy}}requestAnimationFrame(loop)})();})();
// ---- shop ----
const CAPSVG='<svg viewBox="0 0 200 160"><path d="M30 100c0-50 30-70 70-70s70 20 70 70c-30-8-110-8-140 0z" fill="#0e0e0e" stroke="#555"/><path d="M30 100c-14 6-20 14-4 20 40-10 108-10 148 0 16-6 10-14-4-20z" fill="#0e0e0e" stroke="#555"/><path transform="translate(92.0,48.0) scale(0.40)" d="M22 30C20 20 4 18 4 8 4-1 17-2 22 8 27-2 40-1 40 8c0 10-16 12-18 22z" fill="none" stroke="#e9e4da" stroke-width="3"/><path transform="translate(92.0,63.2) scale(0.40)" d="M22 30C20 20 4 18 4 8 4-1 17-2 22 8 27-2 40-1 40 8c0 10-16 12-18 22z" fill="none" stroke="#e9e4da" stroke-width="3"/><path transform="translate(92.0,78.4) scale(0.40)" d="M22 30C20 20 4 18 4 8 4-1 17-2 22 8 27-2 40-1 40 8c0 10-16 12-18 22z" fill="none" stroke="#e9e4da" stroke-width="3"/></svg>';
(()=>{const S=window.SHOP,$=s=>document.querySelector(s),m=n=>S.currency+n;
const art=p=>p.img?`<img class="ph1" style="--o:${p.o||'50% 100%'};--z:${p.z||1.6}" src="img/${p.img}.jpg" alt="${p.name}" loading="lazy">`+(p.alt?`<img class="alt" src="img/${p.alt}.jpg" alt="" loading="lazy">`:''):'<div class="ph" style="display:grid;place-items:center;height:100%">'+CAPSVG+'</div>';
let cart=[];try{cart=JSON.parse(localStorage.getItem('3hc')||'[]')}catch{}
const save=()=>{try{localStorage.setItem('3hc',JSON.stringify(cart))}catch{}};
let cat='All';const cats=['All',...new Set(S.products.map(p=>p.cat))];
function filters(){$('.filters').innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c===cat}" data-c="${c}">${c}</button>`).join('')}
function grid(){$('#grid').innerHTML=S.products.filter(p=>cat==='All'||p.cat===cat).map(p=>`<article class="card"><div class="art" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">${art(p)}<span class="badge">Drop 001</span></div><div class="meta"><div><h3>${p.name}</h3><p>${p.desc}</p><div class="sw"><small>${p.colors.join(' / ')}</small></div></div><span class="price">${m(p.price)}</span></div><button class="btn sm" data-id="${p.id}">Quick add</button></article>`).join('')}
document.addEventListener('click',e=>{const t=e.target.closest('[data-cat]');if(t){cat=t.dataset.cat;filters();grid()}});
$('.filters').onclick=e=>{const c=e.target.dataset.c;if(c){cat=c;filters();grid()}};
$('#grid').onclick=e=>{const el=e.target.closest('[data-id]');if(el)open(el.dataset.id)};
$('#grid').onkeydown=e=>{if(e.key==='Enter'){const el=e.target.closest('.art');if(el)open(el.dataset.id)}};
function open(id){const p=S.products.find(x=>x.id===id),sz=p.sizes||S.sizes;let c=p.colors[0],s=null;const M=$('#modal');
M.innerHTML=`<div class="pm"><button class="x" aria-label="Close">×</button><div class="pimg">${art(p).replace('class="alt"','style="display:none"')}</div><div class="pinfo"><p class="eyebrow">Drop 001 · ${p.cat}</p><h2 style="margin:0;font-size:1.5rem">${p.name}</h2><b class="price" style="font-size:1.1rem">${m(p.price)}</b><p>${p.desc}</p><div><p class="lbl">Colour</p><div class="opt" data-k="c">${p.colors.map((x,i)=>`<button aria-pressed="${!i}">${x}</button>`).join('')}</div></div><div><p class="lbl">Size</p><div class="opt" data-k="s">${sz.map(x=>`<button aria-pressed="false">${x}</button>`).join('')}</div></div><button class="btn add">Add to cart</button><p class="msg"></p></div></div>`;
M.hidden=false;M.querySelector('.x').focus();
M.onclick=e=>{if(e.target===M||e.target.classList.contains('x'))return M.hidden=true;
 const b=e.target.closest('.opt button');if(b){const g=b.parentElement;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));if(g.dataset.k==='c'){c=b.textContent;if(p.imgs&&p.imgs[c]){const im=M.querySelector('.pimg img');if(im)im.src='img/'+p.imgs[c]+'.jpg'}}else s=b.textContent}
 if(e.target.classList.contains('add')){if(!s&&sz.length>1){M.querySelector('.msg').textContent='Please choose a size.';return}add(p,c,s||sz[0]);M.hidden=true;drawer(true)}};}
function add(p,c,s){window.heartBurst&&heartBurst(innerWidth-70,70,5);const k=p.id+c+s,f=cart.find(x=>x.k===k);f?f.q++:cart.push({k,id:p.id,c,s,q:1});save();render()}
// quick add -> opens picker
document.addEventListener('click',e=>{const b=e.target.closest('.btn.sm[data-id]');if(b)open(b.dataset.id)});
addEventListener('keydown',e=>{if(e.key==='Escape'){$('#modal').hidden=true;drawer(false)}});
function render(){const n=cart.reduce((a,x)=>a+x.q,0);$('#cc').textContent=n;let t=0;
$('.items').innerHTML=cart.length?cart.map((x,i)=>{const p=S.products.find(y=>y.id===x.id);t+=p.price*x.q;return`<div class="it">${p.img?`<img src="img/${p.img}.jpg" alt="">`:'<div class="ph"></div>'}<div><b>${p.name}</b><small>${x.c} · ${x.s} · Qty ${x.q}</small><button data-r="${i}">Remove</button></div><span>${m(p.price*x.q)}</span></div>`}).join(''):'<p style="color:var(--mute)">Your cart is empty.</p>';
$('#sub').textContent=m(t);$('#order').style.display=cart.length?'':'none';
$('#order [name=order]').value=cart.map(x=>{const p=S.products.find(y=>y.id===x.id);return`${x.q} x ${p.name} (${x.c}, ${x.s}) = ${m(p.price*x.q)}`}).join('\n')+'\nSubtotal: '+m(t)}
$('.items').onclick=e=>{const r=e.target.dataset.r;if(r!=null){cart.splice(+r,1);save();render()}};
function drawer(o){$('#cart').hidden=!o;$('.scrim').hidden=!o;if(o)$('#cart .x').focus()}
$('.cartbtn').onclick=()=>drawer(true);$('#cart .x').onclick=$('.scrim').onclick=()=>drawer(false);
$('#order').onsubmit=async e=>{e.preventDefault();const f=e.target,msg=f.querySelector('.msg'),k=f.access_key.value;
 if(!k||k==='YOUR_WEB3FORMS_KEY'){msg.textContent='Ordering is not connected yet (preview mode).';return}
 msg.textContent='Sending…';try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)});if((await r.json()).success){cart=[];save();render();f.reset();msg.textContent='Order request sent. We will email you shortly.'}else throw 0}catch{msg.textContent='Something went wrong. Please try again.'}};
filters();grid();render();})();
