import { renderConveyorStage, renderItem } from './modules/renders.mjs';
import { indexRange, sleep } from './modules/utils.mjs';
// pre-defined html elements
const itemsContainer = document.getElementById('items');
const stagesContainer = document.getElementById('stages');
const outputContainer = document.getElementById('output');
const startButton = document.getElementById('start-button');

// dynamically created elements
const CONVEYOR_STAGE_COUNT = 4;

const conveyorStages = indexRange(CONVEYOR_STAGE_COUNT).map(
  renderConveyorStage
);

const ITEM_COUNT = 13;

const items = indexRange(ITEM_COUNT)
  .map(i => ({ [i]: renderItem(i) }))
  .reduce((res, item) => ({ ...res, ...item }), {});

// render dynamically created elements
for (const stage of conveyorStages) {
  stagesContainer.appendChild(stage);
}

function placeItemsInStorage() {
  for (const item of Object.values(items)) {
    itemsContainer.appendChild(item);
  }
}

placeItemsInStorage();

const stages = [...conveyorStages, outputContainer];

async function conveyorFlow() {
  const storage = Object.keys(items);

  let inProgress = [];
  do {
    const newItem = storage.pop();
    if (newItem) {
      inProgress.push({ id: newItem, position: 0 });
    }

    // place in-progress items according to their current position
    for (const { id, position } of inProgress) {
      stages[position].appendChild(items[id]);
    }

    // compute next state of in-progress items
    inProgress = inProgress
      .map(({ position, ...item }) => ({ ...item, position: position + 1 }))
      // filter out items, which completed all conveyor stages
      .filter(({ position }) => position < stages.length);

    await sleep(1000); // eslint-disable-line no-await-in-loop
  } while (inProgress.length);

  placeItemsInStorage();
}

startButton.onclick = conveyorFlow;
