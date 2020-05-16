<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="teksti">Kirjoita teksti:</label>
        <textarea
          class="form-control"
          rows="5"
          id="teksti"
          required
          v-model="teksti.teksti"
          name="teksti"
        />
      </div>

      <div class="form-group">
        <label for="select2">Valitse teema: </label>
        <select-valikko @get-teema="getTeemaId"></select-valikko>
      </div> 
      <div class="btn-group">
        <button @click="saveTeksti" type="button" class="btn btn-outline-success">Tallenna</button>
        <a class="btn btn-outline-secondary"
          :href="/tekstit/"
          >
          Takaisin
        </a>
      </div>
    </div>

    <div v-else>
      <h4>Tallennus onnistui!</h4>
      <button class="btn btn-outline-success" @click="uusiTeksti">Lisää</button>
    </div>
  </div>
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";
import SelectValikko from "./SelectValikko"

export default {
  //komponentti uusien tekstien lisäystä varten
  name: "lisaa-teksti",
  components: { SelectValikko },
  data() {
    return {
      teksti: {
        id: null,
        teksti: "",  
        teema_id: ""     
      },
      submitted: false
    };
  },
  methods: {
    //tallentaa uuden tekstin
    saveTeksti() {
      var data = {
        teksti: this.teksti.teksti,
        teema_id: this.teksti.teema_id
      };
      TekstiDataService.create(data)
        .then(response => {
          this.teksti.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    //asettaa teema_id:n select-valikkovalinnan mukaan
    getTeemaId(id) {
      this.teksti.teema_id = id;
    },
    //lomakkeen käsittelyn jälkeisessä näkymässä avaa uuden tyhjän lomakkeen
    uusiTeksti() {
      this.submitted = false;
      this.teksti = {};
    }
  }
};
</script>

<style>

.submit-form {
  max-width: 300px;
  margin: auto;
}

</style>
