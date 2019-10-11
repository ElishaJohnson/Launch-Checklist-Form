window.addEventListener("load", function () {
   let form = document.querySelector("form");
   let pilotsReady = false;
   form.addEventListener("submit", function (event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName");
      let fuelLevel = document.querySelector("input[name=fuelLevel");
      let cargoWeight = document.querySelector("input[name=cargoWeight");
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoWeight.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if (!isNaN(Number(pilotName.value)) || !isNaN(Number(copilotName.value))) {
         alert("Pilot & co-pilot names must be strings!")
         event.preventDefault();
      } else {
         pilotsReady = true;
      }
      if (!isNaN(Number(pilotName.value)) || pilotName.value === "") {
         document.getElementById("pilotStatus").style.color = "red";
         document.getElementById("pilotStatus").innerHTML = "Pilot not ready";
      } else {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} ready`;
         document.getElementById("pilotStatus").style.removeProperty("color");
      }
      if (!isNaN(Number(copilotName.value)) || copilotName.value === "") {
         document.getElementById("copilotStatus").style.color = "red";
         document.getElementById("copilotStatus").innerHTML = "Co-pilot not ready";
      } else {
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} ready`;
         document.getElementById("copilotStatus").style.removeProperty("color");
      }
      if (fuelLevel.value >= 10000) {
         document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
         document.getElementById("fuelStatus").style.removeProperty("color");
      }
      if (cargoWeight.value <= 10000) {
         document.getElementById("cargoStatus").innerHTML = "Cargo weight low enough for launch";
         document.getElementById("cargoStatus").style.removeProperty("color");
      }
      if (fuelLevel.value < 10000 || cargoWeight.value > 10000) {
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
         document.getElementById("faultyItems").style.visibility = "visible";
         if (fuelLevel.value < 10000) {
            document.getElementById("fuelStatus").innerHTML = "Not enough fuel for launch";
            document.getElementById("fuelStatus").style.color = "red";
         }
         if (cargoWeight.value > 10000) {
            document.getElementById("cargoStatus").innerHTML = "Cargo weight too heavy for launch";
            document.getElementById("cargoStatus").style.color = "red";
         }
         event.preventDefault();
      } else if (pilotsReady) {
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
         event.preventDefault();
      }
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let planet = json[Math.floor(Math.random() * json.length)];
         document.getElementById("missionTarget").innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${planet.name}</li>
            <li>Diameter: ${planet.diameter}</li>
            <li>Star: ${planet.star}</li>
            <li>Distance from Earth: ${planet.distance}</li>
            <li>Number of Moons: ${planet.moons}</li>
         </ol>
         <img src="${planet.image}"></img>
         `;
      });
   });
});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
