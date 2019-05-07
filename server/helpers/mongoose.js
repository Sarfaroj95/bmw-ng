module.exports = {
	normalizeErrors: function(errors){

		let normalizeErrors = []
		
	  for (let property in errors) {
  	     if (errors.hasOwnProperty(property)) {
        	normalizeErrors.push({title: property, details: errors[property].message});
     }
	}
	return normalizeErrors;
  }
}