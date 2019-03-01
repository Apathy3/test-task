
<template>
	<div>
		<HeaderComponent/>
		<div class="sorting"></div>
		<main>
			<ul>
				<ItemComponent v-for="item in items" :key="item.id" :data="item"/>
			</ul>
      <button class="load-more">Показать еще</button>
		</main>
	</div>
</template>

<script>
	import "./assets/style/main.scss";
	import ItemComponent from "./components/ItemComponent.vue";
	import ItemsData from "./api/items-data.json";
	import HeaderComponent from "./components/HeaderComponent.vue";

	export default {
		name: "app",
		components: {
			ItemComponent,
			HeaderComponent
		},
		data() {
			return {
			};
    },
    computed: {
      items() {
        return ItemsData.data
      }
    },
	};
</script>

<style lang="scss" scoped>
	.sorting {
    height: 80px;
    margin-bottom: 24px;
	}
  ul {
    max-width: 1350px;
    display: grid;
    justify-items: center;
    justify-content: center;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fill, minmax(320px ,450px));
    padding: 0;
    list-style: none;
  }
  .load-more {
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
    transition: .3s ease;
    &:hover {
      opacity: .7;
    }
  }
</style>
