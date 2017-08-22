//Разделяем массив дней по месяцам

export default (arr) => {

    //Определяем новый массив
    let newarr = {
        month : []
    };
    let m = "00";
    //Проходим по массиву дат
    arr.map((date, i) => {
        //console.log('Сначала m = ', m);
        //Если m не указывает на месяц месяц текущей даты
        if(m != date.split('-')[1]) {
            m = date.split('-')[1];
            //console.log('Теперь новая m = ', m);
            newarr.month.push(m);
            newarr[m] = [];
            newarr[m].push(date);
        } else {
            //console.log('Осталась та же m = ', m);
            newarr[m].push(date);
        }
    });

    //console.log(newarr);
    return newarr;
}