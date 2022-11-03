import fs from "fs";
import path from "path";

import { Hotel } from "./hotel.js";
import { HotelPrice } from "./hotelPrice.js";

class HotelData {
  constructor(databasePath = "./resources/taxData.json") {
    this.databasePath = databasePath;
  }

  fetchHotels() {
    var hotelData = JSON.parse(
      fs.readFileSync(path.resolve(path.resolve(), this.databasePath))
    );

    if (hotelData.hotels === undefined) {
      return [];
    }

    return hotelData.hotels.map((hotel) => {
      const regular = new HotelPrice(
        hotel.regular.weekday,
        hotel.regular.weekend
      );

      const reward = new HotelPrice(hotel.reward.weekday, hotel.reward.weekend);

      return new Hotel(hotel.name, hotel.rating, regular, reward);
    });
  }
}

export { HotelData };
