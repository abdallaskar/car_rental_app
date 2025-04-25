export default class CarView {
  constructor() {
    this.tableBody = document.getElementById("carsTableBody");
    this.formContainer = document.getElementById("carFormContainer");
    this.form = document.getElementById("carForm");
    this.formTitle = document.getElementById("carFormTitle");
    this.addCarBtn = document.getElementById("addCarBtn");
    this.cancelCarBtn = document.getElementById("cancelCarBtn");
  }

  renderCarsTable(cars) {
    this.tableBody.innerHTML = "";

    cars.forEach((car) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${car.id}</td>
          <td><img src="/AdminDashboard/carImgs/${car.image}" alt="${
        car.brand
      } ${car.model}" style="height: 50px;"></td>
          <td>${car.brand}</td>
          <td>${car.model}</td>
          <td>${car.type}</td>
          <td>${car.year}</td>
          <td>$${car.price}</td>
          <td><span class="badge ${
            car.available ? "bg-success" : "bg-danger"
          }">${car.available ? "Available" : "Booked"}</span></td>
          <td>
            <button class="btn btn-sm btn-warning edit-car" data-id="${car.id}">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-car" data-id="${
              car.id
            }">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
      this.tableBody.appendChild(row);
    });
  }

  showAddForm() {
    this.formTitle.textContent = "Add New Car";
    this.form.reset();
    this.formContainer.style.display = "block";
  }

  showEditForm(car) {
    this.formTitle.textContent = "Edit Car";
    document.getElementById("carId").value = car.id;
    document.getElementById("carBrand").value = car.brand;
    document.getElementById("carModel").value = car.model;
    document.getElementById("carType").value = car.type;
    document.getElementById("carYear").value = car.year;
    document.getElementById("carPrice").value = car.price;
    document.getElementById("carImage").value = car.image;
    document.getElementById("carDescription").value = car.description || "";
    document.getElementById("carAvailable").checked = car.available;
    this.formContainer.style.display = "block";
  }

  hideForm() {
    this.formContainer.style.display = "none";
  }

  getFormData() {
    return {
      id: document.getElementById("carId").value
        ? parseInt(document.getElementById("carId").value)
        : null,
      brand: document.getElementById("carBrand").value,
      model: document.getElementById("carModel").value,
      type: document.getElementById("carType").value,
      year: parseInt(document.getElementById("carYear").value),
      price: parseFloat(document.getElementById("carPrice").value),
      image: document.getElementById("carImage").value,
      description: document.getElementById("carDescription").value,
      available: document.getElementById("carAvailable").checked,
    };
  }

  bindAddCar(handler) {
    this.addCarBtn.addEventListener("click", handler);
  }

  bindCancelForm(handler) {
    this.cancelCarBtn.addEventListener("click", handler);
  }

  bindSubmitForm(handler) {
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  bindEditCar(handler) {
    this.tableBody.addEventListener("click", (e) => {
      if (e.target.closest(".edit-car")) {
        const id = parseInt(e.target.closest(".edit-car").dataset.id);
        handler(id);
      }
    });
  }

  bindDeleteCar(handler) {
    this.tableBody.addEventListener("click", (e) => {
      if (e.target.closest(".delete-car")) {
        const id = parseInt(e.target.closest(".delete-car").dataset.id);
        if (confirm("Are you sure you want to delete this car?")) {
          handler(id);
        }
      }
    });
  }
}
