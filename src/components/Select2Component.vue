<template>
	<div class="select2-wrap" @click="open()" ref="select2Wrap">
		<label>{{ data.name }}</label>
		<div class="select2">
			<input v-if="opened" type="text" placeholder="Поиск" v-focus v-model="search">
			<div v-if="!opened" class="value">{{ stringVal }}</div>
			<div class="dropdown" v-if="opened">
				<div class="no-items" v-if="!filteredOptions.length">Ничего не найдено</div>
				<perfect-scrollbar tag="ul" v-if="filteredOptions.length" class="options">
					<li
						v-for="item in filteredOptions"
						:key="item.id"
						@click="toggleSelected(item)"
						:class="{checked: activityCheck(item)}"
					>
						<div class="checkbox"></div>
						{{ item }}
					</li>
				</perfect-scrollbar>
				<button v-if="this.data.value.length" class="reset" @click="reset()">Очистить</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { PerfectScrollbar } from "vue2-perfect-scrollbar";
	export default {
		components: {
			PerfectScrollbar
		},
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {
				search: "",
				opened: false
			};
		},
		directives: {
			focus: {
				inserted: function(el) {
					el.focus();
				}
			}
		},
		methods: {
			open() {
				this.opened = true;
			},
			toggleSelected(val) {
				if (this.data.value.includes(val)) {
					this.data.value.splice(this.data.value.indexOf(val), 1);
				} else {
					this.data.value.push(val);
				}
			},
			documentClick(e) {
				let el = this.$refs.select2Wrap;
				let target = e.target;
				if (el !== target && !el.contains(target)) {
					this.search = "";
					this.opened = false;
				}
			},
			activityCheck(item) {
				return this.data.value.includes(item);
			},
			reset() {
				this.data.value = [];
			}
		},
		computed: {
			filteredOptions() {
				return this.data.options.filter(item => {
					return item.toLowerCase().includes(this.search.toLowerCase());
				});
			},
			stringVal() {
				if (!this.data.value.length) {
					return "Не выбрано";
				} else {
					return this.data.value
						.toString()
						.slice(0, 20)
						.concat("...");
				}
			}
		},
		mounted() {
			document.addEventListener("click", this.documentClick);
		},
		destroyed() {
			document.removeEventListener("click", this.documentClick);
		}
	};
</script>


<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"></style>
<style lang="scss" scoped>
	.select2-wrap {
		display: flex;
		align-items: center;
		label {
			font-size: 14px;
			color: #888888;
			margin-right: 0.5rem;
			opacity: 0.6;
		}
		.select2 {
			background: #191919;
			width: 215px;
			height: 35px;
			display: flex;
			align-items: center;
			padding: 0 10px;
			border-radius: 5px;
			position: relative;
			font-size: 14px;
			cursor: pointer;
			color: #888888;
			&:before {
				content: "";
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto;
				right: 15px;
				background: url(../assets/images/arrow.png) center center no-repeat;
				width: 10px;
				height: 6px;
			}
			input {
				width: 100%;
				height: 100%;
				background: transparent;
				border: none;
				border-bottom: 1px solid #000;
				z-index: 5;
			}
			.dropdown {
				position: absolute;
				top: calc(100% - 3px);
				width: 100%;
				z-index: 4;
				left: 0;
				border-radius: 0 0 5px 5px;
				overflow: hidden;
				padding: 20px 5px;
				background: #191919;
				&:before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					background: url(../assets/images/decor-line.png) center center
						no-repeat;
					width: 100%;
					height: 19px;
				}
			}
			.no-items {
				padding: 0 5px;
			}
			ul {
				width: 100%;
				margin: 0;
				list-style: none;
				cursor: pointer;
				padding: 0;
				max-height: 145px;
				overflow: hidden;
				overflow-y: auto;
				border-bottom: 1px solid #000;
				li {
					padding: 10px;
					height: 36px;
					display: flex;
					align-items: center;
					transition: 0.3s ease;
					white-space: nowrap;
					overflow: hidden;
					&:hover {
						background: #fdd700;
						color: #000000;
					}
					&.checked .checkbox:before {
						opacity: 1;
					}
					.checkbox {
						margin-right: 10px;
						width: 14px;
						height: 14px;
						border: 1px solid #3e3e3e;
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						background: #000;
						flex: none;
						&:before {
							content: "";
							width: 4px;
							height: 4px;
							background: #fdd700;
							opacity: 0;
							transition: 0.3s ease;
						}
					}
				}
			}
			.reset {
				width: 110px;
				height: 30px;
				border-radius: 5px;
				background: #fdd700;
				color: #000;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 10px auto 0;
			}
		}
	}
</style>
