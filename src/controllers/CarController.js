import CardView from "../views/CardView.js";
import { getRandomNumberZeroToNine } from "../utils.js";
import RACING_GAME from "../constants.js";
import Car from "../models/Car.js";

class CarController {
  #Car;
  #CarView;

  constructor(name) {
    this.#Car = new Car(name);
    this.#CarView = new CardView(this);
  }

  onMove = async (count) => {
    this.#CarView.onRaceStart();

    for await (const index of [...Array(count)]) {
      await this.#moveOnce();
    }
  };

  isMovable = (randomNumber = getRandomNumberZeroToNine()) => {
    return randomNumber >= RACING_GAME.CAR.MOVABLE_MIN_NUMBER;
  };

  get name() {
    return this.#Car.name;
  }

  get movement() {
    return this.#Car.movement;
  }

  #moveOnce = () => {
    this.#moveStart();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.#moveEnd();
        resolve(1);
      }, 1000);
    });
  };

  #moveStart = () => {
    this.#CarView.onLoadingStart();
  };

  #moveEnd = () => {
    if (this.isMovable()) {
      this.#Car.increaseMovement();
      this.#CarView.addMoveForward();
    }
    this.#CarView.onLoadingFinish();
  };
}

export default CarController;
