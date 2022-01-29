import ActivityDate from "@/entities/ActivityDate";

export async function getDays() {
  const days = await ActivityDate.getDates();
  return days;
}
