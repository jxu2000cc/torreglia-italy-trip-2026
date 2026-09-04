(() => {
  const filters = Array.from(document.querySelectorAll('.filter'));
  const cards = Array.from(document.querySelectorAll('.listing'));
  const count = document.getElementById('visibleCount');
  const restaurantSection = document.getElementById('restaurants');

  const applyFilter = (filter) => {
    filters.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      const show = filter === 'all' || categories.includes(filter);
      card.hidden = !show;
      if (show) visible += 1;
    });
    restaurantSection.hidden = !['all', 'restaurant', 'cafe'].includes(filter);
    count.textContent = `${visible} 个选择`;
  };

  filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  applyFilter('all');
})();
