
import Controller from "./controller.js";
import { renderAllCars } from "./utils.js";

// select elemnts main container 
const mainContainer = document.querySelector(".container .row");
const dropDownSort = document.querySelectorAll('.dropdown #sortSelect');
const searchInput = document.querySelector('.search-input');






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


const car1 = obj.createCar(2, "../Images/2.jpg", "Toyota", "Camry", "Sedan", 30000);
const car2 = obj.createCar(3, "../Images/3.jpg", "Honda", "Civic", "Sedan", 25000);
const car3 = obj.createCar(4, "../Images/4.jpg", "Ford", "Mustang", "Coupe", 55000, "Sports car with a powerful engine and sleek designSports car with a powerful engine and sleek design");
obj.addCar(car1);
obj.addCar(car2); // Add the car objects to the controller
obj.addCar(car3); // Add the car objects to the controller

const car4 = obj.createCar(5, "../Images/5.jpg", "Chevrolet", "Impala", "Sedan", 22000, "Spacious sedan with a comfortable interior.");
obj.addCar(car4);




renderAllCars(obj.cars, mainContainer); // Render all cars in the main container

