import View from "./View.js";
import { insertElement } from "../utils.js";

class CardView extends View {
  #controller;

  constructor(controller, $parent) {
    super();

    this.#controller = controller;

    this.init($parent);
  }

  init = ($parent) => {
    const name = this.#controller.name;

    this.$racingSection = document.getElementById("racing-section");
    insertElement(this.render()).to(this.$racingSection).beforeEnd();

    this.$container = document.getElementById(`${name}-container`);
    this.$name = document.getElementById(`car-name-${name}`);
    this.$loading = document.getElementById(`${name}-loading`);
  };

  onRaceStart = () => {
    this.$container.classList.remove("hide");
  };

  onLoadingStart = () => {
    this.$loading.classList.remove("hide");
  };

  onLoadingFinish = () => {
    this.$loading.classList.add("hide");
  };

  render = () => {
    const name = this.#controller.name;

    return `
      <div id="${name}-container" class="mr-2 hide">
        <span id="car-name-${name}" class="car-player">${name}</span>
        ${this.templateLoading()}      
      </div>
    `;
  };

  addMoveForward = () => {
    insertElement(this.templateMoveForward()).to(this.$name).afterEnd();
  };

  templateMoveForward = () => {
    return `<div class="forward-icon mt-2">⬇️️</div>`;
  };

  templateLoading = () => {
    const name = this.#controller.name;

    return `
            <div id="${name}-loading" class="d-flex justify-center mt-3 hide">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
          `;
  };
}

export default CardView;
