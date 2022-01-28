import Activity from "@/entities/Activity";

export async function subscribe(userId: number, activityId: number) { 
  await Activity.subscribe(userId, activityId);
}
  
