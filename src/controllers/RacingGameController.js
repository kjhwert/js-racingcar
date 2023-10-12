import RacingGame from "../models/RacingGame.js";
import RacingGameView from "../views/RacingGameView.js";
import RACING_GAME from "../constants.js";
import { insertElement } from "../utils.js";
import CarController from "./CarController.js";

class RacingGameController {
  #RacingGame;
  #RacingGameView;

  constructor() {
    this.#RacingGame = new RacingGame();
    this.#RacingGameView = new RacingGameView();

    this.#subscribeEvents();
  }

  #subscribeEvents() {
    this.#RacingGameView.$racingGameForm.addEventListener(
      "submit",
      this.#onSubmitRacingCount.bind(this)
    );
    this.#RacingGameView.$carNamesButton.addEventListener(
      "click",
      this.#onSubmitCarNames.bind(this)
    );
    this.#RacingGameView.$resetButton.addEventListener(
      "click",
      this.#onClear.bind(this)
    );
  }

  #onSubmitCarNames(e) {
    e.preventDefault();

    const carNames = this.#RacingGameView.$carNamesInput.value;

    if (!this.isCarNamesCorrectlyRegistered(carNames)) {
      window.alert(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
      return;
    }

    this.#RacingGame.CarControllers = carNames
      .split(",")
      .map((carName) => new CarController(carName));

    this.#RacingGameView.onFinishInputCarNames();
    this.#RacingGameView.onStartInputRacingCount();
  }

  #onSubmitRacingCount(e) {
    e.preventDefault();

    const racingCount = this.#RacingGameView.$racingCountInput.value;

    if (!this.isRacingCountCorrectlyRegistered(racingCount)) {
      window.alert(RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH);
      return;
    }

    this.#RacingGame.racingCount = +racingCount;
    this.#onRacingStart();
  }

  async #onRacingStart() {
    this.#RacingGameView.onFinishInputRacingCount();

    await Promise.all(
      this.#RacingGame.CarControllers.map((Car) =>
        Car.onMove(this.#RacingGame.racingCount)
      )
    );

    this.#onRacingEnd();
  }

  #onRacingEnd() {
    const winnersCarNames = this.#RacingGame.winnerCarControllers
      .map((Car) => Car.name)
      .join(", ");

    insertElement(this.#RacingGameView.templateWinners(winnersCarNames))
      .to(this.#RacingGameView.$winnerSection)
      .afterBegin();
    this.#RacingGameView.showElement(this.#RacingGameView.$winnerSection);
  }

  #onClear() {
    this.#RacingGame.init();
    this.#RacingGameView.init();
    this.#RacingGameView.$racingGameForm.reset();
  }

  isCarNamesCorrectlyRegistered(carNames) {
    return carNames.split(",").every((carName) => {
      const name = carName.trim();
      return (
        this.isCarNameLessThanMaximum(name) &&
        this.isCardNameMoreThanMinimum(name)
      );
    });
  }

  isCardNameMoreThanMinimum(carName) {
    return RACING_GAME.CAR.NAME_LENGTH_MIN <= carName.length;
  }

  isCarNameLessThanMaximum(carName) {
    return carName.length <= RACING_GAME.CAR.NAME_LENGTH_MAX;
  }

  isRacingCountCorrectlyRegistered(count) {
    if (!count) {
      return false;
    }

    const racingCount = +count;

    return (
      RACING_GAME.RACING_COUNT_MIN <= racingCount &&
      racingCount <= RACING_GAME.RACING_COUNT_MAX
    );
  }
}

export default RacingGameController;
