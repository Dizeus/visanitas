import { faker } from "@faker-js/faker";

export default async function createUsers() {
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push({
      id: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullname: faker.person.fullName(),
      role: i === 0 ? 'doctor' : 'patient',
      avatar: null,
    });
  }
  return users;
}
