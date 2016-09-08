import { Mongo } from 'meteor/mongo';

export const Booking = new Mongo.Collection('booking');

/*Booking.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "ФИО"
  },
  room : {
    type : String,
    label : "Комната"
  },
  place: {
    type: String,
    label: "Место"
  },
  checkin: {
    type: Date,
    label: "Дата заезда"
  },
  checkout: {
    type: Date,
    label: "Дата выезда"
  },
  summary: {
    type: Number,
    label: "Стоимость"
  },
  payment : {
    type : String,
    label : "Способ оплаты"  
  },
  company : {
    type : String,
    label : "Компания"  
  },
  data : {
    type : String,
    label : "Данные"  
  }
}));*/