const checkMandatoryFields = (mandatoriesFields, obj) => {
    for (const mandatory of mandatoriesFields) {
		if (!obj[mandatory] || obj[mandatory] == '' || obj[mandatory] == null)
			throw `${mandatory} must be informed!`
	}
}

export { checkMandatoryFields }
