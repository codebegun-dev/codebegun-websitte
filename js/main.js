// function load(id, file) {
//   fetch(file)
//     .then(res => res.text())
//     .then(data => document.getElementById(id).innerHTML = data);
// }

// load("navbar", "components/navbar.html");
// load("recognitions", "components/recognitions.html");
// load("why-choose-section", "components/why-choose-section.html");
// load("courses-section", "components/courses-section.html");
// load("alumni-section", "components/alumni-section.html");
// load("testimonials", "components/testimonials.html");

// load("placement-carousel-section", "components/placement-carousel-section.html");
// load("contact", "components/contact.html");

// load("footer", "components/footer.html");


function getNextMonday() {
  const today = new Date();
  const day = today.getDay();
  const daysUntilNextMonday = (8 - day) % 7 || 7;

  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilNextMonday);

  return nextMonday.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

