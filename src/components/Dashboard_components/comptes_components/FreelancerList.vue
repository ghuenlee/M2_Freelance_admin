<template>
	<div id="freelancers-div">
		<div class="ui inverted blue piled segment">
			<h3 class="ui header">
				<i class="users icon"></i> {{filteredFree.length}} Freelancer(s) trouvé(s)</h3>
		</div>
		<div class="ui basic">
			<form class="ui form">
				<div class="three fields">
					<div class="field">
						<div class="ui icon left labeled input">
							<div class="ui blue label">
								ID
							</div>
							<input type="text" v-model="freeFilter.ID" placeholder="ID...">
							<i class="search icon"></i>
						</div>
					</div>
					<div class="field">
						<div class="ui icon labeled input">
							<div class="ui blue label">
								Nom
							</div>
							<input type="text" v-model="freeFilter.nom" placeholder="Nom...">
							<i class="search icon"></i>
						</div>
					</div>
					<div class="field">
						<div class="ui icon labeled input">
							<div class="ui blue label">
								Prénom
							</div>
							<input type="text" v-model="freeFilter.pnom" placeholder="Prénom...">
							<i class="search icon"></i>
						</div>
					</div>
				</div>
			</form>
			<div class="ui inverted divider">
			</div>
		</div>
		<transition :css="false" @enter="flashAnim" @leave="flashAnim" mode="out-in">
			<div class="ui success icon message" v-if="modifiedFree" key="01">
				<i class="close icon" @click="closeMessage"></i>
				<i class="checkmark icon"></i>
				<div class="content">
					<div class="header"> Freelancer modifié</div>
					Le freelancer <b>{{modifiedFree.userID}}</b>, <b>{{modifiedFree.nom}} {{modifiedFree.pnom}}</b> a été modifié.
				</div>
			</div>
			<div class="ui success icon message" v-if="deletedData" key="02">
				<i class="close icon" @click="closeMessage"></i>
				<i class="checkmark icon"></i>
				<div class="content">
					<div class="header">
						Freelancer supprimé
					</div>
					Le freelancer <b>{{deletedData.freelancer.userID}}</b>, <b>{{deletedData.freelancer.nom}} {{deletedData.freelancer.pnom}}</b>					a été supprimé. <b>{{deletedData.offres.nModified}}</b> offre(s) modifiée(s), <b>{{deletedData.contrats.n}}</b> contrat(s)
					supprimé(s), <b>{{deletedData.demandes.n}}</b> demande(s) supprimée(s)
				</div>
			</div>
		</transition>
		<transition :css="false" @enter="slideDownAnim" @leave="slideUpAnim" mode="out-in">
			<div class="ui info icon message" v-if="filteredFree.length === 0" key="visible">
				<i class="info icon"></i>
				<div class="header">
					Aucun Freelancer à afficher.
				</div>
			</div>
			<div v-else key="invisible">
				<transition-group :css="false" @enter="slideDownAnim" @leave="slideUpAnim">
					<Freelancer v-for="(freelancer, index) in filteredFree" :freelancer="freelancer" :index="index + 1" :key="freelancer._id"
					    v-on:modified="handleModified" v-on:deleted="handleDeleted" />
				</transition-group>
			</div>
		</transition>


	</div>
</template>

<script>
	import axios from 'axios'
	import moment from 'moment'
	import Freelancer from './Freelancer'
	import {
		slideUpAnim,
		slideDownAnim,
		flashAnim
	} from '../../../transitions.js'
	export default {
		props: ['freelancers'],
		data() {
			return {
				modifiedFree: null,
				deletedData: null,
				freels: [],
				freeFilter: {
					ID: '',
					nom: '',
					pnom: ''
				}
			}
		},
		computed: {
			filteredFree: function () {
				let idPat = new RegExp(this.freeFilter.ID.toLowerCase());
				let nomPat = new RegExp(this.freeFilter.nom.toLowerCase());
				let pnomPat = new RegExp(this.freeFilter.pnom.toLowerCase());
				return this.freelancers.filter((free) => {
					return (idPat.test(free.userID.toLowerCase()) && nomPat.test(free.nom.toLowerCase()) && pnomPat.test(free.pnom.toLowerCase()))
				})
			}
		},
		components: {
			Freelancer
		},
		methods: {
			slideUpAnim: function (el, done) {
				slideUpAnim(el, done)
			},
			slideDownAnim: function (el, done) {
				slideDownAnim(el, done)
			},
			flashAnim: function (el, done) {
				flashAnim(el, done)
			},
			handleModified: function (freelancer) {
				this.deletedData = null;
				this.$emit('refresh');
				this.modifiedFree = freelancer;
			},
			handleDeleted: function (deleteData) {
				this.modifiedFree = null;
				this.$emit('refresh');
				this.deletedData = deleteData;
			},
			closeMessage: function (el, done) {
				this.modifiedFree = null;
				this.deletedData = null;
			}
		}
	}

</script>

<style scoped>
	.ui.inverted.blue.segment {
		margin: 0;
		margin-bottom: 1em;
	}

</style>
