import Activity from "@/entities/Activity";

export async function subscribe(userId: number, activityId: number) { 
  await Activity.subscribe(userId, activityId);
}

export async function listActivities(dateId: number) {
  const activities = Activity.listActivitiesByDate(dateId);
  return activities;
}
