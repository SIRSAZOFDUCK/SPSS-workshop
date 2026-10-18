'use strict';
(() => {
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const ids=$$('.lesson').map(s=>s.id).filter(id=>id!=='help');
 const key='ssc2-spss-mh900-v2';let state={done:{}};
 try{const saved=JSON.parse(sessionStorage.getItem(key));if(saved?.done)state=saved;}catch(e){}
 const save=()=>{try{sessionStorage.setItem(key,JSON.stringify(state));}catch(e){}};
 let current='',lastExercise='start';const positions={};
 const title=id=>$('#title-'+id).textContent;
 function route(focus=false){let id=location.hash.slice(1)||'start';if(!$$('.lesson').some(s=>s.id===id))id='start';if(id==='help'&&current&&current!=='help')lastExercise=current;$('#return-exercise').href='#'+lastExercise;current=id;$$('.lesson').forEach(s=>{s.hidden=s.id!==id;s.classList.toggle('active',s.id===id);});const i=ids.indexOf(id),label=i<0?'Help and downloads':`Section ${i+1} of ${ids.length}`;$('#current-section').textContent=label;$('#stepper-label').textContent=label;$('#section-select').value=id;$('#location-label').textContent=i<0?'Help and downloads':`${String(i+1).padStart(2,'0')} · ${title(id)}`;const pct=Math.max(0,i)/(ids.length-1)*100;$('.numberline-fill').style.width=pct+'%';$('.numberline-point').style.left=pct+'%';$$('.numberline-tick').forEach((t,j)=>t.classList.toggle('done',j<=i));$('#previous-section').disabled=i===0;$('#previous-section').textContent=i<0?'← Return to section':'← Back';$('#next-section').hidden=i===ids.length-1||i<0;document.body.classList.toggle('masthead-compact',id!=='start');document.title=(id==='start'?'SSC2 SPSS Workshop (Part 2)':title(id)+' · SSC2 SPSS Workshop (Part 2)');if(focus){$('#title-'+id).focus({preventScroll:true});window.scrollTo({top:positions[id]||0,behavior:'instant'});}}
 function go(id){if(current)positions[current]=scrollY;history.pushState(null,'','#'+id);route(true);}
 document.body.classList.add('enhanced');
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&$$('.lesson').some(s=>'#'+s.id===a.getAttribute('href'))){e.preventDefault();go(a.getAttribute('href').slice(1));}});
 $('.skip').addEventListener('click',e=>{e.preventDefault();$('#title-'+current).focus();});
 $('#section-select').addEventListener('change',e=>go(e.target.value));
 $('#previous-section').addEventListener('click',()=>go(current==='help'?lastExercise:ids[Math.max(0,ids.indexOf(current)-1)]));
 $('#next-section').addEventListener('click',()=>go(ids[Math.min(ids.length-1,ids.indexOf(current)+1)]));
 window.addEventListener('hashchange',()=>route(true));window.addEventListener('popstate',()=>route(true));route();
 function setTheme(mode){document.documentElement.dataset.theme=mode;$('#theme-btn').setAttribute('aria-label',mode==='dark'?'Switch to light theme':'Switch to dark theme');try{sessionStorage.setItem(key+'-theme',mode);}catch(e){}}
 let theme;try{theme=sessionStorage.getItem(key+'-theme');}catch(e){}setTheme(theme==='dark'||theme==='light'?theme:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
 $('#theme-btn').addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
 $$('.quiz').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const fb=form.querySelector('.feedback');if(form.classList.contains('numeric-quiz')){const value=form.querySelector('input').value.trim();if(!value){fb.textContent='Enter a number first, then check your answer.';delete fb.dataset.correct;return;}const valid=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value);const correct=valid&&Math.abs(Number(value)-Number(form.dataset.answer))<1e-9;fb.dataset.correct=String(correct);fb.textContent=(correct?'Correct. ':'Not quite. ')+form.dataset.feedback;return;}const selected=form.querySelector('input:checked');if(!selected){fb.textContent='Choose an answer first. You can try again.';delete fb.dataset.correct;return;}const correct=selected.value===form.dataset.answer;fb.dataset.correct=String(correct);fb.textContent=(correct?'That’s right. ':'Try another answer. ')+form.dataset.feedback;}));
 function progress(){let count=0;$$('[data-complete]').forEach(c=>{c.checked=!!state.done[c.dataset.complete];if(c.checked)count++;});$('#progress').value=count;$('#progress').max=$$('[data-complete]').length;$('#progress-text').textContent=count+' / '+$$('[data-complete]').length+' reviewed';}
 $$('[data-complete]').forEach(c=>c.addEventListener('change',()=>{state.done[c.dataset.complete]=c.checked;save();progress();}));progress();
 let closed=[];window.addEventListener('beforeprint',()=>{closed=$$('details:not([open])');closed.forEach(d=>d.open=true);});window.addEventListener('afterprint',()=>closed.forEach(d=>d.open=false));
})();
