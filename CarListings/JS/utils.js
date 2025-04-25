
export { renderAllCars, renderCar }; // Exporting functions for use in other modules

// Function to render all Cars in the main container
function renderAllCars(cars, mainContainer) {
    mainContainer.innerHTML = ""; // Clear the main container before rendering new cars
    cars.forEach(function (car) {
        renderCar(car, mainContainer); // Render the card and details in the main container
    });
}

// Function to render car cards and card Details in the main container
function renderCar(car, mainContainer) {
    const card = createCard(car);
    const details = createCardDetails(car);
    mainContainer.appendChild(createElementFromHTML(card));
    mainContainer.innerHTML += details; // Append the details to the main container
    // Helper function to convert an HTML string to a DOM element
    function createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
}

// create card function to create card for each car 
function createCard(car) {
    return `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm card-hover" role="button" data-bs-toggle="modal"
            data-bs-target="#${car.car_id}">
            <img src="${car.url_img}" class="card-img-top" alt="${car.brand}" style="height: 300px; object-fit: cover;">
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                <h5 class="card-title">${car.brand} ${car.model}</h5>
                <p class="card-text">Short description of ${car.brand} ${car.model}.</p>
                </div>
                <div class="d-flex justify-content-center mt-3">
                <a href="#" class="btn btn-primary">View Details</a>
                </div>
            </div>
            </div>
        </div>
        `;
}

// Create function to create Details Card whene 
// I click on any cards display this card in modal and conatin all details of the car and booking button 
function createCardDetails(car) {
    // Set modal title
    return `
    <div class="modal fade" id="${car.car_id}" tabindex="-1" aria-labelledby="cardModaLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title" id="${car.car_id}">${car.brand} ${car.model} Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
      <!-- Modal Body -->
      <div class="modal-body">
        <div class="row g-3 align-items-center">
          <!-- Product Image -->
          <div class="col-md-6">
            <img src="${car.url_img}" alt="${car.brand} ${car.model}" class="img-fluid rounded">
          </div>
          <!-- Product Details -->
          <div class="col-md-6 d-flex flex-column justify-content-center">
            <h4>${car.brand} ${car.model}</h4>
            <p>${car.descrption}</p>
            <p><strong>Price:</strong> $${car.rental_price}</p>
            <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-primary">Book Now</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Footer with Close Button -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        `;

}