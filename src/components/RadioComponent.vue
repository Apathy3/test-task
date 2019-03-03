<template>
	<div class="radio-wrap">
		<label>{{ data.name }}</label>
		<div class="radio-buttons-wrap">
			<button
				v-for="item in data.options"
				:key="item.id"
				@click="selected(item)"
				:class="{active: item === data.value}"
			>{{ item }}</button>
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
		methods: {
			selected(val) {
				this.data.value = val;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.radio-wrap {
		display: flex;
		align-items: center;
		label {
			font-size: 14px;
			color: #888888;
			margin-right: 0.5rem;
			opacity: 0.6;
		}
		.radio-buttons-wrap {
			background: #191919;
			width: 165px;
			height: 35px;
			display: flex;
			align-items: center;
			border-radius: 5px;
			position: relative;
			font-size: 14px;
			color: #888888;
			overflow: hidden;
			button {
				padding: 0 10px;
				width: 50%;
				height: 100%;
				transition: 0.3s ease;
				&.active {
					background: #fdd700;
					color: #000000;
				}
			}
		}
	}
</style>
