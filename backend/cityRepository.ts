import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createCity(cityName: string, count: number) {
  return await prisma.city.create({
    data: {
      cityName,
      count,
    },
  });
}

async function getCityById(uuid: string) {
  return await prisma.city.findUnique({
    where: { uuid },
  });
}

async function getAllCities() {
  return await prisma.city.findMany();
}

async function updateCity(uuid: string, cityName: string, count: number) {
  return await prisma.city.update({
    where: { uuid },
    data: {
      cityName,
      count,
    },
  });
}

async function deleteCity(uuid: string) {
  return await prisma.city.delete({
    where: { uuid },
  });
}

export { createCity, getCityById, getAllCities, updateCity, deleteCity };
