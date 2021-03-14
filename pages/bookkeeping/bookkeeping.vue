<template>
	<view class="bookkeeping">
		<view class="button-btn">
			<view class="button">
				<view
					:class="[classType === 'outlay'?'left-button':'', 'left']"
					@click="typeChange('outlay')">
					支出
				</view>
				<view
					:class="[classType === 'income'?'right-button':'', 'right']"
					@click="typeChange('income')">
					收入
				</view>
			</view>
		</view>
		<view class="icon">
			<view
				class="list"
				v-for="(item, index) in iconList"
				:key="item.tag_id">
				<view class="list-child" @click="inputClick(item.tag_id)">
					<view :class="[arrActive === item.tag_id?'click':'','chlid']">
						<image class="img" :src="item.touch_icon"></image>
					</view>
					<view class="desc">{{item.tag_name}}</view>
				</view>
			</view>
		</view>
		<view class="dialog" v-show="dialog">
			<view class="content">
				<view class="remark">
						<text class="desc">备注：</text>
						<input class="input" type="text" v-model="bill.remark" />
				</view>
				<input
					class="money"
					type="text"
					v-model="bill.money"
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
			:showHide = "showHide"
			:close="close"
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
				close: true,
				// 头部样式状态
				classType: 'outlay',
				// 图标接口传参
				data: {
					type: 0,
					page: 1,
					size: 8
				},
				arrActive: -1,
				// dialog: false,
				visible: false,
				bill: {
					bill_id: -1,
					type: 0,
					money: '0',
					remark: '',
				},
				ctrl: 'edit',
				date: '今天',
				showHide: '',
				iconList: [],
				numberList: ['7', '8', '9', '4', '5', '6', '1', '2', '3']
			}
		},
		onShow () {
			this.ctrl = this.$store.state.ctrl
			// this.dialog = this.$store.state.dialog
			this.init()
			
		},
		onHide () {
			this.$store.commit('getCtrl', 'add')
			this.$store.commit('dialogChange', false)
			this.$store.commit('getTagID', -1)
			this.arrActive = -1
			this.bill = {
				bill_id: -1,
				type: 0,
				money: '0',
				remark: '',
			}
		},
		onBackPress (options) {
			if (options.from === 'navigateBack') {
				return false
			}
			this.back()
			return true
		},
		computed: {
			user () {
				return this.$store.state.user
			},
			token () {
				return this.$store.state.token
			},
			dialog () {
				return this.$store.state.dialog
			}
		},
		methods: {
			init () {
				// 编辑账单数据时触发
				if (this.ctrl === 'edit') {
					this.bill.bill_id = this.$store.state.bill_id
					this.arrActive = this.$store.state.tag_id
					console.log(this.$store.state.tag_id)
					let val = this.$store.state.bill
					this.bill = {
						bill_id: this.$store.state.bill_id,
						type: val.type,
						money: val.bill_amount,
						remark: val.bill_title,
					}
					this.data.type = val.type
					if (val.type === 0) {
						this.classType = 'outlay'
					} else {
						this.classType = 'income'
					}
				}
				uni.request({
				    url: 'http://106.55.25.207/bill/bill_icon_list', 
					method: 'GET',
				    data: {
				        type: this.data.type,
						page: this.data.page,
						size: this.data.size,
				    },
				    success: (res) => {
						this.iconList = res.data.data.list
						if (this.data.page < res.data.data.page_count) {
							this.againInit()
						}
				    }
				})
			},
			againInit () {
				uni.request({
				    url: 'http://106.55.25.207/bill/bill_icon_list', 
					method: 'GET',
				    data: {
				        type: this.data.type,
						page: this.data.page,
						size: this.data.size,
				    },
				    success: (res) => {
						this.data.page += 1
						this.iconList = this.iconList.concat(res.data.data.list)
						if (this.data.page < res.data.data.page_count) {
							this.againInit()
						}
				    }
				})
			},
			typeChange (e) {
				this.classType = e
				if (e === 'outlay') {
					this.data.type = 0
					this.bill.type = 0
				} else {
					this.data.type = 1
					this.bill.type = 1
				}
				this.init()
			},
			inputClick (value) {
				this.arrActive = value
				this.$store.commit('dialogChange', true)
			},
			inputMoney (value) {
				if (this.bill.money === '0' && value !== '.') {
					this.bill.money = value
				} else {
					this.bill.money = this.bill.money + value
				}
			},
			delect () {
				if (this.bill.money.length > 0 && this.bill.money !== '0') {
					this.bill.money = this.bill.money.slice(0, this.bill.money.length - 1)
				}
				if (!this.bill.money) {
					this.bill.money = '0'
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
				var timestamp = Math.round(new Date().getTime()/1000).toString()
				if (this.ctrl === 'add') {
					console.log('add')
					uni.request({
						url: 'http://106.55.25.207/bill/bill_action',
						method: 'POST',
						data: {
							user_id: this.user.user_id,
							token: this.token,
							tag_id: this.arrActive,
							type: this.bill.type,
							money: this.bill.money,
							note: this.bill.remark,
							bill_time: `${this.year}-${this.month}-${this.day}`,
							ctrl: this.ctrl,
							time: timestamp
						},
						success: (res) => {
							if (res.data.code === 200) {
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}
						}
					})
				}
				if (this.ctrl === 'edit') {
					console.log('edit')
					uni.request({
						url: 'http://106.55.25.207/bill/bill_action',
						method: 'POST',
						data: {
							user_id: this.user.user_id,
							token: this.token,
							tag_id: this.arrActive,
							type: this.bill.type,
							money: this.bill.money,
							note: this.bill.remark,
							bill_time: `${this.year}-${this.month}-${this.day}`,
							ctrl: this.ctrl,
							bill_id: this.bill.bill_id,
							time: timestamp
						},
						success: (res) => {
							console.log(res)
							if (res.data.code === 200) {
								uni.reLaunch({
									url: '/pages/index/index'
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
.bookkeeping {
	.button-btn {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 150rpx;
		background: #ffcc00;
		.button {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 80%;
			height: 80rpx;
			border: 1rpx solid #000;
			border-radius: 25rpx;
			.left, .right {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
			}
			.left-button {
				background: #000;
				color: #ffcc00;
				border-top-left-radius: 25rpx;
				border-bottom-left-radius: 25rpx;
			}
			.right-button {
				background: #000;
				color: #ffcc00;
				border-top-right-radius: 25rpx;
				border-bottom-right-radius: 25rpx;
			}
		}
	}
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
