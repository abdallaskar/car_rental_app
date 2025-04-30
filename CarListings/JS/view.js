import { renderAllCars, sortCarsByRentalPrice, sortCarsByRentalPriceDes } from "./utils.js";
import handleCar from "./controller-instance.js";
import { navigateToBooking } from "../../Booking/JS/utils.js";


// Select elements using dom
const mainContainer = document.querySelector("#mainCarContainer #cardContainer");
const dropDownSort = document.querySelectorAll(".dropdown #sortSelect");
const dropDownAvailable = document.querySelectorAll(".dropdown #Availability_dropdown");
const dropDownType = document.querySelectorAll(".dropdown #typeSelect")
const searchInput = document.querySelector(".form .search-input");
const searchButton = document.querySelector(".form .search_btn");
// global array to save cars desplay on the screan 
let carsOnDisaplayNow = handleCar.getAllCars() || [];


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
  // searchInput.value = "";
  const filteredCars = handleCar.getCarsByName(searchValue);
  carsOnDisaplayNow = filteredCars;
  renderAllCars(filteredCars, mainContainer);
});

// Sort by price
dropDownSort.forEach((select) => {
  select.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "1") {
      // const carsDisplay = JSON.parse(localStorage.getItem("carsOnDisaplayNow")) || [];
      const sortedDisplayCars = sortCarsByRentalPrice(carsOnDisaplayNow);
      renderAllCars(sortedDisplayCars, mainContainer);
    } else if (selectedValue === "2") {
      // const carsDisplay = JSON.parse(localStorage.getItem("carsOnDisaplayNow")) || [];
      const sortedDisplayCars = sortCarsByRentalPriceDes(carsOnDisaplayNow);
      renderAllCars(sortedDisplayCars, mainContainer);
    }
  });
});


//show by types of cars 
dropDownType.forEach((select) => {
  select.addEventListener("click", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "1") {
      const allTypes = handleCar.getAllCars();
      carsOnDisaplayNow = allTypes;
      renderAllCars(allTypes, mainContainer);
    } else if (selectedValue === "2") {
      const sedan = handleCar.getCarsBytype("sedan");
      carsOnDisaplayNow = sedan;
      renderAllCars(sedan, mainContainer);
    } else if (selectedValue === "3") {
      const SUV = handleCar.getCarsBytype("SUV");
      carsOnDisaplayNow = SUV;
      renderAllCars(SUV, mainContainer);
    }
    else if (selectedValue === "4") {
      const coupe = handleCar.getCarsBytype("coupe");
      carsOnDisaplayNow = coupe;
      renderAllCars(coupe, mainContainer);
    }
    else if (selectedValue === "5") {
      const hatchback = handleCar.getCarsBytype("hatchback");
      carsOnDisaplayNow = hatchback;
      renderAllCars(hatchback, mainContainer);
    }
    else if (selectedValue === "6") {
      const convertible = handleCar.getCarsBytype("convertible");
      carsOnDisaplayNow = convertible;
      renderAllCars(convertible, mainContainer);
    }
  });
});

// Show by availability
dropDownAvailable.forEach((select) => {
  select.addEventListener("click", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "1") {
      const allCars = handleCar.getAllCars();
      // localStorage.setItem("carsOnDisaplayNow", JSON.stringify(allCars));
      carsOnDisaplayNow = allCars;
      renderAllCars(allCars, mainContainer);
    } else if (selectedValue === "2") {
      const available = handleCar.getCarsAvalible();
      // localStorage.setItem("carsOnDisaplayNow", JSON.stringify(available));
      carsOnDisaplayNow = available;
      renderAllCars(available, mainContainer);
    } else if (selectedValue === "3") {
      const notAvailable = handleCar.getCarsNotAvalible();
      // localStorage.setItem("carsOnDisaplayNow", JSON.stringify(notAvailable));
      carsOnDisaplayNow = notAvailable;
      renderAllCars(notAvailable, mainContainer);
    }
  });
});

// function BookCar(carId) {
//   window.location.href = "../../Booking/booking.html";
//   handleCar.markCarAsBooked(carId);
// };

// Function to handle booking
function bookCar(carId) {
  handleCar.markCarAsBooked(carId);
  window.open("../../Booking/booking.html");

}

// Add event listener to the Book Now button (assuming modal is dynamically created)
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-primary') && event.target.id.startsWith('bookNowBtn_')) {
    const carId = event.target.getAttribute('data-car-id');
    bookCar(carId);
  }
});