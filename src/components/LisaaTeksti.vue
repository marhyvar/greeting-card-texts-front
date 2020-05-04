<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="teksti">Teksti</label>
        <input
          type="text"
          class="form-control"
          id="teksti"
          required
          v-model="teksti.teksti"
          name="teksti"
        />
      </div>

      <div class="form-group">
        <label for="teema_id">Teema-id</label>
        <input
          class="form-control"
          id="teema_id"
          required
          v-model="teksti.teema_id"
          name="teema_id"
        />
      </div>

      <button @click="saveTeksti" class="btn btn-success">Tallenna</button>
    </div>

    <div v-else>
      <h4>Tallennus onnistui!</h4>
      <button class="btn btn-success" @click="uusiTeksti">Lisää</button>
    </div>
  </div>
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";

export default {
  name: "add-teksti",
  data() {
    return {
      teksti: {
        teksti: "",
        teema_id: ""
      }
    };
  },
  methods: {
    saveTeksti() {
      var data = {
        teksti: this.teksti.teksti,
        teema_id: this.teksti.teema_id
      };

      TekstiDataService.create(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    uusiTeksti() {
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
