import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

export default async function createUserDoctor() {
    const user_doctor = [];
    const patients = await prisma.users.findMany({
      where: {
        role: 'patient',
      },
    });

     const doctor = await prisma.users.findFirst({
       where: {
         role: 'doctor',
       },
     });

    for (let i = 0; i<10; i++) {
      user_doctor.push({
        id: faker.string.uuid(),
        doctor_id: doctor?.id || 'doctorId',
        patient_id: patients[i].id,
      });
    }

  return user_doctor;
}
