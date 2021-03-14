<template>
	<view class="bill-balance">
		<view class="header">
			<view class="balance">
				<view class="desc">
					结余
				</view>
				<view class="number">
					{{balance}}
				</view>
				<view class="date" @click="openPickerDate">
					<view class="years">
						{{year}}年
					</view>
					<image class="drop-down" src="../../static/icon/drop.png" mode="1"></image>
				</view>
			</view>
			<view class="detail">
				<view class="left">
					<view class="desc">
						收入
					</view>
					<view class="income">
						{{income}}
					</view>
				</view>
				<view class="right">
					<view class="desc">
						支出
					</view>
					<view class="outlay">
						{{outlay}}
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="list-header">
				<view class="title">
					月份
				</view>
				<view class="title">
					收入
				</view>
				<view class="title">
					支出
				</view>
				<view class="title">
					结余
				</view>
			</view>
			<view class="list-content">
				<view
					class="content"
					v-for="menu in balanceList"
					:key="menu.month">
					<view class="child">
						{{menu.month}}月
					</view>
					<view class="child">
						{{menu.month_input}}
					</view>
					<view class="child">
						{{menu.month_output}}
					</view>
					<view class="child">
						{{menu.month_balance}}
					</view>
				</view>
			</view>
		</view>
		<date-picker
			:visible="visible"
			:close="close"
			@change="dateChange"
			@cancel="cancel">
		</date-picker>
	</view>
</template>

<script>
	import { datePicker } from '../../components/datepicker/datepicker.vue'
	export default {
		components: {
			datePicker
		},
		data() {
			const dates = new Date()
			const year = dates.getFullYear()
			const month = dates.getMonth() + 1
			const day = dates.getDate()
			return {
				year,
				month,
				day,
				user: {},
				token: '',
				balance: '',
				outlay: '',
				income: '',
				balanceList: [],
				// 用于判断日期选择器的显现
				visible: false,
				close: false
			}
		},
		onShow () {
			this.user = this.$store.state.user
			this.token = this.$store.state.token
			this.init()
		},
		methods: {
			init () {
				var timestamp = Math.round(new Date().getTime()/1000).toString()
				if (this.user.user_id) {
					uni.request({
						url: 'http://106.55.25.207/bill/bill_count',
						method: 'POST',
						data: {
							user_id: this.user.user_id,
							token: this.token,
							bill_year: this.year,
							time: timestamp,
						},
						success: (res) => {
							if (res.data.code) {
								this.balance = res.data.data.sum_balance
								this.outlay = res.data.data.sum_output
								this.income = res.data.data.sum_input
								this.balanceList = res.data.data.month_list
							}
						}
					})
				}
			},
			openPickerDate () {
				this.visible = true
			},
			cancel () {
				this.visible = false
			},
			dateChange (e) {
				this.year = e.year
				this.visible = false
				this.balanceList = []
				this.init()
			}
		}
	}
</script>

<style lang="scss">
.bill-balance {
	.header {
		height: 300rpx;
		background: #ffcc00;
		.balance {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 200rpx;
			position: relative;
			.desc {
				margin-top: 15rpx;
				font-size: 30rpx;
			}
			.number {
				font-size: 60rpx;
			}
			.date {
				display: flex;
				flex-direction: row;
				justify-content: center;
				height: 60rpx;
				position: absolute;
				top: 20rpx;
				right: 25rpx;
				.years {
					margin-right: 10rpx;
					line-height: 60rpx;
					font-size: 30rpx;
				}
				.drop-down {
					margin-top: 10rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
		.detail {
			display: flex;
			flex-direction: row;
			justify-content: center;
			.left, .right {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				.income, .outlay {
					margin-left: 15rpx;
					font-size: 35rpx;
				}
			}
			.left {
				border-right: 2rpx solid #000;
			}
		}
	}
	.list {
		.list-header {
			display: flex;
			flex-direction: row;
			height: 80rpx;
			.title {
				width: 25%;
				line-height: 80rpx;
				font-size: 25rpx;
				text-align: center;
			}
		}
		.list-content {
			display: flex;
			flex-direction: column;
			.content {
				display: flex;
				flex-direction: row;
				height: 100rpx;
				border-top: 5rpx solid #f4f5f5;
				.child {
					width: 25%;
					line-height: 100rpx;
					font-size: 23rpx;
					text-align: center;
				}
			}
		}
	}
}
</style>
