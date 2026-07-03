// === Feed Card Data ===
const feedCards = {
  all: [
    {topic:'ai',tag:'🤖 AI',imgClass:'ai',title:'GPT-5.5 Launch: OpenAI Sets New Benchmarks Across Reasoning, Coding, and Multimodal Tasks',summary:'OpenAI released GPT-5.5 today, achieving SOTA on MMLU-Pro (92.1%) and HumanEval (97.3%). The model introduces a 2M context window and "deep think" mode.',points:[{icon:'🏆',title:'Benchmark Dominance',desc:'GPT-5.5 tops MMLU-Pro, MATH, HumanEval, and GPQA Diamond across all major benchmarks.'},{icon:'🧠',title:'2M Context Window',desc:'Process entire codebases, full-length books, and multi-hour transcripts in a single prompt.'},{icon:'💡',title:'Deep Think Mode',desc:'30-minute inference-time reasoning achieves 89% on FrontierMath.'},{icon:'💰',title:'API Pricing',desc:'$15/M input, $60/M output. 40% cheaper than GPT-5.0 at launch.'}],source:'OpenAI Blog, The Verge, Ars Technica'},
    {topic:'ai',tag:'🤖 AI',imgClass:'ai',title:'Claude Opus 4.7 Adds Computer Use: AI That Can Navigate Your Desktop',summary:'Anthropic shipped a major update enabling Claude to see screens, move cursors, click buttons, and type — turning the AI into a desktop agent that works across any application.',points:[{icon:'🖥️',title:'Desktop Agent','desc':'Claude can now see screens, move cursors, click, and type across any desktop application.'},{icon:'🔒',title:'Safety Sandbox','desc':'All computer use actions run in a sandboxed environment with human-in-the-loop approval.'},{icon:'📈',title:'SWE-Bench Score','desc':'Claude Opus 4.7 + Computer Use achieves 85.2% on SWE-Bench Verified, a new record.'}],source:'Anthropic Blog, TechCrunch'},
    {topic:'tech',tag:'💻 Tech',imgClass:'tech',title:'IBM Quantum Hits 1000+ Qubit Milestone with Error-Corrected Processor',summary:'IBM announced Heron-II, the first quantum processor to exceed 1000 logical qubits with full error correction, marking a major step toward practical quantum computing.',points:[{icon:'⚛️',title:'1000+ Logical Qubits','desc':'First processor to cross the 1000 logical qubit threshold with full error correction.'},{icon:'🔬',title:'Error Rate Breakthrough','desc':'Logical error rate of 0.001% per gate — a 100x improvement over previous generations.'},{icon:'🏭',title:'Commercial Timeline','desc':'IBM projects first commercially useful quantum applications by 2028-2030.'}],source:'IBM Research Blog, Nature, Wired'},
    {topic:'tech',tag:'💻 Tech',imgClass:'tech',title:'Apple Vision Pro 2 Leak: Lighter, Cheaper, and AI-Native',summary:'Supply chain reports reveal Apple is preparing a significantly lighter Vision Pro 2 with on-device Apple Intelligence and a price target under $2,000.',points:[{icon:'🥽',title:'40% Lighter','desc':'New magnesium alloy frame reduces weight from 650g to under 400g.'},{icon:'🧠',title:'On-Device AI','desc':'M5 chip with dedicated Neural Engine enables real-time spatial AI processing.'},{icon:'💵',title:'Price Target','desc':'Multiple SKUs planned, with the base model targeting $1,799-$1,999.'}],source:'Bloomberg, Ming-Chi Kuo, The Information'},
    {topic:'startup',tag:'🚀 Startups',imgClass:'startup',title:'YC W26 Batch: Record Number of AI-First Companies, 60% Building Agents',summary:'Y Combinator\'s Winter 2026 batch features 287 startups, with 172 (60%) categorized as AI-first and a striking 103 building autonomous AI agent products.',points:[{icon:'📊',title:'By the Numbers','desc':'287 total startups, 172 AI-first (60%), 103 agent companies (36% of total).'},{icon:'🌍',title:'Global Distribution','desc':'42% from US, 18% from India, 12% from Europe, 28% from rest of world.'},{icon:'💡',title:'Hot Categories','desc':'Vertical AI agents, AI dev tools, biotech AI, and robotics lead the batch.'}],source:'Y Combinator Blog, TechCrunch'},
    {topic:'startup',tag:'🚀 Startups',imgClass:'startup',title:'Cursor Raises $400M Series C at $4.5B Valuation',summary:'The AI code editor startup quadrupled its valuation in 8 months, reporting $80M ARR and 2 million daily active developers using its agentic coding features.',points:[{icon:'💰',title:'The Round','desc':'$400M led by Thrive Capital and a16z at $4.5B post-money valuation.'},{icon:'📈',title:'Growth Metrics','desc':'$80M ARR (4x in 8 months), 2M DAU, used by 40% of Fortune 500 engineering teams.'},{icon:'🔮',title:'What\'s Next','desc':'Cursor is building a fully autonomous "AI software engineer" capable of end-to-end PR execution.'}],source:'The Information, Forbes, Cursor Blog'},
    {topic:'science',tag:'🔬 Science',imgClass:'science',title:'CRISPR 3.0: New Gene Editing Technique Achieves 99.7% Precision',summary:'Researchers at the Broad Institute unveiled a third-generation CRISPR system that dramatically reduces off-target effects while expanding the range of editable genetic sequences.',points:[{icon:'🧬',title:'Precision Leap','desc':'99.7% on-target efficiency vs 85-95% for CRISPR 2.0. Off-target effects reduced by 98%.'},{icon:'🏥',title:'Clinical Impact','desc':'First trials targeting sickle cell disease and beta-thalassemia show 100% response rate in Phase I.'},{icon:'⚖️',title:'Ethics Framework','desc':'Broad Institute releases open ethical guidelines alongside the technology publication.'}],source:'Nature Biotechnology, Broad Institute, STAT News'},
    {topic:'science',tag:'🔬 Science',imgClass:'science',title:'Fusion Energy Milestone: JET Reactor Sustains Plasma for 8 Minutes',summary:'The Joint European Torus achieved a record 8-minute sustained fusion plasma with net energy gain of Q=2.3, surpassing the previous record by 3x.',points:[{icon:'⚡',title:'Q=2.3 Energy Gain','desc':'Sustained net energy output for 480 seconds — 3x the previous 2024 record.'},{icon:'🏗️',title:'ITER Path','desc':'Data directly validates ITER reactor design parameters. Commercial pilot by 2035 now "plausible."'},{icon:'🌍',title:'Climate Implications','desc':'Fusion at commercial scale could provide carbon-free baseload power for 10B+ people.'}],source:'JET/UKAEA, Science, BBC News'},
    {topic:'business',tag:'📊 Business',imgClass:'business',title:'Fed Holds Rates at 4.25%, Signals Two Cuts Before Year-End 2026',summary:'The Federal Reserve maintained the federal funds rate at 4.25% but revised its dot plot to indicate two quarter-point cuts by December 2026, citing cooling inflation.',points:[{icon:'🏦',title:'Rate Decision','desc':'Fed funds rate held at 4.25% for the third consecutive meeting.'},{icon:'📉',title:'Inflation Outlook','desc':'Core PCE inflation projected to reach 2.3% by Q4 2026, down from 2.8%.'},{icon:'📊',title:'Market Reaction','desc':'S&P 500 rose 1.8%, 10-year Treasury yield fell to 3.65% on the revised outlook.'}],source:'Federal Reserve, Bloomberg, WSJ'},
  ]
};
// Ensure 'all' topic exists; copy all cards to it
(function(){const allCards=[];for(const k of Object.keys(feedCards)){feedCards[k].forEach(c=>{const existing=allCards.find(x=>x.title===c.title);if(!existing)allCards.push(c);});}feedCards.all=allCards;})();

