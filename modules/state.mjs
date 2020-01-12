import { deepCopy } from "./utils.mjs";
import { Item } from "./models.mjs";

export const ITEM_COUNT = 6;
export const STAGE_COUNT = 3;

const INITIAL_STATE = {
  storage: Array(ITEM_COUNT)
    .fill()
    .map((_, id) => new Item(id)),
  stages: Array(STAGE_COUNT).fill(null),
  output: []
};

export function stateManager(state = null) {
  const newState = deepCopy(state === null ? INITIAL_STATE : state);

  const processed = newState.stages.pop();
  if (processed !== null && processed !== undefined) {
    newState.output.push(processed);
  }

  const toBeProcessed = newState.storage.pop();
  newState.stages.unshift(toBeProcessed);
  return newState;
}
