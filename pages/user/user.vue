<template>
	<view class="user">
		<view class="header">
			<view class="account-number">
				<view v-if="!msg" class="logn-register">
					<view class="logn" @click="toLognRegister('logn')">登录</view>
					<view class="register" @click="toLognRegister('register')">注册</view>
				</view>
				<view v-else class="user-info">
					<image :src="user.user_picture" mode="头像"></image>
					<view class="name">
						{{user.user_name}}
					</view>
				</view>
			</view>
			<view class="check-in-days">
				<view class="left">
					<view class="number">
						{{number.clock_days}}
					</view>
					<view class="desc">
						已连续打卡
					</view>
				</view>
				<view class="center">
					<view class="number">
						{{number.bill_counts}}
					</view>
					<view class="desc">
						总记账天数
					</view>
				</view>
				<view class="right">
					<view class="number">
						{{number.bill_days}}
					</view>
					<view class="desc">
						总记账笔数
					</view>
				</view>
			</view>
		</view>
		<view class="menu-list">
			<view
				class="list"
				v-for="(item, index) in menuList"
				:key="index">
				<view class="left">
					<image class="img" :src="item.url" :mode="item.desc"></image>
					<view class="desc">
						{{item.desc}}
					</view>
				</view>
				<image class="right" src="../../static/icon/right.png" mode="右移"></image>
			</view>
		</view>
		<view class="share-it">
			<button class="button">推荐鲨鱼记账给好友</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const dates = new Date()
			const year = dates.getFullYear()
			const month = dates.getMonth() + 1
			const day = dates.getDate()
			return {
				year,
				month,
				day,
				token: '',
				user: {},
				number: {},
				menuList:[
					{
						url: require('../../static/icon/6.png'),
						desc: '消息'
					}, {
						url: require('../../static/icon/7.png'),
						desc: '我的微章'
					}, {
						url: require('../../static/icon/8.png'),
						desc: '我的积分'
					}, {
						url: require('../../static/icon/9.png'),
						desc: '邀请好友'
					}, {
						url: require('../../static/icon/10.png'),
						desc: '设置'
					}
				]
			}
		},
		onLoad () {
		},
		onShow () {
			this.user = this.$store.state.user
			this.token = this.$store.state.token
			this.initUser()
		},
		computed: {
			msg () {
				return this.$store.state.msg
			}
		},
		methods: {
			initUser () {
				var timestamp = Math.round(new Date().getTime()/1000).toString()
				if (this.user.user_id) {
					uni.request({
						url: 'http://106.55.25.207/user/user_center',
						data: {
							user_id: this.user.user_id,
							token: this.token,
							time: timestamp
						},
						method: 'POST',
						success: (res) => {
							this.number = res.data.data
						}
					})
				}
			},
			toLognRegister (e) {
				this.$store.dispatch('lognRegister', e)
				uni.navigateTo({
					url: '/pages/lognRegister/lognRegister'
				})
			}
		}
	}
</script>

<style lang="scss">
.user {
	width: 100vw;
	height: 100vh;
	background: #f4f5f5;
	.header {
		height: 350rpx;
		background: #ffcc00;
		.account-number {
			height: 200rpx;
			.logn-register {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 200rpx;
				.logn, .register {
					width: 150rpx;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 30rpx;
					text-align: center;
					background: #fff;
					color: #000;
					border-radius: 15rpx;
				}
				.register {
					margin-left: 40rpx;
				}
			}
			.user-info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 200rpx;
				image {
					margin-top: 25rpx;
					width: 100rpx;
					height: 100rpx;
				}
				.name {
					margin-top: 15rpx;
					font-size: 40rpx;
				}
			}
		}
		.check-in-days {
			display: flex;
			flex-direction: flex;
			justify-content: space-around;
			align-items: center;
			height: 150rpx;
			.left, .center, .right {
				width: 150rpx;
				height: 100rpx;
				color: #000;
				text-align: center;
			}
		}
	}
	.menu-list {
		margin-top: 30rpx;
		.list {
			display: flex;
			flex-direction: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 5rpx;
			height: 100rpx;
			background: #fff;
			.left {
				display: flex;
				flex-direction: flex;
				align-items: center;
				margin-left: 25rpx;
				.img {
					width: 50rpx;
					height: 50rpx;
				}
				.desc {
					margin-left: 30rpx;
					font-size: 35rpx;
				}
			}
			.right {
				margin-right: 25rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.share-it {
		margin: 50rpx 150rpx 0 150rpx;
		.button {
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 15rpx;
			font-size: 35rpx;
			background: #FF3333;
			color: #fff;
		}
	}
}
</style>
