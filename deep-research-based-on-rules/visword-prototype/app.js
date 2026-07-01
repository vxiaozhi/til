// === View Navigation ===
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + name);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update nav active state
  document.querySelectorAll('.nav-links > a[onclick]').forEach(a => {
    a.style.color = '';
  });

  // Hide mobile menu if open
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('mobile-open');
}

// === Authentication Toggle (Demo) ===
let isLoggedIn = false;
function toggleAuth() {
  isLoggedIn = !isLoggedIn;
  const loginBtn = document.getElementById('navLogin');
  const signupBtn = document.getElementById('navSignup');
  const userBadge = document.getElementById('userBadge');

  if (isLoggedIn) {
    if (loginBtn) loginBtn.classList.add('hidden');
    if (signupBtn) signupBtn.classList.add('hidden');
    if (userBadge) userBadge.classList.remove('hidden');
    showToast('Signed in as demo@visword.com (Pro)');
  } else {
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (signupBtn) signupBtn.classList.remove('hidden');
    if (userBadge) userBadge.classList.add('hidden');
    showToast('Signed out');
  }
}

// === Demo Flow: Start Generation ===
function startDemo(type) {
  showView('processing');
  const input = document.getElementById('heroInput');
  if (type && type !== 'try' && input) {
    // Set example text based on type
    const examples = {
      'product-review': 'iPhone 16 Pro Review: The Best Gets Better...',
      'research-paper': 'Attention Is All You Need — Transformer Architecture...',
      'news': 'Global Climate Summit Reaches Historic Agreement...',
    };
    input.value = examples[type] || '';
  }

  // Simulate processing steps
  const steps = ['pstep1','pstep2','pstep3','pstep4','pstep5'];
  let currentStep = 0;

  // Reset all steps
  steps.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('active','done'); }
  });

  function advanceStep() {
    if (currentStep > 0) {
      const prev = document.getElementById(steps[currentStep - 1]);
      if (prev) { prev.classList.remove('active'); prev.classList.add('done'); }
    }
    if (currentStep < steps.length) {
      const curr = document.getElementById(steps[currentStep]);
      if (curr) curr.classList.add('active');
      currentStep++;
      if (currentStep < steps.length) {
        setTimeout(advanceStep, 800 + Math.random() * 1200);
      } else {
        // All steps done
        setTimeout(() => {
          const last = document.getElementById(steps[steps.length - 1]);
          if (last) { last.classList.remove('active'); last.classList.add('done'); }
          document.getElementById('processingHint').textContent = 'Done! Loading results...';
          setTimeout(() => showView('result'), 600);
        }, 1000);
      }
    }
  }

  setTimeout(advanceStep, 400);
}

// === Result Tab Switching ===
function switchTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
  const tabBtn = document.querySelector(`.rtab[onclick*="${tab}"]`);
  if (tabBtn) tabBtn.classList.add('active');

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const content = document.getElementById('tab-' + tab);
  if (content) content.classList.add('active');
}

// === Mindmap Color Theme ===
function switchMindmapColor(dot) {
  document.querySelectorAll('#tab-mindmap .color-dot').forEach(d => d.classList.remove('active'));
  dot.classList.add('active');
  // Demo: would recolor the SVG in production
  showToast('Color theme updated (demo)');
}

// === Info Card Size ===
function switchCardSize(size) {
  document.querySelectorAll('#tab-infocard .tool-btn').forEach(b => {
    if (b.onclick && b.onclick.toString().includes('switchCardSize')) b.classList.remove('active');
  });
  const btn = document.querySelector(`#tab-infocard .tool-btn[onclick*="${size}"]`);
  if (btn) btn.classList.add('active');

  const render = document.getElementById('infocardRender');
  if (render) {
    render.className = 'infocard-render';
    if (size !== 'instagram') render.classList.add('size-' + size);
  }
}

