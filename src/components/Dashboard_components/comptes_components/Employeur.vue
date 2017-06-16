<template>
	<div class="ui blue raised segment">
		<div class="ui basic clearing segment">
			<div class="ui blue right floated button" v-if="!mod" @click="modAppear()">
				<i class="edit icon"></i> Modifier
			</div>
			<div class="ui yellow right floated button" v-else @click="modAppear()">
				<i class="remove icon"></i> Annuler
			</div>
			<div class="ui red right floated button" @click="openDelModal()">
				<i class="trash icon"></i> Supprimer
			</div>
			<h3 class="ui left floated dividing header">
				<i class="blue building icon"></i>
				<div class="content">
					{{index}}) {{employeur.nom}}, {{employeur.pnom}}
					<div class="sub header">
						Nombre d'offres complétées: {{employeur.notations.length}}
					</div>
					<div class="ui star large rating" :data-rating="note_moy" data-max-rating="10"></div>
				</div>
			</h3>
		</div>
		<div class="description">
			<div class="ui large horizontal list">
				<div class="item">
					<i class="hashtag icon"></i>
					<div class="content">
						<b>ID:</b> {{employeur.userID}}
					</div>
				</div>
				<div class="item">|</div>
				<div class="item">
					<i class="star half empty icon"></i>
					<div class="content">
						<b>Note moyenne:</b> {{note_moy}}
					</div>
				</div>
				<div class="item">|</div>
				<div class="item">
					<i class="building icon"></i>
					<div class="content">
						<b>Entreprise:</b> {{employeur.nomEntreprise}}
					</div>
				</div>
				<div class="item">|</div>
				<div class="item" v-if="this.employeur.isValid">
					<i class="help circle icon"></i>
					<div class="content">
						<b>Etat du compte:</b> <i class="green checkmark icon"></i> {{formattedIsValid}}
					</div>
				</div>
				<div class="item" v-else>
					<i class="help circle icon"></i>
					<div class="content">
						<b>Etat du compte:</b> <i class="red remove icon"></i> {{formattedIsValid}}
					</div>
				</div>
			</div>
			<div class="ui large horizontal list">
				<div class="item">
					<i class="birthday icon"></i>
					<div class="content">
						<b>Âge:</b> {{formattedAge}}
					</div>
				</div>
				<div class="item">|</div>
				<div class="item">
					<i class="maps pin icon"></i>
					<div class="content">
						<b>Adresse:</b> Wilaya: {{employeur.wilayaAdr}}, Commune: {{employeur.communeAdr}}, Quartier: {{employeur.quartierAdr}},
						Lotissement: {{employeur.lotissementAdr}}
					</div>
				</div>
			</div>
			<br>
			<div class="ui large horizontal list">
				<div class="item">
					<i class="at icon"></i>
					<div class="content">
						<b>Email:</b> {{employeur.email}}
					</div>
				</div>
				<div class="item">|</div>
				<div class="item">
					<i class="call icon"></i>
					<div class="content">
						<b>Téléphone:</b> {{employeur.telephone}}
					</div>
				</div>
			</div>
		</div>
		<transition :css="false" @enter="slideDownAnim" @leave="slideUpAnim">
			<EmpModificationForm :user="this.employeur" v-if="mod" @modGO="postMod" />
		</transition>
		<div class="ui modal" :id="[this.employeur._id]+'DEL'">
			<div class="ui header">
				<i class="edit icon"></i> Supprimer le compte de {{employeur.nom}} ?
			</div>
			<div class="centered content">
				<p class="center aligned">Suohaitez-vous supprimer l'employeur
					<b>{{employeur.nom}}, {{employeur.pnom}} </b> ?</p>
			</div>
			<div class="actions">
				<div class="ui red deny inverted button">
					<i class="remove icon"></i> Annuler
				</div>
				<div class="ui green approve inverted button">
					<i class="checkmark icon"></i> Valider
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'
	import EmpModificationForm from './EmpModificationForm'
	import {
		postModEmp,
		postDelEmp
	} from '../../../Utility.js'
	import {
		shakeAnim,
		fadeAnim,
		slideDownAnim,
		slideUpAnim
	} from '../../../transitions.js'

	export default {
		props: ['employeur', 'index'],
		data() {
			return {
				age: this.employeur.dateNaiss,
				note_moy: Math.round(this.employeur.note_moy),
				mod: false
			}
		},
		computed: {
			formattedAge: function () {
				return moment(this.employeur.dateNaiss).fromNow(true)
			},
			formattedIsValid: function () {
				if (this.employeur.isValid) {
					return "Validé"
				}
				return "Non Validé"
			}
		},
		methods: {
			shakeAnim: function (el, done) {
				shakeAnim(el, done)
			},
			fadeAnim: function (el, done) {
				fadeAnim(el, done)
			},
			slideDownAnim: function (el, done) {
				slideDownAnim(el, done)
			},
			slideUpAnim: function (el, done) {
				slideUpAnim(el, done)
			},
			moment: function () {
				return moment();
			},
			modAppear() {
				this.mod = !this.mod
			},
			openDelModal() {
				$('#' + this.employeur._id + "DEL")
					.modal({
						closable: false,
						onApprove: () => {
							this.postDel()
						}
					})
					.modal('show')
			},
			postDel() {
				postDelEmp(this.employeur)
					.then((response) => {
						var delData = response.data;
						this.$emit('deleted', delData);
					})
			},
			postMod(modData) {
				postModEmp(modData)
					.then((response) => {
						this.mod = false;
						this.$emit('modified', this.employeur);
					})
			},
		},
		components: {
			EmpModificationForm
		},
		mounted() {
			var rate = parseInt(this.note_moy)
			$('.ui.rating')
				.rating('disable');
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.ui.basic.clearing.segment {
		padding: 0
	}

	.list {
		margin: 0;
	}

</style>
