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
        <div v-if="valittuTeksti">
          <h5>Valittu teksti:</h5>
          <div class="tekstikehys">
           {{ valittuTeksti.teksti.slice(0, 28) + "..." }}
          </div>

          <a class="btn btn-outline-dark btn-sm"
            :href="'/tekstit/' + valittuTeksti.id"
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
            :class="{ active: index == valittuIndeksi }"
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
  //komponentti, joka näyttää kaikki tekstit, mahdollistaa tekstin valinnan ja tekstien haun teemalla
  name: "teksti-lista",
  components: { SelectValikko },
  data() {
    return {
      tekstit: [],
      valittuTeksti: null,
      valittuIndeksi: -1,
      teema: ""
    };
  },
  methods: {
    //hakee kaikki tekstit
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
    //palauttaa kaikki tekstit näkyviin ja inaktivoi valitun tekstin
    palautaTekstit() {
      this.haeTekstit();
      this.valittuTeksti = null;
      this.valittuIndeksi = -1;
    },
    //asettaa tekstin aktiiviseksi (muokkausta varten)
    setActiveTeksti(teksti, index) {
      this.valittuTeksti = teksti;
      this.valittuIndeksi = index;
    },   
    //asettaa teeman select-valikkovalinnan mukaan
    getTeemaId(id) {
      this.teema = id;
    },
    //hakee samaan teemaan kuuluvat tekstit
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
  //näkymän latautuessa haetaan kaikki tekstit
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
