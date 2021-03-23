<template>
	<div class="content">
		<h1 class="display-h1" align="center">抽奖大转盘</h1>
		<div class="form">
			<p class="user-msg">用户信息</p>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="65px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="tel">
					<el-input v-model.number="ruleForm.tel"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var checkTel = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				}
				setTimeout(() => {
					if (!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if (!(/^1[123456789]\d{9}$/.test(value))) {
							callback(new Error('必须是1开头且是11位数字'));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			var checkName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			};
			return {
				userMsg: {
					tel: '',
					name: ''
				},
				ruleForm: {
					tel: '',
					name: ''
				},
				rules: {
					tel: [{
						validator: checkTel,
						trigger: 'blur'
					}],
					name: [{
						validator: checkName,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.userMsg.tel = this.ruleForm.tel;
						this.userMsg.name = this.ruleForm.name;
						this.$store.commit('addUserMsg',this.userMsg);
						this.$router.push('/home')
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped="scoped">
	.content {
		width: calc(100%-2px);
		height: calc(100vh-2px);
		border: 1px solid rgba(0, 0, 0, 0);
	}

	.form {
		padding: 20px 10px;
		width: 80%;
		height: 200px;
		margin: 0 auto;
		margin-top: 10vh;
		background-color: rgba(250, 250, 250, 0.6);
		border-radius: 10px;
		padding-right: 20px;
	}
	
	.display-h1{
		font-size: 8vh;
		margin-top: 10vh;
		font-weight: 400;
		color: #ff5411;
		opacity: .8;
	}
	
	.user-msg{
		display: block;
		height: 40px;
		font-size: 20px;
		margin-left: 40px;
		color: #4b4b4b;
		margin-left: 0px;
		text-align: center;
	}
</style>
