class AppComplete {
  constructor() {}

  run() {
    console.log("Welcome to Lakewood, Bridgewood and Ridgewood reservations");
    this.inputMessage();

    const inputSearch = process.stdin;
    inputSearch.setEncoding("utf-8");

    inputSearch.on(
      "data",
      function (data) {
        if (data.toLowerCase() === "quit\n") {
          process.exit();
        } else if (data.toLowerCase() === "help\n") {
          this.helpMessage();
        } else {
          this.findCheapestHotel(data);
        }
        this.inputMessage();
      }.bind(this)
    );
  }

  inputMessage() {
    console.log(
      "\n\nType your reservation info in the format: client_type: date1, date2, date3..."
    );
    console.log("Valid client_type: regular or reward");
    console.log("Date format: 16Mar2009(mon) / ddmmmyyyy(wday)");
    console.log("Help for more info or quit to exit\n\n");
  }

  helpMessage() {
    console.log("\n\nTesting examples:");

    console.log(
      "\nInput => Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)"
    );
    console.log("Output => Lakewood");

    console.log(
      "\nInput => Regular: 20Mar2009(fri), 21Mar2009(sat), 22Mar2009(sun)"
    );
    console.log("Output => Bridgewood");

    console.log(
      "\nInput => Reward: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)"
    );
    console.log("Output => Ridgewood");
  }

  findCheapestHotel(data) {
    try {
      let input = extractValues(data);
      console.log(cheapestPrice(input.clientType, input.dates));
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const extractValues = (data) => {
  if (data === undefined) {
    throw new Error("Invalid client type");
  }

  const values = data.split(":");
  if (values.length !== 2) {
    throw new Error("Invalid client type");
  }

  const clientType = values[0].trim().toLowerCase();
  if (!["regular", "reward"].includes(clientType)) {
    throw new Error("Invalid client type");
  }

  const dates = values[1].split(",").map((date) => dateFromString(date.trim()));
  if (dates.includes(undefined)) {
    throw new Error("Invalid dates");
  }

  return { clientType, dates };
};

const dateFromString = (value) => {
  const day = parseInt(value.substring(0, 2));
  if (day === undefined || day === NaN) {
    throw new Error("Invalid day: ", day);
  }

  const month = getMonthIndex(value.substring(2, 5));
  if (month === -1) {
    throw new Error("Invalid month: ", month);
  }

  const year = value.substring(5, 9);
  if (year == undefined || year == NaN) {
    throw new Error("Invalid year: ", year);
  }

  return new Date(year, month, day);
};

const getMonthIndex = (month) => {
  let months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  for (let i = 0; i < months.length; i++) {
    if (months[i] === month.trim().toLowerCase()) {
      return i;
    }
  }

  return -1;
};

export const cheapestPrice = (clientType, dates) => {
  const hotels = [
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

  let cheapestHotel = hotels[0];
  let cheapestPrice = findPrice(hotels[0], clientType, dates);

  for (let i = 1; i < hotels.length; i++) {
    const currentPrice = findPrice(hotels[i], clientType, dates);

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
};

export const findPrice = (hotel, clientType, dates) => {
  let priceType = getHotelPrice(hotel, clientType);

  return dates
    .map((date) => getPriceForDate(priceType, date))
    .reduce((accum, curr) => accum + curr);
};

export const getHotelPrice = (hotel, clientType) => {
  if (clientType === "reward") {
    return hotel.reward;
  }

  return hotel.regular;
};

export const getPriceForDate = (priceType, date) => {
  if (date.getDay() === 0 || date.getDay() === 6) return priceType.weekend;

  return priceType.weekday;
};

const app = new AppComplete();

app.run();
