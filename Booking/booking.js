import { controlDateView } from "./JS/controller.js";
import { BookingForm } from "./JS/Model.js";
import { popupModal } from "./JS/utils.js";
import { generateCarForm,changeCar} from "./JS/utils.js";
import Controller from "../CarListings/JS/controller.js";
import handleCar from "../CarListings/JS/controller-instance.js";
import handleBook from "./JS/bookingController-instance.js";

controlDateView(); // disables previous dates from today .

    
    const form = document.getElementById("bookingForm");
    const General =JSON.parse(sessionStorage.getItem("GeneralBookingData"));
    const bookedCarId = JSON.parse(sessionStorage.getItem("bookedCarId")); //retrieved the id of the car booked stored in sessionStorage .
                                                                           //I used session storage so as when the user closes the site then opens it --> booked be clear . 
    const Bcar = new Controller();
    const car = Bcar.findCarById(bookedCarId) ; // used the id to retrieve the car with that id and show some of its data on the form .

    document.addEventListener('DOMContentLoaded',function(){
        generateCarForm();
        if(General) {
            document.querySelector('input[placeholder="pick up location"]').value = General.pickupLocation;
            document.querySelector('input[placeholder="Drop Off location"]').value = General.dropoffLocation;
            document.getElementById("pickUpdate").value = General.pickupDate;
            document.getElementById("pickUptime").value = General.pickupTime;
            document.getElementById("dropOffdate").value = General.dropoffDate;
            document.getElementById("dropOfftime").value = General.DropoffTime;
            
        }
        if (car) {
            console.log(car); // the id of the car 
            document.getElementById("brandSelect").value=car.brand;
            document.getElementById("modelSelect").value=car.model;
        }
       
        
            form.addEventListener("submit",function(event){
                event.preventDefault();
                const newBooking = handleBook.createBooking(
                    document.querySelector('input[placeholder="pick up location"]').value,
                    document.getElementById("pickUpdate").value,
                    document.getElementById("pickUptime").value,
                    document.querySelector('input[placeholder="Drop Off location"]').value,
                    document.getElementById("dropOffdate").value,
                    document.getElementById("dropOfftime").value,
                    document.getElementById("fname").value,
                    document.getElementById("lname").value,
                    document.getElementById("phone").value,
                    document.getElementById("email").value,
                    car.id,
                    car.brand,
                    car.model);
                  handleBook.addBooking(newBooking);
                  handleCar.markCarAsBooked(car.id);
                  
                // On submission retrieve the id of the booked car from localStorage and update the main car object.
                handleCar.markCarAsBooked(bookedCarId); 
                popupModal("pop",newBooking);
                setTimeout(() => {form.reset();
                    sessionStorage.removeItem("bookedCarId"); // so when the user click back button after submission --> no car data to be selected .
                }, 5000);
            });
    });
const changeCarbtn = document.getElementById("ChangeCar");
changeCarbtn.addEventListener("click",changeCar);
   

























// function closePopup() {
// document.getElementById("customPopup").classList.add("d-none");
// }



// function popup() {
    
//     const bookingForm = document.getElementById('bookingForm');

// // Select individual input fields
//     const firstNameInput = document.getElementById('fname');
//     const lastNameInput = document.getElementById('lname');
//     const emailInput = document.getElementById('emil');
//     const phoneInput = document.getElementById('phone');
//     const pickUpLocationInput = bookingForm.querySelector('input[placeholder="pick up location"]');
//     const dropOffLocationInput = bookingForm.querySelector('input[placeholder="Drop Off location"]');
//     const message = `
//      Pick-Up Location: ${pickUpLocation} <br>
//      Drop-Off Location: ${dropOffLocation} <br>
//     Pick-Up Date: ${pickUpDate} <br>
//     Drop-Off Date: ${dropOffDate} <br>
//     `;
//     document.getElementById("popupMessage").innerHTML = message;
//     document.getElementById("customPopup").classList.remove("d-none");
// }

