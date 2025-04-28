import { renderAllCars } from "./utils.js";
import handleCar from "./controller-instance.js";

// Select elements using dom

const mainContainer = document.querySelector(
  "#mainCarContainer #cardContainer"
);

const dropDownSort = document.querySelectorAll(".dropdown #sortSelect");
const dropDownAvailable = document.querySelectorAll(".dropdown #Availability_dropdown");
const searchInput = document.querySelector(".form .search-input");
const searchButton = document.querySelector(".form .search_btn");



// Render initial cars
renderAllCars(handleCar.getAllCars(), mainContainer);

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
