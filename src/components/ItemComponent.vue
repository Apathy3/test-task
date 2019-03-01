<template>
	<li>
		<img :src="data.image" alt>
		<div class="hover-block"></div>
	</li>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object
			}
		}
	};
</script>

<style lang="scss" scoped>
	li {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
    position: relative;
    cursor: pointer;
		&:hover {
			.hover-block {
				opacity: 1;
			}
		}
	}
	img {
		max-width: 100%;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	.hover-block {
		opacity: 0;
		transition: 0.3s ease;
		background: rgba(35, 107, 174, 0.815);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		&:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 95%;
      height: 95%;
			border: 2px solid #fff;
		}
		&:after {
			content: "Подробнее";
			width: 170px;
			height: 60px;
			border: 2px solid #fff;
			display: flex;
			align-items: center;
      justify-content: center;
		}
	}
</style>
