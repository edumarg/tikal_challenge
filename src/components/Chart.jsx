import React, { useEffect, useState } from "react";

const Chart = ({ planets }) => {
  const [populationData, setPopulationData] = useState(undefined);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const myPlanets = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

  const getPlanetsData = async (planets) => {
    let myPopulationData = [];
    for (let planet of planets) {
      if (myPlanets.includes(planet.name)) {
        const planetData = {
          name: planet.name,
          population: Number(planet.population),
        };
        myPopulationData.push(planetData);
      }
    }
    setPopulationData(myPopulationData);
    getTotalPopulation(myPopulationData);
  };

  const getTotalPopulation = (planets) => {
    let myTotalPopulation = 0;
    for (let planet of planets) {
      myTotalPopulation += planet.population;
    }
    setTotalPopulation(myTotalPopulation);
  };

  useEffect(() => {
    getPlanetsData(planets);
  }, [planets]);

  return (
    <React.Fragment>
      <h2>Population Chart</h2>

      {populationData?.length > 0 ? (
        <div className="container">
          <div
            className="row"
            style={{ alignItems: "flex-end", justifyContent: "center" }}
          >
            {populationData.map((data) => (
              <div className="col" key={data.name} style={{}}>
                <p>{data.population.toLocaleString(undefined)}</p>
                <div
                  style={{
                    backgroundColor: "green",
                    width: 100,
                    height: (data.population / totalPopulation) * 550,
                    margin: "10px auto",
                  }}
                ></div>
                <p>{data.name}</p>
              </div>
            ))}
          </div>
        </div>
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

export default Chart;
