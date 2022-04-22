const PATH = 'http://localhost:8081'

const getData = ({ commit, state }) =>  {
	fetch(`${PATH}/wordy?lang=${state.lang}`, {
		method: "GET",
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			console.warn("Server returned " + response.status + " : " + response.statusText);
		}
	}).then((data) => {
		commit('setVocabulary', data.data)
	}).catch((err) => {
		console.warn(err);
	});
}

const changeLang = ({ commit, state }) => {
	commit('handleLangChange');
	getData({ commit, state });
}

const editPair = ({ commit, state }, data) => {
	fetch(`${PATH}/wordy/${data.id}?lang=${state.lang}`, {
		headers: { 'Content-Type': 'application/json' },
		method: "PATCH",
		body: JSON.stringify( { lang: state.lang, russian: data.russian, foreign: data.foreign })
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			console.warn("Server returned " + response.status + " : " + response.statusText);
		}
	}).then((resData) => {
		commit('handleToaster', { isActive: true, type: 'edit', success: true })
		state.vocabulary.forEach(item => {
			if (item._id === resData._id) {
				item.english = resData.english
				item.russian = resData.russian
			}
		})
	}).catch((err) => {
		console.warn(err);
	});
}

const addPair = ({ commit, state }, data) => {
	fetch(`${PATH}/wordy/`, {
		headers: { 'Content-Type': 'application/json' },
		method: "POST",
		body: JSON.stringify( { lang: data.lang, russian: data.russian, foreign: data.foreign })
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			console.warn("Server returned " + response.status + " : " + response.statusText);
		}
	}).then((data) => {
		commit('handleToaster', { isActive: true, type: 'create', success: true })
		state.vocabulary.push(data.newPair);
	}).catch((err) => {
		console.warn(err);
	});
}

const deletePair = ({ commit, state }, data) => {
	fetch(`${PATH}/wordy/${data.id}?lang=${state.lang}`, {
		headers: { 'Content-Type': 'application/json' },
		method: "DELETE",
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			console.warn("Server returned " + res.status + " : " + res.statusText);
		}
	}).then((data) => {
		commit('handleToaster', { isActive: true, type: 'delete', success: true })
		state.vocabulary = state.vocabulary.filter(item => item._id !== data.id)
	}).catch((err) => {
		console.warn(err);
	});
}

export default {
	getData,
	editPair,
	addPair,
	deletePair,
	changeLang
};
