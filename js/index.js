// // function getNextMonday() {
// //     const today = new Date();
// //     const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
// //     const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7; // Calculate days to next Monday
// //     const nextMonday = new Date(today);
// //     nextMonday.setDate(today.getDate() + daysUntilNextMonday); // Set date to next Monday

// //     // Format the date (e.g., "Monday, November 13, 2023")
// //     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// //     return nextMonday.toLocaleDateString('en-US', options);
// // }

// // // Display the next Monday's date
// // document.addEventListener("DOMContentLoaded", function () {
// //     //const batchDateElement = document.getElementById('batchDate');
// //     //batchDateElement.textContent = "On " + getNextMonday();
// // });
    

// function load(id, file, callback) {
//   fetch(file)
//     .then(res => res.text())
//     .then(data => {
//       document.getElementById(id).innerHTML = data;
//       if (callback) callback();
//     });
// }

// load("navbar", "components/navbar.html");
// load("new-batch-notification", "components/new-batch-notification.html");
// load("home-page-image-style", "components/home-page-image-style.html");
// load("recognitions", "components/recognitions.html");
// load("why-choose-section", "components/why-choose-section.html");
// load("courses-section", "components/courses-section.html");
// load("alumni-section", "components/alumni-section.html");
// load("testimonials", "components/testimonials.html");
// load("placement-carousel-section", "components/placement-carousel-section.html");
// load("contact", "components/contact.html");
// load("footer", "components/footer.html");

/* ===============================
   COMPONENT LOADER
================================ */
function load(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = data;
        if (callback) callback();
      }
    })
    .catch(err => console.error(`Error loading ${file}`, err));
}

/* ===============================
   COUNTER ANIMATION
================================ */
function animateCounters(id, target, delays, colors) {
  const element = document.querySelector(`#${id} .counter`);
  const stat = document.getElementById(id);
  if (!element || !stat) return;

  const [slowStart, fast, slowEnd] = delays;
  let current = id === 'stat3' ? 180000 : 0;

  const updateCounter = () => {
    const increment =
      current < target * 0.2 ? Math.ceil((target * 0.2) / slowStart) :
      current < target * 0.8 ? Math.ceil((target * 0.6) / fast) :
      Math.ceil((target * 0.2) / slowEnd);

    current += increment;
    if (current > target) current = target;

    if (id === 'stat3') {
      element.innerText = `₹${(current / 100000).toFixed(1)}L`;
      if (colors) {
        element.style.color =
          current <= 400000 ? colors[0] :
          current <= 800000 ? colors[1] :
          colors[2];
      }
    } else {
      element.innerText = current;
    }

    if (current < target) {
      const delay =
        current < target * 0.2 || current > target * 0.8 ? slowStart : fast;
      setTimeout(updateCounter, delay);
    } else {
      element.innerText += '+';
    }
  };

  stat.style.animation = 'fadeInTop 1s forwards';
  setTimeout(updateCounter, 300);
}







/* ===============================
   LOAD COMPONENTS
================================ */
load("navbar", "components/navbar.html");

load("new-batch-notification", "components/new-batch-notification.html");

/* HOME / HERO + COUNTERS */
load("home-page-image-style", "components/home-page-image-style.html", () => {
  animateCounters('stat1', 200, [100, 20, 100]);
  animateCounters('stat2', 120, [50, 15, 100], ['#ff6b6b', '#ffa500', '#4caf50']);
  animateCounters('stat3', 1400000, [60, 50, 30], ['#ff6b6b', '#ffa500', '#4caf50']);
});

load("recognitions", "components/recognitions.html");
load("why-choose-section", "components/why-choose-section.html");
load("courses-section", "components/courses-section.html");
load("alumni-section", "components/alumni-section.html");
load("testimonials", "components/testimonials.html");
load("placement-carousel-section", "components/placement-carousel-section.html");
load("contact", "components/contact.html");
load("footer", "components/footer.html");
load("pop-up-registration", "components/pop-up-registration.html", () => {
  setTimeout(() => {
    const popupEl = document.getElementById("registerPopup");
    if (popupEl) {
      const popup = new bootstrap.Modal(popupEl);
      popup.show();
    }
  }, 5000);
});
window.redirectToRegister = function () {
  window.location.href = "pages/pop-up-registeration-form.html";
};


