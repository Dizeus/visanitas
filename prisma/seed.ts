import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import createUsers from './seeds/users';
import createUserDoctor from './seeds/user_doctor';
import createRecords from './seeds/records';
import createComments from './seeds/comments';

const main = async () => {
  await prisma.records.deleteMany();
  await prisma.comments.deleteMany();
  await prisma.user_doctor.deleteMany();
  await prisma.users.deleteMany();

  await prisma.users.createMany({
    data: await createUsers(),
  });

  await prisma.user_doctor.createMany({
    data: await createUserDoctor(),
  });

  await prisma.records.createMany({
    data: await createRecords(),
  });

  await prisma.comments.createMany({
    data: await createComments(),
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
