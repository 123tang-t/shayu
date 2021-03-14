<template>
	<view class="chart">
		<view class="header">
			<view class="type-btn">
				<view
					:class="[typeClass === 'outlay'?'type':'', 'button', 'left']"
					@click="typeColorChange('outlay')">
					支出
				</view>
				<view
					:class="[typeClass === 'income'?'type':'', 'button', 'right']"
					@click="typeColorChange('income')">
					收入
				</view>
			</view>
			<view class="date-btn">
				<view
					:class="[dateClass === 'week'?'type':'', 'button', 'left']"
					@click="dateColorChange('week')">
					周
				</view>
				<view
					:class="[dateClass === 'month'?'type':'', 'button', 'center']"
					@click="dateColorChange('month')">
					月
				</view>
				<view
					:class="[dateClass === 'year'?'type':'', 'button', 'right']"
					@click="dateColorChange('year')">
					年
				</view>
			</view>
		</view>
		<view class="chart-content">
			<view class="date-list">
				<view class="list" v-if="dateClass === 'week'">
					<view
						:class="[dateIndex === index?'date-index':'', 'scroll-view-item_H', 'data']"
						v-for="(week, index) in weekArray"
						:key="index"
						@click="changDate(week.start, week.end, index)">
						{{week.desc}}周
					</view>
				</view>
				<view class="list" v-if="dateClass === 'month'">
					<view
						:class="[dateIndex === index?'date-index':'', 'scroll-view-item_H', 'data']"
						v-for="(week, index) in weekArray"
						:key="index"
						@click="changDate(week.start, week.end, index)">
						{{week.desc}}月
					</view>
				</view>
				<view class="list year-list" v-if="dateClass === 'year'">
					<view
						:class="[dateIndex === index?'date-index':'', 'scroll-view-item_H', 'data']"
						v-for="(week, index) in weekArray"
						:key="index"
						@click="changDate(week.start, week.end, index)">
						{{week.desc}}年
					</view>
				</view>
			</view>
			<view class="total">
				<view class="total-outlay">
					总支出：{{totalOutlay}}
				</view>
				<view class="average">
					平均值：{{average}}
				</view>
			</view>
			<view class="chart">
				<uni-ec-canvas
					class="uni-ec-canvas"
					id="uni-ec-canvas"
					ref="uni-ec-canvas"
					canvas-id="uni-ec-canvas"
					:ec="ec"
				></uni-ec-canvas>
			</view>
		</view>
		<view class="chart-detail">
			<view class="title">
				{{typeClass === 'outlay'?'支出':'收入'}}排行榜
			</view>
			<view
				class="list"
				v-for="item in chartDetail"
				:key="item.tag_id">
				<view class="left">
					<image class="img" :src="item.touch_icon" mode="图标"></image>
				</view>
				<view class="right">
					<view class="list-desc">
						<view class="type">
							<view class="name">
								{{item.tag_name}}
							</view>
							<view class="percentage">
								{{item.percentage}}
							</view>
						</view>
						<view class="money">
							{{item.bill_amount}}
						</view>
					</view>
					<view class="progress-bar">
						<progress 
							:percent="parseFloat(item.percentage)"
							active
							stroke-width="6"
							border-radius="5"
							activeColor="#ffcc00"
							backgroundColor="#f4f5f5" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniEcCanvas from '@/components/uni-ec-canvas/uni-ec-canvas/uni-ec-canvas.vue'
	import * as echarts from '@/components/uni-ec-canvas/uni-ec-canvas/echarts'
	 let chart = null
	export default {
		data() {
			return {
				user: {},
				token: '',
				typeClass: 'outlay',
				dateClass: 'week',
				totalOutlay: '',
				average: '',
				chartDetail: [],
				startTime: '',
				endTime: '',
				dateIndex: 4,
				// 请求的类型：0-支出，1-收入
				type: 0,
				// 请求的时间类型类型：0-周，1-月，2-年'
				timeType: 0,
				weekArray: [],
				chartData: [],
				ec: {
					option: {
						grid: {
							top: '15',
							left: '5%',
							right: '5%',
							bottom: '3%',
							containLabel: true
						},
					    xAxis: {
					        type: 'category',
							axisLabel: {
							   show: true,
								textStyle: {
								  color: '#c3dbff',  //更改坐标轴文字颜色
								  fontSize : 10      //更改坐标轴文字大小
								}
							},
							axisLine: {
								lineStyle: {
									color: '#808080'
								}
							},
					        data: []
					    },
					    yAxis: {
							show: false
					        // type: 'value'
					    },
					    series: [{
							data: [],
					        type: 'line',
							smooth: true
					    }]
					}
				}
			}
		},
		components: {
			uniEcCanvas
		},
		onShow () {
			this.user = this.$store.state.user
			this.token = this.$store.state.token
			this.date()
			this.init()
		},
		methods: {
			date () {
				this.weekArray = []
				this.ec.option.xAxis.data = []
				var w = new Date().getDay()
				if (w === 0) {
					w = 7
				}
				var startDate = new Date(new Date().setDate(new Date().getDate()-w+1))
				this.startTime = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}` + ' ' + '00:00:00'
				var endDate = new Date(startDate.setDate(startDate.getDate()+6))
				this.endTime = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`+' '+'23:59:59'
				this.weekArray.push({
					desc: '本',
					start: this.startTime,
					end: this.endTime
				})
				let time = new Date(this.startTime).getDate()
				for (let i = 0; i < 7; i++) {
					this.ec.option.xAxis.data.push(time+i)
				}
			},
			init () {
				var w = new Date().getDay()
				if (w === 0) {
					w = 7
				}
				var startDate = new Date(new Date().setDate(new Date().getDate()-7-w+1))
				this.weekDate(startDate, -7)
				this.dateSort()
				this.requestDate()
			},
			requestDate () {
				var timestamp = Math.round(new Date().getTime()/1000).toString()
				uni.request({
					url: 'http://106.55.25.207/bill/bill_chart_data',
					method: 'POST',
					data: {
						user_id: this.user.user_id,
						token: this.token,
						type: this.type,
						time_type: this.timeType,
						start_time: this.startTime,
						end_time: this.endTime,
						time: timestamp
					},
					success: (res) => {
						this.totalOutlay = res.data.data.sum_amount
						this.average = res.data.data.avg_amount
						this.chartDetail = res.data.data.proportion_chart
						this.chartData = res.data.data.line_chart
						this.initChartData()
					}
				})
			},
			weekDate (date, days) {
				var endDate = new Date(date.setDate(date.getDate()-days))
				var end = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`+ ' ' +'23:59:59'
				var startDate = new Date(endDate.setDate(endDate.getDate()+days))
				var start = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}` + ' ' + '00:00:00'
				var time1 = new Date(start)
				var time2 = new Date(time1.getFullYear(), 0, 1)
				var d = Math.round((time1.valueOf() - time2.valueOf()) / 86400000)
				var desc = Math.ceil((d + ((time2.getDay() + 1) - 1)) / 7)
				this.weekArray.push({
					desc: desc,
					start: start,
					end: end
				})
				// 计算下一个星期的开始时间
				var newDate = new Date(startDate.setDate(startDate.getDate()-7))
				// 周期数组长度
				let length = this.weekArray.length
				if (length < 5) {
					this.weekDate(newDate, -7)
				} else {
					return
				}
			},
			yearMonthDate () {
				this.weekArray = []
				// if (this.this.dateClass === 'month') {
				// 	let time = new Data()
				// 	this.startTime = `${time.getYear()}-${time.getMonth()+1}` + '01' + ' ' + '00:00:00'
				// }
				if (this.dateClass === 'year') {
					this.timeType = 2
					this.dateIndex = 1
					let time = new Date()
					this.startTime = `${time.getFullYear()}`+'-01-01 00:00:00'
					this.endTime = `${time.getFullYear()}`+'-12-31 23:59:59'
					this.weekArray.push({
						desc: '今',
						start: this.startTime,
						end: this.endTime
					})
					let length = this.weekArray.length
					if (length < 2) {
						let newYears = time.getFullYear() - 1
						let start = `${newYears}`+'-01-01 00:00:00'
						let end = `${newYears}`+'-12-31 23:59:59'
						this.weekArray.push({
							desc: '去',
							start: start,
							end: end
						})
					}
					this.dateSort()
					this.requestDate()
				}
			},
			dateSort () {
				this.weekArray = this.weekArray.sort((sel1, sel2) => {
					var val1 = new Date(sel1.start)
					var val2 = new Date(sel2.start)
					if (val1 < val2) {
						return -1
					} else if (val1 > val2) {
						return 1
					} else {
						return 0
					}
				})
			},
			initChartData () {
				this.ec.option.series[0].data = []
				this.chartData.forEach((item) => {
					this.ec.option.series[0].data.push(item.bill_amount)
				})
			},
			typeColorChange (e) {
				this.typeClass = e
				if (e === 'outlay') {
					this.type = 0
				} else {
					this.type = 1
				}
				this.requestDate()
			},
			dateColorChange (e) {
				this.dateClass = e
				if (this.dateClass === 'week') {
					this.timeType = 0
					this.dateIndex = 4
					this.date()
					this.init()
				} else {
					this.yearMonthDate()
					this.requestDate()
					this.Xaxis()
				}
			},
			changDate (value1, value2, index) {
				this.dateIndex = index
				this.startTime = value1
				this.endTime = value2
				if (this.dateClass === 'week') {
					this.ec.option.xAxis.data = []
					let time = new Date(value1).getDate()
					for (let i = 0; i < 7; i++) {
						this.ec.option.xAxis.data.push(time+i)
					}
				}
				this.requestDate()
			},
			Xaxis () {
				this.ec.option.xAxis.data = []
				for (let x = 1; x <= 12; x++) {
					this.ec.option.xAxis.data.push(x+'月')
				}
			}
		}
	}
