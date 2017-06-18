<template lang="html">
	<div class="ui container">
		<div class="ui blue inverted segment">
			<h3 class="ui header">
				<i class="list icon"></i> Liste des Demandes
			</h3>
		</div>
		<div class="ui text container">
			Consultez la liste des demandes de validation disponibles. Vous avez la possibiliter de valider ou de refuser une demande.
		</div>
		<div class="ui divider"></div>
		<DemandeList :demandes="demandes" @refresh="refreshDemandes" />
	</div>
</template>

<script>
	import axios from 'axios'
	import DemandeList from './demandes_components/DemandeList'

	export default {
		data() {
			return {
				demandes: []
			}
		},
		methods: {
			refreshDemandes: function () {
				axios.get('http://localhost:3000/admin/demandes', {
						withCredentials: true
					})
					.then((response => {
						this.demandes = response.data;
					}))
					.catch((error) => {
						console.log(error)
					})
			}
		},
		components: {
			DemandeList
		},
		beforeMount() {
			axios.get('http://localhost:3000/admin/demandes', {
					withCredentials: true
				})
				.then((response => {
					this.demandes = response.data;
				}))
				.catch((error) => {
					console.log(error)
				})
		}
	}

</script>

<style lang="css" scoped>
	.ui.header {
		margin: 0
	}

	.ui.text.container {
		margin-bottom: 1em;
		text-align: center
	}

</style>
