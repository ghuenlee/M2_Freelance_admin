<template>
	<div>
		<div class="ui blue inverted segment">
			<h4 class="ui header">
				<i class="mail icon"></i> Détails du message</h4>
		</div>
		<div class="ui basic padded segment" v-if="message">
			<span> 
				<i class="hashtag icon"></i>
				<b>ID du message: </b>
				{{message._id}}
			</span>
			<br>
			<span> 
				<i class="external icon"></i>
				<b>Expediteur: </b>
				{{message.expediteur.profil.ID.nom}} {{message.expediteur.profil.ID.pnom}} ({{message.expediteur._id}})
			</span>
			<br>
			<span> 
				<i class="user icon"></i>
				<b>Destinataire: </b>
				{{message.destinataire.profil.ID.nom}} {{message.destinataire.profil.ID.pnom}} ({{message.destinataire._id}})
			</span>
			<br>
			<div class="ui divider"></div>
			<span> 
				<i class="help icon"></i>
				<b>Objet: </b>
				{{message.objet}}
			</span>
			<br>
			<span> 
				<i class="write icon"></i>
				<b>Contenu: </b>
				{{message.contenu}}
			</span>
			<br>
			<div class="ui divider"></div>
			<span> 
				<i class="calendar icon"></i>
				<b>Envoyé le: </b>
				{{formattedDate(message.dateCreated)}}
			</span>
			<div class="ui divider">
			</div>
			<div class="ui green button" v-if="message.expediteur._id !== admin._id" @click="replyHandler">
				<i class="reply icon"></i> Répondre </div>
			<div class="ui red button" @click="supprMessage">
				<i class="trash icon"></i> Supprimer </div>
			<div class="ui modal" :id="[this.message._id]+'DEL'">
				<div class="ui header">
					<i class="edit icon"></i> Supprimer le message {{message._id}} ?
				</div>
				<div class="centered content">
					<p class="center aligned">Souhaitez-vous supprimer ce message ?</p>
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
		<div class="ui basic padded segment" v-else>
			<h3 class="ui centered header">
				<i class="info circle icon"></i> Veuillez selectionner un message à partir de la boite de réception.</h3>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'
	import axios from 'axios'
	import {
		supprMessage
	} from '../../../Utility.js'

	export default {
		data() {
			return {
				message: this.$route.params.message || null,
				admin: ''
			}
		},
		methods: {
			moment: function () {
				return moment()
			},
			formattedDate: function (date) {
				return moment(date).format('DD MMMM YYYY à HH:mm')
			},
			supprMessage: function () {
				$('#' + this.message._id + "DEL")
					.modal({
						closable: false,
						onApprove: () => {
							this.validateSuppr()
						}
					})
					.modal('show')
			},
			validateSuppr: function () {
				supprMessage(this.message)
					.then((response) => {
						this.$emit('refreshCount');
						this.$router.push({
							name: 'Messages Reçus'
						});
					})
					.catch((error) => {
						console.log(error)
					})
			},
			replyHandler: function () {
				this.$router.push({
					name: 'Nouveau Message',
					params: {
						recipientID: this.message.expediteur._id
					}
				});
			}
		},
		mounted() {
			console.log('Before Mount: ' + this.$route.params.message)
			axios.get('http://localhost:3000/admin/profil', {
					withCredentials: true
				})
				.then((response) => {
					this.admin = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

</script>
<style scoped>
	span {
		font-size: 18px !important;
	}

</style>
