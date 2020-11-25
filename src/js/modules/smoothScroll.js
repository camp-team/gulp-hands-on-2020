// スムーススクロール 実装

const smoothScroll = () => {
  window.addEventListener('DOMContentLoaded', () => {

    const duration = 500;
    const Ease = {
      easeInOut: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1
    };

    const scrollAnimation = (e, targetPosition) => {
      e.preventDefault();

      const startTime = performance.now();
      const currentPostion = document.documentElement.scrollTop || document.body.scrollTop;

      const loop = (nowTime) => {
        const time = nowTime - startTime;
        const normalizedTime = time / duration;

        if (normalizedTime < 1) {
          window.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * Ease.easeInOut(normalizedTime)));
          requestAnimationFrame(loop);
        } else {
          window.scrollTo(0, targetPosition);
        };
      };
      requestAnimationFrame(loop);
    };

    const smoothScrollTriggers = document.querySelectorAll('a[href^="#"]');
    smoothScrollTriggers.forEach((smoothScrollTrigger) => {
      smoothScrollTrigger.addEventListener('click', (e) => {
        const href = smoothScrollTrigger.getAttribute('href');
        const targetElement = document.getElementById(href.replace('#', ''));

        if (targetElement) {
          const targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - 54;
          scrollAnimation(e, targetPosition);
        };
      });
    });

    const pagetopSmoothScrollTriggers = document.querySelectorAll('a.js-scroll-pagetop');
    pagetopSmoothScrollTriggers.forEach((smoothScrollTrigger) => {
      smoothScrollTrigger.addEventListener('click', (e) => {
        const targetPosition = 0;
        scrollAnimation(e, targetPosition);
      });
    });

  });
}

export default smoothScroll;
