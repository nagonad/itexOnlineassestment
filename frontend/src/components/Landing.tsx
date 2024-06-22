import React, { useEffect } from "react";
import useCityStore from "../repos/citiesRepository";
import CreateCity from "./CreateCity";
import CitiesTable from "./CitiesTable";

function Landing() {
  
  return (
    <div className="flex">
      <CreateCity />
      <CitiesTable />
    </div>
  );
}

export default Landing;
