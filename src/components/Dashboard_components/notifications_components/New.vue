<template>
	<div>
		<div class="ui blue inverted segment">
			<h4 class="ui header">
				<i class="alarm outline icon"></i> Nouvelles Notifications</h4>
		</div>
		<table class="ui selectable striped table" v-if="notifications.length > 0">
			<thead>
				<tr>
					<th class="ten wide"> <i class="ellipsis horizontal icon"></i>Titre</th>
					<th class="six wide center aligned"><i class="calendar icon"></i>Date de réception</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(notification, index) in notifications" :key="notification._id" @click="openNotification(notification)">
					<td> <i class="blue star icon"></i> <b>{{notification.titre}} </b></td>
					<td class="center aligned"><b>Reçue le {{formattedDate(notification.dateCreated)}}</b></td>
				</tr>
			</tbody>
		</table>
		<div class="ui basic padded segment" v-else>
			<h3 class="ui centered header">
				<i class="warning sign icon"></i> Aucune nouvelle notification à afficher.</h3>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import moment from 'moment'
	import {
		luNotification
	} from '../../../Utility.js'

	export default {
		data() {
			return {
				notifications: []
			}
		},
		computed: {

		},
		methods: {
			moment: function () {
				return moment()
			},
			formattedDate: function (date) {
				return moment(date).format('DD MMMM YYYY, HH:mm')
			},
			openNotification: function (notification) {
				luNotification(notification)
					.then((response) => {
						this.$emit('refreshCount');
						this.$router.push({
							name: 'Details de la notification',
							params: {
								notification: notification
							}
						});
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
		mounted() {
			axios.get('http://localhost:3000/admin/notifications/unread', {
					withCredentials: true
				})
				.then((response) => {
					this.notifications = response.data;
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
