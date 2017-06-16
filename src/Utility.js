import axios from 'axios'

export const checkAuth = (to, from, next) => {
	axios.get('http://localhost:3000/admin/auth', {
			withCredentials: true
		})
		.then((response) => {
			switch (response.data) {
				case "ok":
					console.log("Accés autorisé")
					next()
					break;
				case "no":
					console.log("Accés non-autorisé!")
					next('/login')
					break
			}
		})
		.catch((error) => console.log(error))
}

export const checkNotAuth = (to, from, next) => {
	axios.get('http://localhost:3000/admin/auth', {
			withCredentials: true
		})
		.then((response) => {
			switch (response.data) {
				case "ok":
					console.log("Vous êtes dèja connecté!")
					next('/t/p')
					break;
				case "no":
					console.log("Veuillez vous authentifier!")
					next()
					break
			}
		})
		.catch((error) => console.log(error))
}

export const postModFree = (data) => {
	return axios({
		method: 'put',
		url: 'http://localhost:3000/admin/freelancer',
		data: data,
		withCredentials: true
	});
}

export const postDelFree = (data) => {
	return axios({
		method: 'delete',
		url: 'http://localhost:3000/admin/freelancer',
		data: data,
		withCredentials: true
	});
}

export const postModEmp = (data) => {
	return axios({
		method: 'put',
		url: 'http://localhost:3000/admin/employeur',
		data: data,
		withCredentials: true
	});
}

export const postDelEmp = (data) => {
	return axios({
		method: 'delete',
		url: 'http://localhost:3000/admin/employeur',
		data: data,
		withCredentials: true
	});
}

export const postModOffre = (data) => {
	return axios({
		method: 'put',
		url: 'http://localhost:3000/admin/offre',
		data: data,
		withCredentials: true
	});
}
export const postDelOffre = (data) => {
	return axios({
		method: 'delete',
		url: 'http://localhost:3000/admin/offre',
		data: data,
		withCredentials: true
	});
}
