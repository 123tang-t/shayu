<template>
	<view class="bookkeeping">
		<view class="icon">
			<view
				class="list"
				v-for="(item, index) in iconList"
				:key="item.id">
				<view class="list-child" @click="inputClick(index)">
					<view :class="[arrActive === index?'click':'','chlid']">
						<image class="img" :src="item.url"></image>
					</view>
					<view class="desc">{{item.desc}}</view>
				</view>
			</view>
		</view>
		<view class="dialog" v-show="dialog">
			<view class="content">
				<view class="remark">
						<text class="desc">备注：</text>
						<input class="input" type="text" v-model="remark" />
				</view>
				<input
					class="money"
					type="text"
					v-model="money"
					disabled="disabled"
					maxlength="6"/>
			</view>
			<view class="click-buttom">
				<view class="number-buttom">
					<view class="number-one">
						<view
							class="number keyboard"
							v-for="(item, index) in numberList"
							:key="index"
							@click="inputMoney(item)">
							{{item}}
						</view>
					</view>
					<view class="number-two">
						<view class="number"@click="inputMoney('.')">.</view>
						<view class="number"@click="inputMoney('0')">0</view>
						<view class="number" @click="delect">
							<image class="delect" src="../../static/icon2/delect.png"></image>
						</view>
					</view>
				</view>
				<view class="select-buttom">
					<view class="select date-select" @click.stop="open">{{date}}</view>
					<view class="select">+</view>
					<view class="select">-</view>
					<view class="confirm" @click="imprtData">完成</view>
				</view>
			</view>
		</view>
		<date-picker
			:visible="visible"
			:showHide = showHide
			@change="dateChange"
			@cancel="cancel"/>
	</view>
</template>

<script>
	import datePicker from '../../components/datepicker/datepicker.vue'
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
				arrActive: -1,
				dialog: false,
				visible: false,
				money: '0',
				remark: '',
				date: '今天',
				showHide: '',
				iconList: [{
					id: '01',
					url: require('../../static/icon2/1.png'),
					desc: '餐饮'
				}, {
					id: '02',
					url: require('../../static/icon2/2.png'),
					desc: '购物'
				}, {
					id: '03',
					url: require('../../static/icon2/3.png'),
					desc: '日用'
				}, {
					id: '04',
					url: require('../../static/icon2/4.png'),
					desc: '交通'
				}, {
					id: '05',
					url: require('../../static/icon2/1.png'),
					desc: '餐饮'
				}, {
					id: '06',
					url: require('../../static/icon2/2.png'),
					desc: '购物'
				}, {
					id: '07',
					url: require('../../static/icon2/3.png'),
					desc: '日用'
				}, {
					id: '08',
					url: require('../../static/icon2/4.png'),
					desc: '交通'
				}],
				numberList: ['7', '8', '9', '4', '5', '6', '1', '2', '3']
			}
		},
		onShow () {
			
		},
		onBackPress (options) {
			if (options.from === 'navigateBack') {
				return false
			}
			this.back()
			return true
		},
		methods: {
			inputClick (index) {
				this.arrActive = index
				this.dialog = true
			},
			inputMoney (value) {
				if (this.money === '0' && value !== '.') {
					this.money = value
				} else {
					this.money = this.money + value
				}
			},
			delect () {
				if (this.money.length > 0 && this.money !== '0') {
					this.money = this.money.slice(0, this.money.length - 1)
				}
				if (!this.money) {
					this.money = '0'
				}
			},
			back () {
				uni.navigateBack({
					delta: 3
				})
			},
			open () {
				this.visible = !this.visible
				this.showHide = 'show'
			},
			cancel () {
				this.visible = false
			},
			dateChange (e) {
				this.date = `${e.year}/${e.month}/${e.day}`
				this.year = e.year
				this.month = e.month
				this.day = e.day
				this.visible = false
				
			},
			imprtData () {
				let data = {
					value: this.money,
					type: this.arrActive,
					remark: this.remark,
					createTime: `${this.year}-${this.month}-${this.day}`,
				}
				this.$store.dispatch('getInterface', data)
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
.bookkeeping {
	.icon {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.list {
			width: 25%;
			margin: 10rpx 0 0;
			.list-child {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 150rpx;
				margin: 5rpx 10rpx;
				.chlid {
					display: flex;
					display: row;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					height: 80rpx;
					background: #f4f5f5;
					border-radius: 100%;
					.img {
						width: 50rpx;
						height: 50rpx;
					}
				}
				.click {
					background: #ffcc00;
				}
				.desc {
					margin: 5rpx 0 0;
					font-size: 24rpx;
					color: #555555;
					letter-spacing: 4rpx;
				}
				
			}
		}
	}
	.dialog {
		height: 500rpx;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		.content {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 98rpx;
			border: 1rpx solid #C0C0C0;
			border-left: none;
			border-right: none;
			.remark {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-left: 20rpx;
				font-size: 30rpx;
			}
			.money {
				width: 25%;
				height: 80rpx;
				line-height: 80rpx;
				margin-right: 25rpx;
				font-size: 50rpx;
				text-align: right;
			}
		}
		.click-buttom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.number-buttom {
				width: 75%;
				.number-one, .number-two {
					width: 100%;
					padding-left: 1%;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					.number {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						width: 33%;
						height: 100rpx;
						font-size: 35rpx;
						text-align: center;
						border-right: 1rpx solid #C0C0C0;
						.delect {
							width: 50rpx;
							height: 50rpx;
						}
					}
					.keyboard {
						height: 99rpx;
						line-height: 99rpx;
						border-bottom: 1rpx solid #C0C0C0;
					}
				}
			}
			.select-buttom {
				display: flex;
				flex-direction: column;
				width: 25%;
				.select {
					height: 99rpx;
					line-height: 99rpx;
					text-align: center;
					font-size: 35rpx;
					border-bottom: 1rpx solid #C0C0C0;
				}
				.date-select {
					font-size: 28rpx;
				}
				.confirm {
					height: 100rpx;
					line-height: 100rpx;
					margin-left: 1rpx;
					text-align: center;
					font-size: 35rpx;
					background: #ffff00;
				}
			}
		}
	}
}
</style>
