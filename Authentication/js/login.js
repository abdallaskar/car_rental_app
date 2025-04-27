const form = document.getElementById('loginForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();
  let emailError = document.getElementById('emailError');
  let passwordError = document.getElementById('passwordError');

  let valid = true;

  emailError.innerText = "";
  passwordError.innerText = "";

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
  } else if(password.length < 6){
    passwordError.innerText = "Password must be at lest 6 characters.";
    valid = false;
  }

  if (valid) {
    alert("Login Successful!");
    window.location.href = "home.html";
  }
});

// Get the Register link
const registerLink = document.getElementById('registerLink');

registerLink.addEventListener('click', function(event) {
  event.preventDefault(); // Stop the default link behavior

  // Show a confirm message
  const isUser = confirm('Register as User? Press OK for User, Cancel for Admin');

  if (isUser) {
    // If OK, redirect to User Register page
    window.location.href = 'register-user.html';
  } else {
    // If Cancel, redirect to Admin Register page
    window.location.href = 'register-admin.html';
  }
});