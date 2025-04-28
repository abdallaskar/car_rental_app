export function popupModal(id,data){
   let element = document.getElementById(id);
   element.innerHTML=`
   <div class="modal  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content align-items-center">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Booking Summary</h1>
          <button type="button" class="btn-close justify-self-end" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Full Name: ${data.firstName} ${data.lastName}</p>
          <p>Phone Number: ${data.phoneNumber}</p>
          <p>Booked Car: ${data.brand} ${data.model}  (${data.type})</p>
          <p>Pick Up Data: ${data.pickupLocation}, in ${data.pickupDate} at ${data.pickupTime}</p>
          <p>Drop Off Data: ${data.dropoffLocation}, in ${data.dropoffDate} at ${data.DropoffTime}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
}

export function generateCarForm() {
    const cars = JSON.parse(localStorage.getItem('cars'));
    
    // Extract unique brands, models, and types
    const brands = [...new Set(cars.map(car => car.brand))];
    const models = [...new Set(cars.map(car => car.model))];
    const types = [...new Set(cars.map(car => car.type))];
  
    // Create the dropdowns dynamically
    const brandSelect = document.getElementById('brandSelect');
    const modelSelect = document.getElementById('modelSelect');
    const typeSelect = document.getElementById('typeSelect');
  
    // Populate the brand dropdown
    brandSelect.innerHTML = `<option value="">Select Brand</option>`;
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
  
    // Populate the model dropdown
    modelSelect.innerHTML = `<option value="">Select Model</option>`;
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  
    // Populate the type dropdown
    typeSelect.innerHTML = `<option value="">Select Type</option>`;
    types.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      typeSelect.appendChild(option);
    });
  }
  
  // Call the function to populate the dropdowns when the page loads
