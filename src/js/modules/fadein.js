const fadeInPagetopBtn = () => {
  const pagetopBtn = document.getElementById('js-pagetop-btn');
  const pagetopBtnAnimation = () => {
    const triggerMargin = 500;
    if (window.pageYOffset > triggerMargin) {
      pagetopBtn.classList.add('active');
    } else {
      pagetopBtn.classList.remove('active');
    }
  }
  window.addEventListener('load', pagetopBtnAnimation);
  window.addEventListener('scroll', pagetopBtnAnimation);
};

export default fadeInPagetopBtn;
