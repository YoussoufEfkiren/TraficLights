const cars = [
    { element: document.getElementById("car1"), position: 0 },
    { element: document.getElementById("car2"), position: -150 },
  ];
  const music = document.getElementById("music");
  
  const redLight = document.getElementById("red-light");
  const yellowLight = document.getElementById("yellow-light");
  const greenLight = document.getElementById("green-light");
  
  let trafficLightState = "green"; // Initial traffic light state
  
  // Function to update the traffic light
  function setTrafficLight(state) {
    redLight.classList.remove("active");
    yellowLight.classList.remove("active");
    greenLight.classList.remove("active");
  
    if (state === "red") redLight.classList.add("active");
    if (state === "yellow") yellowLight.classList.add("active");
    if (state === "green") greenLight.classList.add("active");
  
    trafficLightState = state;
  }
  
  // Function to move the cars
  function moveCars() {
    const interval = setInterval(() => {
      cars.forEach((car) => {
        if (trafficLightState === "green") {
          // Move the car forward
          car.position += 2;
          car.element.style.left = car.position + "px";
  
          // Stop car1 for the first stop (music conservatory)
          if (car.element.id === "car1" && car.position > 300 && car.position < 310) {
            // Stop car1 and play music
            setTrafficLight("red");
            music.play();
  
            setTimeout(() => {
              setTrafficLight("green"); // Resume traffic
            }, 3000);
          }
  
          // Stop both cars for the second stop (traffic light turns red)
          if (car.position > 600 && car.position < 610) {
            // Stop all cars
            setTrafficLight("red");
            setTimeout(() => {
              setTrafficLight("green"); // Resume after 3 seconds
            }, 3000);
          }
        }
      });
    }, 50);
  }
  
  // Initialize traffic light and start car movement
  setTrafficLight("green");
  moveCars();