import Room from "@/entities/Room";

export async function getListByHotelId(hotelId: number) {
  const result = await Room.getListByHotelId(hotelId);
  return result.map((room) => room.getRoom());
}
