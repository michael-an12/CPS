import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";

import { ParkingSlot, ParkingLocation } from "../models/parkingLocations.js";

const db = getDatabase();

const { createApp } = Vue;

createApp({
  mounted() {
    // Get current user
    this.getCurrentUser();

    if (this.currentUser == null) {
      return (window.location.href = "/pages/signup_login.html");
    }

    // Load locations
    this.loadParkingLocations();
  },

  data() {
    return {
      numberOfSlots: 0,
      bookedSlots: [],
      selectedSlot: new ParkingSlot("", true, ""),
      selectedSlotIndex: null,
      locations: [],
      bookingVehicleNumber: "",
      showBookingModal: false,
      showBookingCompletedModal: false,
      showAddNewLocationModal: false,
      currentSelectedLocation: new ParkingLocation(
        "",
        "Loading...",
        "https://c.tenor.com/28DFFVtvNqYAAAAC/loading.gif",
        [],
        "Loading..."
      ),
      currentUser: {},
      newLocation: {},
    };
  },
  methods: {
    getCurrentUser: function () {
      this.currentUser = JSON.parse(localStorage.getItem("userData"));
    },
    checkIfSlotIsAvailable: function (slot) {
      return slot.isAvailable;
    },

    toggleBookingModal: function () {
      this.showBookingModal = !this.showBookingModal;
    },

    toggleBookingCompletedModal: function () {
      this.showBookingCompletedModal = !this.showBookingCompletedModal;
    },

    toggleAddNewLocationModal: function () {
      this.showAddNewLocationModal = !this.showAddNewLocationModal;
    },

    bookParkingSlot: function (parkingSlot, index) {
      //   Select the slot
      this.selectedSlot = parkingSlot;
      // Keep reference to the index
      this.selectedSlotIndex = index;
      this.toggleBookingModal();
    },

    confirmBooking: function () {
      // Get slot and add it to database
      update(
        ref(
          db,
          `parkingLocations/${this.currentSelectedLocation.id}/parkingSlots/${this.selectedSlotIndex}`
        ),
        {
          isAvailable: false,
          vehicleNumber: this.bookingVehicleNumber,
          isBookedBy: this.currentUser.email,
          isBooked: true,
        }
      )
        .then((value) => {
          // close the modal
          this.toggleBookingModal();
          this.showBookingCompletedModal = true;

          setTimeout(() => {
            this.showBookingCompletedModal = false;
          }, 1500);
        })
        .catch((e) => {
          alert("Failed to book parking slot.");
        });
    },

    isUserSlot: function (isBookedBy) {
      if (isBookedBy == this.currentUser.email) return true;

      return false;
    },

    loadParkingLocations: function () {
      get(child(ref(getDatabase()), "parkingLocations/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());

            this.locations = Object.keys(snapshot.val()).map((locationKey) => {
              return new ParkingLocation(
                locationKey,
                snapshot.val()[locationKey].name,
                snapshot.val()[locationKey].logo,
                snapshot.val()[locationKey].parkingSlots,
                snapshot.val()[locationKey].address
              );
            });

            //   Select the first location as default
            this.selectParkingLocation(this.locations[0]);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    selectParkingLocation: function (location) {
      this.currentSelectedLocation = location;

      // gets data whenever there's a change
      onValue(
        ref(db, `parkingLocations/${location.id}/parkingSlots`),
        (snapshot) => {
          //gets access to data
          const data = snapshot.val();

          this.currentSelectedLocation.parkingSlots = data;
        }
      );
    },

    addParkingLocation: function () {
      // get unique id
      const locationId = this.generateID();
      let slots = [];

      // generate parking slots
      for (let i = 0; i < this.newLocation.numberOfSlots; i++) {
        slots.push(
          new ParkingSlot(
            `${this.newLocation.slotPrefix}${i}`,
            true,
            "",
            false,
            ""
          )
        );
      }

      // add new parking location to database
      set(
        ref(db, "parkingLocations/" + locationId),
        JSON.parse(
          JSON.stringify(
            new ParkingLocation(
              locationId,
              this.newLocation.name,
              this.newLocation.logoUrl,
              slots,
              this.newLocation.address
            )
          )
        )
      )
        .then((value) => {
          console.log("Successfully created new parking location.");
          alert("Successfully created new parking location.");
        })
        .catch((e) => {
          console.log("Failed to add new location.");
          alert("Failed to add new location.");
        });
    },

    generateID: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },

    logout: function () {
      localStorage.removeItem("userData");
      location.href = "../pages/login.html";
    },

    isAdmin: function () {
      if (this.currentUser.privilege == 1) {
        return true;
      }
      return false;
    },
  },
}).mount("#parkingViewController");
