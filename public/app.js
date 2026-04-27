// ============================================================
// Campus Connect+ — Frontend API Client
// All data now comes from the real backend (Express + MongoDB)
// ============================================================

const API = 'http://localhost:5000/api';

// ── Token helpers ─────────────────────────────────────────────
const Auth = {
  getToken: () => localStorage.getItem('cc_token'),
  getUser: () => JSON.parse(localStorage.getItem('cc_user') || 'null'),
  setSession: (token, user) => {
    localStorage.setItem('cc_token', token);
    localStorage.setItem('cc_user', JSON.stringify(user));
  },
  clearSession: () => {
    localStorage.removeItem('cc_token');
    localStorage.removeItem('cc_user');
  },
  isLoggedIn: () => !!localStorage.getItem('cc_token'),

  logout() {
    this.clearSession();
    window.location.href = '/';
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/login';
      return false;
    }
    return true;
  },

  redirectIfLoggedIn() {
    if (this.isLoggedIn()) {
      window.location.href = '/dashboard';
    }
  },

  // Refresh user from server and update localStorage
  async refreshUser() {
    try {
      const res = await apiFetch('/auth/me');
      if (res.success) {
        localStorage.setItem('cc_user', JSON.stringify(res.user));
        return res.user;
      }
    } catch (e) { /* silent */ }
    return this.getUser();
  }
};

// ── API fetch wrapper ─────────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const token = Auth.getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API}${endpoint}`, {
    headers,
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await res.json();
  return data;
}

