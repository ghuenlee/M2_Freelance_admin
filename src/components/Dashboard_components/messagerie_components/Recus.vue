<template>
	<div>
		<div class="ui blue inverted segment">
			<h4 class="ui header">
				<i class="inbox icon"></i> Messages Reçus</h4>
		</div>
		<table class="ui selectable striped table" v-if="messages.length > 0">
			<thead>
				<tr>
					<th class="four wide"> <i class="external icon"></i>Expediteur</th>
					<th class="eight wide"><i class="help circle icon"></i> Objet</th>
					<th class="four wide"><i class="calendar icon"></i>Date réception</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(message, index) in messages" :key="message._id" v-if="message.lu === false" @click="openMessageAndLu(message)">
					<td> <i class="blue star icon"></i> <b>{{message.expediteur.profil.ID.nom}} </b></td>
					<td><b>{{message.objet}}</b></td>
					<td class="center aligned"><b>Reçu le {{formattedDate(message.dateCreated)}}</b></td>
				</tr>
				<tr :key="message._id" v-else @click="openMessage(message)">
					<td><i class="blue star empty icon"></i>{{message.expediteur.profil.ID.nom}}</td>
					<td>{{message.objet}}</td>
					<td class="center aligned">Reçu le {{formattedDate(message.dateCreated)}}</td>
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
			openMessageAndLu: function (message) {
				luMessage(message)
					.then((response) => {
						this.$emit('refreshCount');
						this.$router.push({
							name: 'Détails du message',
							params: {
								message: message
							}
						});
					})
					.catch((error) => {
						console.log(error)
					})
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
			axios.get('http://localhost:3000/admin/messages/recus', {
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
