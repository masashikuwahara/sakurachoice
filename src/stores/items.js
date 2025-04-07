import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [], // すべてのアイテム
    currentPair: [], // 現在の対戦カード
    results: [], // 勝敗結果を保存
    matchCount: 0, // 試合回数
    history: [], // 追加: 過去の対戦履歴
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await fetch("/items.json");
        this.items = await response.json();
        this.initTournament(); // データ取得後にトーナメントをセット
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    },
    initTournament() {
      this.results = this.items.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        score: 0, // 初期スコア
      }));
      this.matchCount = 0;
      this.history = []; // 過去の試合履歴をリセット

      this.maxMatches = Math.floor(Math.log2(this.items.length) * 11); // 試合回数を計算
      this.nextMatch();
    },
    nextMatch() {
      if (this.matchCount >= Math.floor(Math.log2(this.items.length) * 11)) return;
      const availablePairs = [];
      // すべてのアイテムの組み合わせを作る
      for (let i = 0; i < this.results.length; i++) { 
        for (let j = i + 1; j < this.results.length; j++) {
          const pair = [this.results[i], this.results[j]];
          const pairKey = `${pair[0].id}-${pair[1].id}`;
          // まだ対戦していないペアのみ追加
          if (!this.history.includes(pairKey)) {
            availablePairs.push(pair);
          }
        }
      }
      if (availablePairs.length === 0) {
        console.log("試合終了");
        return;
      }
    
      // ランダムに未対戦ペアを選ぶ
      const randomPair = availablePairs[Math.floor(Math.random() * availablePairs.length)];
      this.currentPair = randomPair;
    
      // 対戦履歴に追加
      this.history.push(`${randomPair[0].id}-${randomPair[1].id}`);
    },
    registerWin(winnerId) {
      const [a, b] = this.currentPair;
      if (winnerId === null) {
        this.results.find(item => item.id === a.id).score += 0.5;
        this.results.find(item => item.id === b.id).score += 0.5;
      } else {
        this.results.find(item => item.id === winnerId).score += 1;
      }
    
      this.matchCount++;
      this.nextMatch();
    }    
  },
});
