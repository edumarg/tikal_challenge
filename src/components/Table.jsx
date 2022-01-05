import React, { useEffect, useState } from "react";

const Table = ({ vehicles, planets, pilots }) => {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [pilotsData, setPilotsData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    console.log("---prepareTableData---");
    let myTableData = {};
    let maxPopulation = 0;
    if (vehiclesData) console.log("vehiclesData", vehiclesData);
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
          // tableVehicle = vehicle.name;
          // tablePlanets = myPlanets;
          // tablePilots = myPilots;
          myTableData = {
            vehicle: vehicle.name,
            planets: myPlanets,
            pilots: myPilots,
          };
        }
      }
    }
    setTableData(myTableData);
    console.log({
      myTableData,
      maxPopulation,
    });
  };

  useEffect(() => {
    getPlanets();
  }, [pilots, planets]);

  useEffect(() => getPilots(), [pilotsData]);

  useEffect(() => prepareTableData(), [vehiclesData]);

  return (
    <React.Fragment>
      <h2>Vehicle with largest sum of population of pilots home planets</h2>

      <table className="table">
        {/* <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead> */}
        <tbody>
          {Object.keys(tableData).map((keyName, i) => {
            const title = keyName;
            console.log(typeof tableData[keyName]);
            console.log(tableData[keyName]);
            // const data = tableData[keyName];
            return (
              <tr key={title}>
                <th scope="row">{title.toUpperCase()}</th>
                {/* <td>{data}</td> */}
              </tr>
            );
          })}
          {/* <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry the Bird</td>
            <td>tes</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;
