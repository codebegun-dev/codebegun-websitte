


  const scriptURL = 'https://script.google.com/macros/s/AKfycbwPSogBQ2Ol2Dix8noH5mlh-ejZNtvlr4WbKp7NxcKI2DeiSBmOPpGY61s3VRjHG_C6/exec'
  const form = document.forms['submit-to-google-sheets']

  function RegisterCourseSubmit() {
    const formData = new FormData(form);

    fetch(scriptURL, { 
        method: 'POST', 
        body: formData 
    })
    .then(response => {
        document.getElementById('successMessage').textContent = "Form submitted successfully!";
        form.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
    });
}
