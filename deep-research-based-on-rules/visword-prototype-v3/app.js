// ====== SCENE DATA ======
const scenes = {
  'chart-race': {
    name:'Bar Chart Race', icon:'📊',
    data:{
      title:'Most Valuable Tech Companies (2015-2025)',
      items:[
        {label:'Apple',value:3.2,color:'#6366f1'},{label:'Microsoft',value:3.1,color:'#818cf8'},
        {label:'NVIDIA',value:2.8,color:'#10b981'},{label:'Google',value:2.1,color:'#f59e0b'},
        {label:'Amazon',value:2.0,color:'#ef4444'},{label:'Meta',value:1.4,color:'#3b82f6'},
        {label:'TSMC',value:1.0,color:'#8b5cf6'},{label:'Tencent',value:0.8,color:'#ec4899'}
      ]
    },
    renderPreview:function(data){let h='<div class="pv-chart-race">';data.items.forEach((item,i)=>{const w=(item.value/3.5)*100;h+=`<div class="pv-bar-row"><span class="pv-bar-label">${item.label}</span><div class="pv-bar-track"><div class="pv-bar-fill" style="width:${w}%;background:${item.color}"><span class="pv-bar-value">$${item.value.toFixed(1)}T</span></div></div></div>`;});h+='</div>';return h;},
    renderEditor:function(data){let h='<div class="editor-section"><label>Title</label><input type="text" value="'+data.title+'" oninput="updateSceneData(\'title\',this.value)"></div>';h+='<div class="editor-section"><label>Data Items <span class="editor-hint">(edit label, value, color)</span></label>';data.items.forEach((item,i)=>{h+=`<div class="editable-item"><span class="ei-rank">${i+1}</span><input value="${item.label}" oninput="updateItem(${i},'label',this.value)" style="flex:2"><input value="${item.value}" oninput="updateItem(${i},'value',parseFloat(this.value)||0)" style="flex:1" type="number" step="0.1"><input type="color" value="${item.color}" oninput="updateItem(${i},'color',this.value)" style="width:28px;height:24px;padding:0;border:none;cursor:pointer"></div>`;});h+='</div>';h+='<div class="editor-section"><label>Color Theme</label><div class="theme-dots"><span class="theme-dot active" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)" onclick="showToast(\'Theme applied\')"></span><span class="theme-dot" style="background:linear-gradient(135deg,#059669,#10b981)" onclick="showToast(\'Theme applied\')"></span><span class="theme-dot" style="background:linear-gradient(135deg,#d97706,#f59e0b)" onclick="showToast(\'Theme applied\')"></span></div></div>';return h;}
  },
  'ranking-reveal': {
    name:'Ranking Reveal', icon:'🏆',
    data:{
      title:'Top 5 Programming Languages 2026',
      items:[
        {rank:5,name:'Rust',desc:'Most loved for 9th consecutive year',color:'#ef4444'},
        {rank:4,name:'TypeScript',desc:'Type safety conquers the frontend',color:'#3b82f6'},
        {rank:3,name:'Go',desc:'Cloud-native backbone',color:'#06b6d4'},
        {rank:2,name:'JavaScript',desc:'Still the web\'s universal language',color:'#f59e0b'},
        {rank:1,name:'Python',desc:'AI & data science dominance',color:'#10b981'}
      ]
    },
    renderPreview:function(data){const top=data.items.find(i=>i.rank===1);return `<div class="pv-ranking" style="background:linear-gradient(160deg,${top.color}22,transparent)"><div class="pv-rank-number" style="color:${top.color}">#${top.rank}</div><div class="pv-rank-title">${top.name}</div><div class="pv-rank-desc">${top.desc}</div><div class="pv-rank-hashtag">#${data.title}</div></div>`;},
    renderEditor:function(data){let h='<div class="editor-section"><label>Title</label><input type="text" value="'+data.title+'" oninput="updateSceneData(\'title\',this.value)"></div>';h+='<div class="editor-section"><label>Ranking Items (1 = highest)</label>';const sorted=[...data.items].sort((a,b)=>a.rank-b.rank);sorted.forEach(item=>{h+=`<div class="editable-item"><span class="ei-rank">#${item.rank}</span><input value="${item.name}" oninput="updateRankItem(${item.rank},'name',this.value)" style="flex:2"><input value="${item.desc}" oninput="updateRankItem(${item.rank},'desc',this.value)" style="flex:2"></div>`;});h+='</div>';return h;}
  },
  'vs-comparison': {
    name:'VS Comparison', icon:'⚔️',
    data:{
      title:'iPhone 17 Pro vs Galaxy S27 Ultra',
      left:{name:'iPhone 17 Pro',stats:[{label:'Chip',value:'A19 Pro'},{label:'Display',value:'6.3" 120Hz'},{label:'Camera',value:'48MP Triple'},{label:'Battery',value:'4,500mAh'},{label:'Price',value:'$1,099'}]},
      right:{name:'Galaxy S27 Ultra',stats:[{label:'Chip',value:'Snapdragon 8G5'},{label:'Display',value:'6.9" 144Hz'},{label:'Camera',value:'200MP Quad'},{label:'Battery',value:'5,500mAh'},{label:'Price',value:'$1,299'}]}
    },
    renderPreview:function(data){let hl='',hr='';data.left.stats.forEach(s=>{hl+=`<div class="pv-vs-stat"><strong>${s.value}</strong><br>${s.label}</div>`;});data.right.stats.forEach(s=>{hr+=`<div class="pv-vs-stat"><strong>${s.value}</strong><br>${s.label}</div>`;});return `<div class="pv-vs"><div class="pv-vs-left"><div class="pv-vs-name">${data.left.name}</div>${hl}</div><div class="pv-vs-divider"><span class="pv-vs-badge">VS</span></div><div class="pv-vs-right"><div class="pv-vs-name">${data.right.name}</div>${hr}</div></div>`;},
    renderEditor:function(data){let h='<div class="editor-section"><label>Title</label><input type="text" value="'+data.title+'"></div>';h+='<div class="editor-section"><label>Left Side Name</label><input type="text" value="'+data.left.name+'" oninput="updateVSSide(\'left\',\'name\',this.value)"></div>';h+='<div class="editor-section"><label>Right Side Name</label><input type="text" value="'+data.right.name+'" oninput="updateVSSide(\'right\',\'name\',this.value)"></div>';return h;}
  },
  'quote-card': {
    name:'Quote Card', icon:'💬',
    data:{
      quote:'The only way to do great work is to love what you do.',
      author:'Steve Jobs',
      background:'dark'
    },
    renderPreview:function(data){return `<div class="pv-quote" style="background:linear-gradient(160deg,#0f172a,#1e293b)"><div class="pv-quote-mark">"</div><div class="pv-quote-text">${data.quote}</div><div class="pv-quote-author">— ${data.author}</div></div>`;},
    renderEditor:function(data){let h='<div class="editor-section"><label>Quote Text</label><textarea rows="3" oninput="updateSceneData(\'quote\',this.value)">'+data.quote+'</textarea></div>';h+='<div class="editor-section"><label>Author</label><input type="text" value="'+data.author+'" oninput="updateSceneData(\'author\',this.value)"></div>';h+='<div class="editor-section"><label>Background Style</label><select onchange="updateQuoteBg(this.value)"><option value="dark">Dark Elegance</option><option value="warm">Warm Gradient</option><option value="cool">Cool Blue</option><option value="minimal">Minimal White</option></select></div>';return h;}
  }
};

