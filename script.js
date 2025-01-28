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
    if (inputElement === passwordInput) {
      hideStrengthIndicator();
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

  // Toggle the password visibility
  const togglePassword = document.getElementById("togglePassword");
  const showIcon = document.getElementById("showIcon");
  const hideIcon = document.getElementById("hideIcon");

  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    showIcon.style.display = isPassword ? "block" : "none";
    hideIcon.style.display = isPassword ? "none" : "block";
  });

  // Toggle password strength
  const strengthMeter = document.querySelector(".strength-meter");
  const strengthLabel = document.querySelector(".strength-label");

  const showStrengthIndicator = () => {
    strengthMeter.style.display = "block";
    strengthLabel.style.display = "flex";
  };

  const hideStrengthIndicator = () => {
    strengthMeter.style.display = "none";
    strengthLabel.style.display = "none";
  };

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))/)) strength++;
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])/)) strength++;
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)) strength++;
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/))
      strength++;
    return strength;
  };

  const updateStrengthIndicator = (strength) => {
    const levels = [
      { label: "Weak", color: "#ff0000", percent: 15 },
      { label: "Fair", color: "#ffaf00", percent: 30 },
      { label: "Good", color: "#ffaf00", percent: 45 },
      { label: "Strong", color: "#54b435", percent: 60 },
      { label: "Very Strong", color: "#228b22", percent: 75 },
    ];

    const { label, color, percent } =
      levels[Math.min(strength - 1, levels.length - 1)];
    strengthMeter.style.width = `${percent}%`;
    strengthMeter.style.backgroundColor = color;

    strengthLabel.textContent = label;
    strengthLabel.style.color = color;

    showStrengthIndicator();
  };

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value.trim();
    if (password) {
      updateStrengthIndicator(calculateStrength(password));
    } else {
      hideStrengthIndicator();
    }
  });

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
      hideStrengthIndicator();

      inputFields.forEach((input) => {
        input.classList.remove("has-content");
      });
    }
  };

  signupForm.addEventListener("submit", handleFormSubmit);
});
