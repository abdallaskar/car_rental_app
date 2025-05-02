import { controlDateView } from "../../Booking/JS/controller.js";
import { validateLocation,validateDropoffDate,validateDropoffTime,validatePickupDate,validatePickupTime } from "../../utils/validation.js";

// import User from "./Authentication/js/user.js";
import { validateEmail, validateName, validatePassword } from "./utils.js";
import Controller from "./controller.js";
//show only dates from the current date.
document.addEventListener('DOMContentLoaded',function(){
const handleUser = new Controller();

controlDateView();
document.getElementById('pickupL').addEventListener("input",()=>validateLocation('pickupL','pickupL-error'));
document.getElementById("dropOffL").addEventListener("input",()=>validateLocation("dropOffL","dropOffL-error"));
document.getElementById("pickUpdate").addEventListener("input",()=>validatePickupDate("pickUpdate","pickUpdate-error") );
document.getElementById("pickUptime").addEventListener("input",()=>validatePickupTime("pickUptime","pickUptime-error"));
document.getElementById("dropOffdate").addEventListener("input",()=>validateDropoffDate("dropOffdate","pickUpdate","dropOffdate-error"));
document.getElementById("dropOfftime").addEventListener("input",()=>validateDropoffTime("dropOfftime","pickUptime","pickUpdate","pickUpdate","dropOfftime-error"));
            
//getting values from GeneralBooking form present in the home page and scrolling  to carlist after submission  .
const form = document.getElementById("generalBooking");
    form.addEventListener("submit", function (event) {
      const isPickupLocationValid = validateLocation('pickupL','pickupL-error');
      const isDropoffLocationValid = validateLocation("dropOffL","dropOffL-error");
      const ispickupDateValid =validatePickupDate("pickUpdate","pickUpdate-error") ;
      const ispickupTimeValid =validatePickupTime("pickUptime","pickUptime-error") ;
      const isdropoffDateValid =validateDropoffDate("dropOffdate","pickUpdate","dropOffdate-error");
      const isdropoffTimeValid =validateDropoffTime("dropOfftime","pickUptime","pickUpdate","pickUpdate","dropOfftime-error") ;
    
      if (!(isPickupLocationValid &&isDropoffLocationValid && ispickupDateValid && ispickupTimeValid && isdropoffDateValid && isdropoffTimeValid)){
           event.preventDefault();
           return;
      }else{
        event.preventDefault(); // to be able to show the modal .
        // const mainContainer = document.getElementById("mainCarContainer");
        const pickUpLocation = document.getElementById("pickupL").value;
        const dropOffLocation = document.getElementById("dropOffL").value
        const pickUpDate = document.getElementById("pickUpdate").value;
        const pickUpTime = document.getElementById("pickUptime").value;
        const dropOffDate = document.getElementById("dropOffdate").value;
        const dropOffTime = document.getElementById("dropOfftime").value;
        let book = {
          pickUpLocation:pickUpLocation,
          pickUpDate:pickUpDate ,
          pickUpTime:pickUpTime,
          dropOffLocation:dropOffLocation,
          dropOffDate:dropOffDate,
          dropOffTime:dropOffTime
        };
        sessionStorage.setItem("GeneralBookingData", JSON.stringify(book));
        window.location.href="CarListings/carlist.html";
        // mainContainer.scrollIntoView({
        //   behavior: "smooth", // Smooth scrolling
        //   block: "start", // Align the section at the top of the page
        // });
      }
 
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

  // Check if user exists
  const userIndex = handleUser.searchUserUsingEmail(email);
  if (userIndex === -1) {
    emailErrorMsg.textContent = "User does not exist";
    emailErrorMsg.classList.remove("d-none");
    return;
  }

  // Check if password is valid
  if (!handleUser.isValidPassword(email, password)) {
    passwordErrorMsg.textContent = "Incorrect password";
    passwordErrorMsg.classList.remove("d-none");
    return;
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
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  // colse the modal
  const modalElement = document.getElementById("authModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  
  if (modalInstance) {
    modalInstance.hide();
  
    // Ensure backdrop is removed
    setTimeout(() => {
      document.querySelector(".modal-backdrop")?.remove();
      document.body.classList.remove("modal-open");
      document.body.style = "";
    }, 300); // Wait a bit for the animation to finish
  }
  

});
});
// Handle logout
function logout() {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
  authButton.textContent = "Login/Register";
  authButton.onclick = null;
  authButton.setAttribute("data-bs-toggle", "modal");
  authButton.setAttribute("data-bs-target", "#authModal");
  dashboardButton.classList.add("d-none");
}
