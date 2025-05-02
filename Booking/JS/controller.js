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

export function calculateTotalPrice(pickupDate, dropoffDate, rentalPrice) {
  // Convert date strings to Date objects
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  // Calculate the difference in days
  const timeDiff = dropoff - pickup;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days

  // If days difference is 0 or 1, return the rental price as is
  if (daysDiff <= 1) {
    return rentalPrice;
  }

  // Otherwise, multiply rental price by number of days
  return rentalPrice * daysDiff;
}
