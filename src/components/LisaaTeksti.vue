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
        <select class="form-control" id="select2" v-model.number="teksti.teema_id">
          <option v-for="option in options" v-bind:value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
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

export default {
  name: "add-teksti",
  data() {
    return {
      teksti: {
        id: null,
        teksti: "",  
        teema_id: ""     
      },
      teemat: [],
      options: [ { text: 'joulu', value: 1 }],
      submitted: false
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
          this.teksti.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    haeTeemat() {
      TekstiDataService.getTeemat()
        .then(response => {
          this.teemat = response.data;
          console.log("Teemat: ", response.data);
          let res = this.teemat.map(t => {
            let obj = {};
            obj['text'] = t.teema;
            obj['value'] = t.teema_id;
            return obj;
          });
          this.options = res;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    uusiTeksti() {
      this.submitted = false;
      this.teksti = {};
    }
  },
  mounted() {
    this.haeTeemat();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

select {
  font-family: Arial;
}

</style>
