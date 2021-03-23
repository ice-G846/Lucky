<template>
	<div class="body">
		<register class="content"></register>
	</div>
</template>

<script>
	import Register from '@/components/Register'
	export default{
		name:'Login',
		components:{
			Register
		}
		
	}
</script>

<style scoped="scoped">
	.body{
		width: 100%;
		height:100vh;
		background-image: url(../assets/img/background.png);
		background-attachment: fixed;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
</style>
