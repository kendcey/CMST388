document.addEventListener("DOMContentLoaded", function() {
  // Helper function to get elements by ID
  const $ = function(id) {
    return document.getElementById(id);
  };

  // Form and notification elements
  const form = $("userForm");
  const notification = $("notification");

  // Show notification message
  const showNotification = function(message, isSuccess) {
    notification.textContent = message;
    notification.className = isSuccess ? "notification success" : "notification error";
    notification.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear notification
  const clearNotification = function() {
    notification.style.display = "none";
  };

  // Validate email format
  const validateEmail = function(email) {
    return /^[^\s@]{1,64}@[^\s@]{1,252}\.[^\s@]{2,}$/.test(email);
  };

  // Validate email confirmation
  const validateEmailConfirmation = function() {
    const email = $("email").value.trim();
    const confirmEmail = $("confirmEmail").value.trim();
    const error = $("confirmEmailError");
    
    if (confirmEmail === "") {
      error.textContent = "Confirm Email is required";
      $("confirmEmail").classList.add("invalid");
      return false;
    } else if (email !== confirmEmail) {
      error.textContent = "Emails must match";
      $("confirmEmail").classList.add("invalid");
      return false;
    } else {
      error.textContent = "";
      $("confirmEmail").classList.remove("invalid");
      return true;
    }
  };

  // Validate phone number
  const validatePhone = function() {
    const areaCode = $("areaCode").value;
    const phoneNumber = $("phoneNumber").value;
    const areaCodeError = $("areaCodeError");
    const phoneNumberError = $("phoneNumberError");
    let isValid = true;
    
    if (areaCode.length !== 3) {
      areaCodeError.textContent = "Area code must be 3 digits";
      $("areaCode").classList.add("invalid");
      isValid = false;
    } else {
      areaCodeError.textContent = "";
      $("areaCode").classList.remove("invalid");
    }
    
    if (phoneNumber.length !== 7) {
      phoneNumberError.textContent = "Phone number must be 7 digits";
      $("phoneNumber").classList.add("invalid");
      isValid = false;
    } else {
      phoneNumberError.textContent = "";
      $("phoneNumber").classList.remove("invalid");
    }
    
    return isValid;
  };

  // Set up input validation for different field types
  const setupValidation = function() {
    // Name fields - letters only
    const setupNameValidation = function(fieldId, errorId) {
      const field = $(fieldId);
      const error = $(errorId);
      
      field.addEventListener("input", function(e) {
        const key = e.data;
        const original = this.value;
        
        // Prevent invalid characters
        this.value = this.value.replace(/[^A-Za-z]/g, "");
        
        // Show error if invalid key was pressed
        if (key && /[^A-Za-z]/.test(key)) {
          error.textContent = "Only letters allowed";
          this.classList.add("invalid");
          setTimeout(() => {
            if (/^[A-Za-z]*$/.test(this.value)) {
              error.textContent = "";
              this.classList.remove("invalid");
            }
          }, 1000);
        }
      });
    };

    setupNameValidation("firstName", "firstNameError");
    setupNameValidation("lastName", "lastNameError");

    // City - letters and spaces only
    $("city").addEventListener("input", function(e) {
      const key = e.data;
      const original = this.value;
      
      this.value = this.value.replace(/[^A-Za-z\s]/g, "");
      
      if (key && /[^A-Za-z\s]/.test(key)) {
        $("cityError").textContent = "Only letters and spaces allowed";
        this.classList.add("invalid");
        setTimeout(() => {
          if (/^[A-Za-z\s]*$/.test(this.value)) {
            $("cityError").textContent = "";
            this.classList.remove("invalid");
          }
        }, 1000);
      }
    });

    // ZIP - numbers only (strictly 5 digits)
    $("zip").addEventListener("input", function(e) {
      const key = e.data;
      
      // Prevent non-digits and limit to 5 characters
      this.value = this.value.replace(/\D/g, "").slice(0, 5);
      
      if (key && /\D/.test(key)) {
        $("zipError").textContent = "Only numbers allowed";
        this.classList.add("invalid");
        setTimeout(() => {
          $("zipError").textContent = "";
          this.classList.remove("invalid");
        }, 1000);
      }
      
      // Show error if trying to type beyond 5 digits
      if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
      }
    });

    // Phone number parts
    const setupPhonePartValidation = function(fieldId, errorId, maxLength) {
      const field = $(fieldId);
      const error = $(errorId);
      
      field.addEventListener("input", function(e) {
        const key = e.data;
        
        // Prevent non-digits and enforce max length
        this.value = this.value.replace(/\D/g, "").slice(0, maxLength);
        
        if (key && /\D/.test(key)) {
          error.textContent = "Only numbers allowed";
          this.classList.add("invalid");
          setTimeout(() => {
            error.textContent = "";
            this.classList.remove("invalid");
          }, 1000);
        }
      });
    };

    setupPhonePartValidation("areaCode", "areaCodeError", 3);
    setupPhonePartValidation("phoneNumber", "phoneNumberError", 7);

    // Address - no validation needed (accepts anything)
    $("address").addEventListener("input", function() {
      $("addressError").textContent = "";
      this.classList.remove("invalid");
    });

    // Email validation
    $("email").addEventListener("input", function() {
      if (!validateEmail(this.value.trim())) {
        $("emailError").textContent = "You have entered an invalid e-mail address";
        this.classList.add("invalid");
      } else {
        $("emailError").textContent = "";
        this.classList.remove("invalid");
      }
    });

    // Email confirmation
    $("confirmEmail").addEventListener("input", validateEmailConfirmation);
    $("email").addEventListener("input", validateEmailConfirmation);
  };

  // Form submission handler
  const setupFormSubmission = function() {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      clearNotification();

      let isValid = true;

      // Validate all required fields
      const requiredFields = [
        'firstName', 'lastName', 'email', 'confirmEmail', 
        'address', 'city', 'state', 'zip'
      ];

      requiredFields.forEach(function(id) {
        const field = $(id);
        if (!field.value.trim()) {
          $(`${id}Error`).textContent = `${field.labels[0].textContent} is required`;
          field.classList.add("invalid");
          isValid = false;
        }
      });

      // Special validations
      if (!validatePhone()) isValid = false;
      if (!validateEmailConfirmation()) isValid = false;
      
      // ZIP code validation
      if ($("zip").value.length !== 5) {
        $("zipError").textContent = "ZIP code must be 5 digits";
        $("zip").classList.add("invalid");
        isValid = false;
      }

      // Meal preference
      if (!document.querySelector('input[name="meal"]:checked')) {
        $("mealError").textContent = "Please select a meal preference";
        isValid = false;
      }

      if (isValid) {
        showNotification("Form submitted successfully!", true);
        // form.submit(); // Uncomment to enable actual submission
      } else {
        showNotification("Please correct the errors below.", false);
        // Scroll to first error
        const firstError = document.querySelector('.invalid');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  };

  // Form reset handler
  const setupFormReset = function() {
    form.addEventListener("reset", function() {
      clearNotification();
      document.querySelectorAll(".error").forEach(function(el) {
        el.textContent = "";
      });
      document.querySelectorAll("input, select").forEach(function(el) {
        el.classList.remove("invalid", "valid");
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  // Validate Contact Method (at least 2 selections)
const validateContactMethods = function() {
  const selected = document.querySelectorAll('input[name="contactMethod"]:checked');
  const error = $("contactMethodError");

  if (selected.length < 2) {
    error.textContent = "Please select at least two contact methods";
    return false;
  } else {
    error.textContent = "";
    return true;
  }
};

// Ensure Contact Method Validation on Form Submission
form.addEventListener("submit", function(event) {
  if (!validateContactMethods()) {
    event.preventDefault();
    showNotification("Please correct the errors below.", false);
  }
});


  // Initialize all functionality
  setupValidation();
  setupFormSubmission();
  setupFormReset();
});
