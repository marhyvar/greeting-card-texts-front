<template>
  <div class="submit-form">
    <div v-if="!submitted">
 
      <div class="form-group">
        <label for="teema">Uuden teeman nimi: </label>
        <input
          class="form-control"
          id="teema"
          required
          v-model="teema.teema"
          name="teema"
        />
      </div> 

      <div class="btn-group">
        <button @click="saveTeema" class="btn btn-outline-success">Tallenna</button>
        <a class="btn btn-outline-secondary"
            :href="/tekstit/"
            >
            Takaisin
          </a>
        </div>
    </div>
    
    <div v-else>
      <h4>Tallennus onnistui!</h4>
      <button class="btn btn-outline-success" @click="uusiTeema">Lisää</button>
    </div>
  </div>
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";

export default {
  //komponentti uusien teemojen lisäystä varten
  name: "lisaa-teema",
  data() {
    return {
      teema: {
        teema_id: null,
        teema: ""     
      },
      submitted: false
    };
  },
  methods: {
    //tallentaa uuden teeman
    saveTeema() {
      var data = {
        teema: this.teema.teema
      };
      TekstiDataService.createTeema(data)
        .then(response => {
          this.teema_id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    //lomakkeen käsittelyn jälkeisessä näkymässä avaa uuden tyhjän lomakkeen
    uusiTeema() {
      this.submitted = false;
      this.teema = {};
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

