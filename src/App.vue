<template>
	<div id="container">
		<HeaderComponent/>
		<div class="filters">
			<select-component :data="filters.type"></select-component>
			<select2-component :data="filters.country"></select2-component>
			<radio-component :data="filters.broadcastType"></radio-component>
			<select-component :data="filters.quality"></select-component>
		</div>
		<main>
			<ul class="list-items">
				<ItemComponent v-for="item in shownItems" :key="item.id" :data="item"/>
			</ul>
			<button
				class="show-more"
				@click="showMore()"
				v-if="filteredItems.length > shownItems.length"
			>Показать еще</button>
			<h2 class="no-items" v-if="!filteredItems.length">Ничего не найдено</h2>
		</main>
	</div>
</template>

<script>
	import "./assets/style/main.scss";
	import ItemComponent from "./components/ItemComponent.vue";
	import ItemsData from "./api/items-data.json";
	import Countries from "./api/countries.json";
	import HeaderComponent from "./components/HeaderComponent.vue";
	import SelectComponent from "./components/SelectComponent.vue";
	import Select2Component from "./components/Select2Component.vue";
	import RadioComponent from "./components/RadioComponent.vue";

	export default {
		name: "app",
		components: {
			ItemComponent,
			HeaderComponent,
			Select2Component,
			RadioComponent,
			SelectComponent
		},
		data() {
			return {
				filters: {
					type: {
						name: "Тип:",
						value: "Все",
						options: [
							"Все",
							"Общественные",
							"Информационные",
							"Развлекательные"
						]
					},
					country: {
						name: "Страна:",
						value: [],
						options: Countries
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
				quantityShownItems: 9
			};
		},
		computed: {
			filteredItems() {
				return ItemsData.filter(item => {
					return (
						(this.filters.type.value === "Все" ||
							this.filters.type.value === item.type) &&
						this.filters.quality.value === item.quality &&
						this.filters.broadcastType.value === item.broadcastType &&
						(!this.filters.country.value.length ||
							this.filters.country.value.includes(item.country))
					);
				});
			},
			shownItems() {
				return this.filteredItems.slice(0, this.quantityShownItems);
			}
		},
		watch: {
			filteredItems: function() {
				this.quantityShownItems = 9;
			}
		},
		methods: {
			showMore() {
				this.quantityShownItems = this.quantityShownItems + 3;
			}
		}
	};
</script>

<style lang="scss">
	.no-items {
		text-align: center;
	}
	.filters {
		height: 80px;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		@media screen and (max-width: 1200px) {
			height: auto;
			padding: 20px 0;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, min-content));
			justify-content: center;
			grid-gap: 20px;
			justify-items: center;
		}
	}
	.list-items {
		display: grid;
		justify-items: center;
		justify-content: center;
		width: 100%;
		grid-template-columns: repeat(3, 1fr);
		padding: 0;
		list-style: none;
		@media screen and (max-width: 900px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media screen and (max-width: 500px) {
			grid-template-columns: 1fr;
		}
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
