<template lang="html">
	<div class="ui container">
		<h1 class="ui centered header"> - Liste des comptes -
		</h1>
		<div class="ui basic segment">
			<div class="ui center aligned container">
				<br>
				<div class="ui slider checkbox">
					<input type="checkbox" v-model="free">
					<label> Afficher les freelancers ({{freelancers.length}})</label>
				</div>
				<span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </span>
				<div class="ui slider checkbox">
					<input type="checkbox" v-model="emp">
					<label> Afficher les employeurs ({{employeurs.length}})</label>
				</div>
			</div>
			<br>
			<transition name="fade" appear mode="out-in">
				<div id="empty-div" v-if="!free & !emp" key="visible">
					<div class="ui info icon message">
						<i class="info icon"></i>
						<div class="content">
							Aucun compte à afficher
						</div>
					</div>
				</div>
				<div id="comptes" v-else key="invisible">
					<transition name="fade">
						<FreelancerList :freelancers="freelancers" v-if="free" @refresh="refreshFreelancers" />
					</transition>
					<transition name="fade">
						<EmployeurList :employeurs="employeurs" v-if="emp" @refresh="refreshEmployeurs" />
					</transition>
				</div>
			</transition>

		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import moment from 'moment'
	import FreelancerList from './comptes_components/FreelancerList'
	import EmployeurList from './comptes_components/EmployeurList'

	export default {
		data() {
			return {
				free: true,
				emp: true,
				freelancers: [],
				employeurs: []
			}
		},
		computed: {
			filteredEmp: function () {
				let idPat = new RegExp(this.empFilter.ID.toLowerCase());
				let nomPat = new RegExp(this.empFilter.nom.toLowerCase());
				let pnomPat = new RegExp(this.empFilter.pnom.toLowerCase());
				return this.employeurs.filter((emp) => {
					return (idPat.test(emp.userID.toLowerCase()) && nomPat.test(emp.nom.toLowerCase()) && pnomPat.test(emp.pnom.toLowerCase()))
				})
			}
		},
		components: {
			FreelancerList,
			EmployeurList
		},
		methods: {
			refreshFreelancers: function () {
				axios.get('http://localhost:3000/admin/freelancers', {
						withCredentials: true
					})
					.then((response) => {
						this.freelancers = response.data.freelancers;
					})
					.catch((error) => console.log(error))
			},
			refreshEmployeurs: function () {
				axios.get('http://localhost:3000/admin/employeurs', {
						withCredentials: true
					})
					.then((response) => {
						this.employeurs = response.data.employeurs;
					})
					.catch((error) => console.log(error))
			},
			enterAnim: function (el, done) {
				$(el)
					.hide()
					.slideDown(500, done)
			},
			leaveAnim: function (el, done) {
				$(el)
					.show()
					.slideUp(500, done)
			}
		},
		beforeMount() {
			axios.get('http://localhost:3000/admin/comptes', {
					withCredentials: true
				})
				.then((response) => {
					this.freelancers = response.data.freelancers;
					this.employeurs = response.data.employeurs;
				})
				.catch((error) => console.log(error))
		}
	}

</script>

<style lang="css">
	.ui.centered.header {
		font-size: 4em;
		margin: 0 !important;
		color: #95a5a6;
	}

	.ui.inverted.blue.segment {
		margin-top: 1em;
		margin-bottom: 1em
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

</style>
