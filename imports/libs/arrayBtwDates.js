//Формируем массив дней из разницы дней

export default (st, fi) => {

    //Форматируем даты начала и конца бронирования
    let start = moment(st, "DD-MM-YYYY");
    let end = moment(fi, "DD-MM-YYYY");
    //Получаем разницу в количестве дней
    let diff = end.diff(start, 'days');
    //Добавляем первый день в новый массив
    let result = [];
    result.push(start.format('DD-MM-YYYY'));
    //Прибавляем к начальному дню по одному дню в цикле
    for(i=0;i<diff;i++) {
        result.push(start.add(1, 'd').format('DD-MM-YYYY'))
    }
    return result;
}