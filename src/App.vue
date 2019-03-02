<template>
  <div>
    <HeaderComponent/>
    <div class="filters">
      <select-component :props="filters.type"></select-component>
      <radio-component :props="filters.broadcastType"></radio-component>
      <select-component :props="filters.quality"></select-component>
    </div>
    <main>
      <ul>
        <ItemComponent v-for="item in shownItems" :key="item.id" :data="item"/>
      </ul>
      <button class="show-more" @click="showMore()" v-if="shownItems.length > filteredItems.length">Показать еще</button>
      <h2 v-if="filteredItems.length < 1">Ничего не найдено</h2>
    </main>
  </div>
</template>

<script>
import "./assets/style/main.scss";
import ItemComponent from "./components/ItemComponent.vue";
import ItemsData from "./api/items-data.json";
import HeaderComponent from "./components/HeaderComponent.vue";
import SelectComponent from "./components/SelectComponent.vue";
import RadioComponent from "./components/RadioComponent.vue";

export default {
  name: "app",
  components: {
    ItemComponent,
    HeaderComponent,
    RadioComponent,
    SelectComponent
  },
  data() {
    return {
      filters: {
        type: {
          name: "Тип:",
          value: "Все",
          options: ["Все", "Общественные", "Информационные", "Развлекательные"]
        },
        broadcastType: {
          name: "Тип вещания:",
          value: "Cпутник",
          options: ["Cпутник", "Антенна"]
        },
        quality: {
          name: "Качество:",
          value: "Высокое",
          options: ["Высокое", "Среднее", "HD"]
        }
      },
      quantity: 9
    };
  },
  computed: {
    // items() {
    //   return ItemsData.data
    //     .filter(item => {
    //       return (
    //         (this.filters.type.value === "Все" ||
    //           this.filters.type.value === item.type) &&
    //         (this.filters.quality.value === item.quality) &&
    //         (this.filters.broadcastType.value === item.broadcastType)
    //       );
    //     })
    //     .slice(0, this.quantity);
    // },
    filteredItems() {
      return ItemsData.data.filter(item => {
        return (
          (this.filters.type.value === "Все" ||
            this.filters.type.value === item.type) &&
          this.filters.quality.value === item.quality &&
          this.filters.broadcastType.value === item.broadcastType
        );
      });
    },
    shownItems() {
      return this.filteredItems.slice(0, this.quantity);
    }
  },
  methods: {
    showMore() {
      this.quantity = this.quantity + 3;
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
.filters {
  height: 80px;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
ul {
  display: grid;
  justify-items: center;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  padding: 0;
  list-style: none;
}
.show-more {
  margin: 50px auto;
  width: 160px;
  height: 40px;
  border-radius: 2px;
  background: #fdd700;
  text-transform: uppercase;
  color: #000;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
}
</style>
