import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

export default async function createComments() {
  const comments = [];
  const users = await prisma.users.findMany();
  const records = await prisma.records.findMany();
  for (let i = 0; i < 10; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const record = records[Math.floor(Math.random() * records.length)];
    for (let i = 0; i < 2; i++) {
      comments.push({
        id: faker.string.uuid(),
        author_id: user.id,
        record_id:  record?.id,
        text: faker.lorem.sentences(5),
        created_at: faker.date.between({
          from: "2017-01-01T00:00:00.000Z",
          to: "2022-01-01T00:00:00.000Z",
        }),
      });
    }
  }

  return comments;
}
