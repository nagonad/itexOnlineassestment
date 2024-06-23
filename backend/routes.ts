import express, { Request, Response } from "express";
import {
  createCity,
  getCityById,
  updateCity,
  getAllCities,
  deleteCity,
  nextCities,
} from "./cityRepository";
const router = express.Router();

router.post("/city", async (req: Request, res: Response) => {
  const { cityName, count } = req.body;
  try {
    const newCity = await createCity(cityName, count);
    res.json(newCity);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

router.get("/city/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const city = await getCityById(uuid);
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

router.delete("/city/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const city = await deleteCity(uuid);
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post("/cities", async (req: Request, res: Response) => {
  const take = req.body.take;
  const skip = req.body.page * take;
  try {
    const cities = await getAllCities(skip, take);
    res.json(cities);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

router.put("/city/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { cityName, count } = req.body;

  if (!cityName || count === undefined) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  try {
    const updatedCity = await updateCity(uuid, cityName, count);
    res.json(updatedCity);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

router.get("/city/next/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const nextCitiesResponse = await nextCities(uuid);
    res.json(nextCitiesResponse);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

export default router;
