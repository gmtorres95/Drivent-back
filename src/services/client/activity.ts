import Activity from "@/entities/Activity";
import Place from "@/entities/Place";

export async function subscribe(userId: number, activityId: number) { 
  await Activity.subscribe(userId, activityId);
}

export async function listActivities(dateId: number) {
  const activities = Place.find({ relations: ["activities"] });
  return activities;
}
