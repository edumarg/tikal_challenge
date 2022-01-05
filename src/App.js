import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import Chart from "./components/Chart";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [planets, setPlanets] = useState([]);

  const URL = "https://swapi.dev/api/";
  const vehiclesPath = "vehicles/";
  const peoplePath = "people/";
  const planetsPath = "planets/";

  const getData = async (path) => {
    try {
      const response = await fetch(`${path}`);
      if (response.status >= 400 && response.status < 500) {
        if (response.status === 404) alert("Data not found");
        alert("Could not fetch");
      }
      return await response.json();
    } catch (err) {
      alert("Unexpected error");
    }
  };

  const getVehiclesWithPilots = async () => {
    const myVehicles = [];
    const data = await getData(`${URL}${vehiclesPath}`);
    const pages = Math.ceil(data.count / data.results.length);
    for (let page = 1; page <= pages; page++) {
      const data = await getData(`${URL}${vehiclesPath}?page=${page}`);
      for (let element of data.results) {
        if (element.pilots?.length > 0) {
          const myVehicle = {
            name: element.name,
            pilots: element.pilots,
          };
          myVehicles.push(myVehicle);
        }
      }
    }
    setVehicles(myVehicles);
    return myVehicles;
  };

  const getPilots = async () => {
    const myPilots = [];
    const data = await getData(`${URL}${peoplePath}`);
    const pages = Math.ceil(data.count / data.results.length);
    for (let page = 1; page <= pages; page++) {
      const data = await getData(`${URL}${peoplePath}?page=${page}`);
      for (let element of data.results) {
        if (element.vehicles.length > 0) {
          const myPilot = {
            name: element.name,
            homeworld: element.homeworld,
            url: element.url,
          };
          myPilots.push(myPilot);
        }
      }
    }
    setPilots(myPilots);
    return myPilots;
  };

  const getPlanetsWithPopulation = async () => {
    const myPlanets = [];
    const data = await getData(`${URL}${planetsPath}`);
    const pages = Math.ceil(data.count / data.results.length);
    for (let page = 1; page <= pages; page++) {
      const data = await getData(`${URL}${planetsPath}?page=${page}`);
      for (let element of data.results) {
        if (
          element.population.toLowerCase() !== "unknown" &&
          Number(element.population) > 0
        ) {
          const myPlanet = {
            name: element.name,
            population: Number(element.population),
            url: element.url,
          };
          myPlanets.push(myPlanet);
        }
      }
    }
    setPlanets(myPlanets);
    return myPlanets;
  };

  useEffect(() => {
    getPlanetsWithPopulation();
    getPilots();
    getVehiclesWithPilots();
  }, []);

  return (
    <div className="App">
      <h1>Tikal Code Challenge</h1>
      <Table planets={planets} vehicles={vehicles} pilots={pilots} />
      <Chart planets={planets} />
    </div>
  );
}

export default App;