// Map topic names to keys
const topicMap = {'all':'all','ai':'ai','tech':'tech','startup':'startup','science':'science','business':'business'};

// === View Navigation ===
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + name);
  if (target) target.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});

  // Populate feed on visit
  if (name === 'feed') renderFeed('all');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) { el.scrollIntoView({behavior:'smooth'}); }
}

// === Auth Toggle ===
let isLoggedIn = false;
function toggleAuth() {
  isLoggedIn = !isLoggedIn;
  const btn = document.getElementById('navAuthBtn');
  if (btn) btn.textContent = isLoggedIn ? 'My Account' : 'Sign In';
  showToast(isLoggedIn ? 'Signed in (demo)' : 'Signed out');
}

// === Feed Rendering ===
function renderFeed(topicKey) {
  const grid = document.getElementById('feedGrid');
  if (!grid) return;
  const cards = feedCards[topicKey] || feedCards.all;
  grid.innerHTML = cards.map((c,i) => `
    <div class="feed-card" onclick="openCard('${topicKey}',${i})">
      <div class="fc-image ${c.imgClass}">${c.tag.split(' ')[0]}</div>
      <div class="fc-body">
        <span class="fc-tag" style="display:none">${c.tag}</span>
        <h3>${c.title}</h3>
        <p>${c.summary}</p>
      </div>
      <div class="fc-meta">
        <span>📰 ${c.source.split(',')[0]}</span>
        <span>🕐 ${Math.floor(Math.random()*6)+1}h ago</span>
      </div>
    </div>
  `).join('');
}

