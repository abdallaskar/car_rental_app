import { controlDateView } from "./Booking/JS/controller.js";
import { validateLocation } from "./utils/validation.js";



document.addEventListener('DOMContentLoaded',function(){
  //show only dates from the current date.
  controlDateView();
  document.getElementById('pickupL').addEventListener("input",()=>validateLocation('pickupL','pickupL-error'));
  document.getElementById("dropOffL").addEventListener("input",()=>validateLocation("dropOffL","dropOffL-error"));




  const form = document.getElementById("generalBooking");
    form.addEventListener("submit", function (event) {
      const isPickupLocationValid = validateLocation('pickupL','pickupL-error');
      const isDropoffLocationValid = validateLocation("dropOffL","dropOffL-error");
      if (!(isPickupLocationValid &&isDropoffLocationValid )){
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
  });