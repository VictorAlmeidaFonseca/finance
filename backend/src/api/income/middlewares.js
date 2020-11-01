
const mandatorysFiels = ["value", "name"]

const validadeRequest = async (request) => {
    const getKeysOfRequest = Object.keys(request);
    const checkFields = mandatorysFiels.map(field => getKeysOfRequest.find(key => key === field));
    
    if (!checkFields) throw "value and name must be informed"
};

const validadeUpdateRequest = async (request) =>  {
    const getKeysOfRequest = Object.keys(request);
    const checkFields = mandatorysFiels.map(field => getKeysOfRequest.find(key => key === field));
    
    if (!checkFields) throw "value or name must be informed"
}

const middlewares = { validadeRequest, validadeUpdateRequest };

export default middlewares;