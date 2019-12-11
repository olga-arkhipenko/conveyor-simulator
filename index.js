// m - amount of stages
// n - amount of items
// t - time for passing 1 stage
// T - general time

// T = t * (m + n - 1)

const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms)); //helpers

const createItemNode = itemId => {
    const itemNode = document.createElement('div');
    itemNode.id = `item ${itemId}`;
    itemNode.className = 'item';
    itemNode.innerText = `Item ${itemId}`;
    return itemNode;
};

const createStageNode = stageId => {
    const stageNode = document.createElement('div');
    stageNode.className = 'stage';
    const stageInnerNode = document.createElement('div');
    stageInnerNode.id = `stage ${stageId}`;
    stageInnerNode.className = 'stage__inner';
    const stageLabelNode = document.createElement('p');
    stageLabelNode.innerText = `Stage ${stageId}`;
    stageLabelNode.className = 'stage__label';
    stageNode.appendChild(stageInnerNode);
    stageNode.appendChild(stageLabelNode);
    return stageNode;
};

const STORAGE = document.querySelector('.storage');
// n = 6
const ITEMS = Array(6).fill().map((_, idx) => createItemNode(idx));
ITEMS.forEach(item => STORAGE.appendChild(item));

const CONVEYOR = document.querySelector('.stages');
// m = 5
const STAGES = Array(5).fill().map((_, idx) => createStageNode(idx));
STAGES.forEach(stage => CONVEYOR.appendChild(stage));

const startConveyor = () => {
    const conveyorState = Array(STAGES.length).fill(null);
    const storageState = ITEMS.slice();
    setInterval(() => {
        console.log("conveyor state", conveyorState);
        console.log("storage state", storageState);
        // out
        const output = conveyorState[conveyorState.length - 1];
        if (output != null) {
          STAGES[STAGES.length - 1].removeChild(output);
          storageState.push(output);
          STORAGE.appendChild(output);
        }

        // next stage
        for (let i = STAGES.length - 1; i > 0; --i) {
          const itemMoved = conveyorState[i - 1];
          conveyorState[i] = itemMoved;
          if (itemMoved != null) {
            STAGES[i - 1].removeChild(itemMoved);
            STAGES[i].appendChild(itemMoved);
          }
        }

        // in
        const input = storageState.shift();
        if (input != null) {
          STORAGE.removeChild(input);

          conveyorState[0] = input;
          STAGES[0].appendChild(input);
        }
    }, 3000);
};
document.querySelector('.start-button').onclick = startConveyor;

