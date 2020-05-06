<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="teksti">Teksti</label>
        <textarea
          class="form-control"
          rows="5"
          id="teksti"
          required
          v-model="teksti.teksti"
          name="teksti"
        />
      </div>
      <!--
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
      -->
      <div class="form-group">
        <label for="select2">Valitse teema: </label>
        <select class="form-control" id="select2" v-model.number="teksti.teema_id">
          <option v-for="option in options" v-bind:value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
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
      console.log('Hei!')
      console.log({ msg: 'heippa'})
      console.log('Tallennettava data: ', data);
      this.submitted = true;
      /*TekstiDataService.create(data)
        .then(response => {
          this.teksti.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });*/
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
</style>
