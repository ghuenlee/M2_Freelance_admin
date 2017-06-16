// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../static/semantic/dist/semantic.min.css'
import '../static/css/app.css'
import '../static/semantic/dist/semantic.min.js'
// import '../static/js/myMain.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import {
	checkAuth,
	checkNotAuth
} from './Utility.js'

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
	var secureRoutes = ['Profil', 'Offres', 'Demandes', 'Comptes'];
	if (secureRoutes.includes(to.name) || to.path === '/t') {
		return checkAuth(to, from, next)
	}
	if (to.name === "Login") {
		return checkNotAuth(to, from, next)
	}
	next()
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})
