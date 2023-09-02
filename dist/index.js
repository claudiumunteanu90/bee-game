"use strict";
var BeeType;
(function (BeeType) {
    BeeType["Queen"] = "Queen";
    BeeType["Worker"] = "Worker";
    BeeType["Drone"] = "Drone";
})(BeeType || (BeeType = {}));
let heroSelect = "";
let bees = [];
const hitButton = document.getElementById("hit-button");
const addWorkerButton = document.getElementById("add-worker-button");
const addDroneButton = document.getElementById("add-drone-button");
const playerNameSelect = document.getElementById("player-name");
const queenDetails = document.getElementById("queen-details");
const workerDetalis = document.getElementById("worker-details");
const droneDetails = document.getElementById("drone-details");
const hitDetails = document.getElementById("hit-details");
const damageValues = {
    [BeeType.Queen]: 8,
    [BeeType.Worker]: 10,
    [BeeType.Drone]: 12,
};
playerNameSelect.addEventListener("change", () => {
    heroSelect = playerNameSelect.value;
    hitButton.disabled = heroSelect === "";
});
hitButton.addEventListener("click", () => {
    hitRandomBee();
});
addWorkerButton.addEventListener("click", () => {
    bees.push({ type: BeeType.Worker, hp: 85 });
    updateSwarmInfo();
});
addDroneButton.addEventListener("click", () => {
    bees.push({ type: BeeType.Drone, hp: 50 });
    updateSwarmInfo();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        hitRandomBee();
    }
});
const hitRandomBee = () => {
    const randomIndex = Math.floor(Math.random() * bees.length);
    const bee = bees[randomIndex];
    let damage = 0;
    if (bee && damageValues[bee.type] !== undefined) {
        damage = damageValues[bee.type];
        bee.hp -= damage;
        if (bee.hp <= 0) {
            bees.splice(randomIndex, 1);
            if (bee.type === BeeType.Queen) {
                hitDetails.innerText = `The Queen is dead`;
                alert("The Queen is dead");
                return;
            }
        }
        hitDetails.innerHTML = `<p>${heroSelect} hit ${bee.type} with ${damage} damage.</p>`;
        updateSwarmInfo();
    }
};
const updateSwarmInfo = () => {
    var _a;
    queenDetails.innerText = `${BeeType.Queen}: ${((_a = bees.find((bee) => bee.type === BeeType.Queen)) === null || _a === void 0 ? void 0 : _a.hp) || 0} HP`;
    const workerBees = bees.filter((bee) => bee.type === BeeType.Worker);
    const workerNumber = workerBees.length;
    const workerTotalHealth = workerBees.reduce((total, bee) => total + bee.hp, 0);
    workerDetalis.innerText = `${BeeType.Worker}: ${workerNumber} Bees x ${workerTotalHealth} Total Health `;
    const droneBees = bees.filter((bee) => bee.type === BeeType.Drone);
    const droneNumber = droneBees.length;
    const droneTotalHealth = droneBees.reduce((total, bee) => total + bee.hp, 0);
    droneDetails.innerText = `${BeeType.Drone}: ${droneNumber} Bees x ${droneTotalHealth} Total Health `;
};
bees.push({ type: BeeType.Queen, hp: 100 });
for (let i = 0; i < 5; i++) {
    bees.push({ type: BeeType.Worker, hp: 85 });
}
for (let i = 0; i < 8; i++) {
    bees.push({ type: BeeType.Drone, hp: 50 });
}
updateSwarmInfo();
//# sourceMappingURL=index.js.map