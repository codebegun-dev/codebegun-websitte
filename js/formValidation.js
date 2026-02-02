const scriptURL = 'https://script.google.com/macros/s/AKfycbx-DKaR74G-Qz9Y10sfm7m0CYeNFKIgU6lId1Xvrz0WHN3AgZ8OxK4CrQ4SngS-BReo/exec';
const form = document.forms['submit-to-google-sheet'];


function handleFormSubmit() {
    
    clearMessages();

   
    const isValid = validateForm();
    if (isValid) {
    
        const formData = new FormData(form);

        fetch(scriptURL, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    var x = document.getElementById("successMessage");
                    x.innerHTML =
                        '<div class="alert alert-success mt-3">Form submitted successfully!</div>';
                    form.reset(); 
                } else {
                    throw new Error("Failed to submit the form.");
                }
            })
            .catch(error => {
                console.error("Error!", error.message);
                document.getElementById("successMessage").innerHTML =
                    '<div class="alert alert-danger mt-3">Error submitting the form. Please try again later.</div>';
            });
}
}

// Validation logic
function validateForm() {
    let isValid = true;

    // Full Name validation
    const fullName = document.getElementById("fullName").value.trim();
    if (!fullName.match(/^[A-Za-z\s]+$/)) {
        isValid = false;
        document.getElementById("nameError").innerText = "Please enter a valid name (letters only).";
    }

    // Mobile Number validation
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    if (!mobileNumber.match(/^\d{10}$/)) {
        isValid = false;
        document.getElementById("mobileNumberError").innerText = "Please enter a valid 10-digit mobile number.";
    }

    // Email validation
    const emailAdd = document.getElementById("emailAdd").value.trim();
    if (!emailAdd.match(/^\S+@\S+\.\S+$/)) {
        isValid = false;
        document.getElementById("emailError").innerText = "Please enter a valid email address.";
    }

    // Course selection validation
    const internship = document.getElementById("internshipSelect").value;
    if (!internship) {
        isValid = false;
        document.getElementById("successMessage").innerText = "Please select a course.";
        document.getElementById("successMessage").style.color = "red";
    }

    // Message validation
    const message = document.getElementById("message").value.trim();
    if (message.length < 3) {
        isValid = false;
        document.getElementById("messageError").innerText = "Message should be at least 10 characters long.";
    }

    return isValid;
}

// Clear previous error messages
function clearMessages() {
    document.querySelectorAll(".errorMessage").forEach((el) => (el.innerText = ""));
    document.getElementById("successMessage").innerText = "";
}
