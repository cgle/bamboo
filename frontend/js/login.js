function toRegister(){
	var registerform = $('#register');
	var loginform = $('#login');
	loginform.hide("clip", {direction: "vertical"}, 1000, function() {
		registerform.show("clip", {direction: "vertical"}, 1000 );	
	});
}