// ── Static fallback data (if API not reachable) ───────────────
const EVENTS_FALLBACK = [
  { id: 'ev1', title: 'Machine Learning Workshop', category: 'AI/ML', club: 'AI Club', location: 'CDT 101', day: 'Tuesday', start: 14, end: 16, seats: 18, branch: 'CSE', icon: 'brain', color: 'blue' },
  { id: 'ev2', title: 'Tech Career Fair 2024', category: 'Career', club: 'Placement Cell', location: 'Main Auditorium', day: 'Friday', start: 10, end: 16, seats: 200, branch: 'All', icon: 'briefcase', color: 'emerald' },
  { id: 'ev3', title: 'UX Design Sprint', category: 'Design', club: 'Design Hub', location: 'AB3 Studio', day: 'Tuesday', start: 16.5, end: 18, seats: 12, branch: 'All', icon: 'pen-tool', color: 'purple' },
  { id: 'ev4', title: 'Music Club Open Jam', category: 'Music', club: 'Music Club', location: 'Open Air Theatre', day: 'Wednesday', start: 18, end: 19.5, seats: 25, branch: 'All', icon: 'music', color: 'pink' },
  { id: 'ev5', title: 'Senior Mentor Mixer', category: 'Mentorship', club: 'Student Success Cell', location: 'SJT 402', day: 'Thursday', start: 17, end: 18.5, seats: 30, branch: 'All', icon: 'users', color: 'amber' },
  { id: 'ev6', title: 'Competitive Coding Contest', category: 'Coding', club: 'CP Club', location: 'Lab Complex', day: 'Saturday', start: 11, end: 13, seats: 20, branch: 'CSE', icon: 'code-2', color: 'cyan' },
  { id: 'ev7', title: 'Robotics Demo Day', category: 'Tech', club: 'Robotics Club', location: 'Workshop B', day: 'Monday', start: 15, end: 17, seats: 40, branch: 'All', icon: 'cpu', color: 'indigo' },
  { id: 'ev8', title: 'Photography Walk', category: 'Arts', club: 'Photography Club', location: 'VIT Gardens', day: 'Sunday', start: 7, end: 9, seats: 15, branch: 'All', icon: 'camera', color: 'rose' },
];
const CLUBS_FALLBACK = [
  { id: 'cl1', name: 'AI/ML Club', category: 'Technical', members: 247, desc: 'Build real ML projects, compete in Kaggle, host weekly workshops.', icon: 'brain', color: 'blue', branch: 'CSE' },
  { id: 'cl2', name: 'Competitive Programming', category: 'Technical', members: 189, desc: 'Weekly contests, ICPC prep, and problem-solving sessions.', icon: 'code-2', color: 'cyan', branch: 'CSE' },
  { id: 'cl3', name: 'Music Club', category: 'Cultural', members: 156, desc: 'Open jam nights, band formation, and live performance practice.', icon: 'music', color: 'pink', branch: 'All' },
  { id: 'cl4', name: 'Design Hub', category: 'Creative', members: 133, desc: 'UI/UX, branding, product design sprints and portfolio reviews.', icon: 'pen-tool', color: 'purple', branch: 'All' },
  { id: 'cl5', name: 'Career Growth Cell', category: 'Professional', members: 201, desc: 'Resume reviews, mock interviews, placement preparation.', icon: 'briefcase', color: 'emerald', branch: 'All' },
  { id: 'cl6', name: 'Robotics Club', category: 'Technical', members: 98, desc: 'Build robots, compete in national contests, hands-on hardware.', icon: 'cpu', color: 'indigo', branch: 'All' },
  { id: 'cl7', name: 'Photography Club', category: 'Creative', members: 112, desc: 'Photo walks, editing workshops, exhibition planning.', icon: 'camera', color: 'rose', branch: 'All' },
  { id: 'cl8', name: 'Entrepreneurship Cell', category: 'Professional', members: 175, desc: 'Startup pitches, founder talks, VIT incubator access.', icon: 'rocket', color: 'amber', branch: 'All' },
];
const MENTORS_FALLBACK = [
  { id: 'mn1', name: 'Riya Sharma', branch: 'CSE', year: '4th Year', expertise: 'AI/ML Projects & Research', tags: ['AI/ML', 'Python', 'Research'], avatar: 'RS', avatarColor: 'from-blue-400 to-indigo-500', rating: 4.9, sessions: 34 },
  { id: 'mn2', name: 'Arjun Nair', branch: 'ECE', year: '4th Year', expertise: 'Placements & Resume Reviews', tags: ['Career', 'Interviews', 'VLSI'], avatar: 'AN', avatarColor: 'from-emerald-400 to-teal-500', rating: 4.8, sessions: 52 },
  { id: 'mn3', name: 'Nisha Gupta', branch: 'CSE', year: '3rd Year', expertise: 'Club Leadership & Event Management', tags: ['Leadership', 'Design', 'Events'], avatar: 'NG', avatarColor: 'from-purple-400 to-pink-500', rating: 4.7, sessions: 21 },
  { id: 'mn4', name: 'Kavin Raj', branch: 'CSE', year: '4th Year', expertise: 'Competitive Programming & Hackathons', tags: ['CP', 'Algorithms', 'Hackathons'], avatar: 'KR', avatarColor: 'from-amber-400 to-orange-500', rating: 4.9, sessions: 41 },
  { id: 'mn5', name: 'Priya Menon', branch: 'IT', year: '3rd Year', expertise: 'Web Dev & Open Source', tags: ['Web', 'React', 'OSS'], avatar: 'PM', avatarColor: 'from-cyan-400 to-blue-500', rating: 4.6, sessions: 18 },
  { id: 'mn6', name: 'Dev Sharma', branch: 'ECE', year: '4th Year', expertise: 'Core Electronics & Internships', tags: ['Electronics', 'Internships', 'PCB'], avatar: 'DS', avatarColor: 'from-rose-400 to-pink-500', rating: 4.7, sessions: 29 },
];

// Cache for API data
let EVENTS = [], CLUBS = [], MENTORS = [];

