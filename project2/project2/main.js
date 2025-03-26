// Function to validate and handle form submission
function submitForm() {
    let isValid = true;
  
    // Validate first name
    const firstName = document.getElementById("firstName").value.trim();
    if (!firstName.match(/^[A-Za-z]+$/)) {
      document.getElementById("firstNameError").innerText = "Please enter a valid first name.";
      isValid = false;
    } else {
      document.getElementById("firstNameError").innerText = "";
    }
  
    // Validate last name
    const lastName = document.getElementById("lastName").value.trim();
    if (!lastName.match(/^[A-Za-z]+$/)) {
      document.getElementById("lastNameError").innerText = "Please enter a valid last name.";
      isValid = false;
    } else {
      document.getElementById("lastNameError").innerText = "";
    }
  
    // Validate address
    const address = document.getElementById("address").value.trim();
    if (address === "") {
      document.getElementById("addressError").innerText = "Address cannot be empty.";
      isValid = false;
    } else {
      document.getElementById("addressError").innerText = "";
    }
  
    // Validate state
    const state = document.getElementById("state").value;
    if (state === "") {
      document.getElementById("stateError").innerText = "Please select a state.";
      isValid = false;
    } else {
      document.getElementById("stateError").innerText = "";
    }
  
    // Validate city
    const city = document.getElementById("city").value;
    if (city === "") {
      document.getElementById("cityError").innerText = "Please select a city.";
      isValid = false;
    } else {
      document.getElementById("cityError").innerText = "";
    }
  
    // Validate zip code (5 digits)
    const zip = document.getElementById("zip").value.trim();
    if (!zip.match(/^\d{5}$/)) {
      document.getElementById("zipError").innerText = "Please enter a valid 5-digit zip code.";
      isValid = false;
    } else {
      document.getElementById("zipError").innerText = "";
    }
  
    // Validate area code (3 digits)
    const areaCode = document.getElementById("areaCode").value.trim();
    if (!areaCode.match(/^\d{3}$/)) {
      document.getElementById("areaCodeError").innerText = "Please enter a valid 3-digit area code.";
      isValid = false;
    } else {
      document.getElementById("areaCodeError").innerText = "";
    }
  
    // Validate phone number (7 digits)
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    if (!phoneNumber.match(/^\d{7}$/)) {
      document.getElementById("phoneNumberError").innerText = "Please enter a valid 7-digit phone number.";
      isValid = false;
    } else {
      document.getElementById("phoneNumberError").innerText = "";
    }
  
    // Validate email address format
    const email = document.getElementById("email").value.trim();
    const confirmEmail = document.getElementById("confirmEmail").value.trim();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      document.getElementById("emailError").innerText = "Please enter a valid email address.";
      isValid = false;
    } else {
      document.getElementById("emailError").innerText = "";
    }
  
    // Validate confirm email matches email
    if (email !== confirmEmail) {
      document.getElementById("confirmEmailError").innerText = "Email addresses do not match.";
      isValid = false;
    } else {
      document.getElementById("confirmEmailError").innerText = "";
    }
  
    // Validate meal preference
    const meal = document.querySelector('input[name="meal"]:checked');
    if (!meal) {
      document.getElementById("mealError").innerText = "Please select a meal preference.";
      isValid = false;
    } else {
      document.getElementById("mealError").innerText = "";
    }
  
    // Validate contact method (at least two selected)
    const contactMethods = document.querySelectorAll('input[name="contactMethod"]:checked');
    if (contactMethods.length < 2) {
      document.getElementById("contactMethodError").innerText = "Please select at least two contact methods.";
      isValid = false;
    } else {
      document.getElementById("contactMethodError").innerText = "";
    }
  
    // Check if the form is valid
    if (isValid) {
      alert("Form submitted successfully!");
    } else {
      alert("Please correct the errors in the form.");
    }
  }
  
  // Function to reset the form
  function resetForm() {
    // Clear all error messages
    document.querySelectorAll(".error").forEach(el => el.innerText = "");
  }
  
