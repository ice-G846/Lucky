<template>
	<div class="content">
		 <p>中奖名单</p>
		 <list class="list"></list>
	</div>
</template>

<script>
	import List from '@/components/list'
	export default {
		name:'Home',
		components:{
			List
		}
	}
</script>

<style scoped="scoped">
	p{
		text-align: center;
		font-size: 22px;
		color: white;
		display: block;
		padding: 10px 0;
		background-color: #f7a13e;
		box-shadow: 0px 3px 10px rgba(10,10,10,.2);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
	}
	
</style>
