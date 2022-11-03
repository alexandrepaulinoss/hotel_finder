import { HotelData } from "./hotelData.js";
import { ClientType } from "./clientType.js";

class Calculator {
  constructor(hotelData = new HotelData()) {
    this.hotelData = hotelData;
  }

  cheapestPrice(clientType, dates) {
    if (
      clientType.constructor !== String ||
      clientType === undefined ||
      !ClientType.isValid(clientType)
    ) {
      throw new Error("Invalid client type");
    } else if (dates === undefined || dates.constructor !== Array) {
      throw new Error("Invalid dates");
    }

    let hotels = this.hotelData.fetchHotels();

    if (hotels.length === 0) {
      throw new Error("Unavailable hotels data");
    }

    var cheapestHotel = hotels[0];
    let cheapestPrice = this.findPrice(hotels[0], clientType, dates);

    for (let i = 1; i < hotels.length; i++) {
      const currentPrice = this.findPrice(hotels[i], clientType, dates);

      if (currentPrice < cheapestPrice) {
        cheapestHotel = hotels[i];
        cheapestPrice = currentPrice;
      } else if (
        currentPrice === cheapestPrice &&
        cheapestHotel.rating < hotels[i].rating
      ) {
        cheapestHotel = hotels[i];
        cheapestPrice = currentPrice;
      }
    }

    return cheapestHotel.name;
  }

  findPrice(hotel, clientType, dates) {
    let priceType = this.getHotelPrice(hotel, clientType);

    return dates
      .map((date) => priceType.priceForDate(date))
      .reduce((accum, curr) => accum + curr);
  }

  getHotelPrice(hotel, clientType) {
    if (clientType === "reward") {
      return hotel.reward;
    }

    return hotel.regular;
  }
}

export { Calculator };
