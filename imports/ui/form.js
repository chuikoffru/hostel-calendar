import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Booking } from '../api/booking.js';
import { Rooms } from '../api/rooms.js';

import serialize from 'form-serialize';

import './form.html';

Template.formBook.helpers({
  rooms() {
    return Rooms.find({}, {sort : {position : -1}})
  },
  beds() {
    return Rooms.findOne({title : Session.get('room')});
  }
});

Template.formBook.events({
  'submit form' : (event) => {
		event.preventDefault();

    var form = document.querySelector('#new-booking');

		let data = serialize(form, { hash: true });

    let bed = data.bed.split('-');

    data.bed = {
      num : parseInt(bed[0]),
      type : parseInt(bed[1])
    }

    data.days = [];

    //Форматируем даты начала и конца бронирования
    let start = moment(data.checkin, "DD-MM-YYYY");
    let end = moment(data.checkout, "DD-MM-YYYY");

    //Получаем разницу в днях
    let m = start.toObject().months < 10 ? '0' + (start.toObject().months+1) : start.toObject().months + 1;

    for(i = start.toObject().date ; i < end.toObject().date ; i++) {
      let date = i < 10 ? '0' + i : i;
      let cd = `${date}-${m}-${start.toObject().years}`
      data.days.push(cd); 
    }

    console.log(data);

    data.active = 1;

    let id = Booking.insert(data);
	},
  'change #room' : (event) => {
    Session.set('room', event.target.value);
  },
  'click .checkdate' : (event) => {
    var form = document.querySelector('#new-booking');

		let data = serialize(form, { hash: true });

    let check = Booking.find({
      room : data.room,
      'bed.num' : parseInt(data.bed.split('-')[0]),
      'bed.type' : parseInt(data.bed.split('-')[1]),
      checkin : {
        "$gte" : data.checkin,
        //"$lte" : data.checkin
      },
      //checkout : {
        //"$lte" : data.checkin
      //}
    });

    check.map((item)=>{
      console.log(item);
    })
    

  }
})