import Activity from "@/entities/Activity";
import Setting from "@/entities/Setting";

export async function getEventInfo() {
  return await Setting.getEventSettings();
}

export async function subscribe(userId: number, activityId: number) { 
  await Activity.subscribe(userId, activityId);
}
