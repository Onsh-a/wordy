const getCurrentPairData = (state) =>  {
	const currentPairId = state.currentPairId;
	const currentPair = state.vocabulary.find(vocabularyUnit => vocabularyUnit._id === currentPairId);
	if (currentPair) {
		return {...currentPair, lang: state.lang }
	}
	return {
		foreign: null,
		russian: {
			noun: null,
			verb: null,
			adjective: null,
			other: null,
		},
		lang: state.lang
	};
}
export default {
	getCurrentPairData
};
