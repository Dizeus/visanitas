import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export default async function createTestUser() {
  const id = faker.string.uuid();
  const hashed = await bcrypt.hash('1234', 10);
  await prisma.users.create({
    data: {
      id,
      email: 'kharchuk.illia@lll.kpi.ua',
      fullname: 'Dr. Illia Kharchuk',
      password: hashed,
      role: 'doctor',
      avatar: null
    }
  });
}
