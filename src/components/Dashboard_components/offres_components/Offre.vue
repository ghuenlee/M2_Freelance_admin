<template>
	<div class="ui blurring basic segment">
		<div class="ui inverted dimmer"></div>
		<div class="ui fluid blue raised card">
			<div class="content">
				<div class="right floated meta">
					<div class="ui blue button" v-if="!mod" @click="modAppear()">
						<i class="edit icon"></i> Modifier
					</div>
					<div class="ui yellow button" v-else @click="modAppear()">
						<i class="remove icon"></i> Annuler
					</div>
					<div class="ui red button" @click="openDelModal()">
						<i class="trash icon"></i> Supprimer
					</div>
				</div>
				<div class="header">
					<i class="blue newspaper icon"></i> {{offre.titre}}
				</div>
				<div class="meta">
					<i class="red wait icon"></i> Postée {{ajoutFromNow}} |
					<i class="orange calendar icon"></i> le {{ajoutFormatted}} |
					<i class="blue help circle icon"></i> Etat: {{offre.etat}}
				</div>
				<div class="ui divider"></div>
				<div class="description">
					<p>
						<span><i class="hashtag icon"></i> <b>ID:</b> {{offre._id}} </span>
						<b>&nbsp;&nbsp;|&nbsp;&nbsp;</b>
						<span> <i class="user icon"></i> <b>Employeur:</b> {{offre.employeur.nom}} {{offre.employeur.pnom}}  </span>
						<b>&nbsp;&nbsp;|&nbsp;&nbsp;</b>
						<span> <i class="student icon"></i> <b>Compétence:</b> {{offre.competence.titre}}</span>
						<b>&nbsp;&nbsp;|&nbsp;&nbsp;</b>
						<span> <i class="maps pin icon"></i> <b>Localisation:</b> {{offre.localisation}}</span>
						<br>
						<span> <i class="write icon"></i> <b>Description:</b> {{offre.description}}</span>
						<br>
						<span><i class="hourglass start icon"></i> <b>Durée minimum:</b> {{offre.duree_min}} </span>
						<b>&nbsp;&nbsp;|&nbsp;&nbsp;</b>
						<span><i class="hourglass end icon"></i> <b>Durée maximum:</b> {{offre.duree_max}} </span>
					</p>
				</div>
			</div>
			<div class="content">
				<span><i class="linkify icon"></i> <b>Conditions:</b> <a :href="`http://localhost:3000`+offre.url_conditions"> Cliquez içi pour ouvrir le fichier. </a> </span>
				<br>
				<span v-if="offre.url_autre"><i class="linkify icon"></i> <b>Fichier supplémentaire:</b> <a :href="`http://localhost:3000`+offre.url_autre"> Cliquez içi pour ouvrir le fichier. </a> </span>
			</div>
			<transition :css="false" @enter="slideDownAnim" @leave="slideUpAnim">
				<OffreModificationForm tag="div" class="content" v-if="mod" :offre="this.offre" @modGO="postMod" />
			</transition>
		</div>
		<div class="ui modal" :id="[this.offre._id]+'DEL'">
			<div class="ui header">
				<i class="edit icon"></i> Supprimer l'offre {{offre._id}} ?
			</div>
			<div class="centered content">
				<p class="center aligned">Suohaitez-vous supprimer l'offre #{{offre._id}} définitevement ?</p>
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
	import OffreModificationForm from './OffreModificationForm'
	import {
		slideUpAnim,
		slideDownAnim
	} from '../../../transitions.js'
	import {
		bus
	} from '../../../main'
	import {
		postModOffre,
		postDelOffre
	} from '../../../Utility.js'

	export default {
		props: ['offre', 'index', 'showCard'],
		data() {
			return {
				message: "Hello",
				mod: false
			}
		},
		methods: {
			slideUpAnim: function (el, done) {
				slideUpAnim(el, done)
			},
			slideDownAnim: function (el, done) {
				slideDownAnim(el, done)
			},
			moment: function () {
				return moment()
			},
			modAppear: function () {
				this.$emit('modAppear', this.offre._id);
				this.mod = !this.mod;
			},
			openDelModal() {
				$('#' + this.offre._id + "DEL")
					.modal({
						closable: false,
						onApprove: () => {
							this.postDel()
						}
					})
					.modal('show')
			},
			disableMod: function () {
				this.mod = false;
			},
			postDel: function () {
				postDelOffre(this.offre)
					.then((response) => {
						this.$emit('deleted', response.data)
					})
			},
			postMod: function (data) {
				postModOffre(data)
					.then((response) => {
						this.mod = false;
						this.$emit('modified', response.data);
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
		computed: {
			ajoutFromNow: function () {
				return moment(this.offre.dateAjout).fromNow()
			},
			ajoutFormatted: function () {
				return moment(this.offre.dateAjout).format('DD MMMM YYYY')
			}
		},
		components: {
			OffreModificationForm
		},
		watch: {
			showCard: function () {
				if (!this.showCard) {
					$(this.$el).dimmer({
						closable: false,
					}).dimmer('show')
				} else {
					$(this.$el).dimmer('hide')
				}
			},
			index: function () {
				this.mod = false;
			}
		},
		mounted() {
			bus.$on('filterChanged', this.disableMod);
		}
	}

</script>
<style scoped>
	.ui.basic.clearing.segment {
		padding: 0
	}

</style>
