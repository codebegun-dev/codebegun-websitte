

/* ===== GET FORM & FIELDS ===== */
const form = document.getElementById("careerForm");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const mobileField = document.getElementById("mobile");
const genderField = document.getElementById("gender");
const qualificationField = document.getElementById("qualification");
const courseField = document.getElementById("course");
const modeField = document.getElementById("mode");
const messageField = document.getElementById("message");

/* ===== LIVE VALIDATION EVENTS ===== */
nameField.addEventListener("input", () => validateField(nameField, "name", 3));
emailField.addEventListener("input", () => validateField(emailField, "email"));
mobileField.addEventListener("input", () => validateField(mobileField, "mobile"));
genderField.addEventListener("change", () => validateField(genderField));
qualificationField.addEventListener("input", handleQualificationInput);
courseField.addEventListener("change", () => validateField(courseField));
modeField.addEventListener("change", () => validateField(modeField));
messageField.addEventListener("input", () => validateField(messageField, "text", 10));

/* ===== DYNAMIC QUALIFICATION FIELDS ===== */
function handleQualificationInput() {
    validateField(qualificationField);
    const container = document.getElementById("qualification-extra");

    // If qualification value exists, show extra fields
    if (qualificationField.value.trim() !== "") {
        if (!container.innerHTML) {
            container.innerHTML = `
                <div class="form-group">
                    <label>Year of Passing <span>*</span></label>
                    <input type="number" id="yearOfPassing" placeholder="Enter Year of Passing">
                    <small class="error"></small>
                </div>
                <div class="form-group">
                    <label>Present Status <span>*</span></label>
                    <select id="presentStatus">
                        <option value="">Select Status</option>
                        <option>Studying</option>
                        <option>Completed</option>
                        <option>Working</option>
                    </select>
                    <small class="error"></small>
                </div>
                <div class="form-group">
                    <label>State <span>*</span></label>
                    <input type="text" id="state" placeholder="Enter State">
                    <small class="error"></small>
                </div>
            `;

            // Add event listeners for new fields
            const yearField = document.getElementById("yearOfPassing");
            const statusField = document.getElementById("presentStatus");
            const stateField = document.getElementById("state");

            yearField.addEventListener("input", () => validateField(yearField, "text", 4));
            statusField.addEventListener("change", () => validateField(statusField));
            stateField.addEventListener("input", () => validateField(stateField));
        }
    } else {
        container.innerHTML = ""; // Remove extra fields if qualification is cleared
    }
}

/* ===== UNIFIED VALIDATION FUNCTION ===== */
function validateField(field, type = "text", minLength = 0) {
    const value = field.value.trim();

    if (value === "") {
        showError(field, "This field is required");
        return false;
    }

    if (type === "name" && value.length < minLength) {
        showError(field, `Minimum ${minLength} characters required`);
        return false;
    }

    if (type === "email") {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(value)) {
            showError(field, "Invalid email format");
            return false;
        }
    }

    if (type === "mobile") {
        const pattern = /^[6-9]\d{9}$/;
        if (!pattern.test(value)) {
            showError(field, "Enter valid 10 digit mobile");
            return false;
        }
    }

    if (type === "text" && value.length < minLength) {
        showError(field, `Minimum ${minLength} characters required`);
        return false;
    }

    showSuccess(field);
    return true;
}

/* ===== SHOW/REMOVE ERROR & SUCCESS ===== */
function showError(input, message) {
    const group = input.closest(".form-group");
    const error = group.querySelector(".error");
    input.classList.add("input-error");
    input.classList.remove("input-success");
    error.textContent = message;
}

function showSuccess(input) {
    const group = input.closest(".form-group");
    const error = group.querySelector(".error");
    input.classList.remove("input-error");
    input.classList.add("input-success");
    error.textContent = "";
}

function removeSuccessStyles() {
    document.querySelectorAll("input, select, textarea").forEach(el => el.classList.remove("input-success"));
}

/* ===== FORM SUBMIT ===== */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect dynamic fields if they exist
    const yearField = document.getElementById("yearOfPassing");
    const statusField = document.getElementById("presentStatus");
    const stateField = document.getElementById("state");

    const fields = [
        { field: nameField, type: "name", minLength: 3 },
        { field: emailField, type: "email" },
        { field: mobileField, type: "mobile" },
        { field: genderField },
        { field: qualificationField },
        { field: courseField },
        { field: modeField },
        { field: messageField, type: "text", minLength: 10 }
    ];

    // Add dynamic fields if they exist
    if (yearField) fields.push({ field: yearField, type: "text", minLength: 4 });
    if (statusField) fields.push({ field: statusField });
    if (stateField) fields.push({ field: stateField, type: "text", minLength: 2 });

    let firstInvalid = null;
    let allValid = true;

    fields.forEach(f => {
        const isValid = validateField(f.field, f.type || "text", f.minLength || 0);
        if (!isValid && !firstInvalid) {
            firstInvalid = f.field;
            allValid = false;
        }
    });

    if (!allValid && firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    // Prepare form data
    const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        mobile: mobileField.value.trim(),
        gender: genderField.value,
        qualification: qualificationField.value.trim(),
        course: courseField.value,
        mode: modeField.value,
        message: messageField.value.trim()
    };

    if (yearField) formData.yearOfPassing = yearField.value.trim();
    if (statusField) formData.presentStatus = statusField.value;
    if (stateField) formData.state = stateField.value.trim();

    // Submit to Google Script
    fetch("https://script.google.com/macros/s/AKfycbz0LKRUPW1GtP7Yp1SWvwIfz8m3s8nu03Y_u3LTy2eiivT5W4LRihaRXmKFytba0dSx/exec", {
        method: "POST",
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert("✅ Registration Successful! Our team will contact you soon.");
        form.reset();
        removeSuccessStyles();
        document.getElementById("qualification-extra").innerHTML = ""; // remove dynamic fields
    })
    .catch(error => {
        alert("❌ Error saving data. Please try again.");
        console.error(error);
    });
});
