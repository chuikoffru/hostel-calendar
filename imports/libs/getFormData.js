//Формируем JSON из данных формы

import serialize from 'form-serialize';

export default (selector) => {
    var form = document.querySelector(selector);
	return serialize(form, { hash: true });
}