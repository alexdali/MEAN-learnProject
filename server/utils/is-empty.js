module.exports = function(data) {
	if(data==''||JSON.stringify(data) === JSON.stringify({})||data==undefined||data==null){
		return true;
	}
	return false;
}