const setVocabulary = (state, data) => state.vocabulary = data
const handleSearch = (state, data) => state.search = data
const handleSort = (state, data) => state.ascending = data
const handleLangChange = (state) => state.lang = state.lang === 'eng' ? 'esp' : 'eng'
const togglePending = (state, data) => state.asyncManagement.pending = data ? data : !state.asyncManagement.pending;
const handleErrorMessages = (state, data) => state.popup.errors = data ? data : null;
const handleAuth = (state, data) => {
	if (data.success === false) {
		state.popup.errors.push(data.message);
	} else {
		state.popup.type = 'auth-success';
		state.auth.userName = data.userName;
		state.auth.authType = null;
	}
}

const handleCurrentUser = (state, data) => {
	if (data) {
		localStorage.setItem('session', data.id);
		state.auth.userId = data.id;
	} else {
		let session = localStorage.getItem('session');
		if (session) {
			session = session || null;
			state.auth.userId = session;
		} else {
			state.auth.userId = null
		}
	}
}

const handleToaster = (state, data) => {
	state.toaster.options.isActive = data.isActive;
	state.toaster.options.type = data.type;
	state.toaster.options.success= data.success;
}

const handlePopup = (state, data) => {
	state.popup.type = data.type;
	if (data.type === 'create') {
		state.popup.isActive = true;
	} else if (data.type === 'edit') {
		state.popup.isActive = true;
		state.currentId = data.id;
	} else if (data.type === 'delete') {
		state.currentId = data.id;
	} else if (data.type === 'auth') {
		state.popup.isActive = true
		state.auth.authType = data.authType
	} else {
		// closing the popup
		state.popup.isActive = false;
		state.currentId = '';
	}
}

export default {
	setVocabulary,
	handleToaster,
	handlePopup,
	handleSearch,
	handleSort,
	handleLangChange,
	handleCurrentUser,
	togglePending,
	handleErrorMessages,
	handleAuth
};
