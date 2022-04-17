const setVocabulary = (state, data) => state.vocabulary = data
const handleSearch = (state, data) => state.search = data
const handleSort = (state, data) => state.ascending = data

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
	} else {
		state.popup.isActive = false;
		state.currentId = '';
	}
}

export default {
	setVocabulary,
	handleToaster,
	handlePopup,
	handleSearch,
	handleSort
};
