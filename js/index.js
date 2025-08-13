
  // Animate progress bars when they become visible using IntersectionObserver
  (function () {
    const skillContainers = document.querySelectorAll('.skill-card');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.18
    };

    const observeHandler = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // find the progress-bar and percent element(s) in this card
          const bar = entry.target.querySelector('.progress-bar');
          const percentEl = entry.target.querySelector('.skill-percent');

          if (bar && percentEl) {
            const target = Math.max(0, Math.min(100, parseInt(percentEl.dataset.target || '0', 10)));

            // animate width
            bar.style.width = target + '%';
            bar.setAttribute('aria-valuenow', target);

            // animate number counting (simple and smooth)
            const start = 0;
            const duration = 900; // ms
            const startTime = performance.now();

            function tick(now) {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              const eased = progress < 0.5 ? 2*progress*progress : -1 + (4 - 2*progress)*progress; // ease in-out-ish
              const current = Math.round(start + (target - start) * eased);
              percentEl.textContent = current + '%';
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          }

          // unobserve this card so animation happens only once
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observeHandler, options);

    skillContainers.forEach(el => observer.observe(el));
  })();