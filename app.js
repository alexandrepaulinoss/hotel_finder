import { Calculator } from "./src/calculator.js";
import { InputHandler } from "./src/inputHandler.js";

class App {
  constructor() {
    this.calculator = new Calculator();
    this.inputHandler = new InputHandler();
  }

  run() {
    console.log("Welcome to Lakewood, Bridgewood and Ridgewood price finder");
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
      let input = this.inputHandler.extractValues(data);
      console.log(this.calculator.cheapestPrice(input.clientType, input.dates));
    } catch (error) {
      console.log(error.message);
    }
  }
}

const app = new App();

app.run();
