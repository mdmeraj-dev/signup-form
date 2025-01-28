document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Floating labels
  const inputFields = document.querySelectorAll(".input-field");

  inputFields.forEach((input) => {
    if (input.value.trim() !== "") {
      input.classList.add("has-content");
    }

    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.classList.add("has-content");
      } else {
        input.classList.remove("has-content");
      }
    });
  });

  // Function to handle errors
  const handleError = (errorId, errorMessage, inputElement) => {
    const errorElement = document.getElementById(errorId);
    if (errorMessage) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
      inputElement.classList.add("error");
    } else {
      errorElement.textContent = "";
      errorElement.style.display = "none";
      inputElement.classList.remove("error");
    }
  };

  // Handle input events to dynamically update errors
  nameInput.addEventListener("input", () =>
    handleError("nameError", "", nameInput)
  );
  emailInput.addEventListener("input", () =>
    handleError("emailError", "", emailInput)
  );
  passwordInput.addEventListener("input", () =>
    handleError("passwordError", "", passwordInput)
  );

  // Validate Name
  const validateName = () => {
    const name = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!name) {
      handleError("nameError", "Please enter your name", nameInput);
      return false;
    }
    if (!nameRegex.test(name)) {
      handleError(
        "nameError",
        "Name can only contain letters and spaces.",
        nameInput
      );
      return false;
    }
    handleError("nameError", "", nameInput);
    return true;
  };

  // Validate Email
  const validateEmail = () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      handleError("emailError", "Please enter your email", emailInput);
      return false;
    }
    if (!emailRegex.test(email)) {
      handleError(
        "emailError",
        "Please enter a valid email address.",
        emailInput
      );
      return false;
    }
    handleError("emailError", "", emailInput);
    return true;
  };

  // Validate Password
  const validatePassword = () => {
    const password = passwordInput.value.trim();

    if (!password) {
      handleError("passwordError", "Please enter your password", passwordInput);
      return false;
    }
    if (password.length < 8) {
      handleError(
        "passwordError",
        "Password must be at least 8 characters long.",
        passwordInput
      );
      return false;
    }
    handleError("passwordError", "", passwordInput);
    return true;
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      alert(
        `Account created successfully!\nName: ${name}\nEmail: ${email}\nPassword: ${password}`
      );

      signupForm.reset();

      inputFields.forEach((input) => {
        input.classList.remove("has-content");
      });
    }
  };

  signupForm.addEventListener("submit", handleFormSubmit);
});
