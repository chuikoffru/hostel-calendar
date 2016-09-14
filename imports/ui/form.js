import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Booking } from '../api/booking.js';
import { Rooms } from '../api/rooms.js';

import serialize from 'form-serialize';

import './form.html';

import arrayBtwDates from '../libs/arrayBtwDates';

Template.formBook.onCreated(function(){

  this.showBeds = new ReactiveVar(false);
  this.freeBeds = new ReactiveVar();
});

Template.formBook.onRendered(()=>{
  $('.datetimepicker').datetimepicker({
    locale: 'ru',
    viewMode: 'months',
    format: 'DD-MM-YYYY'
  });
});

Template.formBook.helpers({
  rooms() {
    return Rooms.find({}, {sort : {position : -1}})
  },
  beds() {
    let data = Rooms.findOne({title : Session.get('room')});
    Template.instance().freeBeds.set(data);
    return data;
  },
  curRoom(title) {
    return Session.equals('room', title) ? 'selected' : '';
  },
  showBeds() {
    return Template.instance().showBeds.get();
  },
  getFreeBeds() {
    return Template.instance().freeBeds.get();
  }
});

Template.formBook.events({
  'submit form' : (event) => {
		event.preventDefault();

    var form = document.querySelector('#new-booking');

		let data = serialize(form, { hash: true });

    data.costs = parseInt(data.costs) / parseInt(data.bed.length);

    data.bed.map((item) => {

      let bed = item.split('-');

      let newdata = data;

      newdata.active = 1;

      newdata.bed = {
       num : parseInt(bed[0]),
       type : parseInt(bed[1])
      }

      newdata.days = arrayBtwDates(newdata.checkin, newdata.checkout);

      Booking.insert(newdata);

    });

	},
  'change #room' : (event) => {
    Session.set('room', event.target.value);
  },
  'click .checkdate' : (event, template) => {
    var form = document.querySelector('#new-booking');

		let data = serialize(form, { hash: true });

    let check = Booking.find({
      room : data.room,
      active : 1,
      days : {
        $in : arrayBtwDates(data.checkin, data.checkout)
      }
    });

    $(`input[type=checkbox]`).removeAttr('disabled').removeAttr('selected');

    check.map((item)=>{
      $(`input[type=checkbox][value=${item.bed.num}-${item.bed.type}]`).attr('disabled', true).attr('selected', true)
    });

  }
});

Template.checkbed.helpers({
  bedDisabled(bed) {
    return "disabled";
  }
});