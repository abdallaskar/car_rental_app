// function that validates first name only .
export function validateFirstName(fnameId,itsErrorMsgId) {
    const input = document.getElementById(fnameId);
    const error = document.getElementById(itsErrorMsgId);
    error.style.color="red";
    error.style.fontSize="14px";

    const value = input.value.trim();
    if (!value) {
      error.textContent = "First name is required.";
      input.classList.add("is-invalid");
      return false;
    }
    if (!/^[A-Za-z]{2,}$/.test(value)) {
      error.textContent = "First name must be at least 2 letters.";
      input.classList.add("is-invalid");
      return false;
    }
    error.textContent = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
// function that validates last name (It may include spaces between it).
export function validateLastName(lnameId,itsErrorMsgId) {
    const input = document.getElementById(lnameId);
    const error = document.getElementById(itsErrorMsgId);
    error.style.color="red";
    error.style.fontSize="14px";
    const value = input.value.trim();
    if (!value) {
      error.textContent = "Last name is required.";
      input.classList.add("is-invalid");
      return false;
    }
    if (!/^[A-Za-z]{2,}( [A-Za-z]{2,})*$/.test(value)) {
      error.textContent = "Last name must be at least 2 letters.";
      input.classList.add("is-invalid");
      return false;
    }
    error.textContent = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
  
  export function validateEmail(emailId,itsErrorMsgId) {
    const input = document.getElementById(emailId);
    const error = document.getElementById(itsErrorMsgId);
    error.style.color="red";
    error.style.fontSize="14px";
    const value = input.value.trim();
    if (!value) {
      error.textContent = "Email is required.";
      input.classList.add("is-invalid");
      return false;
    }
     // expresssion : 'letters(upper or lower) and numbers and . -' @ 'letters(upper or lower) and numbers and . -' . 'letters(upper or lower)'
    if (!/^[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
      error.textContent = "Enter a valid email address.";
      input.classList.add("is-invalid");
      return false;
    }
    error.textContent = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
  
  export function validatePhone(phoneId,itsErrorMsgId)  {
    const input = document.getElementById(phoneId);
    const error = document.getElementById(itsErrorMsgId);
    error.style.color="red";
    error.style.fontSize="14px";
    const value = input.value.trim();
    if (!value) {
      error.textContent = "Phone number is required.";
      input.classList.add("is-invalid");
      return false;
    }
   // Check if the phone number starts with "01"
    if (!/^01/.test(value)) {
        error.textContent = "Phone number should start with 01.";
        input.classList.add("is-invalid");
        return false;
    }
    // Check if the phone number has exactly 11 digits
    if (!/^\d{11}$/.test(value)) {
        error.textContent = "Phone number should be 11 digits long.";
        input.classList.add("is-invalid");
        return false;
    }
        error.textContent = "";
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return true;
  }
  
  export function validateLocation (locationId,itsErrorMsgId) {
    const input = document.getElementById(locationId);
    const error = document.getElementById(itsErrorMsgId);
    error.style.color="red";
    error.style.fontSize="14px";
    const value = input.value.trim();
    if (!value) {
        error.textContent = "Required Field";
        input.classList.add("is-invalid");
        return false;
      }
      // Check if the value contains only numbers, spaces, and letters
      if (!/^[A-Za-z0-9\s]+$/.test(value)) {
        error.textContent = "Only letters spaces and numbers are allowed.";
        input.classList.add("is-invalid");
        return false;
      }
      // If both checks pass
      error.textContent = "";
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      return true;
    
  }
  export function validatePickupDate(pickupDateId, errorMsgId) {
      const input = document.getElementById(pickupDateId);
      const error = document.getElementById(errorMsgId);
      error.style.color = "red";
      error.style.fontSize = "14px";
    
      const value = input.value;
      if (!value) {
        error.textContent = "Pickup date is required.";
        input.classList.add("is-invalid");
        return false;
      }
    
      error.textContent = "";
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      return true;
  }
  export function validateDropoffDate(dropoffDateId, pickupDateId, errorMsgId) {
    const dropInput = document.getElementById(dropoffDateId);
    const pickupInput = document.getElementById(pickupDateId);
    const error = document.getElementById(errorMsgId);
    error.style.color = "red";
    error.style.fontSize = "14px";
  
    const dropValue = dropInput.value;
    const pickupValue = pickupInput.value;
  
    if (!dropValue) {
      error.textContent = "Drop-off date is required.";
      dropInput.classList.add("is-invalid");
      return false;
    }
  
    if (pickupValue && new Date(dropValue) < new Date(pickupValue)) {
      error.textContent = "Drop-off date cannot be before pickup date.";
      dropInput.classList.add("is-invalid");
      return false;
    }
  
    error.textContent = "";
    dropInput.classList.remove("is-invalid");
    dropInput.classList.add("is-valid");
    return true;
  }

  export function validatePickupTime(pickupTimeId, errorMsgId) {
    const input = document.getElementById(pickupTimeId);
    const error = document.getElementById(errorMsgId);
    error.style.color = "red";
    error.style.fontSize = "14px";
  
    const value = input.value;
    if (!value) {
      error.textContent = "Pickup time is required.";
      input.classList.add("is-invalid");
      return false;
    }
  
    error.textContent = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
  export function validateDropoffTime(dropoffTimeId, pickupTimeId, pickupDateId, dropoffDateId, errorMsgId) {
    const dropTime = document.getElementById(dropoffTimeId);
    const pickupTime = document.getElementById(pickupTimeId);
    const pickupDate = document.getElementById(pickupDateId);
    const dropoffDate = document.getElementById(dropoffDateId);
    const error = document.getElementById(errorMsgId);
    error.style.color = "red";
    error.style.fontSize = "14px";
  
    const dropTimeVal = dropTime.value;
    const pickupTimeVal = pickupTime.value;
    const pickupDateVal = pickupDate.value;
    const dropoffDateVal = dropoffDate.value;
  
    if (!dropTimeVal) {
      error.textContent = "Drop-off time is required.";
      dropTime.classList.add("is-invalid");
      return false;
    }
 if(pickupDateVal===dropoffDateVal){
  if (dropTimeVal<pickupTimeVal){

    error.textContent = "Drop-off time must be after pickup time.";
    dropTime.classList.add("is-invalid");
    return false;
  }
 }
    error.textContent = "";
    dropTime.classList.remove("is-invalid");
    dropTime.classList.add("is-valid");
    return true;
  }

  
  
  
  // export function validateDates(pickupDateId, dropoffDateId, pickuperrorMsg,dopoffErrorMsg) {
  //   const pickupDateInput = document.getElementById(pickupDateId);
  //   const dropoffDateInput = document.getElementById(dropoffDateId);
  //   const pickuperror = document.getElementById(pickuperrorMsg);
  //   const dropofferror = document.getElementById(dopoffErrorMsg);
  //   pickuperror.style.color = "red";
  //   pickuperror.style.fontSize = "14px";
  //   dropofferror.style.color = "red";
  //   dropofferror.style.fontSize = "14px";
  //   const pickupDate = pickupDateInput.value;
  //   const dropoffDate = dropoffDateInput.value;
  
  //   if (!pickupDate) {
  //     pickuperror.textContent = "Pickup date is required.";
  //     pickupDateInput.classList.add("is-invalid");
  //     return false;
  //   }
  
  //   if (!dropoffDate) {
  //     dropofferror.textContent = "Drop-off date is required.";
  //     dropoffDateInput.classList.add("is-invalid");
  //     return false;
  //   }
  
  //   if (new Date(dropoffDate) < new Date(pickupDate)) {
  //     dropofferror.textContent = "Drop-off date cannot be before pickup date.";
  //     dropoffDateInput.classList.add("is-invalid");
  //     return false;
  //   }
  
  //   pickuperror.textContent = "";
  //   pickupDateInput.textContent = "";
  //   pickupDateInput.classList.remove("is-invalid");
  //   dropoffDateInput.classList.remove("is-invalid");
  //   pickupDateInput.classList.add("is-valid");
  //   dropoffDateInput.classList.add("is-valid");
  
  //   return true;
  // }

  // export function validateTimes(pickupDateId, pickupTimeId, dropoffDateId, dropoffTimeId, PickTimeErrorMsg,DropTimeErrorMsg) {
  //   const pickupDateInput = document.getElementById(pickupDateId);
  //   const pickupTimeInput = document.getElementById(pickupTimeId);
  //   const dropoffDateInput = document.getElementById(dropoffDateId);
  //   const dropoffTimeInput = document.getElementById(dropoffTimeId);
  //   const PickTimeerror = document.getElementById(PickTimeErrorMsg);
  //   const DropTimeerror = document.getElementById(DropTimeErrorMsg);
  
  //   PickTimeerror.style.color = "red";
  //   DropTimeerror.style.color = "red";
  //   PickTimeerror.style.fontSize = "14px";
  //   DropTimeerror.style.fontSize = "14px";
  
  //   const pickupDate = pickupDateInput.value;
  //   const pickupTime = pickupTimeInput.value;
  //   const dropoffDate = dropoffDateInput.value;
  //   const dropoffTime = dropoffTimeInput.value;
  
  //   if (!pickupTime) {
  //     PickTimeerror.textContent = "Pickup time is required.";
  //     pickupTimeInput.classList.add("is-invalid");
  //     return false;
  //   }
  
  //   if (!dropoffTime) {
  //     DropTimeerror.textContent = "Drop-off time is required.";
  //     dropoffTimeInput.classList.add("is-invalid");
  //     return false;
  //   }
  
  //   // Only compare time if both dates are the same
  //   if (pickupDate === dropoffDate && pickupTime >= dropoffTime) {
  //     DropTimeerror.textContent = "Drop-off time must be after pickup time.";
  //     dropoffTimeInput.classList.add("is-invalid");
  //     return false;
  //   }
  
  //   PickTimeerror.textContent = "";
  //   DropTimeerror.textContent = "";
  //   pickupTimeInput.classList.remove("is-invalid");
  //   dropoffTimeInput.classList.remove("is-invalid");
  //   pickupTimeInput.classList.add("is-valid");
  //   dropoffTimeInput.classList.add("is-valid");
  
  //   return true;
  // }
    