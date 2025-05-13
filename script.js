// Function to show only the selected section
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.style.display = 'none';
    });
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';
  }
  
  // Inisialisasi: hanya tampilkan Home saat load
  document.addEventListener("DOMContentLoaded", () => {
    showSection('home');
  
    // Tambahkan event listener untuk setiap menu navbar
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        showSection(targetId);
        // Opsional: scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  });
  
  // Skill bar animation trigger on scroll
  document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(".skill-progress");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const progress = getComputedStyle(el).getPropertyValue("--progress");
            el.style.width = progress;
            observer.unobserve(el); // Trigger sekali saja
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
  
    skillBars.forEach((bar) => observer.observe(bar));
  });
  
  // Video play on hover (desktop) or long-press (mobile)
  document.querySelectorAll('.video-thumb').forEach(video => {
    // Desktop: hover untuk play
    video.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.muted = true; // pastikan muted saat hover
        video.play();
      });      
  
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        video.load(); // tampilkan kembali poster (thumbnail)
      });      
  
    // Mobile: klik tahan untuk play
    let touchTimeout;
  
    video.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Hindari gesture scroll
      touchTimeout = setTimeout(() => {
        video.currentTime = 0;
        video.muted = true; // pastikan muted saat touch play
        video.play();
      }, 300); // 300ms tekan untuk play
    });
  
    video.addEventListener('touchend', () => {
        clearTimeout(touchTimeout);
        video.pause();
        video.currentTime = 0;
        video.load(); // agar thumbnail muncul kembali di mobile
      });      
  
    // Klik: fullscreen dan play dengan audio
    video.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
      video.muted = false;
      video.play();
    });
  });  
  
  