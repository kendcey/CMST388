document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id); // Helper function for selecting elements
  const form = $("userForm");
  const notification = $("notification");

  // Show notification
  const showNotification = (message, isSuccess) => {
    notification.textContent = message;
    notification.className = isSuccess ? "notification success" : "notification error";
    notification.style.display = "block";
  };

  // Clear notification
  const clearNotification = () => {
    notification.style.display = "none";
  };

  // Real-time validation function
  const addFieldValidation = (id, regex, errorId, baseErrorMsg, formatErrorMsg) => {
    const inputElement = $(id);
    const errorElement = $(errorId);

    if (!inputElement || !errorElement) {
      console.error(`Element with ID "${id}" or error element "${errorId}" is missing.`);
      return; // Gracefully exit if IDs don't match
    }

    inputElement.addEventListener("input", () => {
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
    });
  };

  // Add field validations
  addFieldValidation("firstName", /^[A-Za-z]+$/, "firstNameError", "First Name is required.", "Only letters are allowed.");
  addFieldValidation("lastName", /^[A-Za-z]+$/, "lastNameError", "Last Name is required.", "Only letters are allowed.");
  addFieldValidation("city", /^[A-Za-z\s]+$/, "cityError", "City is required.", "Only letters are allowed.");
  addFieldValidation("zip", /^\d+$/, "zipError", "Zip Code is required.", "Only numbers are allowed.");
  addFieldValidation("phoneNumber", /^\d{10}$/, "phoneNumberError", "Phone Number is required.", "Exactly 10 digits are required.");
  addFieldValidation("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "emailError", "Email is required.", "Invalid email format.");

  // Email confirmation validation
  $("confirmEmail").addEventListener("input", () => {
    const email = $("email").value.trim();
    const confirmEmail = $("confirmEmail").value.trim();
    const errorElement = $("confirmEmailError");

    if (confirmEmail === "") {
      errorElement.innerText = "Confirm Email is required.";
      $("confirmEmail").classList.add("invalid");
    } else if (email !== confirmEmail) {
      errorElement.innerText = "Emails do not match.";
      $("confirmEmail").classList.add("invalid");
    } else {
      errorElement.innerText = "";
      $("confirmEmail").classList.remove("invalid");
      $("confirmEmail").classList.add("valid");
    }
  });

  // Enforce numbers-only input for the ZIP code field
  $("zip").addEventListener("input", (event) => {
    const inputElement = event.target;
    const value = inputElement.value;

    // Replace any non-numeric characters
    inputElement.value = value.replace(/\D/g, "");

    const errorElement = $("zipError");
    if (value.replace(/\D/g, "").length === value.length) {
      errorElement.innerText = "";
      inputElement.classList.remove("invalid");
      inputElement.classList.add("valid");
    } else {
      errorElement.innerText = "Zip Code can only contain numbers.";
      inputElement.classList.add("invalid");
      inputElement.classList.remove("valid");
    }
  });

  // Form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearNotification();

    let isValid = true;

    // Additional custom validations
    if (!document.querySelector('input[name="meal"]:checked')) {
      $("mealError").innerText = "Please select a meal preference.";
      isValid = false;
    } else {
      $("mealError").innerText = "";
    }

    // Display success or error notification
    if (isValid) {
      showNotification("Form submitted successfully!", true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      showNotification("Please correct the errors above.", false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // Reset handler
  form.addEventListener("reset", () => {
    clearNotification();
    form.querySelectorAll(".error").forEach((error) => (error.innerText = ""));
    form.querySelectorAll("input, select, textarea").forEach((input) => input.classList.remove("invalid", "valid"));
    document.querySelectorAll('input[name="meal"]').forEach((radio) => (radio.checked = false));
  });
});
