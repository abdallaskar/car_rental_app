document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (nameInput) nameInput.addEventListener("input", validateName);
    if (emailInput) emailInput.addEventListener("input", validateEmail);
    if (messageInput) messageInput.addEventListener("input", validateMessage);

    contactForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopPropagation();

        validateName();
        validateEmail();
        validateMessage();

        if (contactForm.checkValidity()) {
          processForm();
        } else {
          contactForm.classList.add("was-validated");
        }
      },
      false
    );

    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", function (e) {
        const x = e.target.value
          .replace(/\D/g, "")
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      });
    }
  }

  function validateName() {
    const nameInput = document.getElementById("name");
    const value = nameInput.value.trim();
    const minLength = 7;

    // Clear previous validation
    nameInput.setCustomValidity("");
    nameInput.classList.remove("is-invalid");

    // Check if empty
    if (value === "") {
      nameInput.setCustomValidity("Name is required");
      return false;
    }

    // Check minimum length
    if (value.length < minLength) {
      nameInput.setCustomValidity(
        `Name must be at least ${minLength} characters long`
      );
      return false;
    }

    // Check character types
    if (!/^[a-zA-Zà-üÀ-Ü\s'-]+$/.test(value)) {
      nameInput.setCustomValidity("Name can only contain letters and spaces");
      return false;
    }

    return true;
  }

  function validateEmail() {
    const emailInput = document.getElementById("email");
    const value = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Clear previous validation
    emailInput.setCustomValidity("");
    emailInput.classList.remove("is-invalid");

    // Check if empty
    if (value === "") {
      emailInput.setCustomValidity("Email is required");
      return false;
    }

    // Check format
    if (!emailRegex.test(value)) {
      emailInput.setCustomValidity("Please enter a valid email address");
      return false;
    }

    return true;
  }

  function validateMessage() {
    const messageInput = document.getElementById("message");
    const value = messageInput.value.trim();
    const minLength = 12;

    // Clear previous validation
    messageInput.setCustomValidity("");
    messageInput.classList.remove("is-invalid");

    // Check if empty
    if (value === "") {
      messageInput.setCustomValidity("Message is required");
      return false;
    }

    // Check minimum length
    if (value.length < minLength) {
      messageInput.setCustomValidity(
        `Message must be at least ${minLength} characters long`
      );
      return false;
    }

    return true;
  }

  function processForm() {
    // Get form values
    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value.trim(),
      timestamp: new Date().toISOString(),
    };

    // In a real app, you would send this to a server
    console.log("Form submitted:", formData);

    // Store in localStorage (for demo purposes)
    const contacts = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]"
    );
    contacts.push(formData);
    localStorage.setItem("contactSubmissions", JSON.stringify(contacts));

    // Show success message
    showSuccessMessage();

    // Reset form and clear validation
    contactForm.reset();
    contactForm.classList.remove("was-validated");

    // Clear any remaining invalid states
    const inputs = contactForm.querySelectorAll(".form-control, .form-select");
    inputs.forEach((input) => {
      input.classList.remove("is-invalid");
      input.setCustomValidity("");
    });
  }

  function showSuccessMessage() {
    const toastHTML = `
                <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header bg-success text-white">
                            <strong class="me-auto">Success</strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            Thank you for your message! We'll get back to you soon.
                        </div>
                    </div>
                </div>
            `;

    // Add to DOM
    const toastContainer = document.createElement("div");
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      toastContainer.remove();
    }, 5000);
  }
});

// Map handleing cuurent location
//
// let para = document.getElementById("para");

// function goToLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showLocation, showError);
//   } else {
//     para.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showLocation(pos) {
//   let lat = pos.coords.latitude;
//   let long = pos.coords.longitude;

//   let url = `https://www.google.pl/maps?q=${lat},${long}`;
//   window.open(url, "_blank");
// }

// function showError(error) {
//   // console.log(error);

//   // error => code => number
//   switch (error.code) {
//     //1
//     case error.PERMISSION_DENIED:
//       para.innerHTML = "User denied the request for Geolocation.";
//       break;
//     // 2
//     case error.POSITION_UNAVAILABLE:
//       para.innerHTML = "Location information is unavailable.";
//       break;
//     // 3
//     case error.TIMEOUT:
//       para.innerHTML = "The request to get user location timed out.";
//       break;
//     // 0
//     case error.UNKNOWN_ERROR:
//       para.innerHTML = "An unknown error occurred.";
//       break;
//   }
// }
