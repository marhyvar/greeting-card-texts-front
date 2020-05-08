<template>
  <div class="nakyma">
    <div class="row">
      <div class="col-md-6">
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
      <div class="col-md-2">
        <div v-if="currentTeksti">
          <h5>Valittu teksti:</h5>
          <div class="tekstikehys">
           {{ currentTeksti.teksti.slice(0, 28) + "..." }}
          </div>

          <a class="btn btn-outline-dark btn-sm"
            :href="'/tekstit/' + currentTeksti.id"
          >
            Muokkaa
          </a>
        </div>
        <div v-else>
          <br />
          <p>Valitse teksti klikkaamalla</p>
        </div>
      </div>
      <div class="col-md-10">
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

    </div>
  </div>
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";

export default {
  name: "teksti-lista",
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
.nakyma {
  margin: auto;
}

ul {
  list-style-type: none;
  padding: 0;
  border: none;
}

ul li {
  padding: 34px 48px;
  background-image: radial-gradient(ellipse, #ffffcc, #ffffe6, white);
  text-align: center;
}

.active {
  font-weight: bold;
  background-image: radial-gradient(circle, #b3b3b3, #cccccc, white);
}

.btn-sm {
  margin-bottom: 10px;
}

.tekstikehys {
  padding: 10px;
  margin-bottom: 10px;
  color: white;
  background: black;
}

select {
  font-family: Arial;
}
</style>
