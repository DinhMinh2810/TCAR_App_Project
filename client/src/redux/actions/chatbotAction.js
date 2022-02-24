export function saveMessage(dataToSubmit) {
	return {
		type: 'SAVE_MESSAGE',
		payload: dataToSubmit,
	};
}
