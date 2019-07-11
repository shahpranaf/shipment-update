import { ShipmentHandler } from "../src/challenge";

describe("Check receiveUpdates are not running concurrently", () => {
  const shipment: ShipmentHandler = new ShipmentHandler();
  let updateShipmentSpy;

  beforeAll(() => {
    updateShipmentSpy = jest.spyOn(shipment, "updateShipment");
  });

  it("Check updateShipment is called once on each receiveUpdate", () => {
    return shipment.receiveUpdate("1", "ShipmentData1").then(() => {
      expect(updateShipmentSpy).toHaveBeenCalledTimes(1);
      expect(updateShipmentSpy).toHaveBeenLastCalledWith("1", "ShipmentData1");
      updateShipmentSpy.mockClear();
    });
  });

  it("Check updateShipment is called with proper params", () => {
    return shipment.receiveUpdate("2", "ShipmentData2").then(() => {
      expect(updateShipmentSpy).toHaveBeenCalledTimes(1);
      expect(updateShipmentSpy).toHaveBeenLastCalledWith("2", "ShipmentData2");
    });
  });

  it("Check receiveUpdate returns proper response", () => {
    return shipment.receiveUpdate("2", "ShipmentData2").then(data => {
      expect(data).toContain("update 2");
    });
  });

  it("Check receiveUpdate returns proper response", () => {
    return shipment.receiveUpdate("2", "ShipmentData2").then(data => {
      expect(data).not.toContain("update 1");
    });
  });
});
