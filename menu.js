/* 공통 메뉴 관리 파일: 아래 MENU_ITEMS만 수정하세요.
   항목 추가 예: {href:"09_new.html", names:{ko:"새 장소",en:"New Place",zh:"新地点",ja:"新しい場所"}},
   파일명과 링크는 정확히 일치해야 합니다. 모든 HTML 파일과 같은 폴더에 두세요. */
window.MENU_ITEMS = [
  {
    "href": "01_fortress.html",
    "names": {
      "ko": "낙선동 4·3성(城)",
      "en": "Nakseon-dong 4·3 Fortress",
      "zh": "乐善洞4·3城",
      "ja": "楽善洞4・3城"
    }
  },
  {
    "href": "02_rampart.html",
    "names": {
      "ko": "성 담",
      "en": "Rampart",
      "zh": "城墙",
      "ja": "城壁"
    }
  },
  {
    "href": "03_hamba.html",
    "names": {
      "ko": "함바집",
      "en": "Hamba House",
      "zh": "临时棚屋（Hamba）",
      "ja": "ハンバジプ（仮設住居）"
    }
  },
  {
    "href": "04_gate.html",
    "names": {
      "ko": "정문초소",
      "en": "Main Gate Guard Post",
      "zh": "正门岗哨",
      "ja": "正門哨所"
    }
  },
  {
    "href": "05_tongsi.html",
    "names": {
      "ko": "통시",
      "en": "Tongsi (Traditional Toilet)",
      "zh": "通西（传统厕所）",
      "ja": "トンシ（伝統式便所）"
    }
  },
  {
    "href": "06_police.html",
    "names": {
      "ko": "경찰지서",
      "en": "Police Substation",
      "zh": "警察驻在所",
      "ja": "警察駐在所"
    }
  },
  {
    "href": "07_sentry.html",
    "names": {
      "ko": "보초대기소",
      "en": "Sentry Station",
      "zh": "哨兵待机所",
      "ja": "歩哨待機所"
    }
  },
  {
    "href": "08_tower.html",
    "names": {
      "ko": "경비망루",
      "en": "Watchtower",
      "zh": "警戒瞭望台",
      "ja": "警備望楼"
    }
  },
  {
    "href": "09_gunport.html",
    "names": {
      "ko": "총안",
      "en": "Gun Port",
      "zh": "射击孔",
      "ja": "銃眼"
    }
  },
  {
    "href": "10_jungmun.html",
    "names": {
      "ko": "중문면 대습이우영 사건",
      "en": "Jungmun-myeon Daeseup Iwooyeong Incident",
      "zh": "中文面大习伊乌营事件",
      "ja": "中文面 大スプイウヨン事件"
    }
  }
];
window.renderSharedMenu = function(lang){
  const host=document.getElementById('shared-menu');if(!host)return;
  const labels={ko:'시설 안내',en:'Site Guide',zh:'设施导览',ja:'施設案内'};
  const current=decodeURIComponent(location.pathname.split('/').pop()||'index.html');
  host.innerHTML='';
  const title=document.createElement('h2');title.className='shared-menu-title';title.textContent=labels[lang]||labels.ko;host.appendChild(title);
  const grid=document.createElement('div');grid.className='shared-menu-grid';
  MENU_ITEMS.forEach((item,i)=>{
    const a=document.createElement('a');a.className='shared-menu-item';a.href=item.href;
    if(item.href===current){a.classList.add('current');a.setAttribute('aria-current','page');}
    const num=document.createElement('span');num.className='shared-menu-num';num.textContent=String(i+1).padStart(2,'0');
    const name=document.createElement('strong');name.textContent=(item.names&&item.names[lang])||(item.names&&item.names.ko)||item.href;
    const arrow=document.createElement('span');arrow.className='shared-menu-arrow';arrow.textContent='›';
    a.append(num,name,arrow);grid.appendChild(a);
  });host.appendChild(grid);
};

// 메인 목차도 같은 메뉴 데이터에서 생성합니다.
window.renderMainContents=function(lang){
 const host=document.getElementById('contents');if(!host)return;
 host.replaceChildren();
 MENU_ITEMS.forEach((item,i)=>{
  const a=document.createElement('a');a.className='item';a.href=item.href;
  const num=document.createElement('div');num.className='num';num.textContent=String(i+1).padStart(2,'0');
  const title=document.createElement('strong');title.textContent=item.names?.[lang]||item.names?.ko||item.href;
  const sub=document.createElement('div');sub.className='sub';sub.textContent=item.names?.en||'';
  const arrow=document.createElement('span');arrow.className='arrow';arrow.textContent='›';
  a.append(num,title,sub,arrow);host.appendChild(a);
 });
};
// 각 상세 페이지의 이전/다음 링크도 메뉴 순서에 맞춰 자동 갱신합니다.
window.renderPageNavigation=function(lang){
 const current=decodeURIComponent(location.pathname.split('/').pop());
 const i=MENU_ITEMS.findIndex(x=>x.href===current);
 const p=document.getElementById('prevBtn'),n=document.getElementById('nextBtn');
 for(const [node,item,dir] of [[p,i>0?MENU_ITEMS[i-1]:null,'prev'],[n,i>=0&&i<MENU_ITEMS.length-1?MENU_ITEMS[i+1]:null,'next']]){
  if(!node)continue;
  if(!item){node.style.display='none';node.removeAttribute('href');continue;}
  node.style.display='';node.href=item.href;
  const name=item.names?.[lang]||item.names?.ko||item.href;
  node.textContent=dir==='prev'?'← '+name:name+' →';
 }
};