// === Info Card Theme ===
function switchCardTheme(theme) {
  document.querySelectorAll('#tab-infocard .color-dot').forEach(d => d.classList.remove('active'));
  const dot = document.querySelector(`#tab-infocard .color-dot[onclick*="${theme}"]`);
  if (dot) dot.classList.add('active');

  const inner = document.querySelector('.ic-inner');
  if (!inner) return;
  const themes = {
    indigo: 'linear-gradient(155deg,#eef2ff,#e0e7ff)',
    green: 'linear-gradient(155deg,#ecfdf5,#d1fae5)',
    amber: 'linear-gradient(155deg,#fffbeb,#fef3c7)',
    dark: 'linear-gradient(155deg,#1e293b,#334155)',
  };
  inner.style.background = themes[theme] || themes.indigo;

  // Adjust text color for dark theme
  const isDark = theme === 'dark';
  const title = inner.querySelector('.ic-title');
  const summary = inner.querySelector('.ic-summary');
  const label = inner.querySelector('.ic-label');
  if (title) title.style.color = isDark ? '#f1f5f9' : '#1e293b';
  if (summary) summary.style.color = isDark ? '#94a3b8' : '#64748b';
  if (label) label.style.color = isDark ? '#818cf8' : '#6366f1';
  inner.querySelectorAll('.ic-point p').forEach(p => {
    p.style.color = isDark ? '#94a3b8' : '#64748b';
  });
  inner.querySelectorAll('.ic-point strong').forEach(s => {
    s.style.color = isDark ? '#e2e8f0' : '#1e293b';
  });
}

// === Info Card Font ===
function switchCardFont(font) {
  const inner = document.querySelector('.ic-inner');
  if (inner) inner.style.fontFamily = font + ', sans-serif';
}

// === Word Cloud Shape ===
function switchCloudShape(shape) {
  document.querySelectorAll('#tab-wordcloud .tool-btn').forEach(b => {
    if (b.onclick && b.onclick.toString().includes('switchCloudShape')) b.classList.remove('active');
  });
  const btn = document.querySelector(`#tab-wordcloud .tool-btn[onclick*="${shape}"]`);
  if (btn) btn.classList.add('active');

  const canvas = document.getElementById('wordcloudCanvas');
  if (!canvas) return;
  const shapes = {
    circle: '50%',
    rect: '8px',
    heart: '50% 50% 0 50%', // approximation
    star: '20%',
  };
  canvas.style.borderRadius = shapes[shape] || '50%';
  if (shape === 'heart') {
    canvas.style.clipPath = 'polygon(50% 15%, 64% 0, 80% 10%, 88% 28%, 84% 50%, 50% 85%, 16% 50%, 12% 28%, 20% 10%, 36% 0)';
  } else {
    canvas.style.clipPath = '';
  }
}

// === Word Cloud Theme ===
function switchCloudTheme(theme) {
  document.querySelectorAll('#tab-wordcloud .color-dot').forEach(d => d.classList.remove('active'));
  const dot = document.querySelector(`#tab-wordcloud .color-dot[onclick*="${theme}"]`);
  if (dot) dot.classList.add('active');
  showToast('Color theme updated (demo)');
}

// === Share Modal ===
function showShareModal() {
  document.getElementById('shareModal').classList.remove('hidden');
}
function hideShareModal() {
  document.getElementById('shareModal').classList.add('hidden');
}
function copyShareLink() {
  const input = document.querySelector('.share-link-input');
  if (input) {
    input.select();
    document.execCommand('copy');
    showToast('Link copied to clipboard!');
  }
}

// === Export Menu ===
function toggleExportMenu() {
  const menu = document.getElementById('exportMenu');
  if (menu) menu.classList.toggle('hidden');
}

// === Mobile Menu ===
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('mobile-open');
}

// === Toast ===
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// === Keyboard Shortcuts ===
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    hideShareModal();
    const exportMenu = document.getElementById('exportMenu');
    if (exportMenu) exportMenu.classList.add('hidden');
  }
  // Tab switching in result view
  if (document.getElementById('view-result').classList.contains('active')) {
    if (e.key === '1') switchTab('mindmap');
    if (e.key === '2') switchTab('infocard');
    if (e.key === '3') switchTab('wordcloud');
  }
});

// === Close modals on overlay click ===
document.addEventListener('click', function(e) {
  if (e.target.id === 'shareModal') hideShareModal();
});

// === Initialize ===
document.addEventListener('DOMContentLoaded', function() {
  // Landing page is the default view
  showView('landing');

  // Focus input on load
  setTimeout(() => {
    const input = document.getElementById('heroInput');
    if (input) input.focus();
  }, 500);
});
