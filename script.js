const cars = [
    { element: document.getElementById("car1"), position: 0, wheels: [] },
    { element: document.getElementById("car2"), position: -150, wheels: [] },
  ];
  const music = document.getElementById("music");
  
  const redLight = document.getElementById("red-light");
  const yellowLight = document.getElementById("yellow-light");
  const greenLight = document.getElementById("green-light");
  const boulevard = document.getElementById("boulevard"); // Get the boulevard element
  const gameOverPopup = document.getElementById("game-over-popup"); // The popup element
  
  let trafficLightState = "green"; // Initial traffic light state
  let gameOver = false; // Flag to track if the game is over
  let isCarPaused = false; // Flag to track if a car is paused
  
  // Get all wheel elements for each car
  cars.forEach(car => {
    car.wheels = Array.from(car.element.querySelectorAll('.wheel'));
  });
  
  // Function to update the traffic light
  function setTrafficLight(state) {
    redLight.classList.remove("active");
    yellowLight.classList.remove("active");
    greenLight.classList.remove("active");
  
    if (state === "red") redLight.classList.add("active");
    if (state === "yellow") yellowLight.classList.add("active");
    if (state === "green") greenLight.classList.add("active");
  
    trafficLightState = state;
    controlBackgroundAnimation(state); // Control background animation based on light state
  }
  
  // Function to stop the wheels' spinning animation
  function stopWheels(car) {
    car.wheels.forEach(wheel => {
      wheel.style.animationPlayState = 'paused'; // Stop the spinning
    });
  }
  
  // Function to resume the wheels' spinning animation
  function resumeWheels(car) {
    car.wheels.forEach(wheel => {
      wheel.style.animationPlayState = 'running'; // Resume the spinning
    });
  }
  
  // Function to control background animation
  function controlBackgroundAnimation(state) {
    if (state === "red") {
      // Stop the background animation and wheel spinning when the light is red
      boulevard.style.animationPlayState = 'paused';
      cars.forEach(car => stopWheels(car)); // Stop the wheels for all cars
    } else {
      // Resume the background animation and wheel spinning when the light is green
      boulevard.style.animationPlayState = 'running';
      cars.forEach(car => resumeWheels(car)); // Resume the wheels for all cars
    }
  }
  
  // Function to move the cars
  function moveCars() {
    const interval = setInterval(() => {
      if (gameOver) {
        clearInterval(interval); // Stop the car movement if game is over
        return;
      }
  
      cars.forEach((car) => {
        if (trafficLightState === "green" && !isCarPaused) {
          // Move the car forward
          car.position += 6;
          car.element.style.left = car.position + "px";
  
          // Check if car2 has reached the end of the screen (Game Over condition)
          if (car.element.id === "car2" && car.position >= window.innerWidth) {
            gameOver = true; // Set game over flag
            showGameOver(); // Show the game over popup
          }
  
          // Stop car1 for the first stop (music conservatory)
          if (car.element.id === "car1" && car.position > 300 && car.position < 310) {
            setTrafficLight("red");
            music.play();
            stopWheels(car); // Stop the wheels when the car stops
            isCarPaused = true; // Mark the car as paused
  
            // Ensure the light stays red during the pause
            setTimeout(() => {
              isCarPaused = false; // Mark the car as no longer paused
              setTrafficLight("green"); // Resume traffic after 3 seconds
              resumeWheels(car); // Resume the wheels after pause
            }, 3000); // Stop for 3 seconds
          }
  
          // Stop car2 for the second stop (traffic light turns red)
          if (car.element.id === "car2" && car.position > 600 && car.position < 610) {
            setTrafficLight("red");
            stopWheels(car); // Stop the wheels when the car stops
            isCarPaused = true; // Mark the car as paused
  
            // Ensure the light stays red during the pause
            setTimeout(() => {
              isCarPaused = false; // Mark the car as no longer paused
              setTrafficLight("green"); // Resume after 3 seconds
              resumeWheels(car); // Resume the wheels after pause
            }, 3000); // Stop for 3 seconds
          }
        }
      });
    }, 50);
  }
  
  // Function to show the Game Over popup
  function showGameOver() {
    gameOverPopup.style.display = 'flex'; // Show the popup when game is over
  }
  
  // Function to reset the game
  function resetGame() {
    location.reload(); // This will reload the entire page, effectively resetting everything.
  }
  
  
  // Initialize traffic light and start car movement
  setTrafficLight("green");
  moveCars();
  