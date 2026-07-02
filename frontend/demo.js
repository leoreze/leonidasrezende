
const slug=location.pathname.split('/').filter(Boolean).pop();const frame=document.querySelector('#demoFrame');
async function load(){const r=await fetch('/api/templates/'+slug);if(!r.ok) throw new Error('not found');const t=await r.json();document.title=`${t.title} | Live Demo`;document.querySelector('#demoTitle').innerHTML=`${t.title}<small>${t.category||'Live Demo'}</small>`;document.querySelector('#buyBtn').href=t.buyUrl||'/marketplace';frame.src=t.preview||t.cover||'/marketplace';}
document.querySelectorAll('[data-device]').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('[data-device]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');frame.className='demo-frame '+(btn.dataset.device==='desktop'?'':btn.dataset.device);});
load().catch(()=>{document.querySelector('.demo-frame-wrap').innerHTML='<p>Template não encontrado.</p>';});
