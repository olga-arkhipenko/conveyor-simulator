/** Create DOM representation of a conveyor stage.
 *
 * @param {string} id - id of the stage.
 * @returns {HTMLElement} - stage node.
 */
export const renderConveyorStage = id => {
  const stage = document.createElement('div');
  stage.id = `conveyor-stage-${id}`;
  stage.className = 'stage';
  return stage;
};

/** Create DOM representation of an item.
 *
 * @param {string} id - id of the item.
 * @returns {HTMLElement} - item node.
 */
export const renderItem = id => {
  const item = document.createElement('div');
  const itemId = `item-${id}`;
  item.id = itemId;
  item.className = 'item';
  item.appendChild(document.createTextNode(String(id)));
  return item;
};

// TODO: does it make sense to move pre-defined html element references here,
// as well as initial element rendering logic?

/** Disable button.
 *
 * @param {HTMLElement} button - button DOM element to disable.
 * @returns {void}
 */
export const disableButton = button => {
  button.disabled = true; // eslint-disable-line no-param-reassign
};

/** Disable button.
 *
 * @param {HTMLElement} button - button DOM element to disable.
 * @returns {void}
 */
export const enableButton = button => {
  button.disabled = false; // eslint-disable-line no-param-reassign
};
