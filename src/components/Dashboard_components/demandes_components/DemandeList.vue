<template>
	<div class="ui container">
		<form class="ui form">
			<div class="four fields">
				<div class="field">
					<div class="ui icon left labeled input">
						<div class="ui blue label">
							<i class="hashtag icon"></i>
						</div>
						<input type="text" v-model="demandeFilter.ID" placeholder="ID...">
						<i class="search icon"></i>
					</div>
				</div>
				<div class="field">
					<div class="ui icon left labeled input">
						<div class="ui blue label">
							<i class="user icon"></i>
						</div>
						<input type="text" v-model="demandeFilter.ID_USER" placeholder="ID utilisateur...">
						<i class="search icon"></i>
					</div>
				</div>
				<div class="field">
					<div class="ui icon left labeled input">
						<div class="ui blue label">
							<i class="tag icon"></i>
						</div>
						<select class="ui fluid dropdown" v-model="demandeFilter.type">
                            <option value="all"><i class="blue users icon"></i>Tous les utilisateurs</option>
                            <option value="Freelancer"><i class="teal street view icon"></i>Freelancer</option>
                            <option value="Employeur"><i class="purple building icon"></i>Employeur</option>
                        </select>
					</div>
				</div>
				<div class="field">
					<div class="ui icon left labeled input">
						<div class="ui blue label">
							<i class="help circle icon"></i>
						</div>
						<select class="ui fluid dropdown" v-model="demandeFilter.status">
                            <option value="all"><i class="blue list icon"></i>Toutes les dmnds.</option>
                            <option value="processed"><i class="green checkmark icon"></i>Dmnds. traitées</option>
                            <option value="pending"><i class="orange wait icon"></i>Dmnds. en attente</option>
                        </select>
					</div>
				</div>
			</div>
			<div class="ui divider"></div>
			<div class="ui text container"> <b>{{filteredDemandes.length}}</b> <i class="blue large book icon"></i>Demande(s) trouvée(s). &nbsp;
				<div class="ui labeled button">
					<div class="ui blue button" @click="changeOrder">
						<i class="sort icon"></i> Trier par:
					</div>
					<a class="ui basic blue label">
						<transition :css="false" @enter="fadeAnimEnter" @leave="fadeAnimLeave" mode="out-in">
							<span v-if="order.date=== `desc`" @click="orderDate" key="01">
                                 Date d'ajout  <i class="arrow down icon"></i>
                            </span>
							<span v-else @click="orderDate" key="02">
                                 Date d'ajout <i class="arrow up icon"></i>
                            </span>
						</transition>
						<span><i class="angle right icon"></i></span>
						<transition :css="false" @enter="fadeAnimEnter" @leave="fadeAnimLeave" mode="out-in">
							<span v-if="order.status=== `desc`" @click="orderStatus" key="01">
                                 Etat  <i class="arrow down icon"></i>
                            </span>
							<span v-else @click="orderStatus" key="02">
                                 Etat  <i class="arrow up icon"></i>
                            </span>
						</transition>
					</a>
				</div>
			</div>
		</form>
		<div class="ui inverted divider"></div>
		<transition :css="false" @enter="flashAnim" @leave="flashAnim" mode="out-in">
			<div class="ui success icon message" v-if="modifiedDemande" key="01">
				<i class="close icon" @click="closeMessage"></i>
				<i class="checkmark icon"></i>
				<div class="content">
					<div class="header"> Demande Validée</div>
					La demande <b>{{modifiedDemande.demande._id}}</b>, concernant l'utilisateur <b>{{modifiedDemande.user.nom}} {{modifiedDemande.user.pnom}}</b>					a été validée avec succés.
				</div>
			</div>
			<div class="ui success icon message" v-if="deletedDemande" key="02">
				<i class="close icon" @click="closeMessage"></i>
				<i class="checkmark icon"></i>
				<div class="content">
					<div class="header">
						Demande Refusée
					</div>
					La demande <b>{{deletedDemande._id}}</b> a été refusée et supprimée.
				</div>
			</div>
		</transition>
		<transition :css="false" @enter="slideDownAnim" @leave="slideUpAnim" mode="out-in">
			<div class="ui info icon message" v-if="filteredDemandes.length === 0" key="visible">
				<i class="info icon"></i>
				<div class="header">
					Aucune demande à afficher.
				</div>
			</div>
			<div v-else key="invisible">
				<transition-group :css="false" @enter="slideDownAnim" @leave="slideUpAnim">
					<Demande v-for="(demande, index) in filteredDemandes" :demande="demande" :index="index" :key="demande._id" @modified="handleModified"
					    @deleted="handleDeleted" />
				</transition-group>
			</div>
		</transition>

	</div>
</template>

