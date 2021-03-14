<template>
	<view class="logn-register">
		<view class="title">
			{{lognRegister === 'logn'?'登录':'注册'}}
		</view>
		<view class="logn">
			<form class="form">
				<view class="uni-form-item uni-column">
					<input
						class="uni-input"
						name="input"
						v-model="info.user"
						placeholder="用户名" />
					<input
						class="uni-input password"
						name="input"
						v-model="info.password"
						placeholder="密码" />
				</view>
				<view class="verification">
					<input
						class="verification-desc"
						name="input"
						v-model="info.code"
						placeholder="验证码" />
					<image
						class="verification-img"
						:src="codeImg"
						mode="图案文件"
						@click="getCodeImg">
					</image>
				</view>
				<view class="uni-btn-v">
					<button v-if="lognRegister === 'logn'" class="button" @click="PostLognRegister">登录</button>
					<button v-else class="button" @click="PostLognRegister">注册</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeImg: '',
				info: {
					user: '',
					password: '',
					code: ''
				}
			}
		},
		onShow () {
			this.getCodeImg()
		},
		computed: {
			lognRegister () {
				return this.$store.state.lognRegister
			}
		},
		methods: {
			getCodeImg () {
				uni.request({
				    url: 'http://106.55.25.207/user/verify',
					method: 'POST',
				    success: (res) => {
						this.codeImg = 'http://106.55.25.207/user/verify'
				    }
				})
			},
			PostLognRegister () {
				var timestamp = Math.round(new Date().getTime()/1000).toString()
				if (this.lognRegister === 'logn') {
					uni.request({
					    url: 'http://106.55.25.207/user',
						data: {
							user_name: this.info.user,
							password: this.info.password,
							code: this.info.code,
							time: timestamp,
						},
						method: 'POST',
					    success: (res) => {
							if (res.data.code === 200) {
								this.$store.commit('userInfo', res.data.data)
								this.$store.commit('msg', true)
								uni.switchTab({
									url: '/pages/user/user'
								})
							} else {
								uni.showToast({
									title: res.data.msg,
									duration: 2000,
									mask: true
								})
							}
					    }
					})
				} else {
					uni.request({
					    url: 'http://106.55.25.207/user/register',
						method: 'POST',
						// header: {
						//       "content-type":"application/x-www-form-urlencoded"
						// },
						data: {
							user_name: this.info.user,
							password: this.info.password,
							code: this.info.code,
							time: timestamp,
						},
					    success: (res) => {
							console.log(res)
							const val = 'logn'
							if (res.data.code === 200) {
								this.$store.dispatch('lognRegister', val)
							} else {
								uni.showToast({
									title: res.data.msg,
									duration: 2000,
									mask: true
								})
							}
					    }
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.logn-register {
	height: 100vh;
	width: 100vw;
	.title {
		margin-top: 15rpx;
		padding: 0 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 45rpx;
		color: #000;
		font-weight: 500;
	}
	.logn,.register {
		padding: 15rpx 0;
		.form {
			.uni-input {
				margin: 0 15rpx;
				height: 60rpx;
				font-size: 30rpx;
				border-radius: 10rpx;
				background: #f4f5f5;
			}
			.password {
				margin-top: 10rpx;
			}
			.verification {
				display: flex;
				flex-direction: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 15rpx 30rpx;
				height: 60rpx;
				.verification-desc {
					padding: 10rpx 20rpx;
					width: 50%;
					font-size: 30rpx;
					background: #f4f5f5;
				}
				.verification-img {
					width: 40%;
					margin-left: 30rpx;
					height: 80rpx;
				}
			}
			.uni-btn-v {
				.button {
					margin: 0 15rpx;
					background: #409EFF;
					border-radius: 20rpx;
				}
			}
		}
	}
}
</style>
