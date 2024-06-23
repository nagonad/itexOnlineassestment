import React, { useEffect, useState } from "react";
import useCityStore from "../repos/citiesRepository";
import { initialCity } from "../helpers/main";

const UpdateCity = () => {
  const [cityName, setCityName] = useState("");
  const [count, setCount] = useState(0);
  const { selectCity, selectedCity, updateCity, loading } = useCityStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCity(selectedCity.uuid, cityName, count);
    selectCity(initialCity);
  };

  useEffect(() => {
    setCount(selectedCity.count);
    setCityName(selectedCity.cityName);
  }, [selectedCity]);

  return (
    <div className="flex flex-col justify-center items-center border rounded-md p-2 h-full">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cityName"
          >
            City Name
          </label>
          <input
            type="text"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="count"
          >
            Count
          </label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update City"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCity;
