const PATH = 'http://localhost:8081'

const getData = ({ commit, state }) =>  {
	if (!state.auth.userId) return false
	fetch(`${PATH}/wordy?lang=${state.lang}&user=${state.auth.userId}`, {
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

const signIn = ({ commit, state}, data) => {
	commit('togglePending', true);
	fetch(`${PATH}/wordy/signin`, {
		headers: { 'Content-Type': 'application/json' },
		method: "POST",
		body: JSON.stringify( {
			name: data.name,
			login: data.login,
			email: data.email,
			pwd: data.pwd
		})
	}).then((response) => {
		return response.json();
	}).then((res) => {
		commit('togglePending', false);
		if (res.success === true) {
			commit('handleCurrentUser', {id: res.userId});
			commit('handleAuth', {
				success: res.success,
				userName: res.userName,
				message: res.message
			});
			dispatch('getData');
		} else {
			commit('handleAuth', {
				success: res.success,
				message: res.message
			});
		}
	}).catch((err) => console.warn(err))
}

const logIn = ({ dispatch, commit, state }, data) => {
	commit('togglePending', true);
	fetch(`${PATH}/wordy/login`, {
		headers: { 'Content-Type': 'application/json' },
		method: "POST",
		body: JSON.stringify( {
			login: data.login,
			pwd: data.pwd
		})
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			console.warn("Server returned " + response.status + " : " + response.statusText);
		}
	}).then((res) => {
		commit('togglePending', false);
		if (res.success === true) {
			commit('handleCurrentUser', { id: res.userId});
			commit('handleAuth', {
				success: res.success,
				userName: res.userName,
				message: res.message
			});
			dispatch('getData');
		} else {
			commit('handleAuth', {
				success: res.success,
				message: res.message
			});
		}
	}).catch((err) => console.warn(err))
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
			commit('handleToaster', { isActive: true, type: 'Серверная ошибка', success: false })
			console.warn("Server returned " + response.status + " : " + response.statusText);
		}
	}).then((res) => {
		if (res.success === true) {
			commit('handleToaster', { isActive: true, type: 'edit', success: true })
			state.vocabulary.forEach(item => {
				if (item._id === res.id) {
					item.foreign = res.updData.foreign
					item.russian = res.updData.russian
				}
			})
		} else {
			commit('handleToaster', { isActive: true, type: 'error', success: false })
		}
	}).catch((err) => {
		console.warn(err);
	});
}

const addPair = ({ commit, state }, data) => {
	fetch(`${PATH}/wordy/`, {
		headers: { 'Content-Type': 'application/json' },
		method: "POST",
		body: JSON.stringify( {
			lang: data.lang,
			russian: data.russian,
			foreign: data.foreign,
			userId: state.auth.userId
		})
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			commit('handleToaster', { isActive: true, type: 'Серверная ошибка', success: false });
		}
	}).then((data) => {
		if (data.success === true) {
			commit('handleToaster', { isActive: true, type: 'create', success: true });
			state.vocabulary.push(data.newPair);
		} else {
			commit('handleToaster', { isActive: true, type: 'error', success: false });
		}
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
			commit('handleToaster', { isActive: true, type: 'Ошибка сервера', success: false })
			console.warn("Server returned " + res.status + " : " + res.statusText);
		}
	}).then((res) => {
		if (res.success === true) {
			commit('handleToaster', { isActive: true, type: 'delete', success: true })
			state.vocabulary = state.vocabulary.filter(item => item._id !== res.id)
		} else {
			commit('handleToaster', { isActive: true, type: 'error', success: false })
		}
	}).catch((err) => {
		console.warn(err);
	});
}

export default {
	getData,
	editPair,
	addPair,
	deletePair,
	changeLang,
	signIn,
	logIn
};
