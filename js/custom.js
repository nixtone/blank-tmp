$(document).ready(function() {
	// Расчет высоты футера
	var height = parseInt($("footer").outerHeight(true))+"px";
	$("#wrapper").css('margin-bottom', '-'+height);
	$("#footer-push").height(height);
	
});