// ====== STATE ======
let currentScene = 'chart-race';
let isPlaying = false;
let playInterval = null;
let currentTime = 0;

// ====== VIEW NAVIGATION ======
function showView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const target=document.getElementById('view-'+name);
  if(target)target.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ====== SCENE MANAGEMENT ======
function openScene(sceneId){
  currentScene=sceneId;
  document.getElementById('studioSceneName').textContent=scenes[sceneId].name+' · '+scenes[sceneId].icon;
  refreshPreview();
  refreshEditor();
  // Update sidebar
  document.querySelectorAll('.sidebar-scene').forEach(s=>s.classList.remove('active'));
  const sb=document.querySelector(`.sidebar-scene[data-scene="${sceneId}"]`);
  if(sb)sb.classList.add('active');
  showView('studio');
}

function switchScene(sceneId){
  if(scenes[sceneId])openScene(sceneId);
}

function refreshPreview(){
  const data=scenes[currentScene].data;
  const html=scenes[currentScene].renderPreview(data);
  document.getElementById('previewScreen').innerHTML=html;
}

function refreshEditor(){
  const data=scenes[currentScene].data;
  const html=scenes[currentScene].renderEditor(data);
  document.getElementById('editorSections').innerHTML=html;
}

// ====== DATA UPDATES ======
function updateSceneData(key,value){
  scenes[currentScene].data[key]=value;
  refreshPreview();
}