</script>

<style lang="scss">
.chart {
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 25rpx;
		height: 80rpx;
		background: #ffcc00;
		.type-btn, .date-btn {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			height: 70rpx;
			.button {
				width: 100rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				border: 2rpx solid #000;
			}
			.center {
				border-left: none;
				border-right: none;
			}
			.left {
				border-top-left-radius: 20rpx;
				border-bottom-left-radius: 20rpx;
			}
			.right {
				border-top-right-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
			}
			.type {
				background: #000;
				color: #ffcc00;
			}
		}
	}
	.chart-content {
		.date-list {
			margin-bottom: 5rpx;
			width: 100%;
			border-bottom: 5rpx solid #f4f5f5;
			.list {
				display: flex;
				flex-direction: row;
				// justify-content: center;
				.data {
					display: flex;
					flex-direction: row;
					justify-content: center;
					overflow-x: auto;
					width: 20%;
					height: 60rpx;
					line-height: 60rpx;
				}
				.date-index {
					border-bottom: 5rpx solid #000;
				}
			}
		}
		.total {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 25rpx;
			height: 120rpx;
		}
		.chart {
			margin: 0 25rpx;
			border-top: 2rpx solid #000;
			border-bottom: 2rpx solid #000;
			.uni-ec-canvas {
				height: 200rpx;
				width: 100%;
				display: block;
			}
		}
	}
	.chart-detail {
		display: flex;
		flex-direction: column;
		.title {
			padding: 0 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
		}
		.list {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			height: 120rpx;
			.left {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 80rpx;
				width: 80rpx;
				background: #f4f5f5;
				border-radius: 50%;
				.img {
					width: 60rpx;
					height: 60rpx;
					background: #ffcc00;
					border-radius: 50%;
				}
			}
			.right {
				flex: 1;
				margin-left: 20rpx;
				.list-desc {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.type {
						display: flex;
						flex-direction: row;
						.percentage {
							margin-left: 20rpx;
						}
					}
				}
			}
		}
		
	}
}
</style>
