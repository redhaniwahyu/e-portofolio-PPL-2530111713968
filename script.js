// JavaScript Interactivity for E-Portofolio PPL PPG Informatika
// Author: Akhmad Wahyu Redhani, S.Kom.

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initTabs();
  initDocumentFilters();
  initModals();
  initStatCounters();
  initSmoothScroll();
  initThemeToggle();
});

// 1. Mobile Navigation Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isExpanded = !mobileMenu.classList.contains('hidden');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 2. Generic Tab Switcher
function initTabs() {
  // Observasi Tabs
  setupTabGroup('obsTabBtn', 'obsTabContent');
  // Modul Tabs
  setupTabGroup('modulTabBtn', 'modulTabContent');
  // Reflection Tabs
  setupTabGroup('refTabBtn', 'refTabContent');
}

function setupTabGroup(btnClass, contentClass) {
  const buttons = document.querySelectorAll(`.${btnClass}`);
  const contents = document.querySelectorAll(`.${contentClass}`);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button styles
      buttons.forEach(b => {
        b.classList.remove('active', 'bg-blue-600', 'text-white');
        b.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-slate-800');
      });
      btn.classList.add('active', 'bg-blue-600', 'text-white');
      btn.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-slate-800');

      // Show target content
      contents.forEach(content => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });
}

// 3. Document Repositories Filter
function initDocumentFilters() {
  const filterBtns = document.querySelectorAll('.doc-filter-btn');
  const docCards = document.querySelectorAll('.doc-item-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-800', 'text-slate-400', 'hover:bg-slate-700', 'hover:text-white');
      });
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-400', 'hover:bg-slate-700');

      docCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 4. Modal Handlers
function initModals() {
  // Open buttons
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  // Close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal.id);
    });
  });

  // Close on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });


}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.classList.remove('pointer-events-none', 'opacity-0');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.classList.add('pointer-events-none', 'opacity-0');
  document.body.style.overflow = '';
}

// 5. Toast Notification System
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-slate-800 text-white border border-blue-500/40 shadow-2xl transition-all duration-300 transform translate-y-10 opacity-0 flex items-center gap-3';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm">ℹ</span>
    <span class="text-sm font-medium">${message}</span>
  `;
  toast.classList.remove('translate-y-10', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 3000);
}

// 6. Stat Counters Animation
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const duration = 1500;
          const step = Math.max(1, Math.floor(target / 40));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = current;
            }
          }, duration / 40);
        });
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// 7. Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}


// 8. Dark Mode / Light Mode Theme Toggle
function initThemeToggle() {
  const desktopBtn = document.getElementById('themeToggleBtn');
  const mobileBtn = document.getElementById('mobileThemeToggleBtn');

  function updateThemeUI(theme) {
    const isDark = (theme === 'dark');

    // Desktop elements
    const sunDesktop = document.getElementById('themeIconSun');
    const moonDesktop = document.getElementById('themeIconMoon');
    const textDesktop = document.getElementById('themeTextDesktop');

    if (sunDesktop && moonDesktop) {
      if (isDark) {
        sunDesktop.classList.remove('hidden');
        moonDesktop.classList.add('hidden');
      } else {
        sunDesktop.classList.add('hidden');
        moonDesktop.classList.remove('hidden');
      }
    }
    if (textDesktop) {
      textDesktop.textContent = isDark ? 'Mode Terang' : 'Mode Gelap';
    }

    // Mobile elements
    const sunMobile = document.getElementById('mobileThemeIconSun');
    const moonMobile = document.getElementById('mobileThemeIconMoon');
    const labelMobile = document.getElementById('mobileThemeLabel');
    const badgeMobile = document.getElementById('mobileThemeBadge');

    if (sunMobile && moonMobile) {
      if (isDark) {
        sunMobile.classList.remove('hidden');
        moonMobile.classList.add('hidden');
      } else {
        sunMobile.classList.add('hidden');
        moonMobile.classList.remove('hidden');
      }
    }
    if (labelMobile) {
      labelMobile.textContent = isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap';
    }
    if (badgeMobile) {
      badgeMobile.textContent = isDark ? 'Gelap' : 'Terang';
      badgeMobile.className = isDark
        ? 'text-xs px-2.5 py-1 rounded-full font-medium bg-slate-700/80 text-slate-300 border border-slate-600'
        : 'text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-800 border border-blue-200';
    }
  }

  function toggleTheme() {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newTheme = isCurrentlyDark ? 'light' : 'dark';

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    try {
      localStorage.setItem('portfolio_theme', newTheme);
    } catch (e) {}

    updateThemeUI(newTheme);
    showToast(newTheme === 'dark' ? 'Mode Gelap aktif' : 'Mode Terang aktif');
  }

  if (desktopBtn) {
    desktopBtn.addEventListener('click', toggleTheme);
  }
  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleTheme);
  }

  // Initial sync with DOM state
  const initialTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  updateThemeUI(initialTheme);
}
