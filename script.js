function scrollSlider(direction) {
  const slider = document.getElementById("imageSlider");
  const scrollAmount = slider.clientWidth; // scroll by visible width

  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}


const counters = document.querySelectorAll('.counter');

const counters1 = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const targetText = counter.getAttribute('data-target');
  
  // Extract number and suffix (k, M, +, etc.)
  const numberMatch = targetText.match(/([\d.]+)([kM]?)\+?/i);
  
  if (!numberMatch) return;

  let [_, numberStr, suffix] = numberMatch;
  let targetNum = parseFloat(numberStr);

  // Convert suffix to actual multiplier
  const multiplier = suffix.toLowerCase() === 'k' ? 1000 :
                     suffix.toLowerCase() === 'm' ? 1000000 : 1;

  const finalTarget = targetNum * multiplier;

  let current = 0;
  const increment = Math.ceil(finalTarget / 200); // control speed

  const updateCount = () => {
    if (current < finalTarget) {
      current += increment;
      let displayValue = current;

      // Format back with suffix
      if (suffix.toLowerCase() === 'k') {
        displayValue = (current / 1000).toFixed(0) + 'k+';
      } else if (suffix.toLowerCase() === 'm') {
        displayValue = (current / 1000000).toFixed(1) + 'M+';
      } else {
        displayValue = current + '+';
      }

      counter.innerText = displayValue;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = targetText; // final value from HTML
    }
  };

  updateCount();
});