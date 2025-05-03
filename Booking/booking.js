import { controlDateView, calculateTotalPrice,updateTotalPrice } from "./JS/controller.js";
import { popupModal } from "./JS/utils.js";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateLocation,
  validatePickupDate,
  validatePickupTime,
  validateDropoffDate,
  validateDropoffTime,
} from "../utils/validation.js";
import { changeCar } from "./JS/utils.js"; //generateCarForm,
import Controller from "../CarListings/JS/controller.js";
import handleCar from "../CarListings/JS/controller-instance.js";
import handleBook from "./JS/bookingController-instance.js";



document.addEventListener("DOMContentLoaded", function () {
  controlDateView(); // disables previous dates from today .

  //events that handels change car btn .
  const changeCarbtn = document.getElementById("ChangeCar");
  changeCarbtn.addEventListener("click", changeCar);

  const form = document.getElementById("bookingForm");
  const General = JSON.parse(sessionStorage.getItem("GeneralBookingData"));
  const CurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const bookedCarId = JSON.parse(sessionStorage.getItem("bookedCarId")); //retrieved the id of the car booked stored in sessionStorage .
  //I used session storage so as when the user closes the site then opens it --> booked be clear .
  const Bcar = new Controller();
  const car = Bcar.findCarById(bookedCarId); // used the id to retrieve the car with that id and show some of its data on the form .
  const totalCost = calculateTotalPrice(document.getElementById("pickUpdate").value,document.getElementById("dropOffdate").value,car.rental_price);

  document.getElementById("fname").addEventListener("input", () => validateFirstName("fname", "fname-error"));
  document.getElementById("lname").addEventListener("input", () => validateLastName("lname", "lname-error"));
  document.getElementById("email").addEventListener("input", () => validateEmail("email", "email-error"));
  document.getElementById("phone").addEventListener("input", () => validatePhone("phone", "phone-error"));
  document.getElementById("pickupL").addEventListener("input", () =>validateLocation("pickupL", "pickupL-error"));
  document.getElementById("dropOffL").addEventListener("input", () => validateLocation("dropOffL", "dropOffL-error"));
  document.getElementById("pickUpdate").addEventListener("input", () =>{updateTotalPrice(car);validatePickupDate("pickUpdate", "pickUpdate-error"); });
  document.getElementById("pickUptime").addEventListener("input", () =>validatePickupTime("pickUptime", "pickUptime-error"));
  document.getElementById("dropOffdate").addEventListener("input", () =>{updateTotalPrice(car);validateDropoffDate("dropOffdate", "pickUpdate", "dropOffdate-error")});
  document.getElementById("dropOfftime").addEventListener("input", () =>validateDropoffTime("dropOfftime","pickUptime","pickUpdate","pickUpdate","dropOfftime-error") );


  if (General) {
    document.getElementById("pickupL").value = General.pickUpLocation;
    document.getElementById("dropOffL").value = General.dropOffLocation;
    document.getElementById("pickUpdate").value = General.pickUpDate;
    document.getElementById("pickUptime").value = General.pickUpTime;
    document.getElementById("dropOffdate").value = General.dropOffDate;
    document.getElementById("dropOfftime").value = General.dropOffTime;
    updateTotalPrice(car);
  }
  if (car) {
    console.log(car); // the id of the car
    document.getElementById("brandSelect").value = car.brand;
    document.getElementById("modelSelect").value = car.model;
  }
  if (CurrentUser) {
    document.getElementById("fname").value = CurrentUser.userName;
    document.getElementById("email").value = CurrentUser.email;
  }

  form.addEventListener("submit", function (event) {
    const isFirstNameValid = validateFirstName("fname", "fname-error");
    const isLastNameValid = validateLastName("lname", "lname-error");
    const isEmailValid = validateEmail("email", "email-error");
    const isPhoneValid = validatePhone("phone", "phone-error");
    const isPickupLocationValid = validateLocation("pickupL", "pickupL-error");
    const isDropoffLocationValid = validateLocation("dropOffL","dropOffL-error");
    const ispickupDateValid = validatePickupDate("pickUpdate","pickUpdate-error" );
    const ispickupTimeValid = validatePickupTime("pickUptime","pickUptime-error");
    const isdropoffDateValid = validateDropoffDate("dropOffdate","pickUpdate","dropOffdate-error");
    const isdropoffTimeValid = validateDropoffTime("dropOfftime","pickUptime","pickUpdate","pickUpdate","dropOfftime-error");
    if (!(isFirstNameValid &&isLastNameValid &&isEmailValid &&isPhoneValid &&isPickupLocationValid && isDropoffLocationValid &&
        ispickupDateValid &&ispickupTimeValid &&isdropoffDateValid &&isdropoffTimeValid)) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    // document.getElementById("totalPrice").value=`$${totalCost}`;
    
    const newBooking = handleBook.createBooking(
      document.getElementById("pickupL").value,
      document.getElementById("pickUpdate").value,
      document.getElementById("pickUptime").value,
      document.getElementById("dropOffL").value,
      document.getElementById("dropOffdate").value,
      document.getElementById("dropOfftime").value,
      document.getElementById("fname").value,
      document.getElementById("lname").value,
      document.getElementById("phone").value,
      document.getElementById("email").value,
      car.id,
      car.brand,
      car.model,
      totalCost
    );
    handleBook.addBooking(newBooking);
    handleCar.markCarAsBooked(bookedCarId);
    popupModal("pop", newBooking);
    const toastEl = document.getElementById("successToast");
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    setTimeout(() => {
      toast.hide();
    }, 1000);
    form.reset();
    sessionStorage.removeItem("bookedCarId"); // so when the user click back button after submission --> no car data to be selected .
  });
});

