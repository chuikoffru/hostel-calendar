export default (st, fi) => {

    let result = [];

    //Форматируем даты начала и конца бронирования
    let start = moment(st, "DD-MM-YYYY");
    let end = moment(fi, "DD-MM-YYYY");

    //Получаем разницу в днях
    let m = start.toObject().months < 10 ? '0' + (start.toObject().months+1) : start.toObject().months + 1;

    for(i = start.toObject().date ; i < end.toObject().date ; i++) {
      let date = i < 10 ? '0' + i : i;
      let cd = `${date}-${m}-${start.toObject().years}`
      result.push(cd); 
    }

    return result;
}