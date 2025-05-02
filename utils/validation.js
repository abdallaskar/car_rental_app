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