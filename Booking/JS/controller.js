// import { validateDropoffDate,validatePickupDate } from "./validation.js";
export function controlDateView() {
  const pickupDateInput = document.getElementById("pickUpdate");
  const pickupTimeInput = document.getElementById("pickUptime");
  const dropoffDateInput = document.getElementById("dropOffdate");
  const dropoffTimeInput = document.getElementById("dropOfftime");

  const today = new Date().toISOString().split("T")[0];
  pickupDateInput.setAttribute("min", today); // prevent past dates

  pickupDateInput.addEventListener("change", () => {
    const pickupDate = pickupDateInput.value;
    dropoffDateInput.setAttribute("min", pickupDate); // enforce dropoff >= pickup
  });
 
  pickupTimeInput.addEventListener("change", () => {
    if (pickupDateInput.value === dropoffDateInput.value) {
      dropoffTimeInput.setAttribute("min", pickupTimeInput.value); 
    } else {
      dropoffTimeInput.removeAttribute("min");
    }
  });
  

  if (pickupDateInput.value === dropoffDateInput.value) {
    dropoffTimeInput.setAttribute("min", pickupTimeInput.value);
  } else {
    dropoffTimeInput.removeAttribute("min");
  }
}

export function calculateTotalPrice(pickupDate, dropoffDate, rentalPrice) {
  // Convert date strings to Date objects
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  // Calculate the difference in days
  const timeDiff = dropoff - pickup;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days

  // If days difference is 0 or 1, return the rental price as it is
  if (daysDiff <= 1) {
    return rentalPrice;
  }

  // Otherwise, multiply rental price by number of days
  return rentalPrice * daysDiff;
}
export  function updateTotalPrice(car) {
    const pickUpDate = document.getElementById("pickUpdate").value;
    const dropOffDate = document.getElementById("dropOffdate").value;
   
    if (pickUpDate&&dropOffDate){
      const totalCost = calculateTotalPrice(pickUpDate, dropOffDate, car.rental_price);
      document.getElementById("totalPrice").value = `$${totalCost}`;
    }
    else {
      document.getElementById("totalPrice").value = "";
    }
      
}
 
