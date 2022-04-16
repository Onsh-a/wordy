const getData = ({ commit } ) =>  {
	fetch("/wordy", {
		method: "GET",
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			console.warn("Server returned " + response.status + " : " + response.statusText);
		}
	}).then((data) => {
		commit('setVocabulary', data)
	}).catch((err) => {
		console.warn(err);
	});
}

const editPair = ({ commit, state }, data) => {
	fetch(`/wordy/${data.id}`, {
		headers: {
			'Content-Type': 'application/json'
		},
		method: "PATCH",
		body: JSON.stringify( { russian: data.russian, english: data.english })
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
	fetch('/wordy/', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify( { russian: data.russian, english: data.english })
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			console.warn("Server returned " + response.status + " : " + response.statusText);
		}
	}).then((data) => {
		commit('handleToaster', { isActive: true, type: 'create', success: true })
		state.vocabulary.push(data);
	}).catch((err) => {
		console.warn(err);
	});
}

const deletePair = ({ commit, state }, data) => {
	fetch(`/wordy/${data.id}`, {
		headers: {
			'Content-Type': 'application/json'
		},
		method: "DELETE",
	}).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			console.warn("Server returned " + response.status + " : " + response.statusText);
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
	deletePair
};
