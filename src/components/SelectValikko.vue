<template>

    <select class="form-control" @change="onChange($event) " v-model.number="tulos">
        <option v-for="option in options" v-bind:value="option.value" :key="option.value">
            {{ option.text }}
        </option>
    </select>

</template>

<script>
import TekstiDataService from "../services/TekstiDataService";

export default {
  name: "select-valikko",
  props: {
    teema: {
        type: Number,
        required: false
    }
  },
  data() {
    return {
      teemat: [],
      tulos: "",
      options: [ { text: 'joulu', value: 1 }],
    };
  },
  methods: {
    //hakee teemat palvelimelta ja muokkaa tuloksen valikkoa varten
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
    //välittää tiedon ylemmälle komponentille valikon arvon muutoksesta
    onChange(event) {
      this.$emit('get-teema', event.target.value)
    }
  },
  //näkymän latautuessa haetaan teemat ja asetetaan mahdollinen valittu teema
  mounted() {
    this.haeTeemat();
    this.tulos = this.teema;
  }
}

</script>

<style scoped>

  select {
    font-family: Arial;
  }
  
</style>