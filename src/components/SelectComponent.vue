<template>
	<div class="select-wrap" @click="toggleDropdown()" ref="selectWrap">
		<label>{{ data.name }}</label>
		<div class="select">
			<div class="value">{{ data.value }}</div>
			<div class="dropdown" v-if="opened">
				<ul class="options">
					<li v-for="item in data.options" :key="item.id" @click="selected(item)">{{ item }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {
				opened: false
			};
		},
		methods: {
			toggleDropdown() {
				this.opened = !this.opened;
			},
			selected(val) {
				this.data.value = val;
			},
			documentClick(e) {
				let el = this.$refs.selectWrap;
				let target = e.target;
				if (el !== target && !el.contains(target)) {
					this.opened = false;
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

<style lang="scss" scoped>
	.select-wrap {
		display: flex;
		align-items: center;
		label {
			font-size: 14px;
			color: #888888;
			margin-right: 0.5rem;
			opacity: 0.6;
		}
		.select {
			background: #191919;
			width: 175px;
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
			.dropdown {
				position: absolute;
				top: calc(100% - 5px);
				width: 100%;
				z-index: 4;
				left: 0;
				border-radius: 0 0 5px 5px;
				overflow: hidden;
				background: #191919;
			}
			ul {
				width: 100%;
				list-style: none;
				cursor: pointer;
				padding: 5px 0 0;
				margin: 0;
				overflow: hidden;
				li {
					padding: 10px;
					height: 36px;
					display: flex;
					align-items: center;
					transition: 0.3s ease;
					&:hover {
						background: #fdd700;
						color: #000000;
					}
				}
			}
		}
	}
</style>
