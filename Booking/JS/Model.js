export class BookingForm {
  constructor(
    pickupLocation,
    pickupDate,
    pickupTime,
    dropoffLocation,
    dropoffDate,
    dropoffTime,
    firstName,
    lastName,
    phoneNumber,
    email,
    carId,
    brand,
    model,
    bookingId,
    totalCost,
    status = "Active"
  ) {
    this.pickupLocation = pickupLocation;
    this.pickupDate = pickupDate;
    this.pickupTime = pickupTime;
    this.dropoffLocation = dropoffLocation;
    this.dropoffDate = dropoffDate;
    this.dropoffTime = dropoffTime;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.carId = carId;
    this.brand = brand;
    this.model = model;
    this.bookingId = bookingId;
    this.totalCost = totalCost;
    this.status = status;
  }
}
