<template>
  <div v-if="currentTeksti" class="edit-form">
    <form>
      <div class="form-group">
        <label for="teksti">Muokkaa tekstiä: </label>
        <textarea class="form-control" rows="5" id="teksti"
          v-model="currentTeksti.teksti"
        />
      </div>

       <div class="form-group">
        <label for="select2">Vaihda teema: </label>
        <select class="form-control" id="select2" v-model.number="currentTeksti.teema_id">
          <option v-for="option in options" v-bind:value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
      </div> 
    </form>
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
      teemat: [],
      options: [ { text: 'joulu', value: 1 }],
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
          this.viesti = 'Päivitys onnistui!';
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
    }
  },

  mounted() {
    this.viesti = '';
    this.getTeksti(this.$route.params.id);
    this.haeTeemat();
    console.log('id: ', this.$route.params.id)
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

.btn {
  margin-right: 15px ;
}

select {
  font-family: Arial;
}
</style>
