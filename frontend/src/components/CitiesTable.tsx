import React, { useEffect } from "react";
import useCityStore from "../repos/citiesRepository";
import { City } from "../helpers/main";

function CitiesTable() {
  const {
    selectCity,
    cities,
    loading,
    error,
    getAllCities,
    createCity,
    updateCity,
    deleteCity,
  } = useCityStore();

  useEffect(() => {
    getAllCities();
  }, [getAllCities]);

  return (
    <div className="p-1.5 inline-block align-middle border rounded-md h-full">
      <table className="divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              City Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Count
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              #
            </th>
          </tr>
        </thead>
        <tbody>
          {cities.length &&
            cities.map((city) => (
              <tr
                key={city.uuid as keyof City}
                className="odd:bg-white even:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {city.cityName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {city.count.toString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button
                    type="button"
                    className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                    onClick={() => selectCity(city)}
                  >
                    Update
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button
                    type="button"
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    onClick={() => deleteCity(city.uuid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CitiesTable;
