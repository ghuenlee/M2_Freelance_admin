<template>
	<div>
		<div class="ui active dimmer" v-if="loading">
			<div class="ui text loader">
				Chargement...
			</div>
		</div>
		<div class="ui center aligned container">
			<h1 class="ui inverted header">
				<i class="sign in icon"></i> {{ msg }}</h1>
			<div class="ui raised padded left aligned segment">
				<form class="ui form" action="index.html" method="post">
					<div class="field">
						<label> Nom d'utilisateur </label>
						<input type="text" name="username" v-model="username" placeholder="Nom d'utilisateur...">
					</div>
					<div class="field">
						<label> Mot de passe </label>
						<input type="password" name="password" v-model="password" placeholder="Mot de passe...">
					</div>
					<div class="field">
						<button type="button" class="ui blue fluid button" name="button" @click="login()"> Connexion </button>
					</div>
				</form>
				<div class="ui error message" v-if="error.length > 0">
					{{error}}
				</div>
				<div class="ui info icon message" v-if="response.length > 0">
					<i class="info icon"></i> {{response}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				username: '',
				password: '',
				msg: 'Authentification',
				error: '',
				response: '',
				connected: null,
				loading: false
			}
		},
		methods: {
			login() {
				this.error = '';
				this.loading = true;
				if (this.username.length < 0 || this.password.length < 0) {
					return this.error = " Veuillez renseigner un nom d'utilisateur/mot de passe valides."
				}
				axios({
						method: 'post',
						url: 'http://localhost:3000/admin/login',
						data: {
							username: this.username,
							password: this.password
						},
						withCredentials: true
					})
					.then((response) => {
						this.loading = false;
						switch (response.data.status) {
							case "noUser":
								this.response = "Aucun utilisateur ne correspond à ces identifiants."
								break;
							case "notAdmin":
								this.response = "Ces identifiants ne correspondent pas à un administrateur."
								break;
							case "ok":
								this.$router.push({
									path: '/t/p'
								});
						}
					})
					.catch((error) => this.error = error)
			}
		},
		beforeMount() {
			axios.get('http://localhost:3000/admin/auth', {
					withCredentials: true
				})
				.then((response) => {
					switch (response.data) {
						case "ok":
							this.connected = true;
							break;
						case "no":
							this.connected = false;
					}
				})
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.ui.container {
		width: 500px;
		height: 100%;
	}

	.ui.header {
		margin-top: 5em;
	}

	.ui.active.dimmer {
		margin: 0;
		padding: 0
	}

</style>