function updateItem(index,key,value){
  scenes[currentScene].data.items[index][key]=value;
  refreshPreview();
}

function updateRankItem(rank,key,value){
  const item=scenes[currentScene].data.items.find(i=>i.rank===rank);
  if(item){item[key]=value;refreshPreview();}
}

function updateVSSide(side,key,value){
  scenes[currentScene].data[side][key]=value;
  refreshPreview();
}

function updateQuoteBg(style){
  const screen=document.getElementById('previewScreen');
  const bgMap={dark:'linear-gradient(160deg,#0f172a,#1e293b)',warm:'linear-gradient(160deg,#2e1a0f,#3d2010)',cool:'linear-gradient(160deg,#0f172a,#1e3a5f)',minimal:'linear-gradient(160deg,#f8fafc,#e2e8f0)'};
  const pvQuote=screen.querySelector('.pv-quote');
  if(pvQuote)pvQuote.style.background=bgMap[style]||bgMap.dark;
}

function regenerateContent(){
  showToast('AI regenerating content... (demo)');
  setTimeout(()=>{refreshPreview();refreshEditor();showToast('Content refreshed!');},800);
}

// ====== PREVIEW PLAYBACK ======
function togglePreviewPlay(){
  isPlaying=!isPlaying;
  const btn=document.getElementById('playBtn');
  btn.textContent=isPlaying?'⏸ Pause':'▶ Play';
  if(isPlaying)startPlayback();
  else stopPlayback();
}

function startPlayback(){
  const scrub=document.getElementById('previewScrub');
  currentTime=parseInt(scrub.value)||0;
  playInterval=setInterval(()=>{
    currentTime++;
    if(currentTime>30){currentTime=0;}
    scrub.value=currentTime;
    updateTimeDisplay();
    // Animate bars for chart-race
    if(currentScene==='chart-race')animateChartBars();
    // Cycle ranking
    if(currentScene==='ranking-reveal' && currentTime%6===0)cycleRanking();
  },500);
}

function stopPlayback(){
  if(playInterval)clearInterval(playInterval);
  playInterval=null;
}

function scrubPreview(val){
  currentTime=parseInt(val);
  updateTimeDisplay();
  if(currentScene==='chart-race')animateChartBars();
}

function updateTimeDisplay(){
  document.getElementById('previewTime').textContent=`0:${String(currentTime).padStart(2,'0')} / 0:30`;
}

function animateChartBars(){
  const bars=document.querySelectorAll('.pv-bar-fill');
  bars.forEach(bar=>{
    const currentWidth=parseFloat(bar.style.width)||0;
    const targetWidth=50+Math.random()*45;
    bar.style.width=targetWidth+'%';
    const valEl=bar.querySelector('.pv-bar-value');
    if(valEl)valEl.textContent='$'+(targetWidth/30).toFixed(1)+'T';
  });
}

let rankCycleIdx=0;
function cycleRanking(){
  const sorted=[...scenes['ranking-reveal'].data.items].sort((a,b)=>a.rank-b.rank);
  const item=sorted[rankCycleIdx%sorted.length];
  rankCycleIdx++;
  const screen=document.getElementById('previewScreen');
  screen.innerHTML=`<div class="pv-ranking"><div class="pv-rank-number" style="color:${item.color}">#${item.rank}</div><div class="pv-rank-title">${item.name}</div><div class="pv-rank-desc">${item.desc}</div></div>`;
}

