<template>
	<view class="user">
		<view class="header">
			<view class="user-info">
				<view class="info">
					<image class="img" src="../../static/img/sign2.jpg"></image>
					<view class="name">鲨鱼用户</view>
				</view>
				<view class="clock-in">
					<image class="img" src="../../static/icon/clock.png"></image>
					<view class="desc">打卡</view>
				</view>
			</view>
			<view class="sum">
				<view class="clock-number">
					<view class="number">0</view>
					<view class="desc">已连续打卡</view>
				</view>
				<view class="all-date">
					<view class="number">0</view>
					<view class="desc">记账总天数</view>
				</view>
				<view class="all-unlined">
					<view class="number">0</view>
					<view class="desc">记账总笔数</view>
				</view>
			</view>
			<view class="member">
				<view class="member-info">
					<image src="../../static/icon/member.png"></image>
					<view class="desc">升级为会员</view>
				</view>
				<image class="img" src="../../static/icon/right.png"></image>
			</view>
		</view>
		<view class="nav">
			<view class="nav-list" v-for="(item, index) in navList" :key="index">
				<image class="nav-img" :src="item.url"></image>
				<view class="nav-desc">{{item.desc}}</view>
			</view>
		</view>
		<view class="bill">
			<view class="title">
				<view class="title-left">账单</view>
				<image class="title-right" src="../../static/icon/right.png"></image>
			</view>
			<view class="summary">
				<view class="month">
					<view class="date-time">
						<text class="number">{{month}}</text>
						<text class="desc">月</text>
					</view>
				</view>
				<view class="sum">
					<view class="income">
						<view class="desc">收入</view>
						<view class="money">0.00</view>
					</view>
					<view class="outlay">
						<view class="desc">支出</view>
						<view class="money">0.00</view>
					</view>
					<view class="balance">
						<view class="desc">结余</view>
						<view class="money">0.00</view>
					</view>
				</view>
			</view>
		</view>
		<view class="icon">
			<view class="icon-title">常用功能</view>
			<view class="icon-list">
				<view class="list-child" v-for="(item, index) in iconList" :key="index">
					<view class="list-img">
						<image class="img" :src="item.url"></image>
					</view>
					<view class="list-desc">{{item.desc}}</view>
				</view>
			</view>
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
				mouth: '',
				navList:[
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
				],
				iconList:[
					{
						url: require('../../static/icon/11.png'),
						desc: '模拟炒股'
					}, {
						url: require('../../static/icon/12.png'),
						desc: '股票开户'
					}, {
						url: require('../../static/icon/13.png'),
						desc: '省钱优惠券'
					}, {
						url: require('../../static/icon/14.png'),
						desc: '汇率换算器'
					}, {
						url: require('../../static/icon/11.png'),
						desc: '模拟炒股'
					}, {
						url: require('../../static/icon/12.png'),
						desc: '股票开户'
					}, {
						url: require('../../static/icon/13.png'),
						desc: '省钱优惠券'
					}, {
						url: require('../../static/icon/14.png'),
						desc: '汇率换算器'
					}
				]
			}
		},
		onLoad () {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.user {
	height: 100vh;
	background: #f4f5f5;
	.header {
		background: #ffcc00;
		height: 280rpx;
		position: relative;
		border-bottom-left-radius: 15rpx;
		border-bottom-right-radius: 15rpx;
		.user-info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			padding-top: 15rpx;
			.info {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 30rpx;
				.img {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
				.name{
					margin-left: 20rpx;
					font-size: 24rpx;
				}
			}
			.clock-in {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 120rpx;
				height: 40rpx;
				margin-right: 20rpx;
				background: #FFFFFF;
				border-radius: 30rpx;
				.img {
					width: 30rpx;
					height: 30rpx;
				}
				.desc {
					margin-left: 10rpx;
					font-size: 20rpx;
				}
			}
		}
		.sum {
			display: flex;
			flex-direction: row;
			height: 100rpx;
			margin: 10rpx 15rpx 0;
			.clock-number, .all-date, .all-unlined {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.desc {
					font-size: 20rpx;
					color: #C0C0C0;
				}
				
			}
		}
		.member {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			position: absolute;
			left: 30rpx;
			right: 30rpx;
			bottom: -40rpx;
			background: #FFFFFF;
			border-radius: 5rpx;
			.member-info {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 20rpx;
				image {
					width: 40rpx;
					height: 40rpx;
				}
				.desc {
					margin-left: 15rpx;
					font-size: 22rpx;
					letter-spacing: 5rpx;
				}
			}
			.img {
				width: 25rpx;
				height: 25rpx;
				margin-right: 30rpx;
			}
		}
	}
	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		margin: 60rpx 30rpx 0;
		background: #FFFFFF;
		.nav-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.nav-img {
				width: 40rpx;
				height: 40rpx;
			}
			.nav-desc {
				margin-top: 8rpx;
				font-size: 22rpx;
				color: #C0C0C0;
			}
		}
	}
	.bill {
		display: flex;
		flex-direction: column;
		height: 130rpx;
		margin: 20rpx 30rpx 0;
		background: #FFFFFF;
		.title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 50rpx;
			padding: 5rpx 10rpx;
			.title-left {
				margin-left: 15rpx;
				font-size: 22rpx;
				color: #333333;
			}
			.title-right {
				width: 25rpx;
				height: 25rpx;
				margin-right: 30rpx;
			}
		}
		.summary {
			display: flex;
			flex-direction: row;
			height: 80rpx;
			padding: 5rpx 10rpx;
			.month {
				display: flex;
				align-items: center;
				position: relative;
				width: 80rpx;
				padding: 25rpx 0rpx 25rpx 10rpx;
				.date-time {
					display: flex;
					flex-direction: row;
					height: 40rpx;
					width: 80rpx;
					border-right: 1px solid #ccc;
					.number {
						font-size: 35rpx;
						color: #000000;
						font-weight: 500;
					}
					.desc {
						margin: 10rpx 0 0 3rpx;
						font-size: 26rpx;
					}
				}
			}
			.sum {
				flex: 1;
				display: flex;
				flex-direction: row;
				margin-left: 25rpx;
				.income, .outlay, .balance {
					flex: 1;
					margin: 0;
					.desc, .money {
						font-size: 22rpx;
						color: #C0C0C0;
					}
					.money {
						margin-top: 10rpx;
						font-size: 20rpx;
						color: #000000;
						font-weight: 500;
					}
				}
			}
		}
	}
	.icon {
		display: flex;
		flex-direction: column;
		margin: 20rpx 30rpx 0;
		background: #FFFFFF;
		padding: 0 0 100rpx 0;
		.icon-title {
			display: flex;
			align-items: center;
			height: 50rpx;
			margin-left: 15rpx;
			padding: 5rpx 10rpx;
			font-size: 22rpx;
			color: #333333;
		}
		.icon-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.list-child {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 25%;
				margin-bottom: 10rpx;
				padding: 10rpx 0;
				.list-img {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					height: 80rpx;
					background: #FDFCFC;
					border-radius: 50%;
					.img {
						width: 40rpx;
						height: 40rpx;
					}
				}
				.list-desc {
					height: 40rpx;
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #C0C0C0;
				}
			}
		}
	}
}
</style>
