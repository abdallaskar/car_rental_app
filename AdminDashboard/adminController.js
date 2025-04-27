export function InitializeStaticCars(handleCar) {
  if (handleCar.getAllCars().length === 0) {
    const car1 = handleCar.createCar(
      1,
      "./Images/2.jpg",
      "Toyota",
      "Camry",
      "Sedan",
      30000,
      "2022",
      "A reliable sedan with a comfortable interior and advanced safety features."
    );
    const car2 = handleCar.createCar(
      2,
      "./Images/3.jpg",
      "Honda",
      "Civic",
      "Sedan",
      25000,
      "2022",
      "A compact car known for its reliability and fuel efficiency."
    );
    const car3 = handleCar.createCar(
      3,
      "./Images/4.jpg",
      "Ford",
      "Mustang",
      "Coupe",
      55000,
      "2022",
      "Sports car with a powerful engine and sleek design"
    );
    const car4 = handleCar.createCar(
      4,
      "./Images/5.jpg",
      "Chevrolet",
      "Impala",
      "Sedan",
      22000,
      "2022",
      "Spacious sedan with a comfortable interior."
    );
    handleCar.addCar(car1);
    handleCar.addCar(car2);
    handleCar.addCar(car3);
    handleCar.addCar(car4);
    handleCar.markCarAsBooked(2);
  }
}
