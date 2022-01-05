import React, { useEffect, useState } from "react";

const Table = ({ vehicles, planets, pilots }) => {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [vehicleLargestSum, setVehicleLargestSum] = useState("");
  const [pilotLargestSum, setPilotLargestSum] = useState("");
  const [planetLargestSum, setPlanetLargestSum] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <h2>Table</h2>
    </React.Fragment>
  );
};

export default Table;
