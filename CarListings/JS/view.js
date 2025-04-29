import { renderAllCars } from "./utils.js";
import handleCar from "./controller-instance.js";
import { navigateToBooking } from "../../Booking/JS/utils.js";


// Select elements using dom
const mainContainer = document.querySelector(
  "#mainCarContainer #cardContainer"
);
const dropDownSort = document.querySelectorAll(".dropdown #sortSelect");
const dropDownAvailable = document.querySelectorAll(
  ".dropdown #Availability_dropdown"
);
const searchInput = document.querySelector(".form .search-input");
const searchButton = document.querySelector(".form .search_btn");
console.log(mainContainer);
console.log(handleCar.getAllCars());
// Render initial cars
renderAllCars(handleCar.getAllCars(), mainContainer);

// ADDED EVENTLISTENER ON THE BOOKNOW BUTTON AND GETTING CAR ID USING CUSTOM DATA ATTRIBUTE.
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("bookbtn")) {
    const carId = parseInt(event.target.getAttribute("data-car-id")); //converts the id as a string --> integer
    navigateToBooking(carId);
  }
});

// Search by type of car
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchValue = searchInput.value.toLowerCase();
  searchInput.value = "";
  const filteredCars = handleCar.getCarsByType(searchValue);
  renderAllCars(filteredCars, mainContainer);
});

// Show by availability
dropDownAvailable.forEach((select) => {
  select.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "1") {
      renderAllCars(handleCar.getAllCars(), mainContainer);
    } else if (selectedValue === "2") {
      const available = handleCar.getCarsAvalible();
      renderAllCars(available, mainContainer);
    } else if (selectedValue === "3") {
      const notAvailable = handleCar.getCarsNotAvalible();
      renderAllCars(notAvailable, mainContainer);
    }
  });
});

// Sort by price
dropDownSort.forEach((select) => {
  select.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "1") {
      handleCar.sortCarsByRentalPrice();
      renderAllCars(handleCar.getAllCars(), mainContainer);
    } else if (selectedValue === "2") {
      handleCar.sortCarsByRentalPriceDesc();
      renderAllCars(handleCar.getAllCars(), mainContainer);
    }
  });
});
