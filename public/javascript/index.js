import { Model } from "../../db/model.js";
import { View } from "../../views/view.js";
import { Controller } from "../../controller/controller.js";

(() => {
  const containerId = "calculatorsContainer";
  const model = new Model(containerId, 1);
  const view = new View(containerId, 1);
  new Controller(model, view);
})();

(() => {
  const containerId = "calculatorsContainer";
  const model = new Model(containerId, 2);
  const view = new View(containerId, 2);
  new Controller(model, view);
})();

(() => {
  const containerId = "calculatorsContainer";
  const model = new Model(containerId, 3);
  const view = new View(containerId, 3);
  new Controller(model, view);
})();
