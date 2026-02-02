
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyFDPyswrjQJyMd620JdFowZQCtvYgOeKwYNjpWMZ-TLwTYX1ATVKQ5m-oKNhzA77c/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
function loginValidation(){
    const username=document.getElementById('username').value.trin();
    const password=document.getElementById('password').value.trim();
    let isValid=true;
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent='';
    if (username!=fullName) {
        document.getElementById('usernameError').textContent = 'Enter a UserId';
        isValid = false;
    }
}


  function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const emailAdd = document.getElementById('emailAdd').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Clear previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('mobileNumberError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Name validation
    const namePattern = /^[A-Za-z\s]{3,50}$/;
    if (!namePattern.test(fullName)) {
        document.getElementById('nameError').textContent = 'Enter a Valid Name';
        isValid = false;
    }

    // Mobile number validation
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobileNumber)) {
        document.getElementById('mobileNumberError').textContent = 'Mobile number must be a 10-digit number.';
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[A-Za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
    if (!emailPattern.test(emailAdd)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Subject and Message validation
    if (!subject) {
        document.getElementById('subjectError').textContent = 'Subject is required.';
        isValid = false;
    }
    if (!message) {
        document.getElementById('messageError').textContent = 'Message is required.';
        isValid = false;
    }
    return isValid;
    
}
    // Get elements
const popup = document.getElementById('popup');
const openBtn = document.querySelector('.open-popup-btn');
const closeBtn = document.getElementById('closeBtn');

// Open popup
openBtn.addEventListener('click', () => {
  popup.style.display = 'flex';
});

// Close popup
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Close popup when clicking outside the content
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

