import { UserInput } from "./userInput.js";
import { ClientType } from "./clientType.js";

class InputHandler {
  extractValues(value) {
    if (value === undefined) {
      throw new Error("Invalid client type");
    }

    const values = value.split(":");
    if (values.length !== 2) {
      throw new Error("Invalid client type");
    }

    const clientType = values[0].trim().toLowerCase();
    if (!ClientType.isValid(clientType)) {
      throw new Error("Invalid client type");
    }

    const dates = values[1]
      .split(",")
      .map((item) => this.dateFromString(item.trim()));
    if (dates.includes(undefined)) {
      throw new Error("Invalid dates");
    }

    return new UserInput(clientType, dates);
  }

  dateFromString(value) {
    const day = parseInt(value.substring(0, 2));
    if (day === undefined || day === NaN) {
      throw new Error("Invalid day: ", day);
    }

    const month = this.getMonthIndex(value.substring(2, 5));
    if (month === -1) {
      throw new Error("Invalid month: ", month);
    }

    const year = value.substring(5, 9);
    if (year == undefined || year == NaN) {
      throw new Error("Invalid year: ", year);
    }

    return new Date(year, month, day);
  }

  getMonthIndex(month) {
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

    for (var i = 0; i < months.length; i++) {
      if (months[i] === month.trim().toLowerCase()) {
        return i;
      }
    }

    return -1;
  }
}

export { InputHandler };
