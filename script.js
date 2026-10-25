/**
 * SHAIVIKA LABS — Interactive Innovation Experience Engine
 * Brand: Shaivika Groups Presents Shaivika Labs
 * Features: Interactive Neural Visual Core, Light/Dark Mode, Smooth Scroll Reveals, Responsive Navigation
 */

(() => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. THEME CONTROLLER (Light Mode Default, Persistent in localStorage)
  // -------------------------------------------------------------------------
  const THEME_KEY = 'shaivika-theme';
  const html = document.documentElement;
  const body = document.body;

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const activeTheme = savedTheme === 'dark' ? 'dark' : 'light';
    setTheme(activeTheme);
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      body.setAttribute('data-theme', 'light');
      localStorage.setItem(THEME_KEY, 'light');
    }

    if (window.shaivikaVisualScenes && Array.isArray(window.shaivikaVisualScenes)) {
      window.shaivikaVisualScenes.forEach(sceneHandler => {
        if (typeof sceneHandler.onThemeChange === 'function') {
          sceneHandler.onThemeChange(theme);
        }
      });
    }
  }

  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // -------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION
  // -------------------------------------------------------------------------
  function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    function closeMenu() {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. SMOOTH SCROLL FOR IN-PAGE ANCHORS
  // -------------------------------------------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 78;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navHeight - 10);
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. SCROLL REVEAL — PREMIUM SWIPE UP ANIMATION ENGINE
  // Elements sweep upward (translateY 55px → 0) as they enter the viewport
  // -------------------------------------------------------------------------
  function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .reveal-on-scroll');
    if (!animatedElements.length) return;

    // Reveal elements that are already in view on initial page load (hero elements, etc.)
    const revealInView = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Reveal elements fully visible above the fold immediately
        if (rect.bottom <= windowHeight && rect.top >= 0) {
          el.classList.add('is-visible');
        }
      });
    };

    // Use IntersectionObserver for the scroll-triggered swipe-up
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px' // trigger when 60px already scrolled into view
      });

      animatedElements.forEach(el => observer.observe(el));
    } else {
      animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // Immediately reveal hero section elements (they're above the fold on load)
    revealInView();

    // Safety fallback for hero / above-fold content only
    setTimeout(() => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.5) {
          el.classList.add('is-visible');
        }
      });
    }, 800);
  }


  // -------------------------------------------------------------------------
  // 5. CURRENT YEAR IN FOOTER
  // -------------------------------------------------------------------------
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  // -------------------------------------------------------------------------
  // 5.5 ORBITAL REVOLUTION ENGINE FOR HERO CENTERPIECE
  // Continuous smooth orbital revolution along tilted elliptical trajectory
  // with authentic 3D spatial depth cues (scaling, atmospheric fade, z-indexing)
  // -------------------------------------------------------------------------
  function initOrbitalRevolution() {
    const container = document.getElementById('hero-visual-centerpiece');
    if (!container) return;

    // The 4 orbital satellite elements around the centerpiece
    const orbitNodes = [
      {
        id: 'orbit-node-mindset',
        el: document.getElementById('orbit-node-mindset'),
        // Top-left sector
        angle: 4.35,
        radiusX: 38,
        radiusY: 22,
        tilt: -0.42
      },
      {
        id: 'orbit-node-ai',
        el: document.getElementById('orbit-node-ai'),
        // Top-right sector
        angle: 5.92,
        radiusX: 39,
        radiusY: 22,
        tilt: -0.42
      },
      {
        id: 'orbit-node-process',
        el: document.getElementById('orbit-node-process'),
        // Bottom-right sector
        angle: 1.21,
        radiusX: 38,
        radiusY: 22,
        tilt: -0.42
      },
      {
        id: 'orbit-node-vision',
        el: document.getElementById('orbit-node-vision'),
        // Bottom / bottom-left sector
        angle: 2.78,
        radiusX: 37,
        radiusY: 21,
        tilt: -0.42
      }
    ].filter(item => item.el !== null);

    if (orbitNodes.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let baseSpeed = prefersReducedMotion ? 0.0 : 0.17; // radians per second (~37s per revolution)
    let currentSpeed = baseSpeed;
    let targetSpeed = baseSpeed;

    // Hover deceleration: smooth ease-down on mouse enter so content can be comfortably read
    container.addEventListener('mouseenter', () => {
      targetSpeed = prefersReducedMotion ? 0.0 : 0.035;
    });

    container.addEventListener('mouseleave', () => {
      targetSpeed = baseSpeed;
    });

    // Also support hover on each individual node
    orbitNodes.forEach(node => {
      node.el.addEventListener('mouseenter', () => {
        targetSpeed = prefersReducedMotion ? 0.0 : 0.02;
      });
      node.el.addEventListener('mouseleave', () => {
        targetSpeed = baseSpeed;
      });
    });

    let lastTime = performance.now();

    function updateOrbit(now) {
      requestAnimationFrame(updateOrbit);

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth acceleration / deceleration interpolation
      currentSpeed += (targetSpeed - currentSpeed) * Math.min(dt * 4.0, 1.0);

      orbitNodes.forEach(node => {
        node.angle += currentSpeed * dt;
        if (node.angle > Math.PI * 2) {
          node.angle -= Math.PI * 2;
        }

        // Elliptical coordinates on inclined orbital plane
        const u = node.radiusX * Math.cos(node.angle);
        const v = node.radiusY * Math.sin(node.angle);

        // Orbital tilt transformation (-24 degrees)
        const cosPhi = Math.cos(node.tilt);
        const sinPhi = Math.sin(node.tilt);
        const xRel = u * cosPhi - v * sinPhi;
        const yRel = u * sinPhi + v * cosPhi;

        // Container percentages relative to center (50%, 50%)
        const posX = 50 + xRel;
        const posY = 50 + yRel;

        // 3D Spatial Depth:
        // When yRel > 0, the node is in the foreground (passing in front of the core)
        // When yRel < 0, the node is in the background (passing behind the core)
        const depth = yRel / node.radiusY;

        let scale, opacity, zIndex;
        if (depth >= 0) {
          // Foreground: crisp, full scale, in front of 3D canvas (z-index 8)
          scale = 1.0 + 0.08 * Math.min(depth, 1.0);
          opacity = 1.0;
          zIndex = 8;
        } else {
          // Background: subtle scale reduction, soft atmospheric opacity falloff, behind 3D canvas (z-index 2)
          scale = 1.0 + 0.08 * depth; // down to ~0.92
          opacity = 0.82 + 0.18 * (1.0 + depth); // down to ~0.82
          zIndex = 2;
        }

        node.el.style.left = `${posX.toFixed(2)}%`;
        node.el.style.top = `${posY.toFixed(2)}%`;
        node.el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        node.el.style.opacity = opacity.toFixed(3);
        node.el.style.zIndex = zIndex;
      });
    }

    requestAnimationFrame(updateOrbit);
  }

  // -------------------------------------------------------------------------
  // 6. THREE.JS INTERACTIVE VISUAL CORE ENGINE
  // Uses consistent brand palette: Warm cream, ivory, metallic, Shaivika orange
  // -------------------------------------------------------------------------
  window.shaivikaVisualScenes = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function createVisualContext(containerId, parentCardId, cameraDistance = 7) {
    let container = document.getElementById(containerId);
    if (!container) {
      // Graceful fallback for legacy ID or alternate ID
      const altId = containerId.includes('-canvas-wrap') 
        ? containerId.replace('-canvas-wrap', '-3d-canvas-wrap')
        : containerId.replace('-3d-', '-');
      container = document.getElementById(altId);
    }
    if (!container || typeof window.THREE === 'undefined') return null;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = cameraDistance;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      return null;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    let targetRotX = 0, targetRotY = 0;
    const parentCard = parentCardId ? document.getElementById(parentCardId) : container;
    if (parentCard) {
      parentCard.addEventListener('mousemove', (e) => {
        const rect = parentCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotY = x * 0.7;
        targetRotX = -y * 0.7;
      }, { passive: true });

      parentCard.addEventListener('mouseleave', () => {
        targetRotX = 0;
        targetRotY = 0;
      });
    }

    window.addEventListener('resize', () => {
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 240;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    return {
      container,
      scene,
      camera,
      renderer,
      mainGroup,
      ambientLight,
      getIsVisible: () => isVisible,
      getTargetRotX: () => targetRotX,
      getTargetRotY: () => targetRotY
    };
  }

  // Hero AI Neural Core with 3D Rotating Orbit Lines & Planetary Nodes
  function initHeroVisual() {
    // Camera distance 7.2 — perfectly fits the page, elegant, balanced, and completely attractive
    const ctx = createVisualContext('hero-canvas-wrap', 'hero-visual-centerpiece', 7.2);
    if (!ctx) return;

    const orangeHex = 0xF47724;

    // Specular ambient point lights simulating glowing nodes inside core
    const pLight = new THREE.PointLight(orangeHex, 3.2, 35);
    pLight.position.set(3, 4, 5);
    ctx.scene.add(pLight);

    const coreLight1 = new THREE.PointLight(0xFFE27A, 2.6, 12);
    coreLight1.position.set(0.35, 0.3, 0.7);
    ctx.scene.add(coreLight1);

    const coreLight2 = new THREE.PointLight(0xF47724, 3.0, 15);
    coreLight2.position.set(-0.4, -0.35, 0.6);
    ctx.scene.add(coreLight2);

    // 1. Faceted glowing orange icosahedron core (compact, sleek, elegant)
    const innerCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.96, 1),
      new THREE.MeshStandardMaterial({
        color: orangeHex,
        emissive: orangeHex,
        emissiveIntensity: 0.90,
        roughness: 0.14,
        metalness: 0.45,
        flatShading: true
      })
    );
    ctx.mainGroup.add(innerCore);

    // Bright specular energy nodes on the core facets
    const brightNodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const brightNodeMat = new THREE.MeshBasicMaterial({ color: 0xFFFDF0 });
    const brightNode1 = new THREE.Mesh(brightNodeGeo, brightNodeMat);
    brightNode1.position.set(0.36, 0.30, 0.60);
    innerCore.add(brightNode1);

    const brightNode2 = new THREE.Mesh(brightNodeGeo, brightNodeMat);
    brightNode2.position.set(-0.32, -0.25, 0.55);
    innerCore.add(brightNode2);

    // 2. Dark charcoal geometric lattice cage
    const outerLattice = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.36, 1),
      new THREE.MeshStandardMaterial({
        color: 0x1E1A16,
        wireframe: true,
        roughness: 0.35,
        metalness: 0.88,
        transparent: true,
        opacity: 0.90
      })
    );
    ctx.mainGroup.add(outerLattice);

    // Soft celestial atmospheric halo disc behind core
    const haloDisc = new THREE.Mesh(
      new THREE.CircleGeometry(2.0, 64),
      new THREE.MeshBasicMaterial({
        color: 0xFDFBF7,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide
      })
    );
    haloDisc.position.z = -0.55;
    ctx.mainGroup.add(haloDisc);

    // 3. Primary Orbit Ring — clean solid glowing orange ring
    const primaryOrbitGroup = new THREE.Group();
    primaryOrbitGroup.rotation.x = 1.16;
    primaryOrbitGroup.rotation.z = -0.42;
    ctx.mainGroup.add(primaryOrbitGroup);

    const primaryRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.030, 24, 160),
      new THREE.MeshStandardMaterial({
        color: orangeHex,
        emissive: orangeHex,
        emissiveIntensity: 0.90,
        metalness: 0.85,
        roughness: 0.12
      })
    );
    primaryOrbitGroup.add(primaryRing);

    // Small bright node on primary ring
    const primaryNode = new THREE.Mesh(
      new THREE.SphereGeometry(0.10, 16, 16),
      new THREE.MeshStandardMaterial({
        color: orangeHex,
        emissive: orangeHex,
        emissiveIntensity: 0.95,
        roughness: 0.1
      })
    );
    primaryNode.position.set(-2.15, 0, 0);
    primaryOrbitGroup.add(primaryNode);
    const primaryNodeLight = new THREE.PointLight(orangeHex, 1.4, 5);
    primaryNodeLight.position.set(-2.15, 0, 0);
    primaryOrbitGroup.add(primaryNodeLight);

    // 4. Secondary Orbit Ring — thinner, opposing tilt, subtler
    const secondaryOrbitGroup = new THREE.Group();
    secondaryOrbitGroup.rotation.x = -1.10;
    secondaryOrbitGroup.rotation.y = 0.35;
    secondaryOrbitGroup.rotation.z = 0.48;
    ctx.mainGroup.add(secondaryOrbitGroup);

    const secondaryRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.014, 16, 140),
      new THREE.MeshStandardMaterial({
        color: orangeHex,
        emissive: orangeHex,
        emissiveIntensity: 0.48,
        metalness: 0.85,
        transparent: true,
        opacity: 0.78
      })
    );
    secondaryOrbitGroup.add(secondaryRing);

    // Small octahedron node on secondary ring
    const secNode = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.08),
      new THREE.MeshStandardMaterial({ color: 0xFAF7F2, metalness: 0.9, roughness: 0.2 })
    );
    secNode.position.set(Math.cos(0.35 * Math.PI) * 2.35, Math.sin(0.35 * Math.PI) * 2.35, 0);
    secondaryOrbitGroup.add(secNode);

    // 5. Floating Geometric Particles
    const floatingNodes = [];
    for (let i = 0; i < 5; i++) {
      const isGold = i % 2 === 0;
      const geom = i % 3 === 0 ? new THREE.BoxGeometry(0.08, 0.08, 0.08) : new THREE.OctahedronGeometry(0.07);
      const node = new THREE.Mesh(
        geom,
        new THREE.MeshStandardMaterial({
          color: isGold ? orangeHex : 0xFFFAF2,
          emissive: isGold ? orangeHex : 0xFFD899,
          emissiveIntensity: 0.65,
          metalness: 0.85
        })
      );
      ctx.mainGroup.add(node);
      floatingNodes.push({
        mesh: node,
        radius: 1.55 + (i * 0.16),
        speed: (0.30 + (i * 0.06)) * (i % 2 === 0 ? 1 : -1),
        offset: i * (Math.PI / 2.5)
      });
    }

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!ctx.getIsVisible()) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const speed = reduceMotion ? 0.05 : 1.0;

      // Rotate core & cage
      innerCore.rotation.y += 0.28 * delta * speed;
      outerLattice.rotation.y -= 0.18 * delta * speed;
      outerLattice.rotation.x += 0.1 * delta * speed;

      // CONTINUOUS ROTATION OF CLEAN ORBIT RINGS:
      primaryOrbitGroup.rotation.z -= 0.18 * delta * speed;
      secondaryOrbitGroup.rotation.z -= 0.14 * delta * speed;

      const pulse = 1 + Math.sin(time * 2.5) * 0.035;
      innerCore.scale.set(pulse, pulse, pulse);

      floatingNodes.forEach(n => {
        const ang = time * n.speed * speed + n.offset;
        n.mesh.position.x = Math.cos(ang) * n.radius;
        n.mesh.position.y = Math.sin(ang) * n.radius * 0.55;
        n.mesh.position.z = Math.sin(ang) * n.radius * 0.75;
        n.mesh.rotation.y += 0.02;
        n.mesh.rotation.x += 0.01;
      });

      ctx.mainGroup.rotation.y += (ctx.getTargetRotY() - ctx.mainGroup.rotation.y) * 0.08;
      ctx.mainGroup.rotation.x += (ctx.getTargetRotX() - ctx.mainGroup.rotation.x) * 0.08;

      ctx.renderer.render(ctx.scene, ctx.camera);
    }
    animate();

    window.shaivikaVisualScenes.push({
      onThemeChange: (theme) => {
        const isDark = theme === 'dark';
        pLight.intensity = isDark ? 3.4 : 2.6;
        coreLight1.intensity = isDark ? 2.8 : 2.2;
        coreLight2.intensity = isDark ? 3.2 : 2.5;
        primaryNodeLight.intensity = isDark ? 2.0 : 1.4;
      }
    });
  }

  // About Curiosity Core

  function initAboutVisual() {
    const ctx = createVisualContext('about-canvas-wrap', 'about-card-container', 6.8);
    if (!ctx) return;

    const orangeHex = 0xF47724;
    const warmLight = new THREE.PointLight(orangeHex, 2.5, 35);
    warmLight.position.set(3, 3, 4);
    ctx.scene.add(warmLight);

    const crystalMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.MeshStandardMaterial({ color: 0xFBF8F2, emissive: orangeHex, emissiveIntensity: 0.35, roughness: 0.2, metalness: 0.85, transparent: true, opacity: 0.85 })
    );
    ctx.mainGroup.add(crystalMesh);

    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.02, 16, 80),
      new THREE.MeshStandardMaterial({ color: orangeHex, emissive: orangeHex, emissiveIntensity: 0.4, metalness: 0.9 })
    );
    ringA.rotation.x = Math.PI * 0.35;
    ctx.mainGroup.add(ringA);

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!ctx.getIsVisible()) return;

      const delta = clock.getDelta();
      const speed = reduceMotion ? 0.05 : 1.0;

      crystalMesh.rotation.y += 0.35 * delta * speed;
      crystalMesh.rotation.x += 0.18 * delta * speed;
      ringA.rotation.z += 0.25 * delta * speed;

      ctx.mainGroup.rotation.y += (ctx.getTargetRotY() - ctx.mainGroup.rotation.y) * 0.08;
      ctx.mainGroup.rotation.x += (ctx.getTargetRotX() - ctx.mainGroup.rotation.x) * 0.08;

      ctx.renderer.render(ctx.scene, ctx.camera);
    }
    animate();
  }

  // Technology Cards Visuals
  function initTechVisuals() {
    const orangeHex = 0xF47724;

    // AI & ML
    const aiCtx = createVisualContext('ai-canvas-wrap', 'ai-card-container', 6.0);
    if (aiCtx) {
      const tensor = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.1, 1),
        new THREE.MeshStandardMaterial({ color: orangeHex, wireframe: true, transparent: true, opacity: 0.65 })
      );
      aiCtx.mainGroup.add(tensor);

      const centerSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 16, 16),
        new THREE.MeshStandardMaterial({ color: orangeHex, emissive: orangeHex, emissiveIntensity: 0.7 })
      );
      aiCtx.mainGroup.add(centerSphere);

      let clock = new THREE.Clock();
      const animAI = () => {
        requestAnimationFrame(animAI);
        if (!aiCtx.getIsVisible()) return;
        const time = clock.getElapsedTime();
        const speed = reduceMotion ? 0.05 : 1.0;
        tensor.rotation.y = time * 0.35 * speed;
        tensor.rotation.x = time * 0.2 * speed;
        aiCtx.mainGroup.rotation.y += (aiCtx.getTargetRotY() - aiCtx.mainGroup.rotation.y) * 0.08;
        aiCtx.mainGroup.rotation.x += (aiCtx.getTargetRotX() - aiCtx.mainGroup.rotation.x) * 0.08;
        aiCtx.renderer.render(aiCtx.scene, aiCtx.camera);
      };
      animAI();
    }

    // Computer Vision
    const cvCtx = createVisualContext('cv-canvas-wrap', 'cv-card-container', 5.8);
    if (cvCtx) {
      const boundBox = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 1.5, 1.8),
        new THREE.MeshBasicMaterial({ color: orangeHex, wireframe: true, transparent: true, opacity: 0.6 })
      );
      cvCtx.mainGroup.add(boundBox);

      const target = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.65),
        new THREE.MeshStandardMaterial({ color: 0xFBF8F2, emissive: orangeHex, emissiveIntensity: 0.4, metalness: 0.8 })
      );
      cvCtx.mainGroup.add(target);

      let clock = new THREE.Clock();
      const animCV = () => {
        requestAnimationFrame(animCV);
        if (!cvCtx.getIsVisible()) return;
        const time = clock.getElapsedTime();
        const speed = reduceMotion ? 0.05 : 1.0;
        target.rotation.y = time * 0.4 * speed;
        boundBox.rotation.y = time * 0.15 * speed;
        cvCtx.mainGroup.rotation.y += (cvCtx.getTargetRotY() - cvCtx.mainGroup.rotation.y) * 0.08;
        cvCtx.mainGroup.rotation.x += (cvCtx.getTargetRotX() - cvCtx.mainGroup.rotation.x) * 0.08;
        cvCtx.renderer.render(cvCtx.scene, cvCtx.camera);
      };
      animCV();
    }

    // Digital Engineering
    const deCtx = createVisualContext('de-canvas-wrap', 'de-card-container', 6.0);
    if (deCtx) {
      const cubeCluster = new THREE.Group();
      deCtx.mainGroup.add(cubeCluster);

      for (let i = 0; i < 6; i++) {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 0.45, 0.45),
          new THREE.MeshStandardMaterial({ color: orangeHex, emissive: orangeHex, emissiveIntensity: 0.35, metalness: 0.85 })
        );
        box.position.set((i % 2 === 0 ? 0.5 : -0.5), (i > 2 ? 0.5 : -0.5), (i % 3 === 0 ? 0.4 : -0.4));
        cubeCluster.add(box);
      }

      let clock = new THREE.Clock();
      const animDE = () => {
        requestAnimationFrame(animDE);
        if (!deCtx.getIsVisible()) return;
        const time = clock.getElapsedTime();
        const speed = reduceMotion ? 0.05 : 1.0;
        cubeCluster.rotation.y = time * 0.3 * speed;
        cubeCluster.rotation.x = time * 0.2 * speed;
        deCtx.mainGroup.rotation.y += (deCtx.getTargetRotY() - deCtx.mainGroup.rotation.y) * 0.08;
        deCtx.mainGroup.rotation.x += (deCtx.getTargetRotX() - deCtx.mainGroup.rotation.x) * 0.08;
        deCtx.renderer.render(deCtx.scene, deCtx.camera);
      };
      animDE();
    }

    // Emerging Technologies
    const emCtx = createVisualContext('emerging-canvas-wrap', 'emerging-card-container', 5.8);
    if (emCtx) {
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xFBF8F2, emissive: orangeHex, emissiveIntensity: 0.6, metalness: 0.85 })
      );
      emCtx.mainGroup.add(core);

      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(1.3, 0.015, 16, 70),
        new THREE.MeshStandardMaterial({ color: orangeHex, emissive: orangeHex, emissiveIntensity: 0.4 })
      );
      orbit.rotation.x = Math.PI * 0.35;
      emCtx.mainGroup.add(orbit);

      let clock = new THREE.Clock();
      const animEM = () => {
        requestAnimationFrame(animEM);
        if (!emCtx.getIsVisible()) return;
        const time = clock.getElapsedTime();
        const speed = reduceMotion ? 0.05 : 1.0;
        orbit.rotation.z = time * 0.4 * speed;
        emCtx.mainGroup.rotation.y += (emCtx.getTargetRotY() - emCtx.mainGroup.rotation.y) * 0.08;
        emCtx.mainGroup.rotation.x += (emCtx.getTargetRotX() - emCtx.mainGroup.rotation.x) * 0.08;
        emCtx.renderer.render(emCtx.scene, emCtx.camera);
      };
      animEM();
    }
  }

  // Join Collaboration Visual
  function initJoinVisual() {
    const ctx = createVisualContext('join-canvas-wrap', 'join-card-container', 6.5);
    if (!ctx) return;

    const orangeHex = 0xF47724;
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.6, 1.63, 64),
      new THREE.MeshBasicMaterial({ color: orangeHex, side: THREE.DoubleSide, transparent: true, opacity: 0.45 })
    );
    ring.rotation.x = Math.PI * 0.25;
    ctx.mainGroup.add(ring);

    const cluster = new THREE.Group();
    ctx.mainGroup.add(cluster);

    for (let i = 0; i < 5; i++) {
      const ang = (i / 5) * Math.PI * 2;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 16, 16),
        new THREE.MeshStandardMaterial({ color: orangeHex, emissive: orangeHex, emissiveIntensity: 0.7 })
      );
      node.position.set(Math.cos(ang) * 1.2, Math.sin(ang) * 0.7, 0);
      cluster.add(node);
    }

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!ctx.getIsVisible()) return;

      const time = clock.getElapsedTime();
      const speed = reduceMotion ? 0.05 : 1.0;

      cluster.rotation.y = time * 0.25 * speed;
      ring.scale.setScalar(1 + Math.sin(time * 2 * speed) * 0.1);

      ctx.mainGroup.rotation.y += (ctx.getTargetRotY() - ctx.mainGroup.rotation.y) * 0.08;
      ctx.mainGroup.rotation.x += (ctx.getTargetRotX() - ctx.mainGroup.rotation.x) * 0.08;

      ctx.renderer.render(ctx.scene, ctx.camera);
    }
    animate();
  }

  // -------------------------------------------------------------------------
  // 9. COLLABORATION MODAL CONTROLLER
  // -------------------------------------------------------------------------
  function initCollabModal() {
    const modal = document.getElementById('collab-modal');
    if (!modal) return;

    const openButtons = document.querySelectorAll('[data-open-collab-modal]');
    const closeButtons = modal.querySelectorAll('.collab-close-btn, [data-close-modal]');

    const openModal = (e) => {
      if (e) e.preventDefault();
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    openButtons.forEach(btn => btn.addEventListener('click', openModal));
    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  // -------------------------------------------------------------------------
  // INITIALIZATION ON DOM READY
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initSmoothScroll();
    initAnimations();
    initYear();
    initOrbitalRevolution();
    initCollabModal();

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    function bootVisuals() {
      if (!window.THREE) return;
      initHeroVisual();
      // Card image overlay 3D animations removed per user request
    }

    if (window.THREE) {
      bootVisuals();
    } else {
      window.addEventListener('load', bootVisuals);
    }
  });

})();