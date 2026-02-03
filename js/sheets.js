// const scriptURL = 'https://script.google.com/macros/s/AKfycby96sYm44TlW7mqk5PN4TrHNGZjc5Pb4zwH21GzSzLFITCBPx95ZFi5eXwrujfA2sgo1A/exec';
// const form = document.forms['submit-to-google-sheet'];

// function handleFormSubmit() {
//     const formData = new FormData(form);

//     fetch(scriptURL, { 
//         method: 'POST', 
//         body: formData 
//     })
//     .then(response => {
//         document.getElementById('successMessage').textContent = "Form submitted successfully!";
//         form.reset();
//     })
//     .catch(error => {
//         console.error('Error!', error.message);
//     });
// }

const scriptURL = "https://script.google.com/macros/s/AKfycby96sYm44TlW7mqk5PN4TrHNGZjc5Pb4zwH21GzSzLFITCBPx95ZFi5eXwrujfA2sgo1A/exec";
const form = document.forms['submit-to-google-sheet'];

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(() => {
    document.getElementById('successMessage').innerText =
      "Form submitted successfully!";
    form.reset();
  })
  .catch(err => console.error("Error!", err));
}

if (form) {
  form.addEventListener("submit", handleFormSubmit);
}
