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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    alert(
      `Account created  successfully!\nName: ${name}\nEmail: ${email}\nPassword: ${password}`
    );

    signupForm.reset();

    //Check initial state after reset
    inputFields.forEach((input) => {
      input.classList.remove("has-content");
    });
  };

  signupForm.addEventListener("submit", handleFormSubmit);
});
