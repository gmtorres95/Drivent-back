import Hotel from "@/entities/Hotel";

export async function getListOfHotels() {
  const hotels = await Hotel.listHotels();
  return hotels.map((hotel) => hotel.getHotel());
}
