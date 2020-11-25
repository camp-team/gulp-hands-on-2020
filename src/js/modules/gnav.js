// グローバルナビゲーション開閉 実装
const gnav = () => {
  const gnav = document.getElementById('js-gnav');
  const toggleBtn = document.getElementById('js-gnav-toggle-btn');

  toggleBtn.addEventListener('click', () => {
    if(gnav.classList.contains('open')) {
      gnav.classList.remove('open');
      toggleBtn.classList.remove('open');
    } else {
      gnav.classList.add('open');
      toggleBtn.classList.add('open');
    }
  })

  gnav.addEventListener('click', () => {
    gnav.classList.remove('open');
    toggleBtn.classList.remove('open');
  })
};

export default gnav;
