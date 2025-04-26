
import Controller from "./controller.js";
import { renderAllCars } from "./utils.js";

// select elemnts main container 
const mainContainer = document.querySelector(".container .row");
const dropDownSort = document.querySelectorAll('.dropdown #sortSelect');
const dropDownAvailable = document.querySelectorAll('.dropdown #Availability_dropdown');
const searchInput = document.querySelector('.form .search-input');
const searchButton = document.querySelector('.form .search_btn');


// search by type of car
searchButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const searchValue = searchInput.value.toLowerCase(); // Get the value from the input field and convert it to lowercase
    searchInput.value = ""; // Clear the input field after getting the value

    // Filter the cars based on the search value
    const filteredCars = obj.getCarsByType(searchValue); // Filter the cars by type

    renderAllCars(filteredCars, mainContainer); // Render the filtered cars in the main container
});

// show by availablity car
dropDownAvailable.forEach(select => {
    select.addEventListener('change', (event) => {
        const selectedValue = event.target.value;

        if (selectedValue === "1") {
            renderAllCars(obj.getAllCars(), mainContainer); // Render all cars in the main container
        }
        else if (selectedValue === "2") {

            const available = obj.getCarsAvalible();
            renderAllCars(available, mainContainer); // Render all cars in the main container
        } else if (selectedValue === "3") {

            const notAvailable = obj.getCarsNotAvalible();
            renderAllCars(notAvailable, mainContainer); // Render all cars in the main container
        }
    });
});


// Add event listeners to the dropdowns for sorting and filtering
dropDownSort.forEach(select => {
    select.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        // Add logic here to handle the change event, e.g., sorting or filtering cars
        if (selectedValue === "1") {

            obj.sortCarsByRentalPrice(); // Sort by price: Low to High
            renderAllCars(obj.cars, mainContainer); // Render all cars in the main container
        } else if (selectedValue === "2") {

            obj.sortCarsByRentalPriceDesc(); // Sort by price: High to Low
            renderAllCars(obj.cars, mainContainer); // Render all cars in the main container
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

