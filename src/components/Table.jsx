import React, { useEffect, useState } from "react";

const Table = ({ vehicles, planets, pilots }) => {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [pilotsData, setPilotsData] = useState([]);
  const [tableData, setTableData] = useState(undefined);

  const getPlanets = () => {
    const myPilots = pilots;
    for (let pilot of pilots) {
      const index = myPilots.indexOf(pilot);
      let pilotPlanet = {};
      for (let planet of planets) {
        if (pilot.homeworld === planet.url)
          pilotPlanet = {
            name: planet.name,
            population: planet.population,
          };
      }
      myPilots[index].homeworld = pilotPlanet;
    }
    setPilotsData(myPilots);
    return myPilots;
  };

  const getPilots = () => {
    const myVehicles = vehicles;
    for (let vehicle of vehicles) {
      const index = myVehicles.indexOf(vehicle);
      let vehiclePilots = [];
      for (let pilot of vehicle.pilots) {
        for (let data of pilotsData)
          if (data.url === pilot) {
            const vehiclePilot = {
              name: data.name,
              homeworld: data.homeworld,
            };
            vehiclePilots.push(vehiclePilot);
          }
      }
      myVehicles[index].pilots = vehiclePilots;
    }
    setVehiclesData(myVehicles);
    return myVehicles;
  };

  const prepareTableData = async () => {
    let myTableData = {};
    let maxPopulation = 0;
    for (let vehicle of vehiclesData) {
      let myPilots = [];
      let myPlanets = [];
      let totalPopulation = 0;
      for (let pilot of vehicle.pilots) {
        myPilots.push(pilot.name);
        myPlanets.push(pilot.homeworld);
        totalPopulation += pilot.homeworld.population;
        if (totalPopulation >= maxPopulation) {
          maxPopulation = totalPopulation;
          myTableData = {
            vehicle: vehicle.name,
            planets: myPlanets,
            pilots: myPilots,
          };
        }
      }
    }
    setTableData(myTableData);
  };

  useEffect(() => {
    getPlanets();
  }, [pilots, planets]);

  useEffect(() => getPilots(), [pilotsData]);

  useEffect(() => prepareTableData(), [vehiclesData]);

  return (
    <React.Fragment>
      <h2 className="my-3">
        Vehicle with largest sum of population of pilots home planets
      </h2>

      {tableData?.planets ? (
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Vehicle</th>
              <td>{tableData.vehicle}</td>
            </tr>
            <tr>
              <th scope="row">Pilots</th>
              {tableData.pilots?.map((pilot) => (
                <td key={pilot}>{pilot}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Planets</th>
              {tableData.planets?.map((planet) => (
                <td key={planet.name}>{`Name: ${
                  planet.name
                }, Population: ${planet.population.toLocaleString(
                  undefined
                )}`}</td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : (
        <div>
          <div
            className="spinner-border text-warning"
            style={{ width: "5rem", height: "5rem", margin: "100px auto" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Table;
