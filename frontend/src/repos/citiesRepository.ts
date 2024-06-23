import { create } from "zustand";
import axios from "axios";
import { City, initialCity } from "../helpers/main";
import { toast } from "react-toastify";

interface CityState {
  selectedCity: City;
  cities: City[];
  loading: boolean;
  error: string | null;
  getAllCities: (page?: number, take?: number) => Promise<void>;
  createCity: (cityName: string, count: number) => Promise<void>;
  updateCity: (uuid: string, cityName: string, count: number) => Promise<void>;
  deleteCity: (uuid: string) => Promise<void>;
  selectCity: (city: City) => void;
}

const useCityRepository = create<CityState>((set, get) => ({
  selectedCity: initialCity,
  cities: [],
  loading: false,
  error: null,

  selectCity: (city: City) => {
    set({ selectedCity: city });
  },

  getAllCities: async (page: number = 0, take: number = 5) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<City[]>(
        "http://localhost:5000/api/cities",
        { page, take }
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
    if (count < 1) {
      set({ error: "Invalid count value" });
      toast.error("Invalid count value");
      return;
    }
    set({ loading: true, error: null });
    try {
      await axios.post<City>("http://localhost:5000/api/city", {
        cityName,
        count,
      });
      get().getAllCities();
    } catch (error) {
      set({ error: "Error creating city" });
      console.error("Error creating city:", error);
    } finally {
      set({ loading: false });
    }
  },

  updateCity: async (uuid: string, cityName: string, count: number) => {
    if (count < 1) {
      set({ error: "Invalid count number" });
      toast.error("Invalid count value");
      return;
    }
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
      toast.success("City is updated");
    } catch (error) {
      set({ error: "Error updating city" });
      console.error("Error updating city:", error);
      toast.error("Error updating city");
    } finally {
      set({ loading: false });
    }
  },

  deleteCity: async (uuid: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:5000/api/city/${uuid}`);
      get().getAllCities();
    } catch (error) {
      set({ error: "Error deleting city" });
      toast.error("Error deleting city");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCityRepository;
