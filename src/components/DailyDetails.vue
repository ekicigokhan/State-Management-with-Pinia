<template>
  <div class="box">
    <div>
      <p>{{ daily.daily }}</p>
      <small class="date">{{ daily.date }}</small>
    </div>
    <div>
      <i
        class="material-icons"
        :class="{ active: daily.isFav }"
        @click="dailyStore.toggleFav(daily.id)"
        >favorite</i
      >
      <i class="material-icons" @click="dailyStore.deleteDaily(daily.id)"
        >delete</i
      >
    </div>
  </div>
</template>

<script>
import { useDailyStore } from "../stores/DailyStore";

export default {
  props: ["daily"],
  setup() {
    const dailyStore = useDailyStore();
    return { dailyStore };
  },
};
</script>