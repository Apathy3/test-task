<template>
	<div id="container">
		<HeaderComponent/>
		<div class="filters">
			<select-component :data="filters.type"></select-component>
			<select2-component :data="filters.country"></select2-component>
			<radio-component :data="filters.broadcastType"></radio-component>
			<select-component :data="filters.quality"></select-component>
			<select-component :data="sorting"></select-component>
		</div>
		<main>
			<draggable v-model="items" @end="saveLocal()">
				<transition-group tag="ul" class="list-items" type="transition" name="flip-list">
					<ItemComponent v-for="item in items.slice(0, limitItems)" :key="item.id" :data="item"/>
				</transition-group>
			</draggable>
			<button
				class="show-more"
				@click="showMore()"
				v-if="filteredItems.length > limitItems"
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
	import draggable from "vuedraggable";

	export default {
		name: "app",
		components: {
			ItemComponent,
			HeaderComponent,
			Select2Component,
			RadioComponent,
			SelectComponent,
			draggable
		},
		data() {
			return {
				items: ItemsData,
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
				sorting: {
					name: "Сортировка:",
					value: "По умолчанию",
					options: ["По умолчанию", "Пользовательская", "По алфавиту"]
				},
				limitItems: 9
			};
		},
		watch: {
			filteredItems() {
				this.limitItems = 9;
				this.changeItems(this.filteredItems);
			},
			sorting: {
				deep: true,
				handler(val) {
					switch (val.value) {
						case "По алфавиту":
							this.changeItems(this.alphabetically);
							break;
						case "Пользовательская":
							this.changeItems(this.customSorting());
							break;
						default:
							this.changeItems(this.filteredItems);
							break;
					}
				}
			}
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
			alphabetically() {
				return this.filteredItems.slice().sort((a, b) => {
					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});
			}
		},
		methods: {
			changeItems(payload) {
				this.items = payload;
			},
			showMore() {
				this.limitItems = this.limitItems + 3;
			},
			customSorting() {
				let order = localStorage.itemsIds.split(",").map(function(el) {
					return { id: el };
				});
				let orderObj = order.reduce((a, c, i) => {
					a[c.id] = i;
					return a;
				}, {});
				return this.filteredItems
					.slice()
					.sort((a, b) => orderObj[a.id] - orderObj[b.id]);
			},
			saveLocal() {
				localStorage.itemsIds = this.items.map(element => {
					return element.id.toString();
				});
				this.sorting.value = "Пользовательская";
			}
		},
		created() {
			this.changeItems(this.filteredItems);
		}
	};
</script>

<style lang="scss">
	.flip-list-move {
		transition: transform 0.3s;
	}
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
