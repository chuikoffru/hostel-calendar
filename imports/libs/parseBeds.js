//Парсим отмеченные кровати и получаем объект кровати

export default (bed) => {

    bed = bed.split('-');

    return {
       num : parseInt(bed[0]),
       type : parseInt(bed[1])
    }
}