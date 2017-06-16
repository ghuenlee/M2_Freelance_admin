<template>
	<div class="ui container">
		<div class="ui blue inverted large menu">
			<div class="header item">
				<i class="dashboard icon"></i> Tableau de bord
			</div>
			<router-link active-class="active" tag="a" class="item" to="/t/p">
				<i class="user icon"></i> Profil
			</router-link>
			<router-link active-class="active" tag="a" class="item" to="/t/c">
				<i class="users icon"></i> Comptes
			</router-link>
			<router-link active-class="active" tag="a" class="item" to="/t/o">
				<i class="tasks icon"></i> Offres
			</router-link>
			<router-link active-class="active" tag="a" class="item" to="/t/d">
				<i class="book icon"></i> Demandes
			</router-link>
			<div class="right menu">
				<a class="item" @click="logout">
        <i class="sign out icon"></i> Déconnexion
      </a>
			</div>
		</div>
		<div class="ui padded segment">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
			<div class="ui divider">
			</div>
			<p class="copyright text"> Zone administration, Fennec Freelance, 2017/2018 Tous droits reservés.</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				msg: 'Dashboard'
			}
		},
		methods: {
			logout() {
				axios.get('http://localhost:3000/admin/signout', {
						withCredentials: true
					})
					.then((response) => {
						switch (response.data) {
							case 'ok':
								console.log('You are authorized to logout!');
								this.$router.push({
									path: '/'
								});
								break;
							case 'no':
								console.log('You are not authorized to logout!');
						}
					})
					.catch((error) => {
						console.log(error)
					})
			}
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.ui.container {
		margin-top: 1em;
	}

	.copyright.text {
		text-align: center
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}

</style>
