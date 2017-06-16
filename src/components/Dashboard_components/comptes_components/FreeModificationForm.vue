<template>
	<div>
		<div class="ui padded blue inverted segment">
			<form class="ui inverted form">
				<div class="ui basic clearing segment">
					<h3 class="ui dividing inverted left floated header">
						<i class="edit icon"></i> Modification
					</h3>
					<button type="button" class="ui inverted green right floated button" @click="openModModal()" v-if="allowMod">
							<i class="save icon"></i>
							Enregistrer 
						</button>
					<button type="button" class="ui inverted green right floated button disabled" v-else>
							<i class="save icon"></i>
							Enregistrer 
						</button>
					<button type="button" class="ui inverted right floated button" @click="resetForm()">
							<i class="refresh icon"></i>
							Réinitialiser 
						</button>
				</div>
				<div class="two fields">
					<div class="field">
						<label> Nom </label>
						<input type="text" v-model="modForm.nom" placeholder="Nom...">
					</div>
					<div class="field">
						<label> Prénom </label>
						<input type="text" v-model="modForm.pnom" placeholder="Prénom...">
					</div>
				</div>
				<div class="two fields">
					<div class="field">
						<label> Date de naissance </label>
						<input type="date" v-model="modForm.dateNaiss">
					</div>
					<div class="field">
						<label> Lieu de naissance </label>
						<input type="text" v-model="modForm.lieuNaiss">
					</div>
				</div>
				<transition :css="false" @enter="shakeAnim" @leave="fadeAnim">
					<div class="ui info icon message" v-if="!allowMod">
						<i class="info circle icon"></i>
						<div class="content">
							<div class="header"> Veuillez vérifier les informations saisies avant d'enregistrer.</div>
							Les nouvelles entrées doivent être différentes des anciennes et suivre les régles suivantes:
							<div class="ui bulleted list">
								<div class="item">Longeur minimum du <b>Nom</b> : 4 cractères </div>
								<div class="item">Longeur minimum du <b>Prénom</b> : 3 cractères </div>
								<div class="item">Longeur minimum du <b>Lieu de naissance</b> : 4 cractères </div>
							</div>
						</div>

					</div>
				</transition>
			</form>
		</div>
		<div class="ui modal" :id="[this.user._id]+'MOD'">
			<div class="ui header">
				<i class="edit icon"></i> Modifier le compte de {{user.nom}} ?
			</div>
			<div class="centered content">
				<p class="center aligned">Suohaitez-vous enregistrer les modifications apportées à ce freelancer
					<b>{{user.nom}}, {{user.pnom}} </b> ?</p>
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
	import {
		shakeAnim,
		fadeAnim
	} from '../../../transitions.js'

	export default {
		props: ['user'],
		data() {
			return {
				modForm: {
					_id: this.user._id,
					nom: this.user.nom,
					pnom: this.user.pnom,
					dateNaiss: moment(this.user.dateNaiss)
						.format('YYYY-MM-DD'),
					lieuNaiss: this.user.lieuNaiss
				}
			}
		},
		methods: {
			shakeAnim: function (el, done) {
				shakeAnim(el, done)
			},
			fadeAnim: function (el, done) {
				fadeAnim(el, done)
			},
			moment: function () {
				return moment();
			},
			resetForm() {
				this.modForm.nom = this.user.nom;
				this.modForm.pnom = this.user.pnom;
				this.modForm.dateNaiss = moment(this.user.dateNaiss)
					.format('YYYY-MM-DD');
				this.modForm.lieuNaiss = this.user.lieuNaiss;
			},
			openModModal() {
				$('#' + this.user._id + "MOD")
					.modal({
						closable: false,
						onApprove: () => {
							this.validateMod()
						}
					})
					.modal('show')
			},
			validateMod() {
				this.$emit('modGO', this.modForm);
			},
		},
		computed: {
			allowMod: function () {
				if (this.modForm.nom === this.user.nom && this.modForm.pnom === this.user.pnom && this.modForm.dateNaiss ===
					moment(this.user.dateNaiss).format('YYYY-MM-DD') && this.modForm.lieuNaiss === this.user.lieuNaiss) {
					return false
				} else if (this.modForm.nom.length < 4 || this.modForm.pnom.length < 3 || this.modForm.lieuNaiss.length < 4) {
					return false
				} else {
					return true
				}
			},
		}
	}

</script>

<style scoped>
	.ui.basic.clearing.segment {
		padding: 0 !important;
	}

</style>
