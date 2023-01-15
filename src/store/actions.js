const PATH = 'http://localhost:8081'

const getData = ({ commit, state }) =>  {
	if (!state.auth.userId) return false
	fetch(`${PATH}/wordy?lang=${state.lang}&user=${state.auth.userId}`, {
		method: 'GET',
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
			console.warn(`Server returned ${response.status} ${response.statusText}`);
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

const editPair = async ({ commit, state }, data) => {
	let response = await fetch(`${PATH}/wordy/${data.id}?lang=${state.lang}`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'PATCH',
		body: JSON.stringify( { lang: state.lang, russian: data.russian, foreign: data.foreign })
	})
	if (!response.ok) {
		commit('handleToaster', { type: 'Серверная ошибка', isSuccess: false })
		throw new Error(`Server Error ${response.status} ${response.statusText}`);
	}
	response = await response.json();
	if (!response.success) {
		commit('handleToaster', { type: 'error', isSuccess: false })
		throw new Error(`Unsuccessful edit attempt`);
	}
	commit('handleToaster', { type: 'edit', isSuccess: true })
	state.vocabulary.forEach(item => {
		if (item._id === response.id) {
			item.foreign = response.updData.foreign
			item.russian = response.updData.russian
		}
	})
}

const addPair = async ({ commit, state }, data) => {
	let response = await fetch(`${PATH}/wordy/`, {
		headers: {'Content-Type': 'application/json'},
		method: 'POST',
		body: JSON.stringify({
			lang: data.lang,
			russian: data.russian,
			foreign: data.foreign,
			userId: state.auth.userId
		})
	})
	if (!response.ok) {
		commit('handleToaster', { type: 'Серверная ошибка', isSuccess: false });
	}
	response = await response.json();
	if (!response.success) {
		commit('handleToaster', { type: 'error', isSuccess: false });
		throw new Error(`Unsuccessful addition attempt`);
	}
	commit('handleToaster', { type: 'create', isSuccess: true });
	state.vocabulary.push(response.newPair);
}

const deletePair = async ({ commit, state }, data) => {
	let response = await fetch(`${PATH}/wordy/${data.id}?lang=${state.lang}`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'DELETE',
	});

	if (!response.ok) {
		commit('handleToaster', {type: 'Серверная ошибка', isSuccess: false});
		throw new Error(`Server Error ${response.status} ${response.statusText}`);
	}
	response = await response.json();
	if (!response.success) {
		commit('handleToaster', { type: 'error', isSuccess: false });
		throw new Error(`Unsuccessful deletion attempt`);
	}
	commit('handleToaster', { type: 'delete', isSuccess: true });
	state.vocabulary = state.vocabulary.filter(item => item._id !== response.id);
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
