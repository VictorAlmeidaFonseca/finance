import validators from "../../utils/validators"

const mandatoryFields = ["value", "name", "dueDay"]
const allAllowFields = [ "name" , "category" , "value" , "installments" , "description" , "dueDay"]


const validadeRequest = async (request) => {
    const { body } = request

    try {
        
        const normalizedRequest = await validators.removeDeniedInput(body, allAllowFields);
        
        const fields = validators.getKeysFromRequest(normalizedRequest);        
        const httpMethod = validators.getHttpMethod(request);

        if (httpMethod.post) validators.validadePostRequest(fields, mandatoryFields);
        if (httpMethod.path) validators.validadeUpdateRequest(fields, mandatoryFields);
        
        return normalizedRequest;
    
    } catch (error) {
        throw error
    };
};


const middlewares = { validadeRequest };

export default middlewares;