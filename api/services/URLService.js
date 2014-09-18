module.exports = {

	toSlug: function(text) {
		if(text)
			return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
		else
			return "";
	}

}