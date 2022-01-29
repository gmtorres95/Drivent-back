import Activity from "@/entities/Activity";

export async function subscribe(userId: number, activityId: number) { 
  await Activity.subscribe(userId, activityId);
}
  
export async function getActivitiesFromTicket(userId: number) {
  return await Activity.getActivitiesFromTicket(userId);
}
