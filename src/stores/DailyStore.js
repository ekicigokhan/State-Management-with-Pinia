import { defineStore } from "pinia";

export const useDailyStore = defineStore("dailyStore", {
  state: () => ({
    daily: [],
    loading: false,
  }),
  getters: {
    favs: (state) => {
      return state.daily.filter((daily) => daily.isFav);
    },
    favCount() {
      return this.daily.reduce((previous, current) => {
        return current.isFav ? previous + 1 : previous;
      }, 0);
    },
    totalCount: (state) => {
      return state.daily.length;
    },
  },
  actions: {
    async getDaily() {
      this.loading = true;
      const res = await fetch("http://localhost:3000/daily");
      const data = await res.json();
      this.daily = data;
      this.loading = false;
    },
    async newDaily(daily) {
      this.daily.push(daily);

      const res = await fetch("http://localhost:3000/daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(daily),
      }).catch((err) => console.log(err));
    },
    async toggleFav(id) {
      const daily = this.daily.find((daily) => daily.id === id);
      daily.isFav = !daily.isFav;

      const res = await fetch("http://localhost:3000/daily/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFav: daily.isFav }),
      }).catch((err) => console.log(err));
    },
    async deleteDaily(id) {
      this.daily = this.daily.filter((daily) => daily.id !== id);

      const res = await fetch("http://localhost:3000/daily/" + id, {
        method: "DELETE",
      }).catch((err) => console.log(err));
    },
  },
});
