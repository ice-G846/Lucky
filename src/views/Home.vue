<template>
	<div class="content">
		 <p>幸运大转盘</p>
		<turn-table></turn-table>
	</div>
</template>

<script>
	import TurnTable from '@/components/TurnTable'
	export default {
		name:'Home',
		components:{
			TurnTable
		}
	}
</script>

<style scoped="scoped">
	*{
		margin: 0;
		padding: 0;
	}
	
	.content{
		width: 100%;
		height:100vh;
		background-image: url(../assets/img/background.png);
		background-attachment: fixed;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
	
	p{
		text-align: center;
		font-size: 22px;
		color: white;
		display: block;
		padding: 10px 0;
		background-color: #f7a13e;
		box-shadow: 0px 3px 10px rgba(10,10,10,.2);
	}
</style>
