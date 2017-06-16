<template lang="html">
  <div class="ui container">

      <h1 class="ui centered dividing header"> Bienvenue Administrateur</h1>

      <div class="ui basic segment">
        <div class="ui two column centered grid">
          <div class="four wide column">
            <h3 class="ui header">
              <i class="hashtag icon"></i>
              <div class="content">
                {{user._id}}
                <div class="sub header">
                  ID de votre compte
                </div>
              </div>
            </h3>
            <h3 class="ui header">
              <i class="ellipsis horizontal icon"></i>
              <div class="content">
                {{user.username}}
                <div class="sub header">
                  Nom d'utilisateur
                </div>
              </div>
            </h3>
            <h3 class="ui header">
              <i class="calendar icon"></i>
              <div class="content">
                {{dateCreated}}
                <div class="sub header">
                  Compte créé le
                </div>
              </div>
            </h3>
          </div>
          <div class="four wide column">
            <h3 class="ui header">
              <i class="user icon"></i>
              <div class="content">
                {{profil.nom}}, {{profil.pnom}}
                <div class="sub header">
                  Nom et prénom
                </div>
              </div>
            </h3>
            <h3 class="ui header">
              <i class="at icon"></i>
              <div class="content">
                {{profil.email}}
                <div class="sub header">
                  Adresse Email
                </div>
              </div>
            </h3>
            <h3 class="ui header">
              <i class="call icon"></i>
              <div class="content">
                {{profil.telephone}}
                <div class="sub header">
                  Téléphone
                </div>
              </div>
            </h3>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

moment.locale('fr');

export default {
  data () {
    return {
      user : {},
      profil: {},
      dateCreated: ''
    }
  },
  methods: {
    moment: function() {
      return moment();
    }
  },
  beforeMount() {
    axios.get('http://localhost:3000/admin/profil', {withCredentials: true})
      .then((response) => {
        this.user = response.data;
        this.profil = response.data.profil.ID;
        this.dateCreated = moment(response.data.dateCreated).format('DD MMMM YYYY');
      })
      .catch((error) => console.log(error))
  }
}
</script>

<style lang="css">
h1 {
  margin-bottom: 1em !important
}
</style>
