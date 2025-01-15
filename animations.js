document.addEventListener('DOMContentLoaded', () => {
  // Create floating burgers
  const floatingBurgers = document.querySelector('.floating-burgers');
  
  for(let i = 0; i < 10; i++) {
    const burger = document.createElement('span');
    burger.className = 'burger';
    burger.textContent = '🍔';
    burger.style.left = `${Math.random() * 100}%`;
    burger.style.top = `${Math.random() * 100}%`;
    burger.style.animationDelay = `${Math.random() * 5}s`;
    floatingBurgers.appendChild(burger);
  }

  // Enhanced parallax effect
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .floating-burgers');
        
        parallaxElements.forEach(element => {
          const speed = element.classList.contains('hero') ? 0.5 : 0.2;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Show/hide fixed CTA button
        const fixedCta = document.querySelector('.fixed-cta');
        if (scrolled > window.innerHeight / 2) {
          fixedCta.classList.add('visible');
        } else {
          fixedCta.classList.remove('visible');
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // Enhanced command card interactions
  const commandCards = document.querySelectorAll('.command-card');
  
  commandCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });

    card.addEventListener('click', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(0.95)';
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
      setTimeout(() => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1.05)';
      }, 100);
    });

    card.addEventListener('mouseenter', () => {
      if (card.dataset.command === 'burger') {
        createBurgerShower(card);
      }
    });
  });

  function createBurgerShower(card) {
    const shower = card.querySelector('.burger-shower');
    const emojis = ['🍔', '🍟', '🥤'];
    
    for (let i = 0; i < 8; i++) {
      const burger = document.createElement('div');
      burger.className = 'shower-burger';
      burger.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      burger.style.left = `${Math.random() * 100}%`;
      burger.style.animationDelay = `${Math.random() * 0.5}s`;
      burger.style.transform = `rotate(${Math.random() * 360}deg)`;
      shower.appendChild(burger);
      
      burger.addEventListener('animationend', () => burger.remove());
    }
  }

  // Enhanced CTA button interactions
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
      
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      button.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 1000);

      // Create burst of burgers
      for (let i = 0; i < 8; i++) {
        const burger = document.createElement('div');
        burger.className = 'burger-float';
        burger.textContent = '🍔';
        burger.style.setProperty('--angle', `${i * 45}deg`);
        button.appendChild(burger);
        
        setTimeout(() => burger.remove(), 1000);
      }
    });
  });

  // Add tilt effect for features
  document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mousemove', (e) => {
      const rect = feature.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      feature.style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    feature.addEventListener('mouseleave', () => {
      feature.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // Enhanced button hover effects
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      const shine = button.querySelector('.shine');
      if (shine) {
        shine.style.opacity = '1';
        shine.style.transform = `translate(${xPercent * 100}%, ${yPercent * 100}%)`;
      }
    });
    
    button.addEventListener('mouseleave', () => {
      const shine = button.querySelector('.shine');
      if (shine) {
        shine.style.opacity = '0';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Enhanced gradient shift effect
  const gradientShift = () => {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = (scrolled / maxScroll) * 100;
    
    document.querySelector('.gradient-overlay').style.background = 
      `linear-gradient(${45 + (percentage * 1.8)}deg, 
      var(--gradient-start), 
      var(--gradient-end))`;
    
    requestAnimationFrame(gradientShift);
  };
  
  gradientShift();

  // Add intersection observer for features
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature').forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    observer.observe(feature);
  });
});