function switchFeedTopic(el, key) {
  document.querySelectorAll('.feed-topic').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderFeed(topicMap[key] || 'all');
}

// === Card Detail ===
let currentCard = null;
let currentTopicKey = 'all';
let isEditMode = false;

function openCard(topicKey, index) {
  currentTopicKey = topicKey;
  const cards = feedCards[topicKey] || feedCards.all;
  currentCard = cards[index];
  if (!currentCard) return;
  isEditMode = false;
  renderCardDetail(currentCard);
  showView('detail');
}

function renderCardDetail(card) {
  document.getElementById('crTag').textContent = card.tag;
  document.getElementById('crTitle').textContent = card.title;
  document.getElementById('crSummary').textContent = card.summary;
  const ptsContainer = document.getElementById('crPoints');
  ptsContainer.innerHTML = (card.points||[]).map(p =>
    `<div class="crp"><span>${p.icon}</span><div><strong>${p.title}</strong>${p.desc}</div></div>`
  ).join('');
  document.querySelector('.cr-source').innerHTML = `Sources: ${card.source} · <span style="color:var(--tl)">AI-generated</span> · Made with <strong>Visword</strong>`;

  // Sync editor fields
  document.getElementById('editTitle').value = card.title;
  document.getElementById('editSummary').value = card.summary;
  document.getElementById('editTag').value = card.tag;
  const editPoints = document.getElementById('editPoints');
  editPoints.innerHTML = (card.points||[]).map(p =>
    `<div class="edit-point"><span class="ep-icon">${p.icon}</span><input value="${p.title}" class="ep-title" oninput="syncEditToPreview()"><input value="${p.desc}" class="ep-desc" oninput="syncEditToPreview()"><button class="ep-remove" onclick="this.parentElement.remove();syncEditToPreview()">×</button></div>`
  ).join('');

  // Reset editor state
  const editor = document.getElementById('detailEditor');
  if (editor && isEditMode) editor.classList.remove('hidden');
  if (editor && !isEditMode) editor.classList.add('hidden');
  document.getElementById('editToggleBtn').textContent = '✏️ Edit Card';

  // Reset card size and theme
  document.getElementById('cardRender').className = 'card-render';
  document.querySelectorAll('.size-options .btn').forEach((b,i) => b.classList.toggle('active', i===0));
  document.querySelectorAll('.theme-dot').forEach((d,i) => d.classList.toggle('active', i===0));
  document.getElementById('cardRender').style.background = '';
  document.getElementById('cardRender').style.color = '';
}

