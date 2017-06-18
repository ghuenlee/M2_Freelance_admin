import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboard from '@/components/Dashboard'
import Admin from '@/components/Dashboard_components/Admin'
import Comptes from '@/components/Dashboard_components/Comptes'
import Offres from '@/components/Dashboard_components/Offres'
import Demandes from '@/components/Dashboard_components/Demandes'
import Messagerie from '@/components/Dashboard_components/Messagerie'
import Recus from '@/components/Dashboard_components/messagerie_components/Recus'
import Envoyes from '@/components/Dashboard_components/messagerie_components/Envoyes'
import Nouveau from '@/components/Dashboard_components/messagerie_components/Nouveau'
import Details from '@/components/Dashboard_components/messagerie_components/Details'
import Notifications from '@/components/Dashboard_components/Notifications'
import NewNotifs from '@/components/Dashboard_components/notifications_components/New'
import OldNotifs from '@/components/Dashboard_components/notifications_components/Old'
import DetNotif from '@/components/Dashboard_components/notifications_components/Details'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Hello',
			component: Hello
		},
		{
			path: '/t',
			component: Dashboard,
			children: [{
					path: 'p',
					name: 'Profil',
					component: Admin
				},
				{
					path: 'c',
					name: 'Comptes',
					component: Comptes
				},
				{
					path: 'o',
					name: 'Offres',
					component: Offres
				},
				{
					path: 'd',
					name: 'Demandes',
					component: Demandes
				},
				{
					path: 'm',
					component: Messagerie,
					name: 'Messagerie',
					children: [{
						path: 'r',
						name: 'Messages Reçus',
						component: Recus
					}, {
						path: 'e',
						name: 'Messages Envoyés',
						component: Envoyes
					}, {
						path: 'n',
						name: 'Nouveau Message',
						component: Nouveau
					}, {
						path: 'd',
						name: 'Détails du message',
						component: Details,
					}]
				},
				{
					path: 'n',
					component: Notifications,
					name: 'Notifications',
					children: [{
						path: 'n',
						name: 'Nouvelles Notifications',
						component: NewNotifs
					}, {
						path: 'a',
						name: 'Archives',
						component: OldNotifs
					}, {
						path: 'd',
						name: 'Details de la notification',
						component: DetNotif
					}]
				}
			]
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		}
	]
})
