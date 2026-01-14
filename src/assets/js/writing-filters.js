// Article Filter & Search Functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');
    const articleGrid = document.getElementById('article-grid');
    const sortSelect = document.getElementById('article-sort');
    const searchInput = document.getElementById('article-search');
    let activeFilter = 'all';

    function sortArticles() {
        if (!articleGrid || !articleCards.length) return;
        const sortValue = sortSelect.value;
        const articles = Array.from(articleCards);

        articles.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return sortValue === 'newest' ? dateB - dateA : dateA - dateB;
        });

        articles.forEach(article => articleGrid.appendChild(article));
    }

    function filterArticles() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        articleCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();

            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = searchTerm === '' || title.includes(searchTerm) || excerpt.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                card.style.display = 'none';
            }
        });

        // Show/Hide Empty State
        const visibleCards = Array.from(articleCards).filter(card => card.style.display === 'block');
        const emptyState = document.getElementById('no-results');
        if (visibleCards.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            if (articleGrid) articleGrid.style.display = 'none';
        } else {
            if (emptyState) emptyState.style.display = 'none';
            if (articleGrid) articleGrid.style.display = 'grid';
        }
    }

    window.resetFilters = function () {
        if (searchInput) searchInput.value = '';
        if (filterBtns[0]) filterBtns[0].click();
        filterArticles();
    };

    // Filter button clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.dataset.filter;

            // GA4 Event Tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'filter_click', {
                    'event_category': 'Writing Page',
                    'event_label': activeFilter
                });
            }

            filterArticles();
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            // GA4 Event Tracking
            if (typeof gtag !== 'undefined' && this.value.length > 2) {
                gtag('event', 'search', {
                    'event_category': 'Writing Page',
                    'search_term': this.value
                });
            }
            filterArticles();
        });
    }

    // Sort input
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            sortArticles();
            filterArticles();
        });
    }

    // Initial sort
    sortArticles();
});
