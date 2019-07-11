import { Mutex } from "async-mutex";
const mutex = new Mutex();

async function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

async function randomDelay() {
  const randomTime = Math.round(Math.random() * 1000);
  return sleep(randomTime);
}

class ShipmentSearchIndex {
  async updateShipment(id: string, shipmentData: any) {
    const startTime = new Date();
    await randomDelay();
    const endTime = new Date();
    console.log(
      `update ${id}@${startTime.toISOString()} finished@${endTime.toISOString()}`
    );

    return { startTime, endTime };
  }
}

// Implementation needed
export interface ShipmentUpdateListenerInterface {
  receiveUpdate(id: string, shipmentData: any);
}

export class ShipmentHandler extends ShipmentSearchIndex
  implements ShipmentUpdateListenerInterface {
  receiveUpdate = async (id: string, shipmentData: any) => {
    try {
      const release = await mutex.acquire();
      const res = await this.updateShipment(id, shipmentData);
      release();
      return `update ${id}@${res.startTime.toISOString()} finished@${res.endTime.toISOString()}`;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

const shipment: ShipmentUpdateListenerInterface = new ShipmentHandler();

shipment.receiveUpdate("1", "data1");
shipment.receiveUpdate("1", "data2");
shipment.receiveUpdate("1", "data3");
shipment.receiveUpdate("3", "data4");
shipment.receiveUpdate("2", "data5");
shipment.receiveUpdate("4", "data6");
shipment.receiveUpdate("6", "data7");
shipment.receiveUpdate("3", "data8");
