const scriptURL1 = 'https://script.google.com/macros/s/AKfycbw6kcY9ZAMOsg-igfeTBC3mtp5XRJzd31NOeI_xnJLxgZF8rKV1MwcjeygqpSk-qTvN/exec'; // Replace with your Script ID
const form1 = document.forms['submit-to-google-sheets'];

function RegisterCourseSubmit() {
   
    clearMessages();

    const isValid = validform();

    if (isValid) {
    
        const formData = new FormData(form1);

        fetch(scriptURL1, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    document.getElementById("successMessage1").innerHTML =
                        '<div class="alert alert-success mt-3">Form submitted successfully!</div>';
                    form1.reset(); 
                } else {
                    throw new Error("Failed to submit the form.");
                }
            })
            .catch(error => {
                console.error("Error!", error.message);
                document.getElementById("successMessage1").innerHTML =
                    '<div class="alert alert-danger mt-3">Error submitting the form. Please try again later.</div>';
            });
    } else {
        document.getElementById("successMessage1").innerHTML =
            '<div class="alert alert-danger mt-3">Please correct the highlighted errors and try again.</div>';
    }
}

function validform() {
    let isValid = true;

    // Full Name validation
    const fullName = document.getElementById("name").value.trim();
    if (!/^[A-Za-z\s]+$/.test(fullName)) {
        isValid = false;
        document.getElementById("nameError").innerText = "Please enter a valid name (letters only).";
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        isValid = false;
        document.getElementById("emailError").innerText = "Please enter a valid email address.";
    }

    // Phone validation
    const phone = document.getElementById("phone").value.trim();
    if (!/^\d{10}$/.test(phone)) {
        isValid = false;
        document.getElementById("phoneError").innerText = "Please enter a valid 10-digit phone number.";
    }

    // Terms and Conditions validation
    const terms = document.getElementById("terms").checked;
    if (!terms) {
        isValid = false;
        alert("Please agree to the terms and conditions.");
    }

    return isValid;
}

function clearMessages() {
    document.querySelectorAll(".errorMessage1").forEach(el => (el.innerText = ""));
    document.getElementById("successMessage1").innerText = "";
}
