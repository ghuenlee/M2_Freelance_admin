<template>
	<div id="freelancers-div">
		<div class="ui inverted blue piled segment">
			<h3 class="ui header">
				<i class="users icon"></i> {{filteredEmp.length}} Employeur(s) trouvé(s)</h3>
		</div>
		<div class="ui basic">
			<form class="ui form">
				<div class="four fields">
					<div class="field">
						<div class="ui icon left labeled input">
							<div class="ui blue label">
								ID
							</div>
							<input type="text" v-model="empFilter.ID" placeholder="ID...">
							<i class="search icon"></i>
						</div>
					</div>
					<div class="field">
						<div class="ui icon labeled input">
							<div class="ui blue label">
								Nom
							</div>
							<input type="text" v-model="empFilter.nom" placeholder="Nom...">
							<i class="search icon"></i>
						</div>
					</div>
					<div class="field">
						<div class="ui icon labeled input">
							<div class="ui blue label">
								Prénom
							</div>
							<input type="text" v-model="empFilter.pnom" placeholder="Prénom...">
							<i class="search icon"></i>
						</div>
					</div>
					<div class="field">
						<div class="ui icon labeled input">
							<div class="ui blue label">
								Entreprise
							</div>
							<input type="text" v-model="empFilter.nomEntreprise" placeholder="Entreprise...">
							<i class="search icon"></i>
						</div>
					</div>
				</div>
			</form>
			<div class="ui inverted divider">
			</div>
		</div>
		<transition :css="false" @enter="flashAnim" @leave="flashAnim" mode="out-in">
			<div class="ui success icon message" v-if="modifiedEmp" key="01">
				<i class="close icon" @click="closeMessage"></i>
				<i class="checkmark icon"></i>
				<div class="content">
					<div class="header"> Employeur modifié</div>
					L'employeur <b>{{modifiedEmp.userID}}</b>, <b>{{modifiedEmp.nom}} {{modifiedEmp.pnom}}</b> a été modifié.
				</div>
			</div>
			<div class="ui success icon message" v-if="deletedData" key="02">
				<i class="close icon" @click="closeMessage"></i>
				<i class="checkmark icon"></i>
				<div class="content">
					<div class="header">
						Employeur supprimé
					</div>
					L'employeur <b>{{deletedData.employeur.userID}}</b>, <b>{{deletedData.employeur.nom}} {{deletedData.employeur.pnom}}</b>					a été supprimé. <b>{{deletedData.offres.n}}</b> offre(s) supprimée(s), <b>{{deletedData.contrats.n}}</b> contrat(s)
					supprimé(s),
					<b>{{deletedData.demandes.n}}</b> Demande(s) supprimée(s)
				</div>
			</div>
		</transition>
		<transition :css="false" @enter="slideDownAnim" @leave="slideUpAnim" mode="out-in">
			<div class="ui info icon message" v-if="filteredEmp.length === 0" key="visible">
				<i class="info icon"></i>
				<div class="header">
					Aucun employeur à afficher.
				</div>
			</div>
			<div v-else key="invisible">
				<transition-group :css="false" @enter="slideDownAnim" @leave="slideUpAnim">
					<employeur v-for="(employeur, index) in filteredEmp" :employeur="employeur" :index="index + 1" :key="employeur._id" v-on:modified="handleModified"
					    v-on:deleted="handleDeleted" />
				</transition-group>
			</div>
		</transition>


	</div>
</template>

<script>
	import axios from 'axios'
	import moment from 'moment'
	import Employeur from './Employeur'
	import {
		slideUpAnim,
		slideDownAnim,
		flashAnim
	} from '../../../transitions.js'
	export default {
		props: ['employeurs'],
		data() {
			return {
				modifiedEmp: null,
				deletedData: null,
				empFilter: {
					ID: '',
					nom: '',
					pnom: '',
					nomEntreprise: ''
				}
			}
		},
		computed: {
			filteredEmp: function () {
				let idPat = new RegExp(this.empFilter.ID.toLowerCase());
				let nomPat = new RegExp(this.empFilter.nom.toLowerCase());
				let pnomPat = new RegExp(this.empFilter.pnom.toLowerCase());
				let entnPat = new RegExp(this.empFilter.nomEntreprise.toLowerCase());
				return this.employeurs.filter((emp) => {
					return (idPat.test(emp.userID.toLowerCase()) && nomPat.test(emp.nom.toLowerCase()) && pnomPat.test(emp.pnom.toLowerCase()) &&
						entnPat.test(emp.nomEntreprise.toLowerCase()))
				})
			}
		},
		components: {
			Employeur
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
			handleModified: function (employeur) {
				this.deletedData = null;
				this.$emit('refresh');
				this.modifiedEmp = employeur;
			},
			handleDeleted: function (deleteData) {
				this.modifiedEmp = null;
				this.$emit('refresh');
				this.deletedData = deleteData;
			},
			closeMessage: function (el, done) {
				this.modifiedEmp = null;
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
