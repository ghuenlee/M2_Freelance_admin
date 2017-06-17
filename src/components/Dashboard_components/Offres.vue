<template lang="html">
	<div class="ui container">
		<h1 class="ui centered header">
			- Liste des Offres -
		</h1>
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

<style lang="css">
	.ui.centered.header {
		font-size: 4em;
		color: #95a5a6;
	}

	.ui.text.container {
		margin-bottom: 1em;
		text-align: center
	}

</style>
