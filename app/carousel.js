(function () {
  const carousel = document.querySelector('.carousel');
  const track = carousel.querySelector('.carousel-track');

  // config
  let baseSpeed = 1.2;     // rychlost auto scrollu
  const friction = 0.94;
  const dragInfluence = 1.0;

  // state
  let isDown = false;
  let pointerId = null;

  let lastX = 0;
  let position = 0;
  let velocity = 0;

  // clone for infinite loop
  track.innerHTML += track.innerHTML;
  let items = Array.from(track.children);

  // compute width of original set
  let setWidth = 0;
  const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 40;

  const half = items.length / 2;
  for (let i = 0; i < half; i++) {
    setWidth += items[i].offsetWidth;
    if (i < half - 1) setWidth += gap;
  }

  // animation
  let lastTime = performance.now();
  function raf(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    if (!isDown) {
      position -= baseSpeed * dt * 60;
    }

    position += velocity * dt * 60;
    velocity *= friction;

    if (position <= -setWidth) position += setWidth;
    if (position >= 0) position -= setWidth;

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(raf);
  }

  const end = (e) => {
    if (!isDown || e.pointerId !== pointerId) return;
    isDown = false;

    try { track.releasePointerCapture(pointerId); } catch {}
    pointerId = null;

    // po puštění obnovíme autospeed
    baseSpeed = 1.2;
  };

  track.addEventListener('pointerup', end);
  track.addEventListener('pointerleave', end);
  track.addEventListener('pointercancel', end);

  requestAnimationFrame(raf);
})();
