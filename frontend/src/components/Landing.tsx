import useCityStore from "../repos/citiesRepository";
import CreateCity from "./CreateCity";
import CitiesTable from "./CitiesTable";
import UpdateCity from "./UpdateCity";
import { ToastContainer } from "react-toastify";

function Landing() {
  const { selectedCity } = useCityStore();

  return (
    <div className="flex justify-center items-center gap-x-4">
      <CreateCity />
      <CitiesTable />
      {selectedCity.uuid && <UpdateCity />}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Landing;
