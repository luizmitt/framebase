String.prototype.email_joker = function() {
	var email = this.split('@');
    var username = email[0];
    var domain   = email[1];
	var joker    = [];

    for (i = 0; i<=username.length-1; i++) {
		if (i <= 4) {
			joker.push(username[i]);
		} else {
			joker.push('*');
		}
	}

	return joker.join('') + '@' + domain;
}

String.prototype.crypt = function() {
	var string = btoa(this)
	var new_string = []
	var crypt = null
	for(i = 0; i<=string.length-1; i++) {
		new_string.push(string[i])
	}
	crypt = new_string.reverse().join('').replace("==", '')
	return btoa(crypt)
 }

 String.prototype.decrypt = function() {
	var string = atob(this)
	var new_string = []
	var decrypt = null
	for(i = 0; i<=string.length-1; i++) {
		new_string.push(string[i])
	}
	decrypt = new_string.reverse().join('').replace("==", '')
	return atob(decrypt)    
 }


