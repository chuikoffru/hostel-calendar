import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Booking } from '../api/booking.js';
import { Rooms } from '../api/rooms.js';

import './form.html';

import arrayBtwDates from '../libs/arrayBtwDates';
import parseBed from '../libs/parseBeds';
import getFormData from '../libs/getFormData';
import splitDaysByMonth from '../libs/splitDaysByMonth';

Template.formBook.onCreated(function(){

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
    return Rooms.findOne({title : Session.get('room')});
  },
  curRoom(title) {
    return Session.equals('room', title) ? 'selected' : '';
  }
});

Template.formBook.events({
  'submit form' : (event) => {
		event.preventDefault();

    //Получаем данные формы
		let data = getFormData('#new-booking');

    //Делим общую стоимость на количество забронированных мест
    data.costs = parseInt(data.costs) / parseInt(data.bed.length);

    //Проходим по всем выбранным местам для добавления брони
    data.bed.map((item) => {

      //Получаем массив дат
      let days = arrayBtwDates(data.checkin, data.checkout);

      //Здесь нужно разделить массив с датами на два массива в случае перехода на другой месяц
      //И создать несколько связанных броней на один месяц и на другой
      let booking = splitDaysByMonth(days);

      let id;

      booking.month.map((b) => {

        //Создаем новый массив данных бронирования
        let newdata = data;

        //Делаем бронь активной и доступной для обзора
        newdata.active = 1;

        //Получаем номер и тип кровати
        newdata.bed = parseBed(item);

        //Записываем все даты пребывания
        newdata.days = booking[b];

        //Записываем дату начала и дату конца каждой из броней
        newdata.checkin = booking[b][0];
        newdata.checkout = booking[b][booking[b].length - 1];

        console.log(newdata);

        //Если была добавлена уже часть брони, то в новой брони делаю ссылку на предыдущую
        if(id) {
          newdata.connected = id;
          let nid = Booking.insert(newdata);
          Booking.update(id, {$set : {connect : nid}});
          id = nid;
        } else {
          id = Booking.insert(newdata);
        }

      });

    });

	},
  'change #room' : (event) => {
    Session.set('room', event.target.value);
  },
  'click .checkdate' : (event, template) => {

		let data = getFormData('#new-booking');

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