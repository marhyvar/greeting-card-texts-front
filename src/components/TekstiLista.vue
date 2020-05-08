<template>
  <div class="list">
    <div class="row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <select class="form-control" id="select" v-model.number="teema">
          <option v-for="option in options" v-bind:value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
        <div class="input-group-append">
          <button class="btn btn-outline-dark" type="button"
            @click="etsiTeemalla"
          >
            Hae teemalla
          </button>
          <button class="btn btn-outline-dark" type="button"
            @click="palautaTekstit"
          >
            Näytä kaikki
          </button>
        </div>
      </div>
    </div>
    </div>
    <div class="row">
    <div class="col-md-10">
      <h4>Tekstilista</h4>
      <ul>
        
        <li
          :class="{ active: index == currentIndex }"
          v-for="(teksti, index) in tekstit"
          :key="index"
          @click="setActiveTeksti(teksti, index)"
        >
          {{ teksti.teksti }}
        </li>
        
      </ul>

    </div>
    <div class="col-md-2">
      <div v-if="currentTeksti">
        <h4>Valittu teksti:</h4>
        <div>
          <label><strong>Teksti:</strong></label> {{ currentTeksti.teksti }}
        </div>
        <!--<div>
          <label><strong>Teema_id:</strong></label> {{ currentTeksti.teema_id }}
        </div> -->

        <a class="badge badge-warning"
          :href="'/tekstit/' + currentTeksti.id"
        >
          Muokkaa
        </a>
      </div>
      <div v-else>
        <br />
        <p>Klikkaa tekstiä...</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";

export default {
  name: "tekstit-lista",
  data() {
    return {
      tekstit: [],
      teemat: [],
      options: [ { text: 'joulu', value: 1 }],
      currentTeksti: null,
      currentIndex: -1,
      selected: null,
      teema: ""
    };
  },
  methods: {
    haeTekstit() {
      TekstiDataService.getAll()
        .then(response => {
          this.tekstit = response.data;
          console.log("Tekstit: ",response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    palautaTekstit() {
      this.haeTekstit();
      this.currentTeksti = null;
      this.currentIndex = -1;
    },

    setActiveTeksti(teksti, index) {
      this.currentTeksti = teksti;
      this.currentIndex = index;
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

    etsiTeemalla() {
      TekstiDataService.findByTeema(this.teema) // korjaa id:ksi
        .then(response => {
          this.tekstit = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.haeTekstit();
    this.haeTeemat();
  }
};
</script>

<style>
.list {
  /*text-align: left;*/
  /*max-width: 750px;*/
  margin: auto;
}

ul {
  list-style-type: none;
  background: lightcyan;
  padding: 0;
  border: 6px ridge blue;
}

ul li {
  padding: 16px 24px;
  background: lightcyan;
  border-bottom: 6px ridge blue;
}

ul li:last-child {
  border-bottom: none
}

.active {
  font-weight: bold;
  background: lightskyblue;
}

</style>
