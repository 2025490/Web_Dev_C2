// Validate the contact form before submission
// This function shows inline error messages next to each field
// This fixes the two issues flagged in CA1 feedback:
// 1. Labels now use proper 'for' attribute binding in the HTML
// 2. Error messages appear directly on the page instead of alert() pop-ups
function validateForm() {
    // Get the values typed by the user in each field
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Clear all previous error messages before validating again
    // This prevents old errors from staying on screen
    document.getElementById("name-error").textContent = "";
    document.getElementById("phone-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("message-error").textContent = "";
    document.getElementById("form-success").textContent = "";

    // Pattern that allows only letters and spaces for the name field
    const namePattern = /^[A-Za-z\s]+$/;

    // Pattern that allows only numbers for the phone field
    const phonePattern = /^[0-9]+$/;

    // Pattern that checks if the email is in a valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Track whether the form is valid overall
    let valid = true;

    // Validate name - check if empty then check if letters only
    if (name === "") {
        document.getElementById("name-error").textContent = "Please enter your name.";
        valid = false;
    } else if (!namePattern.test(name)) {
        document.getElementById("name-error").textContent = "Name must contain letters and spaces only.";
        valid = false;
    }

    // Validate phone - check if empty, numbers only, and correct length
    if (phone === "") {
        document.getElementById("phone-error").textContent = "Please enter your phone number.";
        valid = false;
    } else if (!phonePattern.test(phone)) {
        document.getElementById("phone-error").textContent = "Phone number must contain numbers only.";
        valid = false;
    } else if (phone.length < 9 || phone.length > 10) {
        document.getElementById("phone-error").textContent = "Phone number must be 9 or 10 digits.";
        valid = false;
    }

    // Validate email - check if empty then check format
    if (email === "") {
        document.getElementById("email-error").textContent = "Please enter your email address.";
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Validate message - check if empty and minimum 20 characters
    // Minimum length requirement ensures users send meaningful messages
    if (message === "") {
        document.getElementById("message-error").textContent = "Please enter your message.";
        valid = false;
    } else if (message.length < 20) {
        document.getElementById("message-error").textContent = "Message must be at least 20 characters.";
        valid = false;
    }

    // If all fields are valid show success message inline on the page
    if (valid) {
        document.getElementById("form-success").textContent = "Message sent successfully! We will get back to you soon.";
    }
}