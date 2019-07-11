"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const async_mutex_1 = require("async-mutex");
const mutex = new async_mutex_1.Mutex();
function sleep(ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        });
    });
}
function randomDelay() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const randomTime = Math.round(Math.random() * 1000);
        return sleep(randomTime);
    });
}
class ShipmentSearchIndex {
    updateShipment(id, shipmentData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startTime = new Date();
            yield randomDelay();
            const endTime = new Date();
            console.log(`update ${id}@${startTime.toISOString()} finished@${endTime.toISOString()}`);
            return { startTime, endTime };
        });
    }
}
class ShipmentHandler extends ShipmentSearchIndex {
    constructor() {
        super(...arguments);
        this.receiveUpdate = (id, shipmentData) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const release = yield mutex.acquire();
                const res = yield this.updateShipment(id, shipmentData);
                release();
                return `update ${id}@${res.startTime.toISOString()} finished@${res.endTime.toISOString()}`;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
}
exports.ShipmentHandler = ShipmentHandler;
const shipment = new ShipmentHandler();
shipment.receiveUpdate("1", "data1");
shipment.receiveUpdate("1", "data2");
shipment.receiveUpdate("1", "data3");
shipment.receiveUpdate("3", "data4");
shipment.receiveUpdate("2", "data5");
shipment.receiveUpdate("4", "data6");
shipment.receiveUpdate("6", "data7");
shipment.receiveUpdate("3", "data8");
//# sourceMappingURL=challenge.js.map