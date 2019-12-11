// m - amount of stages
// n - amount of items
// t - time for passing 1 stage
// T - general time

// T = t * (m + n - 1)

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

const storageDom = document.querySelector('.storage');
// n = 6
const itemsDom = Array(6).fill().map((_, idx) => createItemNode(idx));
itemsDom.forEach(item => storageDom.appendChild(item));

const conveyorDom = document.querySelector('.stages');
// m = 5
const stagesDom = Array(5).fill().map((_, idx) => createStageNode(idx));
stagesDom.forEach(stage => conveyorDom.appendChild(stage));

const startConveyor = () => {
    const conveyorState = Array(stagesDom.length).fill(null);
    const storageState = itemsDom.slice();
    setInterval(() => {
        console.log("conveyor state", conveyorState);
        console.log("storage state", storageState);
        // out
        const output = conveyorState[conveyorState.length - 1];
        if (output != null) {
          stagesDom[stagesDom.length - 1].removeChild(output);
          storageState.push(output);
          storageDom.appendChild(output);
        }

        // next stage
        for (let i = stagesDom.length - 1; i > 0; --i) {
          const itemMoved = conveyorState[i - 1];
          conveyorState[i] = itemMoved;
          if (itemMoved != null) {
            stagesDom[i - 1].removeChild(itemMoved);
            stagesDom[i].appendChild(itemMoved);
          }
        }

        // in
        const input = storageState.shift();
        if (input != null) {
          storageDom.removeChild(input);

          conveyorState[0] = input;
          stagesDom[0].appendChild(input);
        }
    }, 3000);
};

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', startConveyor);
