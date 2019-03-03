<template>
	<header>
		<div class="img-wrap">
			<img src="../assets/images/logo.png" alt class="logo">
		</div>
		<h2>официальный дистрибьютор Fox International Channels в России</h2>
		<nav>
			<a href>Телеканалы</a>
			<a href>Mаркетинг</a>
			<a href>Контакты</a>
		</nav>
	</header>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped>
	header {
		height: 70px;
		width: 100%;
		display: grid;
		align-items: center;
		grid-template-columns: minmax(90px, 10vw) 2fr 1fr;
		@media screen and (max-width: 1200px) {
			font-size: 1vw;
		}
		@media screen and (max-width: 900px) {
			grid-template-columns: 1fr;
			justify-content: center;
			justify-items: center;
			height: auto;
			padding: 20px;
			text-align: center;
			grid-gap: 20px;
			font-size: 16px;
		}
	}
	.img-wrap {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			max-width: 100%;
		}
	}
	h2 {
		color: #fff;
		opacity: 0.6;
		font-size: 1.125em;
		margin: 0;
	}
	nav {
		display: flex;
		font-weight: 500;
		color: #fff;
		justify-content: flex-end;
		padding-right: 1vw;
		font-size: 1.25em;
		@media screen and (max-width: 900px) {
			padding-right: 0;
			flex-wrap: wrap;
			justify-content: center;
		}
		a {
			opacity: 1;
			transition: 0.3s ease;
			padding: 0 2vw;
			@media screen and (max-width: 900px) {
				padding: 1vw 2vw;
			}
			&:hover {
				opacity: 0.7;
			}
		}
	}
</style>

