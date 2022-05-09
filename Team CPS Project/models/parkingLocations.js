class ParkingLocation {
  constructor(id, name, logo, parkingSlots, address) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.address = address;
    this.parkingSlots = parkingSlots.map((slot) => {
      return new ParkingSlot(slot.id, slot.isAvailable);
    });
  }

  getListOfSlots() {
    return this.parkingSlots;
  }

  getAvailableSlots() {
    return this.parkingSlots.filter((slot) => {
      if (slot.isAvailable) return true;
    });
  }

  getTotalAvailableSlots() {
    return this.getAvailableSlots().length;
  }

  getTotalOccupiedSlots() {
    return this.parkingSlots.length - this.getTotalAvailableSlots();
  }
}

class ParkingSlot {
  constructor(slotId, isAvailable, vehicleNumber, isBooked, isBookedBy) {
    this.id = slotId;
    this.isAvailable = isAvailable || true;
    this.vehicleNumber = vehicleNumber;
    this.isBooked = isBooked || false;
    this.isBookedBy = isBookedBy;
  }
}

export { ParkingSlot, ParkingLocation };
