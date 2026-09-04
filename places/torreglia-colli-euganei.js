(() => {
  const tabButtons = [...document.querySelectorAll('[data-route-tab]')];
  const panels = [...document.querySelectorAll('[data-route-panel]')];

  function selectRoute(id) {
    tabButtons.forEach((button) => {
      const selected = button.dataset.routeTab === id;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.routePanel !== id;
    });
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectRoute(button.dataset.routeTab));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) return;
      event.preventDefault();
      const increment = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const next = tabButtons[(index + increment + tabButtons.length) % tabButtons.length];
      next.focus();
      selectRoute(next.dataset.routeTab);
    });
  });

  const navLinks = [...document.querySelectorAll('.chapter-nav a')];
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-current', link.getAttribute('href') === `#${visible.target.id}`);
      });
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .25, .6] });
    observedSections.forEach((section) => observer.observe(section));
  }
})();