// 남색 공통 플로팅 언어 선택 + TOP
(function(){
 const style=document.createElement('style');
 style.textContent=`
 body{padding-bottom:76px}
 .floating-tools{position:fixed;bottom:calc(8px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);z-index:9999;width:min(calc(100% - 24px),380px);display:flex;align-items:stretch;gap:7px;padding:6px;background:#f7f9fc;border:1px solid #dce3ed;border-radius:13px;box-shadow:0 4px 16px rgba(11,30,53,.16);font-family:inherit}
 .floating-tools button{font:700 14px/1.3 inherit;cursor:pointer;touch-action:manipulation}
 .floating-lang-wrap{position:relative;flex:1;min-width:0}
 .floating-lang-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:42px;padding:9px 12px;border:1px solid #cbd7e4;border-radius:9px;background:#fff;color:#172e4c;font-size:14px;font-weight:700}
 .floating-lang-toggle .globe{font-size:16px;line-height:1}.floating-lang-toggle .lang-current{flex:1;text-align:left}.floating-lang-toggle .chevron{font-size:12px;opacity:.8}
 .floating-top{flex:0 0 72px;align-self:stretch;border:0;border-radius:9px;background:#172e4c;color:#fff;font-size:14px;font-weight:800}
 .floating-lang-options{display:none;position:absolute;bottom:calc(100% + 7px);left:0;right:0;padding:6px;border:1px solid #dce4ee;border-radius:14px;background:#fff;box-shadow:0 8px 25px rgba(11,30,53,.2)}
 .floating-lang-wrap.open .floating-lang-options{display:grid;gap:3px}
 .floating-lang-options button{display:flex;justify-content:space-between;align-items:center;width:100%;padding:11px;border:0;border-radius:9px;background:transparent;color:#1d3553;text-align:left;font-size:16px;font-weight:650}
 .floating-lang-options button.active{background:#eaf0f7;color:#132e50}
 .floating-lang-options button.active:after{content:'✓';font-weight:800}
 @media(max-width:360px){.floating-tools{width:calc(100% - 18px);gap:6px;padding:5px}.floating-top{flex-basis:68px}.floating-lang-toggle{padding:8px 10px;min-height:42px}.floating-lang-options button{padding:11px}}
 `;document.head.appendChild(style);
 const dock=document.createElement('nav');dock.className='floating-tools';dock.setAttribute('aria-label','언어 선택 및 상단 이동');
 const wrap=document.createElement('div');wrap.className='floating-lang-wrap';
 const toggle=document.createElement('button');toggle.type='button';toggle.className='floating-lang-toggle';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','언어 선택');
 toggle.innerHTML='<span class="globe" aria-hidden="true">◎</span><span class="lang-current">Language</span><span class="chevron" aria-hidden="true">▾</span>';
 const opts=document.createElement('div');opts.className='floating-lang-options';
 const languages=[['ko','한국어'],['en','English'],['ja','日本語'],['zh','中文']];
 languages.forEach(([code,label])=>{const b=document.createElement('button');b.type='button';b.dataset.langChoice=code;b.textContent=label;b.addEventListener('click',()=>{if(typeof setLang==='function')setLang(code);wrap.classList.remove('open');toggle.setAttribute('aria-expanded','false');});opts.appendChild(b)});
 toggle.addEventListener('click',()=>{const open=wrap.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
 document.addEventListener('click',e=>{if(!wrap.contains(e.target)){wrap.classList.remove('open');toggle.setAttribute('aria-expanded','false');}});
 const top=document.createElement('button');top.type='button';top.className='floating-top';top.textContent='↑ TOP';top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
 wrap.append(toggle,opts);dock.append(wrap,top);document.body.appendChild(dock);
 window.updateFloatingLanguage=function(lang){toggle.querySelector('.lang-current').textContent='Language';opts.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.langChoice===lang));};
 window.updateFloatingLanguage(localStorage.getItem('nakseonLang')||'ko');
 // footerText.textContent가 언어 전환 시 바뀌어도 저작권은 유지되도록 별도 요소로 삽입
 const footer=document.querySelector('footer');
 if(footer && !document.querySelector('.woodline-copyright')){
   const credit=document.createElement('div');
   credit.className='woodline-copyright';
   credit.textContent='© Copyright WOODLINE. All rights reserved.';
   credit.style.cssText='margin:12px auto 0;padding:12px 12px 4px;border-top:1px solid #d9dde3;font-size:12px;line-height:1.6;letter-spacing:.01em;color:#697586;text-align:center;';
   footer.insertAdjacentElement('afterend',credit);
 }


})();
