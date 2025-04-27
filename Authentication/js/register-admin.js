const form = document.getElementById('registerForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();

  let nameError = document.getElementById('nameError');
  let emailError = document.getElementById('emailError');
  let passwordError = document.getElementById('passwordError');

  let valid = true;

  nameError.innerText = "";
  emailError.innerText = "";
  passwordError.innerText = "";

  if (name === "") {
    nameError.innerText = "Please enter your name.";
    valid = false;
  }

  if (email === "") {
    emailError.innerText = "Please enter your email.";
    valid = false;
  } else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
    emailError.innerText = "Please enter a valid email.";
    valid = false;
  }

  if (password === "") {
    passwordError.innerText = "Please enter your password.";
    valid = false;
  }else if(password.length < 6){
    passwordError.innerText = "Password must be at lest 6 characters.";
    valid = false;
  }

  if (valid) {
    alert("Admin Registration Successful!");
    window.location.href = "login.html";
  }
});