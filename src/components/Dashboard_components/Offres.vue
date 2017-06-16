<template lang="html">
	<div class="ui container">
		<h1 class="ui centered dividing header"> - Liste des Offres -
		</h1>
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
		margin: 0 !important;
		color: #95a5a6;
	}

</style>
