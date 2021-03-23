<template>
	<div class="body">
		<div class="list">
			<router-link to="/home" class="back">
				<el-button class="btn">返回抽奖页面</el-button>
			</router-link>
		  <el-table class="table" :data="this.winList" border 
			:header-cell-style="{background:'#fff07b',color:'#606266'}"
			height="350">
		    <el-table-column prop="name" label="姓名" width="80"></el-table-column>
		    <el-table-column prop="telephone" label="电话" width="115"></el-table-column>
		    <el-table-column prop="theWin" label="奖品"></el-table-column>
		  </el-table>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name:'list',
  computed:{
    ...mapState(['winList'])
  }
};
</script>

<style scoped="scoped">
	.body{
		height: calc(100vh - 59px);
		background-image: url(../assets/img/background.png);
		background-attachment: fixed;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
	.list{
		padding: 39px 0 20px 0;
	}
	
	.back{
		float: right;
		margin-bottom: 10px;
		margin-right: 20px;
	}
	
	.btn{
		color: white;
		background: #f98817;
		box-shadow: 1px 1px 4px rgba(0,0,0,.2);
		border: 0px;
	}
	
	.table{
		width: 90%;
		margin: 0 auto;
		border:0;
		box-shadow: 1px 1px 4px rgba(0,0,0,.2);
		border-radius: 10px;
	}
</style>
