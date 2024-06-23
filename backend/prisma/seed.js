// seed.js

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.city.deleteMany();

    const citiesData = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, "../../database/cities.json"),
        "utf-8"
      )
    );

    for (const city of citiesData) {
      await prisma.city.upsert({
        where: { uuid: city.uuid },
        update: {},
        create: {
          uuid: city.uuid,
          cityName: city.cityName,
          count: city.count,
        },
      });
    }

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
