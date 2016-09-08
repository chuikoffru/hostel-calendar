import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Booking } from '../api/booking.js';
import { Rooms } from '../api/rooms.js';

import serialize from 'form-serialize';

import './data.html';

Template.data.helpers({
    book: function() {
        return Booking.findOne({_id : Session.get('removeBook')});
    }
});

Template.data.events({ 
    'click .btn-danger': function(event, template) { 
         Booking.update({_id : event.target.dataset.id},{
             $set : {
                 active : 0
             }
         });
    } 
});