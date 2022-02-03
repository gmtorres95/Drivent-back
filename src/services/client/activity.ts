import Activity from "@/entities/Activity";

export async function subscribe(userId: number, activityId: number) { 
  await Activity.subscribe(userId, activityId);
}

export async function listPlaces(dateId: number) {
  const places = Activity.listActivitiesByDate(dateId);
  return places;
}

export async function unsubscribe(userId: number, activityId: number) { 
  await Activity.unsubscribe(userId, activityId);
}
