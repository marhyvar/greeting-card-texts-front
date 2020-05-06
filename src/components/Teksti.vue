<template>
  <div v-if="currentTeksti" class="edit-form">
    <h4>Teksti</h4>
    <form>
      <div class="form-group">
        <label for="teksti">Teksti</label>
        <textarea class="form-control" rows="5" id="teksti"
          v-model="currentTeksti.teksti"
        />
      </div>
      <div class="form-group">
        <label for="teema_id">Teema_id</label>
        <input type="text" class="form-control" id="teema_id"
          v-model="currentTeksti.teema_id"
        />
      </div>
    </form>
    <button class="badge badge-danger mr-2"
      @click="deleteTeksti"
    >
      Poista
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTeksti"
    >
      Muokkaa
    </button>
    <p>{{ viesti }}</p>
  </div>

  <div v-else>
    <br />
    <p>Klikkaa tekstiä...</p>
  </div>
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";

export default {
  name: "teksti",
  data() {
    return {
      currentTeksti: null,
      viesti: ''
    };
  },
  methods: {
    getTeksti(id) {
      TekstiDataService.get(id)
        .then(response => {
          this.currentTeksti = response.data[0];
          console.log('teksti: ', response.data[0]);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTeksti() {
      TekstiDataService.update(this.currentTeksti.id, this.currentTeksti)
        .then(response => {
          console.log(response.data);
          this.message = 'Päivitys onnistui!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTeksti() {
      TekstiDataService.delete(this.currentTeksti.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tekstit" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.viesti = '';
    this.getTeksti(this.$route.params.id);
    console.log('id: ', this.$route.params.id)
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
