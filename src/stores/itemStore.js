// src/stores/itemStore.js or itemStore.ts
import { defineStore } from "pinia";

export const useItemStore = defineStore("item", {
  state: () => ({
    results: [],
    currentPair: [],
    matchCount: 0,
  }),
  actions: {
    registerWin(winnerId) {
      if (winnerId === null) {
        this.results.find(item => item.id === this.currentPair[0].id).score += 0.5;
        this.results.find(item => item.id === this.currentPair[1].id).score += 0.5;
      } else {
        this.results.find(item => item.id === winnerId).score += 1;
      }
      this.matchCount++;
    },
  },
});
