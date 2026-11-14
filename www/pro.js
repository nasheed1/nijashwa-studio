/* Nijashwa Studio - "Pro" layout (Premiere-style). Adds a third layout card; styling lives in pro.css */
(function(){
  var H=document.documentElement,PRO='pro';
  var svg='<svg viewBox="0 0 84 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="76" height="56" rx="4"/><rect x="9" y="9" width="24" height="46" rx="2" fill="currentColor" stroke="none" opacity=".25"/><rect x="37" y="9" width="20" height="24" rx="2" fill="currentColor" stroke="none" opacity=".25"/><rect x="60" y="9" width="15" height="24" rx="2" fill="currentColor" stroke="none" opacity=".25"/><rect x="37" y="37" width="32" height="18" rx="2" fill="currentColor" stroke="none" opacity=".25"/></svg>';
  function addCard(){
    var w=document.querySelector('#lay .lay-cards');
    if(!w||w.querySelector('[data-l='+PRO+']'))return;
    w.insertAdjacentHTML('beforeend','<button class="lay-card" data-l="'+PRO+'">'+svg+'Pro (Premiere)<small>Desktop workspace:<br>monitor, project, timeline, tools</small></button>');
    if(matchMedia('(pointer:fine)').matches&&innerWidth>=900){
      w.querySelectorAll('.lay-card').forEach(function(c){c.classList.toggle('rec',c.dataset.l===PRO)});
    }
  }
  function addImport(){
    var pj=document.getElementById('v30proj');
    if(!pj||document.getElementById('proImp'))return;
    var b=document.createElement('button');b.id='proImp';b.textContent='Import media';
    b.onclick=function(){var t=document.querySelector('#etb [data-tool=video]');if(t)t.click()};
    pj.style.position='relative';pj.appendChild(b);
    var l=pj.querySelector('.l');
    function sync(){b.style.display=(H.dataset.layout===PRO&&l&&!l.children.length)?'':'none'}
    if(l)new MutationObserver(sync).observe(l,{childList:true});new MutationObserver(sync).observe(H,{attributes:true,attributeFilter:['data-layout']});sync();
  }
  addCard();
  addImport();
  new MutationObserver(addImport).observe(document.body,{childList:true,subtree:true});
  /* Desktop (mouse + wide window) opens the Pro layout by default; phones keep the Mobile layout.
     Override with ?layout=mobile or ?layout=pro in the URL (the choice is remembered). */
  try{
    var q=new URLSearchParams(location.search).get('layout'),saved=localStorage.getItem('pn-layout');
    if(q==='pro'||q==='mobile')localStorage.setItem('pn-layout',saved=q);
    var desktop=matchMedia('(pointer:fine)').matches&&innerWidth>=900;
    if(saved===PRO||(saved!=='mobile'&&desktop)){
      H.dataset.layout=PRO;
      var l=document.getElementById('lay');if(l)l.classList.remove('on');
      dispatchEvent(new Event('resize'));
    }
  }catch(e){}
})();
