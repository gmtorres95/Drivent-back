import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import EnrollmentData from "@/interfaces/enrollment";
import Enrollment from "@/entities/Enrollment";
import InvalidBirthDateError from "@/errors/InvalidBirthDate";

export async function createNewEnrollment(enrollmentData: EnrollmentData) {
  dayjs.extend(customParseFormat);
  const userBirthday = dayjs(enrollmentData.birthday, "DD-MM-YYYY");
  const minimumBirthDate = dayjs().subtract(18, "year");

  if(userBirthday.isAfter(minimumBirthDate)) {
    throw new InvalidBirthDateError();
  }

  await Enrollment.createOrUpdate(enrollmentData);  
}

export async function getEnrollmentWithAddress(userId: number) {
  return await Enrollment.getByUserIdWithAddress(userId);
}
