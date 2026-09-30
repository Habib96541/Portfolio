/* ============================================
   GAME DEVELOPER PORTFOLIO — JavaScript
   Full-featured interactive portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PRELOADER
  // ==========================================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 2000);
  });

  // ==========================================
  // 2. CUSTOM CURSOR
  // ==========================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX - 4 + 'px';
      cursorDot.style.top = mouseY - 4 + 'px';
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX - 20 + 'px';
      cursorRing.style.top = ringY - 20 + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .social-link, input, textarea, select');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  // ==========================================
  // 3. PARTICLES BACKGROUND
  // ==========================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '124, 58, 237' : '6, 182, 212';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    animFrameId = requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ==========================================
  // 4. NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');

  function onScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Back to top click
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // 5. MOBILE HAMBURGER MENU
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });

  // ==========================================
  // 6. TYPING EFFECT
  // ==========================================
  const typedTextEl = document.getElementById('typed-text');
  const phrases = [
    'Junior Game Developer',
    'Unity Specialist',
    'AR/VR Creator',
    'C# Programmer',
    'XR Developer',
    '@ Join Venture AI'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // ==========================================
  // 7. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 8. ANIMATED COUNTERS
  // ==========================================
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + (el.closest('.achievement-card') && target === 15 ? '%' : '+');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ==========================================
  // 9. SKILL BAR ANIMATIONS
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + '%';
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillBarObserver.observe(bar));

  // ==========================================
  // 10. PROJECT FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach((card, index) => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
        } else {
          card.style.display = 'none';
          card.style.animation = 'none';
        }
      });
    });
  });

  // ==========================================
  // 11. PROJECT MODAL
  // ==========================================
  const projectData = {
    'no-break': {
      title: 'No Break',
      category: '3D Endless Action Driving',
      image: 'assets/images/no_break.jpg',
      description: 'A high-octane 3D infinite driving game built in Unity where the car brakes are completely destroyed! Drive at relentless speed through dynamic city traffic, dodge heavy obstacles, trigger nitro boost combos, and survive against escalating speed challenges in an intense arcade environment.',
      features: [
        'Disabled Brakes Mechanics — Continuous acceleration forcing high-speed tactical reaction',
        'Dynamic Traffic & Obstacle Spawning with NavMesh AI and physics collisions',
        'Nitro Boost & Heat Management System with explosive FX',
        'Near-Miss Dodge Combo System with dynamic camera shake & UI audio cues',
        'Custom Vehicle Controller with realistic wheel friction & drifting physics',
        'Multiple Environment Tracks & Custom Garage Upgrades'
      ],
      tech: ['Unity 3D', 'C#', 'Vehicle Physics', 'NavMesh AI', 'Shader Graph', 'Object Pooling', 'Mobile & PC'],
      gallery: [
        'assets/images/no_break_ss1.jpg',
        'assets/images/no_break_ss2.jpg',
        'assets/images/no_break_ss3.jpg'
      ],
      video: {
        title: 'No Break — Official Gameplay Showcase Trailer',
        thumbnail: 'assets/images/no_break_ss1.jpg',
        url: 'assets/videos/no_break_preview.mp4'
      }
    },
    'retro-aero': {
      title: 'Retro Aero Fighter',
      category: '2D Arcade Shooter',
      image: 'assets/images/retro_aero_fighter.jpg',
      description: 'A thrilling vertical scrolling aircraft shooter game optimized for Android devices. Features smooth gameplay, dynamic difficulty, and efficient memory management through object pooling.',
      features: [
        'Vertical scrolling arcade shooter optimized for mobile',
        'Object Pooling for efficient bullet management',
        'Dual firing modes with power-up system',
        'Dynamic resource and health management',
        'Android touch controls with responsive input',
        'Score tracking and high-score system'
      ],
      tech: ['Unity 2D', 'C#', 'Android', 'Object Pooling', 'Mobile Optimization']
    },
    'ninja-runner': {
      title: 'Ninja Runner',
      category: '2D Platformer',
      image: 'assets/images/ninja_runner.jpg',
      description: 'A classic 2D platformer game featuring a ninja character with cross-platform input support for both PC keyboard and mobile touch controls. Includes real-time UI updates and clear win/lose state transitions.',
      features: [
        'Classic 2D platformer with smooth character movement',
        'Cross-platform input: PC keyboard & mobile touch',
        'Real-time UI updates for coin collection',
        'Clear win/lose state transitions',
        'Level design with increasing difficulty',
        'Responsive controls for precise gameplay'
      ],
      tech: ['Unity 2D', 'C#', 'Cross-Platform', 'Mobile', 'PC']
    },
    'vision-drive': {
      title: 'Vision Drive',
      category: '3D Traffic Simulation',
      image: 'assets/images/vision_drive.jpg',
      description: 'A 3D traffic simulation game with realistic vehicle physics. Navigate through traffic, avoid obstacles, and score points in this immersive driving experience.',
      features: [
        'Realistic vehicle physics and controls',
        'Obstacle avoidance system with AI traffic',
        'Dynamic scoring and reward mechanics',
        '3D environment with city streets',
        'Camera follow system with smooth transitions',
        'Increasing difficulty levels'
      ],
      tech: ['Unity 3D', 'C#', 'Vehicle Physics', 'AI Traffic', '3D Modeling']
    },
    'ar-object': {
      title: 'AR Object Interaction App',
      category: 'Augmented Reality',
      image: 'assets/images/ar_vr_project.jpg',
      description: 'An augmented reality application that enables real-time object detection and interaction. Built with Unity and Vuforia for marker-based AR experiences.',
      features: [
        'Real-time AR object detection and tracking',
        'Marker-based AR interaction with Vuforia',
        'Interactive 3D models in real-world environment',
        'Touch-based object manipulation',
        'Smooth AR experience with optimized rendering',
        'Multi-platform AR support'
      ],
      tech: ['Unity', 'Vuforia', 'AR', 'C#', 'Mobile']
    },
    'vr-interaction': {
      title: 'VR Interaction System',
      category: 'Virtual Reality',
      image: 'assets/images/ar_vr_project.jpg',
      description: 'A comprehensive VR locomotion and object interaction system built with Unity XR Interaction Toolkit. Features grab, teleport, and spatial UI interactions.',
      features: [
        'VR locomotion with teleportation system',
        'Hand-based object grabbing and interaction',
        'Spatial UI elements in 3D space',
        'XR Interaction Toolkit integration',
        'Smooth locomotion and snap turning',
        'Haptic feedback integration'
      ],
      tech: ['Unity XR', 'VR', 'XR Toolkit', 'C#', 'Oculus']
    },
    'aqi-prediction': {
      title: 'Air Quality Index Prediction',
      category: 'Machine Learning — B.Sc. Thesis',
      image: 'assets/images/vision_drive.jpg',
      description: 'B.Sc. thesis project developing a Convolutional Neural Network (CNN) model to estimate Air Quality Index (AQI) from satellite imagery using TensorFlow.',
      features: [
        'CNN model for AQI estimation from satellite images',
        'TensorFlow-based deep learning pipeline',
        'Satellite imagery preprocessing and augmentation',
        'Model evaluation with accuracy metrics',
        'Real-world environmental data analysis',
        'Research paper documentation'
      ],
      tech: ['TensorFlow', 'CNN', 'Python', 'Satellite Imagery', 'OpenCV', 'Deep Learning']
    },
    'gnomeatic-cards': {
      title: 'Gnomeatic Card Games',
      category: '2D Card Game',
      image: 'assets/images/gnomeatic_card_game.jpg',
      description: 'A fantasy-themed collectible card game featuring whimsical gnome characters. Players build decks, strategize with turn-based mechanics, and compete in multiplayer battles.',
      features: [
        'Collectible card system with unique gnome characters',
        'Turn-based strategic gameplay mechanics',
        'Deck building and card management system',
        'Multiplayer matchmaking support',
        'Animated card effects and battle sequences',
        'Progressive difficulty with AI opponents'
      ],
      tech: ['Unity 2D', 'C#', 'Card System', 'Multiplayer', 'UI/UX Design']
    },
    'dungeon-escape': {
      title: 'Dungeon Escape',
      category: '3D Adventure',
      image: 'assets/images/dungeon_escape.jpg',
      description: 'A 3D dungeon crawler adventure game featuring procedurally generated levels, combat mechanics with various weapons, and treasure hunting in dark atmospheric environments.',
      features: [
        'Procedural level generation for endless replayability',
        'Real-time combat system with multiple weapon types',
        'AI enemy pathfinding and behavior trees',
        'Treasure and loot system with inventory management',
        'Dynamic lighting with torch-lit atmospherics',
        'Boss battles with unique mechanics'
      ],
      tech: ['Unity 3D', 'C#', 'Procedural Generation', 'NavMesh AI', '3D Modeling']
    },
    'space-survival': {
      title: 'Space Survival',
      category: '2D Space Shooter',
      image: 'assets/images/space_survival.jpg',
      description: 'A 2D space survival game where players navigate through asteroid fields, collect resources, manage ship shields, and survive the dangers of deep space.',
      features: [
        'Dynamic asteroid field generation',
        'Shield and health management systems',
        'Resource collection and upgrade mechanics',
        'Particle-based explosion and thruster effects',
        'Progressive difficulty scaling',
        'Mobile-optimized touch controls'
      ],
      tech: ['Unity 2D', 'C#', 'Physics 2D', 'Particle System', 'Mobile']
    },
    'zombie-defense': {
      title: 'Zombie Defense',
      category: '3D Tower Defense',
      image: 'assets/images/zombie_defense.jpg',
      description: 'A 3D tower defense game where players strategically place turrets and barriers to defend against waves of increasingly difficult zombie attacks.',
      features: [
        'Wave-based enemy spawning system',
        'Multiple turret types with upgrade paths',
        'AI zombie pathfinding using NavMesh',
        'Strategic placement grid system',
        'Currency and upgrade economy',
        'Day/night cycle affecting gameplay'
      ],
      tech: ['Unity 3D', 'C#', 'Tower Defense', 'AI Pathfinding', 'Wave System']
    },
    'puzzle-match': {
      title: 'Crystal Match Puzzle',
      category: '2D Casual Puzzle',
      image: 'assets/images/puzzle_match.jpg',
      description: 'A vibrant match-3 puzzle game with satisfying combo systems, power-up crystals, level progression with increasing challenges, and online leaderboard integration.',
      features: [
        'Match-3 grid mechanics with combo chains',
        'Special power-up crystals and boosters',
        'Level progression with star ratings',
        'Smooth animations and particle effects',
        'Leaderboard and score tracking',
        'Daily challenges and rewards'
      ],
      tech: ['Unity 2D', 'C#', 'Casual Game', 'Mobile', 'UI Animation']
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');

  // Open modal on project card click
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      const data = projectData[projectId];
      if (!data) return;

      document.getElementById('modal-image').src = data.image;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-description').textContent = data.description;

      // Render Screenshots Gallery
      const galleryContainer = document.getElementById('modal-gallery-container');
      const galleryGrid = document.getElementById('modal-gallery-grid');
      if (galleryContainer && galleryGrid) {
        if (data.gallery && data.gallery.length > 0) {
          galleryContainer.style.display = 'block';
          galleryGrid.innerHTML = data.gallery.map(img => 
            `<img src="${img}" class="modal-gallery-thumb" alt="Screenshot" onclick="document.getElementById('modal-image').src='${img}'">`
          ).join('');
        } else {
          galleryContainer.style.display = 'none';
        }
      }

      // Render Video Preview Player
      const videoContainer = document.getElementById('modal-video-container');
      const videoWrapper = document.getElementById('modal-video-wrapper');
      if (videoContainer && videoWrapper) {
        if (data.video) {
          videoContainer.style.display = 'block';
          videoWrapper.innerHTML = `
            <div class="video-placeholder" style="background-image: linear-gradient(135deg, rgba(15,15,30,0.85), rgba(5,5,15,0.95)), url('${data.video.thumbnail}'); background-size: cover; background-position: center;">
              <div class="video-placeholder-play" onclick="this.parentElement.innerHTML='<video controls autoplay style=\\'width:100%;height:100%;object-fit:cover;\\'><source src=\\'${data.video.url}\\' type=\\'video/mp4\\'>Your browser does not support HTML5 video.</video>'">▶</div>
              <h3 style="font-size: 1.1rem; margin-bottom: 4px; color: #fff;">${data.video.title}</h3>
              <p style="font-size: 0.85rem; opacity: 0.8; color: #cbd5e1;">Click button to play gameplay trailer preview</p>
            </div>
          `;
        } else {
          videoContainer.style.display = 'none';
        }
      }

      const featuresList = document.getElementById('modal-features-list');
      featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

      const techStack = document.getElementById('modal-tech-stack');
      techStack.innerHTML = data.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('');

      // Render External Links / Drive / Source
      const linksContainer = document.getElementById('modal-links-container');
      const linksGrid = document.getElementById('modal-links-grid');
      if (linksContainer && linksGrid) {
        if (data.links && data.links.length > 0) {
          linksContainer.style.display = 'block';
          linksGrid.innerHTML = data.links.map(l => 
            `<a href="${l.url}" target="_blank" class="btn-primary" style="padding: 10px 20px; font-size: 0.88rem; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              <span>${l.icon || '📁'}</span> ${l.label}
            </a>`
          ).join('');
        } else if (data.driveUrl) {
          linksContainer.style.display = 'block';
          linksGrid.innerHTML = `
            <a href="${data.driveUrl}" target="_blank" class="btn-primary" style="padding: 10px 20px; font-size: 0.88rem; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              <span>📦</span> Full Source Code & Android Build (.APK)
            </a>`;
        } else {
          linksContainer.style.display = 'none';
        }
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ==========================================
  // 12. CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = document.getElementById('form-submit-btn');
    submitBtn.textContent = '⏳ Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
      submitBtn.textContent = '🚀 Send Message';
      submitBtn.disabled = false;

      // Reset after 5 seconds
      setTimeout(() => {
        contactForm.style.display = 'block';
        formSuccess.classList.remove('show');
        contactForm.reset();
      }, 5000);
    }, 1500);
  });

  // ==========================================
  // 13. TILT EFFECT ON PROJECT CARDS
  // ==========================================
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.project-card, .skill-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ==========================================
  // 14. SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 15. PARALLAX EFFECT ON HERO
  // ==========================================
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const hero = document.querySelector('.hero');
      if (hero && scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = scrollY * 0.5 + 'px';
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
          heroVisual.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
      }
    }, { passive: true });
  }

  // ==========================================
  // 16. MOUSE-INTERACTIVE PARTICLE REPEL
  // ==========================================
  let mouseParticleX = 0;
  let mouseParticleY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseParticleX = e.clientX;
    mouseParticleY = e.clientY;
  });

  // Modify particle update to react to mouse
  const originalUpdate = Particle.prototype.update;
  Particle.prototype.update = function() {
    const dx = this.x - mouseParticleX;
    const dy = this.y - mouseParticleY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      this.x += dx / dist * 1.5;
      this.y += dy / dist * 1.5;
    }
    originalUpdate.call(this);
  };

  // ==========================================
  // 17. KEYBOARD NAVIGATION
  // ==========================================
  const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
  let currentSectionIdx = 0;

  document.addEventListener('keydown', (e) => {
    // Only when modal is not open
    if (modalOverlay.classList.contains('active')) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      currentSectionIdx = Math.min(currentSectionIdx + 1, sectionIds.length - 1);
      const target = document.getElementById(sectionIds[currentSectionIdx]);
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      currentSectionIdx = Math.max(currentSectionIdx - 1, 0);
      const target = document.getElementById(sectionIds[currentSectionIdx]);
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });

  // ==========================================
  // 18. EASTER EGG — KONAMI CODE
  // ==========================================
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        activateEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    document.body.style.transition = 'filter 0.5s';
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
      document.body.style.filter = 'hue-rotate(0deg)';
      setTimeout(() => { document.body.style.filter = ''; }, 500);
    }, 3000);

    // Show a fun notification
    const notification = document.createElement('div');
    notification.textContent = '🎮 Konami Code Activated! +30 lives!';
    notification.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white;
      padding: 16px 32px; border-radius: 12px; font-family: 'Orbitron', sans-serif;
      font-size: 1rem; z-index: 99999; box-shadow: 0 8px 30px rgba(124, 58, 237, 0.5);
      animation: fadeInDown 0.5s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  // ==========================================
  // 19. DYNAMIC PAGE TITLE
  // ==========================================
  const pageTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = '🎮 Come back! | Habib.dev';
    } else {
      document.title = pageTitle;
    }
  });

  // ==========================================
  // 20. PERFORMANCE: PAUSE ANIMATIONS WHEN HIDDEN
  // ==========================================
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrameId);
    } else {
      animateParticles();
    }
  });

  // ==========================================
  // 21. RESUME DOWNLOAD HANDLER
  // ==========================================
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    if (link.textContent.includes('Download Resume')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        // Attempt to download the CV file
        const a = document.createElement('a');
        a.href = 'LuxSleek_CV__1_.pdf';
        a.download = 'Md_Habib_Resume.pdf';
        a.click();
      });
    }
  });

  // ==========================================
  // 22. IMAGE LAZY LOADING
  // ==========================================
  const images = document.querySelectorAll('img[src]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          imgObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      imgObserver.observe(img);
    });
  }

  // ==========================================
  // 23. GLITCH EFFECT ON HERO NAME (ON HOVER)
  // ==========================================
  const heroName = document.querySelector('.hero-name');
  if (heroName && window.innerWidth > 768) {
    heroName.addEventListener('mouseenter', () => {
      heroName.style.animation = 'none';
      let glitchCount = 0;
      const glitchInterval = setInterval(() => {
        heroName.style.textShadow = `
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(124, 58, 237, 0.7),
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(6, 182, 212, 0.7),
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(244, 63, 94, 0.7)
        `;
        glitchCount++;
        if (glitchCount > 10) {
          clearInterval(glitchInterval);
          heroName.style.textShadow = 'none';
        }
      }, 100);
    });
  }

  // ==========================================
  // INIT COMPLETE
  // ==========================================
  console.log('%c🎮 Portfolio Loaded! Built by Md. Habib', 'background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px;');

});
