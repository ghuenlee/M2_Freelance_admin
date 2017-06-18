<template>
	<div>
		<div class="ui blue inverted segment">
			<h4 class="ui header">
				<i class="bell outline icon"></i> Détails de la notification</h4>
		</div>
		<div class="ui basic padded segment" v-if="notification">
			<span> 
				<i class="hashtag icon"></i>
				<b>ID de la notification: </b>
				{{notification._id}}
			</span>
			<br>
			<span> 
				<i class="user icon"></i>
				<b>Utilisateur : </b>
				{{notification.target.targetPath}}
			</span>
			<br>
			<div class="ui divider"></div>
			<span> 
				<i class="help icon"></i>
				<b>Objet: </b>
				{{notification.titre}}
			</span>
			<br>
			<span> 
				<i class="write icon"></i>
				<b>Contenu: </b>
				{{notification.contenu}}
			</span>
			<br>
			<div class="ui divider"></div>
			<span> 
				<i class="calendar icon"></i>
				<b>Reçue le: </b>
				{{formattedDate(notification.date_ajout)}}
			</span>
			<br>
			<span v-if="notification.date_lu"> 
				<i class="calendar outline icon"></i>
				<b>Consultée le: </b>
				{{formattedDate(notification.date_lu)}}
			</span>
			<div class="ui divider">
			</div>
			<div class="ui red button" @click="supprNotification">
				<i class="trash icon"></i> Supprimer </div>
			<div class="ui modal" :id="[this.notification._id]+'DEL'">
				<div class="ui header">
					<i class="edit icon"></i> Supprimer la notification {{notification._id}} ?
				</div>
				<div class="centered content">
					<p class="center aligned">Souhaitez-vous supprimer cette notification ?</p>
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
				<i class="info circle icon"></i> Veuillez selectionner une notification à partir de la liste des notifications.</h3>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'
	import axios from 'axios'
	import {
		supprNotification
	} from '../../../Utility.js'

	export default {
		data() {
			return {
				notification: this.$route.params.notification || null
			}
		},
		methods: {
			moment: function () {
				return moment()
			},
			formattedDate: function (date) {
				return moment(date).format('DD MMMM YYYY à HH:mm')
			},
			supprNotification: function () {
				$('#' + this.notification._id + "DEL")
					.modal({
						closable: false,
						onApprove: () => {
							this.validateSuppr()
						}
					})
					.modal('show')
			},
			validateSuppr: function () {
				supprNotification(this.notification)
					.then((response) => {
						this.$emit('refreshCount');
						this.$router.push({
							name: 'Archives'
						});
					})
					.catch((error) => {
						console.log(error)
					})
			},
			replyHandler: function () {
				this.$router.push({
					name: 'Nouveau Notification',
					params: {
						recipientID: this.notification.expediteur._id
					}
				});
			}
		}
	}

</script>
<style scoped>
	span {
		font-size: 18px !important;
	}

</style>
