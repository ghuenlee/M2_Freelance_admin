<template lang="html">
	<div class="ui container">
		<div class="ui blue inverted segment">
			<h3 class="ui header">
				<i class="list icon"></i> Liste des Offres
			</h3>
		</div>
		<div class="ui text container">
			Consultez la liste des offres disponibles. Vous pouvez modifier le titre/description d'une offre si elle ne répond pas aux
			consignes. Si une offre est supprimée, tout contrat en relation le sera aussi.

		</div>
		<OffreList :offres="offres" @refresh="refreshOffres" />
	</div>
</template>

<script>
	import axios from 'axios'
	import OffreList from './offres_components/OffreList'

	export default {
		data() {
			return {
				offres: [],
			}
		},
		methods: {
			refreshOffres: function () {
				axios.get('http://localhost:3000/admin/offres', {
						withCredentials: true
					})
					.then((response) => {
						this.offres = response.data;
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
		components: {
			OffreList
		},
		mounted() {
			axios.get('http://localhost:3000/admin/offres', {
					withCredentials: true
				})
				.then((response) => {
					this.offres = response.data
				})
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
