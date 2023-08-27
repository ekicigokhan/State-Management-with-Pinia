<template>
  <header>
    <div class="container">
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo" title="Pinia Logo" />
      <h1>Kişisel Günlüğüm</h1>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="data-area">
        <p v-if="filter === 'favs'">
          Favorilere eklenen günlük sayısı : {{ dailyStore.favCount }}
        </p>
        <p v-if="filter === 'all'">
          Toplam Günlük sayısı : {{ dailyStore.totalCount }}
        </p>
        <button @click="filter = 'all'">Günlüklerim</button>
        <button @click="filter = 'favs'">Favoriler</button>
      </div>

      <new-daily></new-daily>

      <div
        class="dailyList"
        v-for="daily in dailyStore.daily"
        :key="daily.id"
        v-if="filter === 'all'"
      >
        <daily-details :daily="daily"></daily-details>
      </div>

      <div
        class="dailyList"
        v-for="daily in dailyStore.favs"
        :key="daily.id"
        v-if="filter === 'favs'"
      >
        <daily-details :daily="daily"></daily-details>
      </div>
    </div>
  </main>
</template>

<script>
import { useDailyStore } from "./stores/DailyStore";
import DailyDetails from "./components/DailyDetails.vue";
import { ref } from "vue";
import NewDaily from "./components/NewDaily.vue";
export default {
  components: {
    "daily-details": DailyDetails,
    "new-daily": NewDaily,
  },
  setup() {
    //Compusition API içerisinde tanımlamak istediğimiz öğeleri tanımlayabiliyoruz.
    const dailyStore = useDailyStore();
    const filter = ref("all");
    dailyStore.getDaily();
    return { dailyStore, filter };
  },
};
</script>
