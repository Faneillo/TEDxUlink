const countdowns = [...document.querySelectorAll('[data-target]')];

function updateCountdowns(now = Date.now()) {
  for (const el of countdowns) {
    const seconds = Math.max(0, Math.floor((Date.parse(el.dataset.target) - now) / 1000));
    if (!seconds) {
      el.textContent = el.dataset.finished;
      continue;
    }

    const values = [
      Math.floor(seconds / 86400),
      Math.floor(seconds / 3600) % 24,
      Math.floor(seconds / 60) % 60,
      seconds % 60,
    ];
    el.innerHTML = values
      .map((value, index) => `<span>${String(value).padStart(2, '0')}<small>${['天', '时', '分', '秒'][index]}</small></span>`)
      .join('');
    el.setAttribute('aria-label', `${values[0]} days, ${values[1]} hours, ${values[2]} minutes, ${values[3]} seconds remaining`);
  }
}

if (countdowns.length) {
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}
