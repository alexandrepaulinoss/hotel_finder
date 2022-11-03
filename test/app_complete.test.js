import {
  cheapestPrice,
  extractValues,
  findPrice,
  getHotelPrice,
  getPriceForDate,
} from "../app_complete";

const mockHotels = [
  {
    name: "Lakewood",
    rating: 3,
    regular: {
      weekday: 110,
      weekend: 90,
    },
    reward: {
      weekday: 80,
      weekend: 80,
    },
  },
  {
    name: "Bridgewood",
    rating: 4,
    regular: {
      weekday: 160,
      weekend: 60,
    },
    reward: {
      weekday: 110,
      weekend: 50,
    },
  },
  {
    name: "Ridgewood",
    rating: 5,
    regular: {
      weekday: 220,
      weekend: 150,
    },
    reward: {
      weekday: 100,
      weekend: 40,
    },
  },
];

describe(getPriceForDate, () => {
  describe("day is sunday", () => {
    it("returns weekend price", () => {
      expect(
        getPriceForDate(mockHotels[0].regular, new Date("22Mar2009(sun)"))
      ).toBe(mockHotels[0].regular.weekend);
    });
  });

  describe("day is saturday", () => {
    it("returns weekend price", () => {
      expect(
        getPriceForDate(mockHotels[0].regular, new Date("21Mar2009(sat)"))
      ).toBe(mockHotels[0].regular.weekend);
    });
  });

  describe("day is a weekday", () => {
    it("returns weekday price", () => {
      expect(
        getPriceForDate(mockHotels[0].regular, new Date("20Mar2009(fri)"))
      ).toBe(mockHotels[0].regular.weekday);
    });
  });
});

describe(getHotelPrice, () => {
  describe("client is regular type", () => {
    it("returns regular price", () => {
      expect(getHotelPrice(mockHotels[0], "regular")).toBe(
        mockHotels[0].regular
      );
    });
  });

  describe("client is reward type", () => {
    it("returns reward price", () => {
      expect(getHotelPrice(mockHotels[0], "reward")).toBe(mockHotels[0].reward);
    });
  });
});

describe(findPrice, () => {
  describe("when is called", () => {
    it("returns the correct total price", () => {
      expect(
        findPrice(mockHotels[0], "regular", [
          new Date("2009-03-16T03:00:00.000Z"),
          new Date("2009-03-17T03:00:00.000Z"),
          new Date("2009-03-18T03:00:00.000Z"),
        ])
      ).toBe(330);
    });
  });
});

describe(extractValues, () => {
  describe("when extractValues is called", () => {
    it("returns an object with the client type and dates", () => {
      expect(
        extractValues(
          "Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)"
        )
      ).toStrictEqual({
        clientType: "regular",
        dates: [
          new Date("2009-03-16T03:00:00.000Z"),
          new Date("2009-03-17T03:00:00.000Z"),
          new Date("2009-03-18T03:00:00.000Z"),
        ],
      });
    });
  });
});

describe(cheapestPrice, () => {
  describe("when cheapestPrice is called", () => {
    it("returns the lowest prices hotel name", () => {
      expect(
        cheapestPrice("regular", [
          new Date("2009-03-16T03:00:00.000Z"),
          new Date("2009-03-17T03:00:00.000Z"),
          new Date("2009-03-18T03:00:00.000Z"),
        ])
      ).toBe("Lakewood");
    });
  });
});
