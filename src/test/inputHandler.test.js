import { InputHandler } from "../inputHandler.js";

const assert = require("assert");

//const InputHandler = require("../src/InputHandler");
//const Errors = require("../src/errors");

describe(InputHandler, () => {
  beforeEach(() => {
    this.userInput = new InputHandler();
  });

  describe("#extractValues", () => {
    describe("invalid client", () => {
      describe("when client type is undefined", () => {
        it("throws an error", () => {
          assert.throws(() => {
            this.userInput.extractValues();
          }, Errors.invalidClientType());
        });
      });
      describe("when client type is empty", () => {
        it("throws an error", () => {
          assert.throws(() => {
            this.userInput.extractValues("");
          }, Errors.invalidClientType());
        });
      });
    });
    describe("valid client", () => {
      describe("when client type is regular", () => {
        it("returns a regular client", () => {
          var inputRegular = this.userInput.extractValues(
            "regular:16Mar2009(mon)"
          );
          assert.equal(inputRegular.clientType, "regular");
        });
      });
      describe("when client type is rewards", () => {
        it("returns a rewards client", () => {
          var inputReward = this.userInput.extractValues(
            "rewards:16Mar2009(mon)"
          );
          assert.equal(inputReward.clientType, "rewards");
        });
      });
    });
    describe("when date is empty", () => {
      it("throws an error", () => {
        assert.throws(() => {
          this.userInput.extractValues("regular:");
        }, Errors.invalidDates());
      });
    });
    describe("when there is one date with wrong format", () => {
      it("throws an error", () => {
        assert.throws(() => {
          this.userInput.extractValues("regular:16Mar2009(mon), xxx");
        }, Errors.invalidDates());
      });
    });
  });
  describe("valid dates", () => {
    describe("and date is valid", () => {
      it("returns a valid date", () => {
        const result = this.userInput.extractValues("rewards:16Mar2009(mon)");
        const expectedDate = new Date(2009, 3, 16);
        assert.equal(result.dates[0].year, expectedDate.year);
        assert.equal(result.dates[0].month, expectedDate.month);
        assert.equal(result.dates[0].day, expectedDate.day);
      });
    });
  });
});
