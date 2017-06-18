<template>
	<div class="ui fluid blue card">
		<div class="content">
			<i class="right floated big yellow wait icon" v-if="demande.status === `pending`"></i>
			<i class="right floated big green checkmark icon" v-else></i>
			<div class="header">
				<i class="blue hashtag icon"></i>{{demande._id}}
			</div>
			<div class="meta">
				<i class="red wait icon"></i> Ajoutée {{dateFromNow}} | <i class="orange calendar icon"></i> Le {{dateFormatted}}
			</div>
		</div>
		<div class="content">
			<p>
				<i class="user icon"></i><b>Type d'utilisateur: </b> {{demande.profil.accountType}} &nbsp;|&nbsp;
				<i class="hashtag icon"></i><b>ID de l'utilisateur: </b> {{demande.profil.ID.userID}} &nbsp;|&nbsp;
				<i class="ellipsis horizontal icon"></i><b>Nom & Prénom: </b> {{demande.profil.ID.nom}} {{demande.profil.ID.pnom}}
			</p>
		</div>
		<div class="content" v-if="demande.justificatifs.length > 0">
			<h3> <i class="legal icon"></i> Justificatifs</h3>
			<div class="ui basic segment">
				<span v-for="(justif, index) in demande.justificatifs">
                   {{index+1}}) <i class="linkify icon"></i><b>Document:</b> <a :href="`http://localhost:3000`+justif.url">Lien</a>
                   &nbsp;|&nbsp; <i class="student icon"></i> <b>Compétence:</b> {{justif.competence.titre}}
                   <br>
                </span>
			</div>

		</div>
		<div class="content" v-if="demande.status !== `processed`">
			<div class="ui two buttons">
				<div class="ui basic green button" @click="openValidateModal"> <i class="checkmark box icon"></i>Valider</div>
				<div class="ui basic red button" @click="openDeleteModal"><i class="remove icon"></i>Refuser</div>
			</div>
		</div>
		<div class="content" v-else>
			<h3 class="ui green center aligned header"> Demande Validée {{approvedFromNow}}, Le {{approvedFormatted}}</h3>
		</div>
		<div class="ui modal" :id="[this.demande._id]+'VAL'">
			<div class="ui header">
				<i class="help circle icon"></i> Valider la demande {{demande._id}} ?
			</div>
			<div class="centered content">
				<p class="center aligned">Suohaitez-vous valider la demande #{{demande._id}} de <b>{{demande.profil.ID.nom}} {{demande.profil.ID.pnom}}</b> ?</p>
				<p class="center aligned"> Cette action aura pour conséquence de valider le profil de cet utilisateur.</p>
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
		<div class="ui modal" :id="[this.demande._id]+'DEL'">
			<div class="ui header">
				<i class="help circle icon"></i> Supprimer la demande {{demande._id}} ?
			</div>
			<div class="centered content">
				<p class="center aligned">Suohaitez-vous supprimer la demande #{{demande._id}} de <b>{{demande.profil.ID.nom}} {{demande.profil.ID.pnom}}</b> ?</p>
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
		postValDemande,
		postDelDemande
	} from '../../../Utility.js'

	export default {
		props: ['demande', 'index'],
		computed: {
			dateFromNow: function () {
				return moment(this.demande.dateCreated).fromNow()
			},
			dateFormatted: function () {
				return moment(this.demande.dateCreated).format('DD MMMM YYYY à HH:mm')
			},
			approvedFromNow: function () {
				return moment(this.demande.dateTreated).fromNow()
			},
			approvedFormatted: function () {
				return moment(this.demande.dateTreated).format('DD MMMM YYYY à HH:mm')
			},
			statusFormatted: function () {
				if (this.demande.status === 'pending') {
					return 'En Attente de traitement'
				} else if (this.demande.status === 'processed') {
					return 'Traitée'
				}
			}
		},
		methods: {
			moment: function () {
				return moment();
			},
			openValidateModal() {
				$('#' + this.demande._id + "VAL")
					.modal({
						closable: false,
						onApprove: () => {
							this.postVal()
						}
					})
					.modal('show')
			},
			openDeleteModal() {
				$('#' + this.demande._id + "DEL")
					.modal({
						closable: false,
						onApprove: () => {
							this.postDel()
						}
					})
					.modal('show')
			},
			postVal() {
				postValDemande(this.demande)
					.then((response) => {
						this.$emit('modified', response.data)
					})
					.catch((error) => {
						console.log(error)
					})
			},
			postDel() {
				postDelDemande(this.demande)
					.then((response) => {
						this.$emit('deleted', response.data)
					})
					.catch((error) => {
						console.log(error)
					})
			}
		}
	}

</script>

<style scoped>
	.ui.basic.segment {
		margin: 0 !important;
		padding: 0;
		padding-left: 1em;
	}

</style>
