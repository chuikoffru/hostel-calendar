import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Booking } from '../api/booking.js';
import { Rooms } from '../api/rooms.js';

import serialize from 'form-serialize';

import './body.html';

Template.body.helpers({

  rooms() {
    return Rooms.find({}, {sort : {position : -1}})
  },

  days() {
    let d = new Date();

    let days = [...Array(d.daysInMonth()).keys()];

    return days;
  },

  bookingDays(bed, name) {

    //формируем текущие месяц и год и массив дат
    let d = new Date();

    let days = [...Array(d.daysInMonth()).keys()];
    let m = d.getMonth() < 10 ? '0' + (d.getMonth()+1) : d.getMonth();
    let y = d.getFullYear();

    //создаем результирующий массив
    let result = [];
    //создаем переменную для вычисления пропускаемых ячеек
    let skip = 0;

    //запускаем перебор по дням месяца
    days.map((day) => {

      //форматируем текущее число даты в формат 01-12
      let cd = day < 9 ? '0' + (day+1) : day + 1;
      let current = `${cd}-${m}-${y}`;

      //Ищем в базе данных брони дата которых начинается с текущей даты
      let query = Booking.findOne({room : name, 'bed.num' : bed.num, 'bed.type' : bed.type, checkin : current, active : 1});

      //Если запрос есть, заполняем дополнительные поля даты
      if(query) {

        //Форматируем даты начала и конца бронирования
        let start = moment(query.checkin, "DD-MM-YYYY");
        let end = moment(query.checkout, "DD-MM-YYYY");

        //Получаем разницу в днях
        let diff = end.diff(start, 'days');

        //Записываем данные в массив
        result.push({
          num : cd,
          name : query.name,
          diff : diff,
          source : query.source,
          id : query._id
        })

        //Указываем сколько клеток пропустить в будущем
        skip = diff-1;

      } else {
        //Если запроса нет, то проверяем нужно ли пропустить добавление даты
        if(skip == 0) {
          result.push({
            num : cd
          });
        } else {
          skip--;
        }
      }
    });


    return result;

  }

});

Template.body.events({
  'click .width-day' : (event) => {
    Session.set('removeBook', event.currentTarget.id);
  }
});

