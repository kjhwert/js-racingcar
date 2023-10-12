class Car {
  #name = "";
  #movement = 0;

  constructor(name) {
    this.name = name.trim();
  }

  increaseMovement = () => {
    this.#movement += 1;
  };

  get movement() {
    return this.#movement;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }
}

export default Car;
