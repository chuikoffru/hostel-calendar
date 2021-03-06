import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Booking } from '../api/booking.js';
import { Rooms } from '../api/rooms.js';

import serialize from 'form-serialize';

import './stat.html';

Template.stat.helpers({
    checkinToday() {
        return Booking.find({checkin : moment().format('DD-MM-YYYY'), active : 1}).count();
    },
    checkoutToday() {
        return Booking.find({checkout : moment().format('DD-MM-YYYY'), active : 1}).count();
    },
    toDay() {
        return moment().format("DD-MM-YYYY");
    },
    getCurrentMonth() {
        return moment().format("MMMM");
    },
    freeRooms() {
        let data = [];

        let rooms = Rooms.find({});

        rooms.map((room) => {

            let query = Booking.find({
                active : 1,
                room : room.title,
                days : {
                    $in : [moment().format("DD-MM-YYYY")]
                }
            });

            data.push({
                name : room.title,
                all : room.beds.length,
                closed : query.count(),
                free : room.beds.length - query.count()
            })
        });

        return data;
    }
})