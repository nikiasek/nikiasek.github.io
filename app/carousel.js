(function () {
  const carousel = document.querySelector('.carousel');
  const track = carousel.querySelector('.carousel-track');
  
  // CONFIG
  const BUFFER_MULTIPLIER = 2; // Kolikrát více než viditelná oblast
  const SPEED = 100; // px/sec
  
  // 1. Získání rozměrů
  const trackStyles = window.getComputedStyle(track);
  const gap = parseInt(trackStyles.gap) || 40;
  
  const originalItems = Array.from(track.children);
  const itemWidth = originalItems[0].offsetWidth;
  const step = itemWidth + gap;
  const carouselWidth = carousel.offsetWidth; // ?
  
  // 2. Kolik položek vidíme + buffer
  const visibleItems = Math.ceil(carouselWidth / step);
  const totalNeeded = visibleItems * BUFFER_MULTIPLIER;
  
  // 3. Přidej dostatek klonů
  const originalHTML = track.innerHTML;
  let clonesHTML = '';
  
  // Přidej tolik kopií, aby celková šířka byla dostatečná
  const copies = Math.ceil(totalNeeded / originalItems.length);
  
  for (let i = 0; i < copies; i++) {
    clonesHTML += originalHTML;
  }
  
  track.innerHTML = originalHTML + clonesHTML;
  
  const allItems = Array.from(track.children);
  const segmentWidth = originalItems.length * itemWidth + (originalItems.length) * gap + gap;

  const totalWidth = step * allItems.length - gap;
  
  console.log(`Vytvořeno ${allItems.length} položek (${originalItems.length} originál + ${allItems.length - originalItems.length} klonů)`);
  console.log(`Šířka: ${totalWidth}px (${Math.round(totalWidth / carouselWidth)}x carouselu)`);
  
  // 4. Animace s plynulým resetem
  let pos = 0;
  let lastTime = null;

  
  // 5. Interakce
  let isPaused = false;
  let savedSpeed = SPEED;
  
  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    savedSpeed = SPEED;
  });
  
  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
  });
  
  // Upravená animační funkce s podporou pause
  function animate(now) {
    if (!lastTime) lastTime = now;
    
    if (!isPaused) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      pos -= savedSpeed * dt;
      
      // Reset logika
      if (Math.abs(pos) >= segmentWidth) {
        pos += segmentWidth;
      }
      
      track.style.transform = `translateX(${pos}px)`;
    }
    
    lastTime = now;
    requestAnimationFrame(animate);
  }
  
  // Start
  requestAnimationFrame(animate);
})();