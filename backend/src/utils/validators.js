const getKeysFromRequest = request => Object.keys(request)

const getOnlyAllowFields = (request, allAllowFields) => request.filter(field => allAllowFields.includes(field));

const createNewPayload = (payload, fieldsToNewPayload) => {
	const newPayload = {};
	
	for (const [key, value] of Object.entries(payload)) {
		fieldsToNewPayload.map(field => {
			if (field === key) newPayload[key] = value
		})
	 };

	 return newPayload;
};

const removeDeniedInput = async (request, allAllowFields) => {
	const keys =  getKeysFromRequest(request)
	const fieldsToNewPayload = getOnlyAllowFields(keys, allAllowFields);
		return createNewPayload(request, fieldsToNewPayload);
}

const validadePostRequest = (request, mandatorysFiels)  => mandatorysFiels.some(field => {
    if (!request.includes(field)) throw `${field} must be informed!`;
})

const validadeUpdateRequest = (request, mandatorysFiels) => request.some(field => {
	if (!mandatorysFiels.includes(field)) 
	throw `At least one of them fields must be informed: ${mandatorysFiels}`;
})

const validadeDeleteRequest = request => request.map(field => {
    if (field !== "id") throw `id must be informed!`;
})

const getHttpMethod = request => request.route.methods;


const  validators =  { 
	getKeysFromRequest, 
	validadePostRequest,
	validadeUpdateRequest,
	validadeDeleteRequest,
	getOnlyAllowFields,
	getHttpMethod,
	createNewPayload,
	removeDeniedInput
};

export default validators;
