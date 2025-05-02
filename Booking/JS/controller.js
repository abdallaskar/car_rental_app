export function controlDateView(){
    const pickupDateInput = document.getElementById("pickUpdate");
    const pickupTimeInput = document.getElementById("pickUptime");
    const dropoffDateInput = document.getElementById("dropOffdate");
    const dropoffTimeInput = document.getElementById("dropOfftime");
  
    const today = new Date().toISOString().split("T")[0];
    pickupDateInput.setAttribute("min", today); // prevent past dates
  
    pickupDateInput.addEventListener("change", () => {
      const pickupDate = pickupDateInput.value;
      dropoffDateInput.setAttribute("min", pickupDate); // enforce dropoff >= pickup
      // // Clear drop-off time if dates change
      // dropoffTimeInput.value = "";
    });
  
    pickupTimeInput.addEventListener("change", () => {
      if (pickupDateInput.value === dropoffDateInput.value) {
        dropoffTimeInput.setAttribute("min", pickupTimeInput.value); // enforce dropoff time > pickup time
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