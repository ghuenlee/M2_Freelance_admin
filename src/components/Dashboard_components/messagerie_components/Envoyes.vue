<template>
	<div>
		<div class="ui blue inverted segment">
			<h4 class="ui header">
				<i class="external icon"></i> Messages Envoyés</h4>
		</div>
		<table class="ui selectable striped table" v-if="messages.length > 0">
			<thead>
				<tr>
					<th class="four wide"> <i class="external icon"></i>Destinataire</th>
					<th class="eight wide"><i class="help circle icon"></i> Objet</th>
					<th class="four wide"><i class="calendar icon"></i>Date Envoi</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(message, index) in messages" :key="message._id" @click="openMessage(message)">
					<td>{{message.destinataire.profil.ID.nom}}</td>
					<td>{{message.objet}}</td>
					<td class="center aligned">Envoyé le {{formattedDate(message.dateCreated)}}</td>
				</tr>
			</tbody>
		</table>
		<div class="ui basic padded segment" v-else>
			<h3 class="ui centered header">
				<i class="warning sign icon"></i> Aucun message à afficher.</h3>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import moment from 'moment'
	import {
		luMessage
	} from '../../../Utility.js'

	export default {
		data() {
			return {
				messages: []
			}
		},
		computed: {

		},
		methods: {
			moment: function () {
				return moment()
			},
			formattedDate: function (date) {
				return moment(date).format('DD MMMM YYYY')
			},
			openMessage: function (message) {
				this.$router.push({
					name: 'Détails du message',
					params: {
						message: message
					}
				});
			}
		},
		mounted() {
			axios.get('http://localhost:3000/admin/messages/envoyes', {
					withCredentials: true
				})
				.then((response) => {
					this.messages = response.data;
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

</script>
<style scoped>
	.ui.selectable.striped.table {
		cursor: pointer
	}

</style>
