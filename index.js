const CONVEYOR_STAGE_COUNT = 4;
const ITEM_COUNT = 13;

const itemsContainer = document.getElementById("items");
const stagesContainer = document.getElementById("conveyor-stages");
const outputContainer = document.getElementById("output");

const startButton = document.getElementById("start-button");

const conveyorStages = Array(CONVEYOR_STAGE_COUNT)
  .fill()
  .map((_, id) => {
    const stage = document.createElement("div");
    stage.id = `conveyor-stage-${id}`;
    stage.className = "stage";
    return stage;
  });
conveyorStages.forEach(stage => stagesContainer.appendChild(stage));

const items = Array(ITEM_COUNT)
  .fill()
  .map((_, id) => {
    const item = document.createElement("div");
    item.id = `item-${id}`;
    item.className = "item";
    item.appendChild(document.createTextNode(id.toString()));
    return item;
  });

function placeItemsInStorage() {
  items.forEach(item => itemsContainer.appendChild(item));
}

placeItemsInStorage();

const stages = [...conveyorStages, outputContainer];

function* itemStageIterator(item) {
  let prevStage = itemsContainer;
  for (const currentStage of stages) {
    prevStage.removeChild(item);
    currentStage.appendChild(item);
    yield;
    prevStage = currentStage;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function conveyorFlow() {
  const storage = [...items];
  let iterators = [itemStageIterator(storage.pop())];

  while (iterators.length) {
    iterators = iterators.filter(it => !it.next().done);

    const nextItem = storage.pop();
    if (nextItem) {
      iterators.push(itemStageIterator(nextItem));
    }

    await sleep(1000);
  }

  placeItemsInStorage();
}

startButton.onclick = conveyorFlow;