async function loadAppData() {
  try {
    const [evRes, clRes, mnRes] = await Promise.all([
      apiFetch('/events'),
      apiFetch('/clubs'),
      apiFetch('/mentors')
    ]);
    EVENTS = evRes.success ? evRes.events : EVENTS_FALLBACK;
    CLUBS  = clRes.success ? clRes.clubs   : CLUBS_FALLBACK;
    MENTORS = mnRes.success ? mnRes.mentors : MENTORS_FALLBACK;
  } catch {
    EVENTS = EVENTS_FALLBACK;
    CLUBS  = CLUBS_FALLBACK;
    MENTORS = MENTORS_FALLBACK;
  }
}

// ── UI Utilities ──────────────────────────────────────────────
const UI = {
  toast(msg, type = 'success') {
    const existing = document.getElementById('cc-toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.id = 'cc-toast';
    const colors = {
      success: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
      error:   'from-red-500/20 to-rose-500/20 border-red-500/30 text-red-300',
      info:    'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300'
    };
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    t.className = `fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r ${colors[type]} border backdrop-blur-xl text-sm font-medium shadow-2xl`;
    t.style.cssText = 'transform:translateY(20px);opacity:0;transition:all 0.3s ease';
    t.innerHTML = `<span class="font-bold text-base">${icons[type]}</span> ${msg}`;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.transform = 'translateY(0)'; t.style.opacity = '1'; });
    setTimeout(() => { t.style.transform = 'translateY(20px)'; t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
  },

  openModal(html) {
    let overlay = document.getElementById('cc-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'cc-modal-overlay';
      overlay.className = 'fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm';
      overlay.innerHTML = `<div id="cc-modal-box" class="relative bg-[#0F172A] border border-white/10 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl" onclick="event.stopPropagation()"><button onclick="UI.closeModal()" class="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg></button><div id="cc-modal-body" class="p-8"></div></div>`;
      overlay.addEventListener('click', () => this.closeModal());
      document.body.appendChild(overlay);
    }
    document.getElementById('cc-modal-body').innerHTML = html;
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  closeModal() {
    const overlay = document.getElementById('cc-modal-overlay');
    if (overlay) { overlay.classList.add('hidden'); document.body.style.overflow = ''; }
  },

  formatHour(h) {
    const mins = Math.round(h * 60), hr = Math.floor(mins / 60), m = mins % 60;
    return `${hr % 12 || 12}:${String(m).padStart(2, '0')} ${hr >= 12 ? 'PM' : 'AM'}`;
  },
};

// ── Shared Nav ────────────────────────────────────────────────
function renderNav(activePage) {
  const user = Auth.getUser();
  const links = [
    { href: '/dashboard', label: 'Dashboard', key: 'dashboard' },
    { href: '/events',    label: 'Events',    key: 'events'    },
    { href: '/clubs',     label: 'Clubs',     key: 'clubs'     },
    { href: '/mentors',   label: 'Mentors',   key: 'mentors'   },
  ];

  const navLinksHtml = links.map(l => `
    <a href="${l.href}" class="nav-link text-sm font-medium transition-colors ${activePage === l.key ? 'text-blue-400' : 'text-gray-300 hover:text-white'}">${l.label}</a>
  `).join('');

  const mobileLinksHtml = links.map(l => `
    <a href="${l.href}" class="block text-base font-medium transition-colors py-1 ${activePage === l.key ? 'text-blue-400' : 'text-gray-300 hover:text-white'}">${l.label}</a>
  `).join('');

  const userHtml = user ? `
    <button onclick="openProfileModal()" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
      <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white">${user.name.charAt(0).toUpperCase()}</div>
      <span class="text-sm font-medium text-white hidden md:block">${user.name.split(' ')[0]}</span>
    </button>
    <button onclick="Auth.logout()" class="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign out</button>
  ` : `
    <a href="/login"  class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign in</a>
    <a href="/signup" class="btn-primary px-5 py-2.5 text-sm font-semibold">Get Started</a>
  `;

  const nav = document.getElementById('main-nav');
  if (!nav) return;
  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <a href="${user ? '/dashboard' : '/'}" class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <i data-lucide="graduation-cap" class="w-5 h-5 text-white"></i>
          </div>
          <span class="text-xl font-bold">Campus Connect<span class="text-blue-400">+</span></span>
        </a>
        <div class="hidden md:flex items-center gap-8">${navLinksHtml}</div>
        <div class="hidden md:flex items-center gap-3">${userHtml}</div>
        <button id="mob-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
          <i data-lucide="menu" class="w-6 h-6 text-gray-300"></i>
        </button>
      </div>
    </div>
    <div id="mob-menu" class="hidden md:hidden bg-[#070D1B]/98 backdrop-blur-xl border-t border-white/5">
      <div class="px-4 py-5 space-y-2">
        ${mobileLinksHtml}
        <div class="pt-3 border-t border-white/10 flex flex-col gap-3 mt-2">
          ${user ? `
            <span class="text-sm text-gray-400">Signed in as <strong class="text-white">${user.name}</strong></span>
            <button onclick="openProfileModal()" class="text-left text-sm text-blue-400">Edit Profile</button>
            <button onclick="Auth.logout()" class="text-left text-sm font-medium text-red-400">Sign out</button>
          ` : `
            <a href="/login"  class="text-base font-medium text-gray-300">Sign in</a>
            <a href="/signup" class="btn-primary px-5 py-3 text-base font-semibold text-center block">Get Started</a>
          `}
        </div>
      </div>
    </div>
  `;

  const btn = document.getElementById('mob-menu-btn');
  const menu = document.getElementById('mob-menu');
  if (btn && menu) btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  if (typeof lucide !== 'undefined') lucide.createIcons();

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ── Profile Modal ─────────────────────────────────────────────
function openProfileModal() {
  const user = Auth.getUser();
  if (!user) return;
  UI.openModal(`
    <h2 class="text-xl font-bold mb-1">Edit Profile</h2>
    <p class="text-gray-400 text-sm mb-5">Update your info for better recommendations.</p>
    <form id="profile-edit-form" class="space-y-4">
      <label class="block text-sm text-gray-300">Full Name<input name="name" class="form-input mt-1.5" value="${user.name}"></label>
      <div class="grid grid-cols-2 gap-3">
        <label class="block text-sm text-gray-300">Branch
          <select name="branch" class="form-input mt-1.5">
            ${['CSE','ECE','IT','Mech','Civil','EEE'].map(b => `<option value="${b}"${user.branch===b?' selected':''}>${b}</option>`).join('')}
          </select>
        </label>
        <label class="block text-sm text-gray-300">Year
          <select name="year" class="form-input mt-1.5">
            ${['1','2','3','4'].map(y => `<option value="${y}"${user.year===y?' selected':''}>${y}${['st','nd','rd','th'][y-1]} Year</option>`).join('')}
          </select>
        </label>
      </div>
      <label class="block text-sm text-gray-300">Interests (comma separated)
        <input name="interests" class="form-input mt-1.5" value="${(user.interests||[]).join(', ')}">
      </label>
      <button type="submit" class="btn-primary w-full py-3 text-sm font-semibold">Save Changes</button>
    </form>
  `);

  setTimeout(() => {
    const form = document.getElementById('profile-edit-form');
    if (!form) return;
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const d = new FormData(this);
      const interests = String(d.get('interests')||'').split(',').map(s=>s.trim()).filter(Boolean);
      const btn = this.querySelector('button[type=submit]');
      btn.textContent = 'Saving...'; btn.disabled = true;
      const res = await apiFetch('/user/profile', {
        method: 'PUT',
        body: { name: d.get('name'), branch: d.get('branch'), year: d.get('year'), interests }
      });
      if (res.success) {
        localStorage.setItem('cc_user', JSON.stringify(res.user));
        UI.closeModal();
        UI.toast('Profile updated!');
        setTimeout(() => location.reload(), 500);
      } else {
        UI.toast(res.message || 'Update failed', 'error');
        btn.textContent = 'Save Changes'; btn.disabled = false;
      }
    });
  }, 100);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') UI.closeModal(); });
