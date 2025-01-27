document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

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
