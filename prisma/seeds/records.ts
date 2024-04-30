import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createRecords() {
  const records = [];
  const users = await prisma.users.findMany({
    where: {
      role: "patient"
    }
  });

  for (let i = 0; i < 5; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    for (let i = 0; i < 5; i++) {
      records.push({
        id: faker.string.uuid(),
        author_id: user.id,
        time: faker.date.between({
          from: '2017-01-01T00:00:00.000Z',
          to: '2022-01-01T00:00:00.000Z',
        }),
        bl_pressure_top: faker.number.int({ min: 90, max: 130 }),
        bl_pressure_bottom: faker.number.int({ min: 60, max: 90 }),
        well_being: faker.number.int({ min: 1, max: 10 }),
        activity: faker.number.int({ min: 1, max: 10 }),
        meal: faker.lorem.words(10),
        note: faker.lorem.words(25),
      });
    }
  }

  return records;
}
