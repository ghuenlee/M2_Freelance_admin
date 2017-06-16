export const slideAnim = function (el, done) {
	$(el)
		.hide()
		.transition('slide down', 500, done);
}
export const slideDownAnim = function (el, done) {
	$(el)
		.hide()
		.slideDown(500, done);
}
export const slideUpAnim = function (el, done) {
	$(el)
		.show()
		.slideUp(500, done);
}
export const flashAnim = function (el, done) {
	$(el)
		.hide()
		.transition('flash', 500, done);
}

export const shakeAnim = function (el, done) {
	$(el)
		.hide()
		.transition('shake', done)
};

export const fadeAnim = function (el, done) {
	$(el)
		.show()
		.transition('fade', done)
};
