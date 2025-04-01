document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const notification = document.getElementById("notification");

  // Show notification
  function showNotification(message, isSuccess) {
    notification.textContent = message;
    notification.className = isSuccess ? "notification success" : "notification error";
    notification.style.display = "block";
  }

  // Clear notification
  function clearNotification() {
    notification.style.display = "none";
  }

  // Validate individual fields dynamically
  function validateField(inputElement, regex, errorElementId, baseErrorMsg, formatErrorMsg) {
    const errorElement = document.getElementById(errorElementId);
    const value = inputElement.value.trim();

    if (value === "") {
      errorElement.innerText = baseErrorMsg;
      inputElement.classList.remove("valid");
      inputElement.classList.add("invalid");
    } else if (!regex.test(value)) {
      errorElement.innerText = formatErrorMsg;
      inputElement.classList.remove("valid");
      inputElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.classList.remove("invalid");
      inputElement.classList.add("valid");
    }
  }

  // Real-time validation
  document.getElementById("firstName").addEventListener("input", () =>
    validateField(
      document.getElementById("firstName"),
      /^[A-Za-z]+$/,
      "firstNameError",
      "First Name is required and must contain only letters.",
      "First Name must contain only letters."
    )
  );

  document.getElementById("lastName").addEventListener("input", () =>
    validateField(
      document.getElementById("lastName"),
      /^[A-Za-z]+$/,
      "lastNameError",
      "Last Name is required and must contain only letters.",
      "Last Name must contain only letters."
    )
  );

  document.getElementById("city").addEventListener("input", () =>
    validateField(
      document.getElementById("city"),
      /^[A-Za-z\s]+$/,
      "cityError",
      "City is required and must contain only letters.",
      "City must contain only letters."
    )
  );

  document.getElementById("zip").addEventListener("input", () =>
    validateField(
      document.getElementById("zip"),
      /^\d{5}$/,
      "zipError",
      "Zip Code is required and must be exactly 5 digits.",
      "Zip Code must be exactly 5 digits."
    )
  );

  document.getElementById("phoneNumber").addEventListener("input", () =>
    validateField(
      document.getElementById("phoneNumber"),
      /^\d{10}$/,
      "phoneNumberError",
      "Phone Number is required and must be exactly 10 digits.",
      "Phone Number must be exactly 10 digits."
    )
  );

  document.getElementById("email").addEventListener("input", () =>
    validateField(
      document.getElementById("email"),
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "emailError",
      "Email Address is required.",
      "Please enter a valid email address."
    )
  );

  document.getElementById("confirmEmail").addEventListener("input", () => {
    const emailInput = document.getElementById("email").value.trim();
    const confirmEmailInput = document.getElementById("confirmEmail").value.trim();
    const confirmEmailError = document.getElementById("confirmEmailError");

    if (confirmEmailInput === "") {
      confirmEmailError.innerText = "Confirm Email is required.";
      document.getElementById("confirmEmail").classList.remove("valid");
      document.getElementById("confirmEmail").classList.add("invalid");
    } else if (emailInput !== confirmEmailInput) {
      confirmEmailError.innerText = "Emails do not match.";
      document.getElementById("confirmEmail").classList.remove("valid");
      document.getElementById("confirmEmail").classList.add("invalid");
    } else {
      confirmEmailError.innerText = "";
      document.getElementById("confirmEmail").classList.remove("invalid");
      document.getElementById("confirmEmail").classList.add("valid");
    }
  });

  // Handle form submission
  form.addEventListener("submit", event => {
    event.preventDefault(); // Prevent default submission
    clearNotification();

    let isValid = true;

    const fieldsToValidate = [
      { id: "firstName", regex: /^[A-Za-z]+$/, errorMsg: "First Name is required and must contain only letters." },
      { id: "lastName", regex: /^[A-Za-z]+$/, errorMsg: "Last Name is required and must contain only letters." },
      { id: "city", regex: /^[A-Za-z\s]+$/, errorMsg: "City is required and must contain only letters." },
      { id: "zip", regex: /^\d{5}$/, errorMsg: "Zip Code is required and must be exactly 5 digits." },
      { id: "phoneNumber", regex: /^\d{10}$/, errorMsg: "Phone Number is required and must be exactly 10 digits." },
      { id: "email", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMsg: "Valid Email Address is required." }
    ];

    fieldsToValidate.forEach(field => {
      const inputElement = document.getElementById(field.id);
      const errorElementId = field.id + "Error";
      if (!validateField(inputElement, field.regex, errorElementId, field.errorMsg, field.errorMsg)) {
        isValid = false;
      }
    });

    const emailInput = document.getElementById("email").value.trim();
    const confirmEmailInput = document.getElementById("confirmEmail").value.trim();
    if (emailInput !== confirmEmailInput) {
      document.getElementById("confirmEmailError").innerText = "Emails do not match.";
      isValid = false;
    }

    if (isValid) {
      showNotification("Form submitted successfully!", true);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top after submission
    } else {
      showNotification("Please correct the errors above.", false);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top even if invalid
    }
  });

  // Handle form reset
  form.addEventListener("reset", () => {
    clearNotification();
    document.querySelectorAll(".error").forEach(errorElement => (errorElement.innerText = ""));
    document.querySelectorAll("input, select, textarea").forEach(input => {
      input.classList.remove("invalid");
      input.classList.remove("valid");
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  });
});
