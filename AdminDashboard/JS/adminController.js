// function to initialize system with static default data
export function InitializeStaticCars(handleCar) {
  if (handleCar.getAllCars().length === 0) {
    const car1 = handleCar.createCar(
      1,
      "1.jpg",
      "Toyota",
      "Camry",
      "Sedan",
      100,
      "2022",
      "A reliable sedan with a comfortable interior and advanced safety features."
    );
    const car2 = handleCar.createCar(
      2,
      "2.jpg",
      "Honda",
      "Civic",
      "Sedan",
      80,
      "2022",
      "A compact car known for its reliability and fuel efficiency."
    );
    const car3 = handleCar.createCar(
      3,
      "3.jpg",
      "Ford",
      "Mustang",
      "Coupe",
      150,
      "2022",
      "Sports car with a powerful engine and sleek design"
    );
    const car4 = handleCar.createCar(
      4,
      "4.jpg",
      "Chevrolet",
      "Impala",
      "Sedan",
      70,
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
