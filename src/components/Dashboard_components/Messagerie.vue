<template>
	<div class="ui stackable two column grid">
		<div class="one column row">
			<div class="column">
				<div class="ui blue inverted segment">
					<h3 class="ui header">
						<i class="inbox icon"></i>Messagerie
					</h3>
				</div>
			</div>
		</div>
		<div class="four wide column">
			<div class="ui vertical fluid blue large menu">
				<router-link active-class="active" tag="a" class="blue item" :to="{name: 'Nouveau Message'}">
					Nouveau Message
					<i class="blue plus icon"></i>
				</router-link>
				<router-link active-class="active" tag="a" class="blue item" :to="{name: 'Messages Reçus'}">
					Boite de réception <b>({{messages.received}})</b>
					<div class="ui blue left pointing large label" v-if="messages.unread > 0">{{messages.unread}} </div>
				</router-link>
				<router-link active-class="active" tag="a" class="blue item" :to="{name: 'Messages Envoyés'}">
					Messages Envoyés <b>({{messages.sent}})</b>
				</router-link>
			</div>
		</div>
		<div class="twelve wide column">
			<div class="ui segment">
				<transition :css="false" @enter="fadeAnimEnter" @leave="fadeAnimLeave" mode="out-in">
					<router-view @refreshCount="handleRefresh"></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import {
		fadeAnimEnter,
		fadeAnimLeave
	} from '../../transitions.js'
	export default {
		data() {
			return {
				messages: {}
			}
		},
		methods: {
			fadeAnimEnter: function (el, done) {
				fadeAnimEnter(el, done)
			},
			fadeAnimLeave: function (el, done) {
				fadeAnimLeave(el, done)
			},
			handleRefresh() {
				axios.get('http://localhost:3000/admin/messages', {
						withCredentials: true
					})
					.then((response) => {
						this.messages = response.data
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
		mounted() {
			axios.get('http://localhost:3000/admin/messages', {
					withCredentials: true
				})
				.then((response) => {
					this.messages = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

</script>
<style scoped>


</style>
