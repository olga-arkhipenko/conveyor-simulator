function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// pre-defined html elements
const itemsContainer = document.getElementById("items");
const stagesContainer = document.getElementById("conveyor-stages");
const outputContainer = document.getElementById("output");
const startButton = document.getElementById("start-button");

// dynamically created elements
const CONVEYOR_STAGE_COUNT = 4;

const conveyorStages = Array(CONVEYOR_STAGE_COUNT)
  .fill()
  .map((_, id) => {
    const stage = document.createElement("div");
    stage.id = `conveyor-stage-${id}`;
    stage.className = "stage";
    return stage;
  });

const ITEM_COUNT = 13;

const items = Array(ITEM_COUNT)
  .fill()
  .map((_, id) => {
    const item = document.createElement("div");
    const itemId = `item-${id}`;
    item.id = itemId;
    item.className = "item";
    item.appendChild(document.createTextNode(id.toString()));
    return { [itemId]: item };
  })
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

    await sleep(1000);
  } while (inProgress.length);

  placeItemsInStorage();
}

startButton.onclick = conveyorFlow;
