<template>
  <div class="nakyma">
    <div class="row">
      <div class="col-md-6">
        <div class="input-group mb-3">
          <select-valikko @get-teema="getTeemaId"></select-valikko>
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
import SelectValikko from "./SelectValikko"

export default {
  name: "teksti-lista",
  components: { SelectValikko },
  data() {
    return {
      tekstit: [],
      currentTeksti: null,
      currentIndex: -1,
      teema: ""
    };
  },
  methods: {
    haeTekstit() {
      TekstiDataService.getAll()
        .then(response => {
          this.tekstit = response.data;
          console.log("Tekstit: ", response.data);
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

    getTeemaId(id) {
      this.teema = id;
    },

    etsiTeemalla() {
      TekstiDataService.findByTeema(this.teema)
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

</style>
