<template>
	<div class="ui container">
		<h1 class="ui icon inverted header">
			<i class="home icon"></i> {{ msg }}
		</h1>
		<br>
		<router-link to="/t/p" tag="button" class="ui blue button">
			<i class="dashboard icon"></i> Talbeau de bord </router-link>
		<router-link to="/login" tag="button" class="ui blue button">
			<i class="sign in icon"></i> Connexion </router-link>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Bienvenue dans l\'application d\'administration de Fennec Freelance'
			}
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.ui.container {
		margin-top: 10em;
		text-align: center
	}

</style>
