<template>
	<div>
		<div class="ui blue inverted segment">
			<h4 class="ui header">
				<i class="plus icon"></i> Nouveau Message</h4>
		</div>
		<form class="ui form">
			<div class="field">
				<label>Objet du message (10 caractères minimum, {{message.objet.length}}/30)</label>
				<input type="text" v-model="message.objet" placeholder="Objet...">
			</div>
			<div class="field">
				<label>
					<span v-if="allowUser">
						<i class="green checkmark icon"></i>
						Destinataire correcte: <b>{{allowUser.profil.ID.nom}} {{allowUser.profil.ID.pnom}} </b></span> 
					<span v-else>
						<i class="red remove icon"></i>
						Destinataire incorrecte</span> 
				
				</label>
				<input type="text" v-model="message.dest" placeholder="Destinataire...">
			</div>
			<div class="field">
				<label>Contenu du message  (40 caractères minimum, {{message.contenu.length}}/300)</label>
				<textarea rows="5" cols="" v-model="message.contenu" placeholder="Contenu..."></textarea>
			</div>
			<div class="ui blue button" @click="OpenValidateModal" v-if="allowSend">
				<i class="send icon"></i> Envoyer
			</div>
			<div class="ui blue disabled button" v-else>
				<i class="send icon"></i> Envoyer
			</div>
		</form>
		<div class="ui modal" id="ValidateModal">
			<div class="ui header">
				<i class="edit icon"></i> Enregistrer ce message?
			</div>
			<div class="centered content">
				<p class="center aligned">Suohaitez-vous enregistrer ce message ?</p>
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
	import axios from 'axios'
	import {
		postMessage
	} from '../../../Utility.js'

	export default {
		data() {
			return {
				message: {
					objet: '',
					dest: this.$route.params.recipientID || '',
					contenu: ''
				},
				validUsers: [],
				allowUser: null
			}
		},
		methods: {
			OpenValidateModal: function () {
				$('#ValidateModal')
					.modal({
						closable: false,
						onApprove: () => {
							this.sendMessage()
						}
					})
					.modal('show')
			},
			sendMessage: function () {
				postMessage(this.message)
					.then((response) => {
						this.$emit('refreshCount');
						this.$router.push({
							name: 'Messages Envoyés',
						});
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
		computed: {
			allowSend: function () {
				if (this.message.objet.length < 10 || !this.allowUser || this.message.contenu.length < 40 ||
					this.message.objet.length > 30 || this.message.contenu.length > 300) {
					return false;
				} else {
					return true;
				}
			}
		},
		watch: {
			"message.dest": function () {
				this.allowUser = null;
				this.validUsers.forEach((user) => {
					if (user._id === this.message.dest) {
						return this.allowUser = user;
					}
				});
			}
		},
		mounted() {
			axios.get('http://localhost:3000/admin/users', {
				withCredentials: true
			}).then((response) => {
				this.validUsers = response.data;
				this.validUsers.forEach((user) => {
					if (user._id === this.message.dest) {
						return this.allowUser = user;
					}
				});
			}).catch((error) => {
				console.log(error)
			})
		}
	}

</script>
<style>


</style>
