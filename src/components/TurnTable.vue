<template>
	<div>
		<div class="turn-table">
			<div id="box" class="box">
				<div ref="outer" class="outer KinerLottery KinerLotteryContent">
					<img src="../../static/Images/轮盘2.png" />
				</div>
				<div class="inner KinerLotteryBtn start" @click="start"></div>
			</div>
		</div>

		<div class="users">
			<div class="user-item">
				当前用户：
				<span>{{user.name}}</span>
			</div>
			<div class="user-item">
				抽奖资格剩余：<b>{{ drawnumber }}</b>
			</div>
			<el-button class="btn" @click="Obtain">获取抽奖资格</el-button>
			<router-link to="/awardlist">
				<el-button class="btn">查看抽奖结果</el-button>
			</router-link>
		</div>
	</div>

</template>

<script>
	const axios = require('axios');
	let that = this;
	export default {
		name: 'TurnTable',
		computed: {
			Win: function() {
				this.w = 360 - (this.deg1 % 360);
				if ((this.w > 0 && this.w <= 30) || (this.w >= 330 && this.w <= 360) || (this.w >= 150 && this.w <= 210)) {
					return '谢谢参与！';
				} else if (this.w > 30 && this.w <= 90) {
					return '恭喜你！获得了5元话费！';
				} else if (this.w > 90 && this.w < 150) {
					return '恭喜你！获得了50元话费！';
				} else if (this.w > 210 && this.w <= 270) {
					return '恭喜你！获得了100元话费！';
				} else if (this.w > 270 && this.w < 330) {
					return '恭喜你！获得了20元话费！';
				}
			}
		},
		data() {
			return {
				w: 0,
				drawnumber: 1, //抽奖资格次数
				ising: true, //抽奖活动是否开启
				turnnumber: 5, //每次抽奖转盘转动的圈数
				turndeg: 0, //每次抽奖旋转的角度
				deg1: 0, //抽奖的转动之后的位置
				deg: 0,
				odds: 0,
				user: {}
			};
		},
		created() {
			this.user = this.$store.state.userMsg
			axios({
				url: 'http://118.190.134.211:3000/webapp/msg/getChance',
				method: 'get'
			}).then(res => {
				that.odds = res.data.webapp_chance;
				console.log("当前中奖率为" + that.odds + "%");
			})
		},
		mounted() {
			if (this.user.name == undefined) {
				this.$router.replace('/')
			}
		},
		methods: {
			start: function() {
				if (this.ising == true) {
					// console.log('kkk');
					var chance = Math.floor((Math.random() * 100) + 1);
					//console.log(chance);
					//谢谢参与的区间
					var sec1 = Math.floor((Math.random() * 30) + 1);
					var sec2 = Math.floor((Math.random() * (210 - 150) + 1) + 150);
					var sec3 = Math.floor((Math.random() * (360 - 330) + 1) + 330);
					//中奖的区间
					var sec4 = Math.floor((Math.random() * (150 - 30) + 1) + 30);
					var sec5 = Math.floor((Math.random() * (330 - 210) + 1) + 210);

					var num1 = Math.floor((Math.random() * 8) + 1);
					if (chance > 0 && chance <= 100 - that.odds) {
						if (num1 > 0 && num1 <= 2) {
							this.deg1 = this.turnnumber * 360 + sec1;
						} else if (num1 > 2 && num1 <= 6) {
							this.deg1 = this.turnnumber * 360 + sec2;
						} else {
							this.deg1 = this.turnnumber * 360 + sec3;
						}
					} else {
						if (num1 > 0 && num1 <= 4) {
							this.deg1 = this.turnnumber * 360 + sec4;
						} else {
							this.deg1 = this.turnnumber * 360 + sec5;
						}
					}
					// this.turndeg = Math.floor(Math.random() * 360);
					// this.deg1 = this.turndeg + this.turnnumber * 360 + this.deg1;
					if (this.ising === true && this.drawnumber > 0) {
						this.$refs.outer.style = '-webkit-transition: all 5s;transition: all 5s;-webkit-transform: rotate(' + this.deg1 +
							'deg);transform: rotate(' + this.deg1 + 'deg);';
						this.drawnumber--;
						//let Len = this.$store.state.winList.length + 1;
						this.$store.commit('addWin', {
							type: 'string',
							//id: Len,
							win: this.Win,
							telephone: this.user.tel,
							name: this.user.name
						});
						this.ising = false;
						//console.log(that.odds);
					} else if (this.ising !== false) {
						this.$alert('您的抽奖资格已经用完咯!', '提示', {
							confirmButtonText: '确定'
						});
						return;
					}
					window.setTimeout(() => {
						this.end();
					}, 5000);
				}
			},
			end: function() {
				var a = this.Win.w;
				this.$alert(this.Win, '抽奖结果', {
					confirmButtonText: '确定',
					callback: action => {
						this.$refs.outer.style = '-webkit-transition: all 0s;transition: all 0s;-webkit-transform: rotate(' + a +
							'deg);transform: rotate(' + a + 'deg);';
						this.deg1 = 0;
						this.ising = true;
						this.$store.dispatch('setMark');
					}
				});
			},
			Obtain: function() {
				this.drawnumber += 5;
			}
		}
	};
</script>

<style scoped="scoped">
	.turn-table {
		height: 300px;
		width: 300px;
		margin: 0 auto;
		margin-top: 45px;
	}

	.box {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
	}

	.box .outer {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1;
		transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-o-transform: rotate(0deg);
	}

	.box .outer img {
		width: 100%;
	}

	.box .inner {
		position: relative;
		width: 100px;
		height: 100px;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		z-index: 2;
		background-image: url(../../static/Images/arrow.png);
		background-size: auto 100px;
		background-repeat: no-repeat;
	}

	.box .inner.start:active {
		-webkit-transform: translate(-50%, -50%) scale(0.95);
		-moz-transform: translate(-50%, -50%) scale(0.95);
		-ms-transform: translate(-50%, -50%) scale(0.95);
		-o-transform: translate(-50%, -50%) scale(0.95);
		transform: translate(-50%, -50%) scale(0.95);
	}

	.box .inner.start {
		background-position: 0 0;
	}

	.box .inner.no-start {
		background-position: -5rem 0;
	}

	.box .inner.completed {
		background-position: -10rem 0;
	}

	select {
		height: 30px;
	}

	.users {
		text-align: center;
		position: fixed;
		padding-bottom: 20px;
		bottom: 0px;
		left: 0;
		right: 0;
		background-color: rgba(247, 243, 217, 0.8);
	}

	.user-item {
		font-size: 20px;
		margin: 15px 0;
	}

	b {
		color: orangered;
	}

	.btn {
		color: white;
		background: #f98817;
	}
</style>
