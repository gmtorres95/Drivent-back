import ActivityDate from "@/entities/ActivityDate";

export async function getActivityDates() {
  const days = await ActivityDate.getActivityDates();
  return days;
}