<script>
	import {
		slideUpAnim,
		slideDownAnim,
		flashAnim,
		fadeAnimEnter,
		fadeAnimLeave
	} from '../../../transitions.js'
	import Demande from './Demande'

	export default {
		props: ['demandes'],
		data() {
			return {
				modifiedDemande: null,
				deletedDemande: null,
				order: {
					date: 'desc',
					status: 'desc'
				},
				demandeFilter: {
					ID: '',
					ID_USER: '',
					type: 'all',
					status: 'pending'
				}
			}
		},
		methods: {
			slideUpAnim: function (el, done) {
				slideUpAnim(el, done)
			},
			slideDownAnim: function (el, done) {
				slideDownAnim(el, done)
			},
			flashAnim: function (el, done) {
				flashAnim(el, done)
			},
			fadeAnimEnter: function (el, done) {
				fadeAnimEnter(el, done)
			},
			fadeAnimLeave: function (el, done) {
				fadeAnimLeave(el, done)
			},
			orderDate: function () {
				if (this.order.date === 'desc') {
					this.order.date = 'asc'
				} else {
					this.order.date = 'desc'
				}
			},
			orderStatus: function () {
				if (this.order.status === 'desc') {
					this.order.status = 'asc'
				} else {
					this.order.status = 'desc'
				}
			},
			changeOrder: function () {
				if (this.order.date === 'desc') {
					this.order.status = 'asc'
					this.order.date = 'asc'
				} else {
					this.order.date = 'desc'
					this.order.status = 'desc'
				}
			},
			handleModified: function (data) {
				this.deletedDemande = null;
				this.modifiedDemande = data;
				this.demandeFilter.ID = '';
				this.demandeFilter.ID_USER = '';
				this.demandeFilter.type = 'all';
				this.demandeFilter.status = 'processed';
				this.$emit('refresh');
			},
			handleDeleted: function (data) {
				this.deletedDemande = data;
				this.modifiedDemande = null;
				this.demandeFilter.ID = '';
				this.demandeFilter.ID_USER = '';
				this.$emit('refresh');
			},
			closeMessage: function () {
				this.deletedDemande = null;
				this.modifiedDemande = null;
			}
		},
		computed: {
			filteredDemandes: function () {
				let idPat = new RegExp(this.demandeFilter.ID.toLowerCase());
				let idUsrPat = new RegExp(this.demandeFilter.ID_USER.toLowerCase());
				var filtered = this.demandes.filter((demande) => {
					if (this.demandeFilter.type !== 'all' && this.demandeFilter.status !== 'all') {
						return (idPat.test(demande._id.toLowerCase()) && idUsrPat.test(demande.profil.ID.userID.toLowerCase()) &&
							demande.profil.accountType === this.demandeFilter.type && demande.status === this.demandeFilter.status)
					} else if (this.demandeFilter.type !== 'all') {
						return (idPat.test(demande._id.toLowerCase()) && idUsrPat.test(demande.profil.ID.userID.toLowerCase()) &&
							demande.profil.accountType === this.demandeFilter.type)
					} else if (this.demandeFilter.status !== 'all') {
						return (idPat.test(demande._id.toLowerCase()) && idUsrPat.test(demande.profil.ID.userID.toLowerCase()) &&
							demande.status === this.demandeFilter.status)
					} else {
						return (idPat.test(demande._id.toLowerCase()) && idUsrPat.test(demande.profil.ID.userID.toLowerCase()))
					}
				});
				if (this.order.date === 'asc' && this.order.status === 'asc') {
					var orderedByDate = filtered.sort(function (a, b) {
						return new Date(a.dateCreated) - new Date(b.dateCreated)
					})
					return orderedByDate.sort(function (a, b) {
						return a.status < b.status ? -1 : 1;
					})
				} else if (this.order.date === 'desc' && this.order.status === 'asc') {
					var orderedByDate = filtered.sort(function (a, b) {
						return new Date(b.dateCreated) - new Date(a.dateCreated)
					})
					return orderedByDate.sort(function (a, b) {
						return a.status < b.status ? -1 : 1;
					})
				} else if (this.order.date === 'asc' && this.order.status === 'desc') {
					var orderedByDate = filtered.sort(function (a, b) {
						return new Date(a.dateCreated) - new Date(b.dateCreated)
					})
					return orderedByDate.sort(function (a, b) {
						return a.status < b.status ? 1 : -1;
					})
				} else {
					var orderedByDate = filtered.sort(function (a, b) {
						return new Date(b.dateCreated) - new Date(a.dateCreated)
					})
					return orderedByDate.sort(function (a, b) {
						return a.status < b.status ? 1 : -1;
					})
				}

			}
		},
		components: {
			Demande
		},
		mounted() {
			$('select.dropdown')
				.dropdown();
		}
	}

</script>

<style scoped>
	.ui.blue.label i {
		margin: 0;
	}

	.ui.text.container {
		text-align: center
	}

</style>
