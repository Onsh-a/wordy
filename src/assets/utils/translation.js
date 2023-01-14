export default {
	install: (app) => {
		app.config.globalProperties.$translate = (query) => {
				const dictionary = {
					eng: 'английский',
					esp: 'испанский',
					noun: 'сущ',
					verb: 'глаг',
					adjective: 'прил',
					other: 'другое',
					name: 'Имя',
					login: 'Логин',
					pwd: 'Пароль'
				}
			return dictionary.hasOwnProperty(query) ? dictionary[query] : query;
		};
	},
};
