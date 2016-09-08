import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Booking } from '../api/booking.js';
import { Rooms } from '../api/rooms.js';

import serialize from 'form-serialize';

import './stat.html';

Template.stat.helpers({
    checkinToday() {
        return Booking.find({checkin : moment().format('DD-MM-YYYY')}).count();
    },
    checkoutToday() {
        return Booking.find({checkout : moment().format('DD-MM-YYYY')}).count();
    },
    toDay() {
        return moment().format("DD-MM-YYYY");
    },
    freeRooms() {
        let data = [];

        let rooms = Rooms.find({});

        rooms.map((room) => {

            //let query = Booking.find({room : room.title});

            data.push({
                name : room.title,
                all : room.beds.length
            })
        });

        return data;
    }
})