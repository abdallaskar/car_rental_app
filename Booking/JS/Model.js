
export class BookingForm {
  constructor(pickupLocation,pickupDate,pickupTime,dropoffLocation,dropoffDate,DropoffTime,firstName,lastName,phoneNumber,email,carId,brand,model,bookingId) {
    this.pickupLocation = pickupLocation;
    this.pickupDate = pickupDate;
    this.pickupTime = pickupTime;
    this.dropoffLocation = dropoffLocation;
    this.dropoffDate = dropoffDate;
    this.DropoffTime = DropoffTime;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.carId = carId;
    this.brand = brand;
    this.model = model;
    this.bookingId = bookingId;
  }
}