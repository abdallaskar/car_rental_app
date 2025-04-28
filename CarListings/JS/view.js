import { renderAllCars } from "./utils.js";
import handleCar from "./controller-instance.js";
import { controlDateView } from "../../Booking/JS/controller.js";
import {GeneralBooking} from "../../Booking/JS/Model.js"; 

//show only dates from the current date.
controlDateView();

//getting values from GeneralBooking form present in the home page and scrolling  to carlist after submission  .
const form = document.getElementById("generalBooking");
form.addEventListener("submit",function (event){
event.preventDefault();
const mainContainer = document.getElementById("mainCarContainer");
    const pickUpLocation = document.querySelector('input[placeholder="pick up location"]').value;
    const dropOffLocation = document.querySelector('input[placeholder="Drop Off location"]').value;
    const pickUpDate = document.getElementById("pickUpdate").value;
    const pickUpTime = document.getElementById("pickUptime").value;
    const dropOffDate = document.getElementById("dropOffdate").value;
    const dropOffTime = document.getElementById("dropOfftime").value;
    let book = new GeneralBooking(pickUpLocation,pickUpDate,pickUpTime,dropOffLocation,dropOffDate,dropOffTime);
    sessionStorage.setItem("GeneralBookingData",JSON.stringify(book));
    mainContainer.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start' // Align the section at the top of the page
    });
}); 

// select elemnts main container 
const mainContainer = document.querySelector(".container .row");
const dropDownSort = document.querySelectorAll('.dropdown #sortSelect');
const dropDownAvailable = document.querySelectorAll('.dropdown #Availability_dropdown');
const searchInput = document.querySelector('.form .search-input');
const searchButton = document.querySelector('.form .search_btn');

// Search by type of car
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchValue = searchInput.value.toLowerCase();
  searchInput.value = "";

  const filteredCars = handleCar.getCarsByType(searchValue);
  renderAllCars(filteredCars, mainContainer);
});


// show by availablity car
dropDownAvailable.forEach(select => {
    select.addEventListener('change', (event) => {
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

const obj = new Controller(); // Create an instance of the Controller class

const car1 = obj.createCar(2, "./Images/2.jpg", "Toyota", "Camry", "Sedan", 30000, "2022",
    "A reliable sedan with a comfortable interior and advanced safety features.");
const car2 = obj.createCar(3, "./Images/3.jpg", "Honda", "Civic", "Sedan", 25000, "2022",
    "A compact car known for its reliability and fuel efficiency.");
const car3 = obj.createCar(4, "./Images/4.jpg", "Ford", "Mustang", "Coupe", 55000, "2022",
    "Sports car with a powerful engine and sleek design");
obj.addCar(car1);
obj.addCar(car2); // Add the car objects to the controller
obj.addCar(car3); // Add the car objects to the controller

const car4 = obj.createCar(5, "./Images/5.jpg", "Chevrolet", "Impala", "Sedan", 22000, "2022", "Spacious sedan with a comfortable interior.");
obj.addCar(car4);

obj.markCarAsBooked(2);
renderAllCars(obj.cars, mainContainer); // Render all cars in the main container


