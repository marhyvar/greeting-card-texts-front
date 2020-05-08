<template>
  <div class="submit-form">
    <div v-if="!submitted">
 
      <div class="form-group">
        <label for="teema">Lisää teema</label>
        <input
          class="form-control"
          id="teema"
          required
          v-model="teema.teema"
          name="teema"
        />
      </div> 

      <button @click="saveTeema" class="btn btn-success">Tallenna</button>
    </div>

    <div v-else>
      <h4>Tallennus onnistui!</h4>
      <button class="btn btn-success" @click="uusiTeema">Lisää</button>
    </div>
  </div>
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";

export default {
  name: "add-teksti",
  data() {
    return {
      teema: {
        teema_id: null,
        teema: "",      
      },
      submitted: false
    };
  },
  methods: {
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

