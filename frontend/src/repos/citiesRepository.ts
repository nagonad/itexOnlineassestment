import { create } from "zustand";
import axios from "axios";
import { City, initialCity } from "../helpers/main";

interface CityState {
  selectedCity: City;
  cities: City[];
  loading: boolean;
  error: string | null;
  getAllCities: () => Promise<void>;
  createCity: (cityName: string, count: number) => Promise<void>;
  getCityById: (uuid: string) => Promise<City | null>;
  updateCity: (uuid: string, cityName: string, count: number) => Promise<void>;
  deleteCity: (uuid: string) => Promise<void>;
}

const useCityRepository = create<CityState>((set) => ({
  selectedCity: initialCity,
  cities: [],
  loading: false,
  error: null,

  selectCity: (city: City) => {
    set({ selectedCity: city });
  },

  getAllCities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<City[]>(
        "http://localhost:5000/api/cities"
      );
      set({ cities: response.data });
    } catch (error) {
      set({ error: "Error fetching cities" });
      console.error("Error fetching cities:", error);
    } finally {
      set({ loading: false });
    }
  },

  createCity: async (cityName: string, count: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<City>(
        "http://localhost:5000/api/city",
        { cityName, count }
      );
      set((state) => ({ cities: [response.data, ...state.cities] }));
    } catch (error) {
      set({ error: "Error creating city" });
      console.error("Error creating city:", error);
    } finally {
      set({ loading: false });
    }
  },

  getCityById: async (uuid: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<City>(
        `http://localhost:5000/api/city/${uuid}`
      );
      return response.data;
    } catch (error) {
      set({ error: "Error fetching city by ID" });
      console.error("Error fetching city by ID:", error);
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateCity: async (uuid: string, cityName: string, count: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put<City>(
        `http://localhost:5000/api/city/${uuid}`,
        { cityName, count }
      );
      set((state) => ({
        cities: state.cities.map((city) =>
          city.uuid === uuid ? response.data : city
        ),
      }));
    } catch (error) {
      set({ error: "Error updating city" });
      console.error("Error updating city:", error);
    } finally {
      set({ loading: false });
    }
  },

  deleteCity: async (uuid: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:5000/api/city/${uuid}`);
      set((state) => ({
        cities: state.cities.filter((city) => city.uuid !== uuid),
      }));
    } catch (error) {
      set({ error: "Error deleting city" });
      console.error("Error deleting city:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCityRepository;
