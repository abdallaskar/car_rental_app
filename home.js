import { controlDateView } from "./Booking/JS/controller.js";
import { GeneralBooking } from "./Booking/JS/Model.js";

//show only dates from the current date.
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
