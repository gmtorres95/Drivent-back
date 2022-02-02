import dayjs from "dayjs";
import EnrollmentData from "@/interfaces/enrollment";
import Enrollment from "@/entities/Enrollment";
import InvalidBirthDateError from "@/errors/InvalidBirthDate";

export async function createNewEnrollment(enrollmentData: EnrollmentData) {
  if(dayjs(enrollmentData.birthday).isAfter(dayjs(dayjs().subtract(18, "year")))) {
    throw new InvalidBirthDateError();
  }

  await Enrollment.createOrUpdate(enrollmentData);  
}

export async function getEnrollmentWithAddress(userId: number) {
  return await Enrollment.getByUserIdWithAddress(userId);
}
