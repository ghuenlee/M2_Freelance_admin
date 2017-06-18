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
				<div class="field">
					<label> Titre de l'offre </label>
					<input type="text" v-model="modForm.titre" placeholder="Titre...">
				</div>
				<div class="field">
					<label> Description de l'offre </label>
					<textarea v-model="modForm.description">Description...</textarea>
				</div>
				<transition :css="false" @enter="shakeAnim" @leave="fadeAnim">
					<div class="ui info icon message" v-if="!allowMod">
						<i class="info circle icon"></i>
						<div class="content">
							<div class="header"> Veuillez vérifier les informations saisies avant d'enregistrer.</div>
							Les nouvelles entrées doivent être différentes des anciennes et suivre les régles suivantes:
							<div class="ui bulleted list">
								<div class="item">Longeur minimum du <b>Titre</b> : 20 cractères </div>
								<div class="item">Longeur minimum de la <b>Déscription</b> : 60 cractères </div>
							</div>
						</div>

					</div>
				</transition>
			</form>
		</div>
		<div class="ui modal" :id="[this.offre._id]+'MOD'">
			<div class="ui header">
				<i class="edit icon"></i> Modifier l'offre {{offre._id}} ?
			</div>
			<div class="centered content">
				<p class="center aligned">Suohaitez-vous enregistrer les modifications apportées à cette offre ?</p>
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
		fadeAnimLeave
	} from '../../../transitions.js'

	export default {
		props: ['offre'],
		data() {
			return {
				modForm: {
					_id: this.offre._id,
					titre: this.offre.titre,
					description: this.offre.description
				}
			}
		},
		methods: {
			shakeAnim: function (el, done) {
				shakeAnim(el, done)
			},
			fadeAnim: function (el, done) {
				fadeAnimLeave(el, done)
			},
			moment: function () {
				return moment();
			},
			resetForm() {
				this.modForm._if = this.offre._id;
				this.modForm.titre = this.offre.titre;
				this.modForm.description = this.offre.description;
			},
			openModModal() {
				$('#' + this.offre._id + "MOD")
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
				if (this.modForm.titre === this.offre.titre && this.modForm.description === this.offre.description) {
					return false
				} else if (this.modForm.titre.length < 20 || this.modForm.description.length < 60) {
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
