// m - amount of stages
// n - amount of items
// t - time for passing 1 stage
// T - general time

// T = t * (m + n - 1)

const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms)); // helpers

const STORAGE = document.querySelector(".items");
const CONVEYOR = document.querySelector(".stages");

const loadStorage = (itemsAmount, storage) => {
  for (let i = 1; i <= itemsAmount; i += 1) {
    const itemNode = document.createElement("div");
    itemNode.id = `item ${i}`;
    itemNode.className = "item";
    itemNode.innerText = `Item ${i}`;
    storage.appendChild(itemNode);
  }
};

// n = 6
loadStorage(6, STORAGE);

const createStageNode = (stageId, stageLabel) => {
  const stageNode = document.createElement("div");
  stageNode.className = "stage";
  const stageInnerNode = document.createElement("div");
  stageInnerNode.id = stageId;
  stageInnerNode.className = "stage__inner";
  const stageLabelNode = document.createElement("p");
  stageLabelNode.innerText = stageLabel;
  stageLabelNode.className = "stage__label";
  stageNode.appendChild(stageInnerNode);
  stageNode.appendChild(stageLabelNode);
  return stageNode;
};

const loadConveyor = (stagesAmount, conveyor) => {
  for (let i = 1; i <= stagesAmount; i += 1) {
    const stageNode = createStageNode(`stage ${i}`, `Stage ${i}`);
    conveyor.appendChild(stageNode);
  }
};

// m = 5
loadConveyor(5, CONVEYOR);

// t = 3s
const manufacture = async item => {
  const stages = document.querySelectorAll(".stage__inner");
  stages.forEach(async stage => {
    stage.appendChild(item);
    await sleep(3000);
    stage.removeChild(item);
  });
};

const startConveyor = () => {
  const items = document.querySelectorAll(".item");
  items.forEach(item => manufacture(item));
};

startConveyor();
