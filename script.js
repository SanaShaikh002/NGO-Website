document.addEventListener("DOMContentLoaded", () => {
  // ---- COUNTER ANIMATION ---- //
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const update = () => {
        const current = +counter.innerText;
        const increment = target / speed;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(update, 10);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  });

  if (counters.length > 0) {
    observer.observe(document.getElementById("impact"));
  }

  // ---- FADE-IN ANIMATION ---- //
  const faders = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  faders.forEach(el => fadeObserver.observe(el));

  // ---- CONTACT FORM HANDLER (if present) ---- //
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      alert("Thank you! Your message has been received.");
      form.reset();
    });
  }
});