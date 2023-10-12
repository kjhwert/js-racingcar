class RacingGame {
  #CarControllers = [];
  #racingCount = 0;
  constructor() {}

  init() {
    this.racingCount = 0;
    this.CarControllers = [];
  }

  get CarControllers() {
    return this.#CarControllers;
  }

  set CarControllers(CarControllers) {
    this.#CarControllers = CarControllers;
  }

  get winnerCarControllers() {
    const movementResults = this.#CarControllers.map(
      (CarController) => CarController.movement
    );

    const winnerMovementCount = Math.max(...movementResults);

    return this.#CarControllers.filter(
      (CarController) => CarController.movement === winnerMovementCount
    );
  }

  get racingCount() {
    return this.#racingCount;
  }

  set racingCount(count) {
    this.#racingCount = count;
  }
}

export default RacingGame;
