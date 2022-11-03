class HotelPrice {
  constructor(weekday, weekend) {
    this.weekday = weekday;
    this.weekend = weekend;
  }

  priceForDate(date) {
    if (date.getDay() === 0 || date.getDay() === 6) return this.weekend;

    return this.weekday;
  }
}

export { HotelPrice };
