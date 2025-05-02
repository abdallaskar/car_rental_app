// Initialize charts when the document is ready
document.addEventListener("DOMContentLoaded", function () {
  let carDistributionChart;
  let bookingTrendsChart;

  // Function to update charts with real data
  function updateCharts(handleCar) {
    const cars = handleCar.getAllCars();

    // Count booked cars by brand
    const brandCounts = {};
    cars.forEach((car) => {
      if (car.booked) {
        brandCounts[car.brand] = (brandCounts[car.brand] || 0) + 1;
      }
    });

    // Prepare data for the chart
    const labels = Object.keys(brandCounts);
    const data = Object.values(brandCounts);

    // Generate colors dynamically
    const backgroundColors = labels.map((_, index) => {
      const hue = (index * 137.5) % 360; // Golden angle approximation for good color distribution
      return `hsla(${hue}, 70%, 60%, 0.8)`;
    });

    const borderColors = labels.map((_, index) => {
      const hue = (index * 137.5) % 360;
      return `hsla(${hue}, 70%, 60%, 1)`;
    });

    // Update or create the chart
    if (carDistributionChart) {
      carDistributionChart.data.labels = labels;
      carDistributionChart.data.datasets[0].data = data;
      carDistributionChart.data.datasets[0].backgroundColor = backgroundColors;
      carDistributionChart.data.datasets[0].borderColor = borderColors;
      carDistributionChart.update();
    } else {
      const carDistributionCtx = document
        .getElementById("carDistributionChart")
        .getContext("2d");

      carDistributionChart = new Chart(carDistributionCtx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Booked Cars by Brand",
              font: {
                size: 16,
              },
            },
          },
        },
      });
    }

    // Booking Trends Chart (keeping the existing implementation)
    if (!bookingTrendsChart) {
      const bookingTrendsCtx = document
        .getElementById("bookingTrendsChart")
        .getContext("2d");

      bookingTrendsChart = new Chart(bookingTrendsCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Bookings",
              data: [65, 59, 80, 81, 56, 55],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  // Export the updateCharts function to be used by other modules
  window.updateCharts = updateCharts;
});

// Make updateCharts function globally available
window.updateCharts = function (handleCar) {
  const cars = handleCar.getAllCars();

  // Count booked cars by brand
  const brandCounts = {};
  cars.forEach((car) => {
    if (car.booked) {
      brandCounts[car.brand] = (brandCounts[car.brand] || 0) + 1;
    }
  });

  // Prepare data for the chart
  const labels = Object.keys(brandCounts);
  const data = Object.values(brandCounts);

  // Generate colors dynamically
  const backgroundColors = labels.map((_, index) => {
    const hue = (index * 137.5) % 360;
    return `hsla(${hue}, 70%, 60%, 0.8)`;
  });

  const borderColors = labels.map((_, index) => {
    const hue = (index * 137.5) % 360;
    return `hsla(${hue}, 70%, 60%, 1)`;
  });

  // Update or create the chart
  if (window.carDistributionChart) {
    window.carDistributionChart.data.labels = labels;
    window.carDistributionChart.data.datasets[0].data = data;
    window.carDistributionChart.data.datasets[0].backgroundColor =
      backgroundColors;
    window.carDistributionChart.data.datasets[0].borderColor = borderColors;
    window.carDistributionChart.update();
  } else {
    const carDistributionCtx = document
      .getElementById("carDistributionChart")
      .getContext("2d");

    window.carDistributionChart = new Chart(carDistributionCtx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Booked Cars by Brand",
            font: {
              size: 16,
            },
          },
        },
      },
    });
  }
};
