import { controlDateView } from "./JS/controller.js";
import { BookingForm } from "./JS/Model.js";
import { popupModal } from "./JS/utils.js";

controlDateView(); // disables previous dates from today .

    
    const form = document.getElementById("bookingForm");
    let General =JSON.parse(sessionStorage.getItem("GeneralBookingData")) ;
  
    document.addEventListener('DOMContentLoaded',function(){
        if (General) {
            document.querySelector('input[placeholder="pick up location"]').value = General.pickupLocation;
            document.querySelector('input[placeholder="Drop Off location"]').value = General.dropoffLocation;
            document.getElementById("pickUpdate").value = General.pickupDate;
            document.getElementById("pickUptime").value = General.pickupTime;
            document.getElementById("dropOffdate").value = General.dropoffDate;
            document.getElementById("dropOfftime").value = General.DropoffTime;
        }
        
            form.addEventListener("submit",function(event){
                event.preventDefault();
                const firstName = document.getElementById("fname").value;
                const lastName = document.getElementById("lname").value;
                const email = document.getElementById("email").value;
                const phone = document.getElementById("phone").value;
                const pickUpLocation = document.querySelector('input[placeholder="pick up location"]').value;
                const dropOffLocation = document.querySelector('input[placeholder="Drop Off location"]').value;
                const pickUpDate = document.getElementById("pickUpdate").value;
                const pickUpTime = document.getElementById("pickUptime").value;
                const dropOffDate = document.getElementById("dropOffdate").value;
                const dropOffTime = document.getElementById("dropOfftime").value;
                const Finalbook = new BookingForm(pickUpLocation,pickUpDate,pickUpTime,dropOffLocation,dropOffDate,dropOffTime,firstName,lastName,phone,email);
                localStorage.setItem("BookingData",JSON.stringify(Finalbook));
                let Data = JSON.parse(localStorage.getItem("BookingData"));
                popupModal("pop",Data);
                setTimeout(() => {form.reset();}, 1000);   
            });
    });


   





// let p = document.createElement("p");

// firstName.addEventListener("input",function(){
    
// if (this.value.trim() === "") {
//     this.classList.remove("is-valid"); // Remove any valid class
//     p.classList.add("alert");
//     p.textContent="This field can't be empty";
//     this.append(p)
// } else if (!/^[A-Za-z]+$/.test(this.value.trim())) {
//     this.classList.remove("is-valid"); // Remove any valid class

// } else {
//     this.classList.remove("is-invalid"); // Remove any invalid class
//     this.classList.add("is-valid");
// }
// });


























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

