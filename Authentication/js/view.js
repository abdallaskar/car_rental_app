import { controlDateView } from "../../Booking/JS/controller.js";
import { GeneralBooking } from "../../Booking/JS/Model.js";
// import User from "./Authentication/js/user.js";
import { validateEmail, validateName, validatePassword } from "./utils.js";
import Controller from "./controller.js";
//show only dates from the current date.

const handleUser = new Controller();

controlDateView();

//getting values from GeneralBooking form present in the home page and scrolling  to carlist after submission  .
const form = document.getElementById("generalBooking");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const mainContainer = document.getElementById("mainCarContainer");
  const pickUpLocation = document.querySelector(
    'input[placeholder="pick up location"]'
  ).value;
  const dropOffLocation = document.querySelector(
    'input[placeholder="Drop Off location"]'
  ).value;
  const pickUpDate = document.getElementById("pickUpdate").value;
  const pickUpTime = document.getElementById("pickUptime").value;
  const dropOffDate = document.getElementById("dropOffdate").value;
  const dropOffTime = document.getElementById("dropOfftime").value;
  let book = new GeneralBooking(
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffLocation,
    dropOffDate,
    dropOffTime
  );
  sessionStorage.setItem("GeneralBookingData", JSON.stringify(book));
  mainContainer.scrollIntoView({
    behavior: "smooth", // Smooth scrolling
    block: "start", // Align the section at the top of the page
  });
});

// Check if user is already logged in
const authButton = document.getElementById("authButton");
const dashboardButton = document.getElementById("dashboardButton");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
  authButton.textContent = "Logout";
  authButton.onclick = logout;
  if (currentUser.isAdmin) {
    dashboardButton.classList.remove("d-none");
  }
}

// Switch between login and register forms
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authModalLabel = document.getElementById("authModalLabel");

document.getElementById("showRegister").addEventListener("click", () => {
  registerForm.classList.toggle("d-none");
  loginForm.classList.toggle("d-none");
  authModalLabel.textContent = "Register";
});

document.getElementById("showLogin").addEventListener("click", () => {
  loginForm.classList.toggle("d-none");
  registerForm.classList.toggle("d-none");
  authModalLabel.textContent = "login";
});

// Handle registration

document
  .getElementById("registerFormSubmit")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const registerName = document.getElementById("registerName");
    const registerEmail = document.getElementById("registerEmail");
    const registerPassword = document.getElementById("registerPassword");
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;

    const nameErrorMsg = document.getElementById("nameErrorMsg");
    const registerEmailErrorMsg = document.getElementById(
      "registerEmailErrorMsg"
    );
    const registerPasswordErrorMsg = document.getElementById(
      "registerPasswordErrorMsg"
    );
    // Validate inputs
    if (!validateName(name)) {
      nameErrorMsg.classList.remove("d-none");
      return;
    }
    if (!validateEmail(email)) {
      registerEmailErrorMsg.classList.remove("d-none");
      return;
    }
    if (!validatePassword(password)) {
      registerPasswordErrorMsg.classList.remove("d-none");
      return;
    }

    if (handleUser.searchUserUsingEmail(email)) {
      const newId =
        Math.max(...handleUser.getAllUsers().map((user) => user.userId), 0) + 1;
      const newUser = handleUser.createUser(newId, name, email, password);
      handleUser.addUser(newUser);
      document.getElementById("registerFormSubmit").reset();
      registerForm.classList.toggle("d-none");
      loginForm.classList.toggle("d-none"); // Switch to login form
    } else {
      registerEmailErrorMsg.classList.remove("d-none");
      registerEmailErrorMsg.textContent = "User with this email already exists";
    }
  });

// Handle login
document.getElementById("loginFormSubmit").addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  const passwordErrorMsg = document.getElementById("passwordErrorMsg");
  const email = emailInput.value;
  const password = passwordInput.value;
  // Validate inputs

  if (!validateEmail(email)) {
    emailErrorMsg.classList.toggle("d-none");
    return;
  }
  if (!validatePassword(password)) {
    passwordErrorMsg.classList.toggle("d-none");
    return;
  }

  if (!handleUser.searchUserUsingEmail(email)) {
    emailErrorMsg.classList.remove("d-none");
  } else if (!handleUser.isValidPassword(email, password)) {
    passwordErrorMsg.classList.remove("d-none");
  }
  const currentUser = handleUser.getUserUsingEmail(email);

  if (email === "admin@car-rental.com" && password === "admin123") {
    handleUser.setAdmin(email);
    console.log(currentUser);
    dashboardButton.classList.remove("d-none");
    window.location.href = "./AdminDashboard/admin.html";
  }

  document.getElementById("loginFormSubmit").reset();

  // Update button to Logout
  authButton.textContent = "Logout";
  authButton.onclick = logout;

  // Show dashboard button and redirect if admin

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  // Close modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("authModal")
  );
  modal.hide();
});

// Handle logout
function logout() {
  localStorage.removeItem("currentUser");
  authButton.textContent = "Login/Register";
  authButton.onclick = null;
  authButton.setAttribute("data-bs-toggle", "modal");
  authButton.setAttribute("data-bs-target", "#authModal");
  dashboardButton.classList.add("d-none");
}
