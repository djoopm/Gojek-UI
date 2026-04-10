
document.addEventListener('DOMContentLoaded', () => {


    // NAVBAR – scroll & hamburger
  


  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault(); 
      
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      
      console.log("Tombol diklik, menu status:", navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  } else {
    console.error("EROR: ID hamburger atau navLinks tidak ditemukan di HTML!");
  }
});



    // AOS – Animate On Scroll
 
  const aosEls = document.querySelectorAll('[data-aos], .solution-card, .scale-card, .grow-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  aosEls.forEach(el => observer.observe(el));





    //  SCALE SLIDER

  (function () {
    const track    = document.getElementById('scaleTrack');
    const prevBtn  = document.getElementById('scalePrev');
    const nextBtn  = document.getElementById('scaleNext');
    const dotsWrap = document.getElementById('scaleDots');
    if (!track) return;

    const slides = track.querySelectorAll('.scale-slide');
    let current  = 0;

    function visibleCount () {
      const w = window.innerWidth;
      if (w <= 480) return 1;
      if (w <= 768) return 1;
      return 3;
    }

    function maxIndex () {
      return Math.max(0, slides.length - visibleCount());
    }

    function buildDots () {
      dotsWrap.innerHTML = '';
      const show = visibleCount() < slides.length;
      dotsWrap.style.display = show ? 'flex' : 'none';
      for (let i = 0; i <= maxIndex(); i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === current ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
      }
    }

    function updateBtns () {
      prevBtn.classList.toggle('hidden', current === 0);
      nextBtn.classList.toggle('hidden', current >= maxIndex());
    }

    function goTo (idx) {
      current = Math.min(Math.max(0, idx), maxIndex());
      const w = slides[0].offsetWidth;
      track.style.transform = `translateX(-${current * w}px)`;
      dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
      updateBtns();
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    window.addEventListener('resize', () => { buildDots(); goTo(0); });
    buildDots();
    updateBtns();
  })();


    //  ICON SLIDER

  (function () {
    const track    = document.getElementById('iconTrack');
    const prevBtn  = document.getElementById('iconPrev');
    const nextBtn  = document.getElementById('iconNext');
    const dotsWrap = document.getElementById('iconDots');
    if (!track) return;

    const slides = track.querySelectorAll('.icon-slide');
    let current  = 0;

    function visibleCount () {
      const w = window.innerWidth;
      if (w < 700) return 1;
      if (w < 1024) return 2;
      return 3;
    }

    function maxIndex () {
      return Math.max(0, slides.length - visibleCount());
    }

    function buildDots () {
      dotsWrap.innerHTML = '';
      dotsWrap.style.display = visibleCount() < slides.length ? 'flex' : 'none';
      for (let i = 0; i <= maxIndex(); i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === current ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
      }
    }

    function updateButtons () {
      prevBtn.classList.toggle('hidden', current === 0);
      nextBtn.classList.toggle('hidden', current >= maxIndex());
    }

    function goTo (idx) {
      current = Math.min(Math.max(0, idx), maxIndex());
      const slideW = slides[0].offsetWidth;
      track.style.transform = `translateX(-${current * slideW}px)`;
      dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
      updateButtons();
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    window.addEventListener('resize', () => { buildDots(); goTo(0); });
    buildDots();
    updateButtons();
  })();
