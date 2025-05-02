import handleCar from "../../CarListings/JS/controller-instance.js";
export function popupModal(id,data){
  function goHome() {
    window.location.href="../../home.html";
  }
   let element = document.getElementById(id);
   element.innerHTML=`
   <div class="modal  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content align-items-center">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Booking Summary</h1>
        </div>
        <div class="modal-body">
          <p><strong>Full Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Phone Number:</strong> ${data.phoneNumber}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Booked Car:</strong> ${data.brand} ${data.model}</p>
          <p><strong>Pick Up Data:</strong> ${data.pickupLocation}, in ${data.pickupDate} at ${data.pickupTime}</p>
          <p><strong>Drop Off Data:</strong> ${data.dropoffLocation}, in ${data.dropoffDate} at ${data.DropoffTime}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='modalCloseBtn' ">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
    document.getElementById('modalCloseBtn').addEventListener('click', () => {
      window.location.href = "../../home.html";
    });
}

// export function generateCarForm() {    // This function shows the brand in the form of html .
//     const cars = handleCar.getCarsAvalible();  // Array of all available cars.
   
//     // Extract unique brands, models, and types using set and by using spread operator ==> convert set to an array.
//     const brands = [...new Set(cars.map(car => car.brand))];
//     const models = [...new Set(cars.map(car => car.model))];
  
//     //selects each select of brand , model .
//     const brandSelect = document.getElementById('brandSelect');
//     const modelSelect = document.getElementById('modelSelect');
  
//     //Car brand dropdown
//     brands.forEach(brand => {
//       const option = document.createElement('option');
//       option.value = brand;
//       option.textContent = brand;
//       brandSelect.appendChild(option);
//     });
  
//     // Car model dropdown
//     models.forEach(model => {
//       const option = document.createElement('option');
//       option.value = model;
//       option.textContent = model;
//       modelSelect.appendChild(option);
//     });
//   }
  
 // BOOKING FUNCTIONALITY .
 export function navigateToBooking(car_id) {
  if (car_id) {
    sessionStorage.setItem("bookedCarId", JSON.stringify(car_id));
    window.location.href = "../Booking/booking.html";
  } else {
    console.error("Car not found!");
  }
}
// END OF BOOKING FUNCTIONALITY.
export function changeCar(){
  window.location.href="../../CarListings/carlist.html"; 
}
