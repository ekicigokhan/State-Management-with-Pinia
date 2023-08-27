<template>
  <form @submit.prevent="sendForm">
    <!--Sayfa güncellenmeden işi yapar.-->
    <div class="box">
      <div class="form-group">
        <textarea
          v-model="newDaily"
          placeholder="Bugün neler oldu, haydi anlat..."
        ></textarea>
        <button>Günlüklerime Kaydet</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useDailyStore } from "../stores/DailyStore";

export default {
  setup() {
    const dailyStore = useDailyStore();
    const newDaily = ref("");

    const currentDate = () => {
      const current = new Date();
      const date =
        current.getDate() +
        "." +
        (current.getMonth() + 1) +
        "." +
        current.getFullYear();
      return date;
    };
    const sendForm = () => {
      if (newDaily.value.length > 0) {
        dailyStore.newDaily({
          id: dailyStore.daily.length + 1,
          daily: newDaily.value,
          date: currentDate(),
          isFav: false,
        });
        newDaily.value = "";
      }
    };
    return { sendForm, newDaily };
  },
};
</script>