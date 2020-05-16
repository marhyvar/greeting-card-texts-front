<template>
  <div v-if="valittuTeksti" class="edit-form">
    <form>
      <div class="form-group">
        <label for="teksti">Muokkaa tekstiä: </label>
        <textarea class="form-control" rows="5" id="teksti"
          v-model="valittuTeksti.teksti"
        />
      </div>

       <div class="form-group">
        <label for="select2">Vaihda teema: </label>
        <select-valikko :teema="valittuTeksti.teema_id" @get-teema="getTeemaId"></select-valikko>
      </div> 
    </form>
    <div class="btn-group">
      <button class="btn btn-outline-danger"
        @click="deleteTeksti"
      >
        Poista
      </button>

      <button type="submit" class="btn btn-outline-dark"
        @click="updateTeksti"
      >
        Muokkaa
      </button>
      <a class="btn btn-outline-secondary"
        :href="/tekstit/"
        >
        Takaisin
      </a>
    </div>
    <p>{{ viesti }}</p>
  </div>

  <div v-else>
    <br />
    <p>Klikkaa tekstiä...</p>
  </div>
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";
import SelectValikko from "./SelectValikko"

export default {
  //komponentti, jossa on tekstin muokkaamiseen ja poistamiseen liittyvät toiminnallisuudet
  name: "teksti",
  components: { SelectValikko },
  data() {
    return {
      valittuTeksti: null,
      teemat: [],
      options: [ { text: 'joulu', value: 1 }],
      viesti: ''
    };
  },
  methods: {
    //hakee tekstin id:n mukaisesti 
    getTeksti(id) {
      TekstiDataService.get(id)
        .then(response => {
          this.valittuTeksti = response.data[0];
          console.log('teksti: ', response.data[0]);
        })
        .catch(e => {
          console.log(e);
        });
    },
    //päivittää valitun tekstin
    updateTeksti() {
      TekstiDataService.update(this.valittuTeksti.id, this.valittuTeksti)
        .then(response => {
          console.log(response.data);
          this.viesti = 'Muokkaus onnistui!';
        })
        .catch(e => {
          console.log(e);
          this.viesti = 'Muokkaus ei onnistunut!';
        });
    },
    //poistaa valitun tekstin
    deleteTeksti() {
      TekstiDataService.delete(this.valittuTeksti.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tekstit" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    //asettaa valitun tekstin teema_id:n valikkovalinnan mukaan
    getTeemaId(id) {
      this.valittuTeksti.teema_id = parseInt(id);
    },
  },
  //näkyman latautuessa viesti asetataan tyhjäksi ja haetaan teksti id-parametrin mukaan
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

p {
  margin: 15px 0px;
}

</style>
