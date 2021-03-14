<template>
	<view class="detail">
		<view class="title">
			<view class="title-img">
				<image class="img" :src="billdetail.touch_icon"></image>
			</view>
			<view class="desc">{{billdetail.tag_name}}</view>
		</view>
		<view class="detail-list">
			<view class="type">
				<text class="left">类型</text>
				<text class="right">{{billdetail.type === 0?'支出':'收入'}}</text>
			</view>
			<view class="money">
				<text class="left">金额</text>
				<text class="right">{{billdetail.bill_amount}}</text>
			</view>
			<view class="date">
				<text class="left">日期</text>
				<text class="right">{{billdetail.format_bill_time}}</text>
			</view>
			<view class="remark">
				<text class="left">备注</text>
				<text class="right">{{billdetail.bill_note}}</text>
			</view>
		</view>
		<view class="button-btn">
			<button class="btn" type="default" @click="editdata">编辑</button>
			<button class="btn" type="default" @click="delectdata">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				token: '',
				bill: {},
				billdetail: {},
			}
		},
		onShow () {
		},
		created () {
			this.user = this.$store.state.user
			this.token = this.$store.state.token
			this.bill = this.$store.state.bill
			this.requestData()
		},
		methods: {
			requestData () {
				var timestamp = Math.round(new Date().getTime()/1000).toString()
				uni.request({
					url: 'http://106.55.25.207/bill/bill_info',
					method: 'POST',
					data: {
						user_id: this.user.user_id,
						token: this.token,
						bill_id: this.bill.bill_id,
						time: timestamp
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.billdetail = res.data.data
							console.log(this.billdetail)
						}
					}
				})
			},
			editdata () {
				this.$store.commit('getBill', this.bill)
				this.$store.commit('getCtrl', 'edit')
				this.$store.commit('getTagID', this.billdetail.tag_id)
				this.$store.commit('dialogChange', true)
				uni.switchTab({
					url: '/pages/bookkeeping/bookkeeping'
				})
			},
			delectdata () {
				var timestamp = Math.round(new Date().getTime()/1000).toString()
				uni.request({
					url: 'http://106.55.25.207/bill/bill_action',
					method: 'POST',
					data: {
						user_id: this.user.user_id,
						token: this.token,
						menoy: this.billdetail.bill_amount,
						ctrl: 'del',
						bill_id: this.bill.bill_id,
						time: timestamp
					},
					success: (res) => {
						console.log(res)
						if (res.data.code === 200) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								mask: true
							})
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.detail {
	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 300rpx;
		background: #ffcc00;
		.title-img {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 120rpx;
			height: 120rpx;
			background: #f4f5f5;
			border-radius: 50%;
			.img {
				width: 80rpx;
				height: 80rpx;
			}
		}
		.desc {
			margin-top: 25rpx;
			font-size: 35rpx;
		}
	}
	.detail-list {
		margin-left: 30rpx;
		.type, .money, .date, .remark {
			font-size: 30rpx;
			border-bottom: 1px solid #f4f5f5;
			.left {
				color: #C0C0C0;
			}
			.right {
				margin-left: 40rpx;
			}
		}
		.type, .money, .date {
			height: 100rpx;
			line-height: 100rpx;
		}
		.remark {
			height: 150rpx;
			padding-top: 30rpx;
		}
	}
	.button-btn {
		display: flex;
		flex-direction: row;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		.btn {
			line-height: 100rpx;
			width: 50%;
			background: #fff;
			font-size: 35rpx;
		}
		
	}
}
</style>