// ====== EXPORT ======
function showExportModal(){document.getElementById('exportModal').classList.remove('hidden');updateExportPreview();}
function hideExportModal(){document.getElementById('exportModal').classList.add('hidden');}

function updateExportPreview(){
  const preset=document.querySelector('input[name="exportPreset"]:checked')?.value||'universal';
  const configs={
    universal:{format:'MP4 · H.264',res:'1080 × 1920',fps:'30 fps',bitrate:'10 Mbps VBR',audio:'AAC-LC · 48kHz · 256kbps',size:'~38 MB'},
    tiktok:{format:'MP4 · H.264',res:'1080 × 1920',fps:'30 fps',bitrate:'8 Mbps VBR',audio:'AAC-LC · 48kHz · 192kbps',size:'~30 MB'},
    douyin:{format:'MP4 · H.264',res:'1080 × 1920',fps:'30 fps',bitrate:'12 Mbps VBR',audio:'AAC-LC · 48kHz · 256kbps',size:'~45 MB'},
    reels:{format:'MP4 · H.264 (strict)',res:'1080 × 1920',fps:'30 fps (not 60)',bitrate:'10 Mbps VBR',audio:'AAC-LC · 48kHz · 192kbps',size:'~38 MB'},
    shorts:{format:'MP4 · H.264',res:'1080 × 1920',fps:'30 fps',bitrate:'12 Mbps VBR',audio:'AAC-LC · 48kHz · 256kbps',size:'~45 MB'},
    wechat:{format:'MP4 · H.264',res:'1080 × 1260 (6:7)',fps:'30 fps',bitrate:'8 Mbps VBR',audio:'AAC-LC · 44.1kHz · 192kbps',size:'~32 MB'},
    red:{format:'MP4 · H.264',res:'1080 × 1440 (3:4)',fps:'30 fps',bitrate:'8 Mbps VBR',audio:'AAC-LC · 48kHz · 192kbps',size:'~34 MB'},
  };
  const c=configs[preset];
  document.getElementById('esFormat').textContent=c.format;
  document.getElementById('esRes').textContent=c.res;
  document.getElementById('esFPS').textContent=c.fps;
  document.getElementById('esBitrate').textContent=c.bitrate;
  document.getElementById('esAudio').textContent=c.audio;
  document.getElementById('esSize').textContent=c.size;
}

function simulateExport(){
  const preset=document.querySelector('input[name="exportPreset"]:checked')?.value||'universal';
  const names={universal:'Visword_Export',tiktok:'Visword_TikTok',douyin:'Visword_Douyin',reels:'Visword_Reels',shorts:'Visword_Shorts',wechat:'Visword_WeChat',red:'Visword_XHS'};
  const btn=document.querySelector('#exportModal .btn-primary');
  btn.textContent='⏳ Rendering...';
  btn.disabled=true;
  setTimeout(()=>{
    btn.textContent='✅ Exported! (demo)';
    showToast(`${names[preset]}.mp4 exported successfully!`);
    setTimeout(()=>{btn.textContent='📥 Export Video';btn.disabled=false;},2000);
  },1500);
}

// ====== TOAST ======
function showToast(msg){
  const toast=document.getElementById('toast');
  if(!toast)return;
  toast.textContent=msg;toast.classList.add('show');
  clearTimeout(toast._t);toast._t=setTimeout(()=>toast.classList.remove('show'),2200);
}

// ====== KEYBOARD ======
document.addEventListener('keydown',function(e){
  if(e.key==='Escape')hideExportModal();
  if(e.key===' '&&document.getElementById('view-studio').classList.contains('active')){e.preventDefault();togglePreviewPlay();}
});

// ====== MODAL CLICK-OUT ======
document.addEventListener('click',function(e){if(e.target.id==='exportModal')hideExportModal();});

// ====== INIT ======
document.addEventListener('DOMContentLoaded',function(){showView('gallery');});