// === Edit Mode ===
function toggleEditMode() {
  isEditMode = !isEditMode;
  const editor = document.getElementById('detailEditor');
  const toggleBtn = document.getElementById('editToggleBtn');
  if (isEditMode) {
    editor.classList.remove('hidden');
    toggleBtn.textContent = '✓ Done Editing';
    toggleBtn.classList.add('btn-primary');
    toggleBtn.classList.remove('btn-outline');
    // Re-sync editor from preview
    if (currentCard) {
      document.getElementById('editTitle').value = document.getElementById('crTitle').textContent;
      document.getElementById('editSummary').value = document.getElementById('crSummary').textContent;
    }
  } else {
    editor.classList.add('hidden');
    toggleBtn.textContent = '✏️ Edit Card';
    toggleBtn.classList.remove('btn-primary');
    toggleBtn.classList.add('btn-outline');
    syncEditToPreview();
  }
}

function syncEditToPreview() {
  const title = document.getElementById('editTitle').value;
  const summary = document.getElementById('editSummary').value;
  const tag = document.getElementById('editTag').value;
  if (title) document.getElementById('crTitle').textContent = title;
  if (summary) document.getElementById('crSummary').textContent = summary;
  if (tag) document.getElementById('crTag').textContent = tag;

  // Sync points from editor to preview
  const editPoints = document.querySelectorAll('#editPoints .edit-point');
  const ptsContainer = document.getElementById('crPoints');
  const newPts = [];
  editPoints.forEach(ep => {
    const icon = ep.querySelector('.ep-icon').textContent;
    const titleEl = ep.querySelector('.ep-title');
    const descEl = ep.querySelector('.ep-desc');
    if (titleEl && descEl) {
      newPts.push({icon, title: titleEl.value, desc: descEl.value});
    }
  });
  if (newPts.length > 0) {
    ptsContainer.innerHTML = newPts.map(p =>
      `<div class="crp"><span>${p.icon}</span><div><strong>${p.title}</strong>${p.desc}</div></div>`
    ).join('');
  }
}

function addEditPoint() {
  const container = document.getElementById('editPoints');
  const div = document.createElement('div');
  div.className = 'edit-point';
  div.innerHTML = `<span class="ep-icon">📌</span><input value="New Point" class="ep-title" oninput="syncEditToPreview()"><input value="Description" class="ep-desc" oninput="syncEditToPreview()"><button class="ep-remove" onclick="this.parentElement.remove();syncEditToPreview()">×</button>`;
  container.appendChild(div);
  syncEditToPreview();
}

function resetEdits() {
  if (currentCard) renderCardDetail(currentCard);
  if (isEditMode) {
    document.getElementById('editTitle').value = currentCard.title;
    document.getElementById('editSummary').value = currentCard.summary;
    document.getElementById('editTag').value = currentCard.tag;
  }
  showToast('Reset to AI original');
}

// === Card Theme & Size ===
function switchCardTheme(theme, dot) {
  document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
  if (dot) dot.classList.add('active');
  const render = document.getElementById('cardRender');
  const themes = {
    indigo:'linear-gradient(160deg,#1a1a2e,#16213e)',
    green:'linear-gradient(160deg,#1a2e1a,#0d3320)',
    amber:'linear-gradient(160deg,#2e241a,#33200d)',
    dark:'linear-gradient(160deg,#18181b,#27272a)',
    rose:'linear-gradient(160deg,#2e1a24,#33101a)'
  };
  render.style.background = themes[theme] || themes.indigo;
}

function switchCardSize(size, btn) {
  document.querySelectorAll('.size-options .btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const render = document.getElementById('cardRender');
  render.className = 'card-render';
  if (size !== 'feed') render.classList.add('size-' + size);
}

// === Export ===
function exportCard() {
  const render = document.getElementById('cardRender');
  if (!render) return;
  // Visual feedback
  render.style.transform = 'scale(0.97)';
  setTimeout(() => { render.style.transform = ''; }, 200);
  showToast('Card exported as PNG (demo)');
}

// === Share Modal ===
function showShareModal() { document.getElementById('shareModal').classList.remove('hidden'); }
function hideShareModal() { document.getElementById('shareModal').classList.add('hidden'); }
document.addEventListener('click', function(e) { if (e.target.id === 'shareModal') hideShareModal(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') hideShareModal(); });

// === Toast ===
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

// === Init ===
document.addEventListener('DOMContentLoaded', function() {
  showView('home');
});
