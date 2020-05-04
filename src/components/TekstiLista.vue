<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Hae teeman mukaan"
          v-model="teema"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="etsiTeemalla"
          >
            Hae
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tekstilista</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(teksti, index) in tekstit"
          :key="index"
          @click="setActiveTeksti(teksti, index)"
        >
          {{ teksti.teksti }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentTeksti">
        <h4>Teksti</h4>
        <div>
          <label><strong>Teksti:</strong></label> {{ currentTeksti.teksti }}
        </div>
        <div>
          <label><strong>Teema_id:</strong></label> {{ currentTeksti.teema_id }}
        </div>

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
</template>

<script>
import TekstiDataService from "../services/TekstiDataService";

export default {
  name: "tekstit-lista",
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
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.haeTekstit();
      this.currentTeksti = null;
      this.currentIndex = -1;
    },

    setActiveTeksti(teksti, index) {
      this.currentTeksti = teksti;
      this.currentIndex = index;
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
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
