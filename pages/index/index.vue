<template>
	<view class="content">
		<view class="header">
			<view class="summary">
				<view class="date-time">
					<view class="years">{{year}}年</view>
					<view class="month" @click="openPickerDate">
						<text class="number">{{month}}</text>
						<text class="desc">月</text>
						<image class="drop-down" src="../../static/icon/drop.png" mode="1"></image>
					</view>
				</view>
				<view class="sum">
					<view class="income">
						<view class="desc">收入</view>
						<view class="money">{{monthIncome}}</view>
					</view>
					<view class="outlay">
						<view class="desc">支出</view>
						<view class="money">{{monthOutlay}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="detail-list">
			<view v-for="(value, key) in detailData" :key="key">
				<view class="title">
					<view class="left">
						<text>{{value.time}}</text>
					</view>
					<view class="right">
						<view v-if="value.day_sum_output" class="outlay">
							<text>支出:</text>
							<text class="number">{{value.day_sum_output}}</text>
						</view>
						<view v-if="value.day_sum_input" class="income">
							<text>收入:</text>
							<text class="number">{{value.day_sum_input}}</text>
						</view>
					</view>
				</view>
				<view class="list">
					<view
						class="list-child"
						v-for="(item, index) in value.bill_detail"
						:key="index"
						@click="openDetail(item)">
						<view class="category">
							<image
								class="list-img"
								:src="item.touch_icon">
							</image>
						</view>
						<view class="text-content">
							<view class="desc">
								{{item.bill_title}}
							</view>
							<view class="money">
								{{item.type === 0?-item.bill_amount:item.bill_amount*100/100}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="detail-list">
			<detailList 
				v-for="(menu, index) in detailData"
				:key="index"
				:menu="menu"/>
		</view> -->
		<date-picker
			:visible="visible"
			:close="close"
			@change="dateChange"
			@cancel="cancel"/>
	</view>
</template>

<script>
	import { datePicker } from '../../components/datepicker/datepicker.vue'
	// import { detailList } from '../../components/detailList/detailList.vue'
	export default {
		components: {
			datePicker
			// detailList
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
				// 用户账号信息
				user: {},
				token: '',
				// 月支出收入
				monthOutlay: 0,
				monthIncome: 0,
				//详情列表
				detailData: [],
				list: [],
				visible: false,
				close: true
			}
		},
		onShow () {
			this.user = this.$store.state.user
			this.token = this.$store.state.token
			this.getData()
		},
		methods: {
			getData () {
				var timestamp = Math.round(new Date().getTime()/1000).toString()
				if (this.user.user_id) {
					uni.request({
						url: 'http://106.55.25.207/bill/bill_detail_list',
						method: 'POST',
						data: {
							user_id: this.user.user_id,
							token: this.token,
							bill_time: `${this.year}-${this.month}`,
							time: timestamp
						},
						// header: {
						// 	"content-type":"application/x-www-form-urlencoded"
						// },
						success: (res) => {
							if (res.data.code === 200) {
								this.monthOutlay = res.data.data.month_sum_output
								this.monthIncome = res.data.data.month_sum_input
								this.list = res.data.data.list
								this.initArray()
							}
						},
					})
				}
			},
			initArray () {
				let arr = []
				Object.keys(this.list).forEach((key) => {
					let arrObject = {
						time: key,
						bill_detail: this.list[key].bill_detail,
						day_sum_input: this.list[key].day_sum_input,
						day_sum_output: this.list[key].day_sum_output
						
					}
					arr.push(arrObject)
				})
				arr = arr.sort((sel1, sel2) => {
					let val1 = sel1.time.substring(3, 5)
					let val2 = sel2.time.substring(3, 5)
					if (val1 < val2) {
						return 1
					} else if (val1 > val2) {
						return -1
					} else {
						return 0
					}
					
				})
				this.detailData = arr
			},
			openPickerDate () {
				this.visible = true
			},
			cancel () {
				this.visible = false
			},
			dateChange (e) {
				this.year = e.year
				this.month = e.month
				this.visible = false
				this.detailData = []
				this.getData()
				
			},
			openDetail (val) {
				this.$store.commit('getBill', val)
				this.$store.commit('getBillId', val.bill_id)
				uni.navigateTo({
					url: '/pages/detail/detail'
				})
				// // #ifdef H5
				// uni.navigateTo({
				// 	url: '/pages/detail/detail'
				// })
				// // #endif
			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100vh;
		// background: #f4f5f5;
		.header {
			background: #ffcc00;
			// border-bottom-left-radius: 15rpx;
			// border-bottom-right-radius: 15rpx;
			padding-bottom: 15rpx;
			.summary {
				display: flex;
				flex-direction: row;
				height: 100rpx;
				margin: 0 10rpx;
				padding: 15rpx 0 15rpx;
				.date-time {
					width: 120rpx;
					.years {
						font-size: 24rpx;
						color: #C0C0C0;
					}
					.month {
						display: flex;
						flex-direction: row;
						position: relative;
						margin-top: 15rpx;
						border-right: 1px solid #ccc;
						position: relative;
						.number {
							font-size: 35rpx;
							color: #000000;
							font-weight: 500;
						}
						.desc {
							margin: 10rpx 0 0 3rpx;
							font-size: 26rpx;
						}
						.drop-down {
							height: 35rpx;
							width: 25rpx;
							margin: 10rpx 0 0 8rpx;
							position: absolute;
							right: 23rpx;
							bottom: 5rpx;
						}
					}
				}
				.sum {
					flex: 1;
					display: flex;
					flex-direction: row;
					margin-left: 40rpx;
					.income, .outlay {
						flex: 1;
						margin: 0;
						.desc, .money {
							font-size: 24rpx;
							color: #C0C0C0;
						}
						.money {
							margin-top: 15rpx;
							font-size: 35rpx;
							color: #000000;
							font-weight: 500;
						}
					}
				}
			}
			.nav {
				display: flex;
				flex-direction: row;
				height: 80rpx;
				margin: 0 20rpx;
				background: #ffffff;
				border: 1px solid #FFFFFF;
				box-shadow: 0 2rpx 2rpx 3rpx #fcf9f8;
				.icon-list {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.icon {
						height: 40rpx;
						width: 40rpx;
					}
					.desc {
						margin-top: 5rpx;
						font-size: 20rpx;
					}
				}
			}
		}
		.phone {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 200rpx;
			margin-top: 20rpx;
			background: #DAE4E5;
			.title {
				margin-top: 20rpx;
				font-size: 24rpx;
				font-weight: bold;
			}
			.desc {
				margin-top: 20rpx;
				color: #555555;
				font-size: 20rpx;
			}
			.button {
				width: 40%;
				height: 60rpx;
				line-height: 60rpx;
				margin-top: 20rpx;
				background: #FF0033;
				color: #fff;
				font-size: 24rpx;
			}
		}
		.detail-list {
			background: #FFFFFF;
			.title {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 15rpx 20rpx 0;
				padding: 10rpx;
				color: #C0C0C0;
				font-size: 24rpx;
				letter-spacing: 2rpx;
				.right {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.outlay, .income {
						margin-right: 15rpx;
					}
				}
			}
			.list {
				margin: 0 20rpx;
				color: #C0C0C0;
				letter-spacing: 2rpx;
				.list-child {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					height: 80rpx;
					padding: 0 10rpx;
					font-size: 24rpx;
					.category {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						width: 60rpx;
						height: 60rpx;
						background: #f4f5f5;
						border-radius: 100%;
						.list-img {
							width: 35rpx;
							height: 35rpx;
						}
					}
					.text-content {
						flex: 1;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin-left: 15rpx;
						.desc .money {
							margin-left: 18rpx;
						}
					}
				}
				.list-child:first-child {
					border-top: 1px solid #f4f5f5;
				}
			}
		}
	}
</style>
