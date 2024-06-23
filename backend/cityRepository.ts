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

async function getAllCities(skip: number, take: number) {
  return await prisma.city.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
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

async function nextCities(uuid: string) {
  const city = await prisma.city.findUnique({
    where: { uuid },
  });
  if (!city) throw new Error("City with the specified UUID not found");
  return await prisma.city.findMany({
    where: {
      createdAt: {
        lt: city.createdAt!,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

export {
  createCity,
  getCityById,
  getAllCities,
  updateCity,
  deleteCity,
  nextCities,
};
