<template>
	<view class="dialog-picker" v-if="visible" @click="cancel">
		<view class="picker">
			<picker-view
				class="picker-date"
				indicator-class="indicatorStyle"
				:value="value"
				@change="bindChange">
				<picker-view-column class="picker-list">
					<view class="item list-child" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column class="picker-list">
				<picker-view-column>
					<view class="item list-child" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column class="picker-list" v-if="showHide === 'show'">
					<view class="item list-child" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
			<view class="button-group">
				<button
					class="cancel"
					size="mini"
					@click="cancel">
					取消
				</button>
				<button
					class="define"
					type="primary"
					size="mini"
					@click="define">
					确定
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			visible: Boolean,
			showHide: String
		},
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1900; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				// visible: true,
				// indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		onShow () {

		},
		methods: {
			bindChange: function (e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				console.log(this.month)
			},
			cancel () {
				this.$emit('cancel')
			},
			define () {
				// var pickerDate = `${this.year}/${this.month}/${this.day}`
				var date = {
					year: this.year,
					month: this.month,
					day: this.day,
				}
				console.log(date.month)
				this.$emit('change', date)
			}
		}
	}
</script>

<style lang="scss">
.dialog-picker {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 999;
	background: rgba(0, 0, 0, 0.3);
	.picker {
		width: 100vw;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background: #ffffff;
		
		// uni-picker-view {
		//   display: flex;
		//   flex-direction: row;
		//   height: 100%;
		// }
		
		// uni-picker-view .uni-picker-view-wrapper {
		//   display: flex;
		//   justify-content: center;
		//   align-items: center;
		//   position: relative;
		//   overflow: hidden;
		//   height: 100%;
		//   background-color: white;
		// }
		
		// uni-picker-view[hidden] {
		//   display: none;
		// }
		
		picker-view {
			height: 400upx;
			margin: 60rpx 0 30rpx;
			padding: 0 40rpx;
			picker-view-column {
				width: 33%;
			}
		}
		.indicatorStyle {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-top: 2rpx solid #f4f5f5;
			border-bottom: 2rpx solid #f4f5f5;
		}
		.button-group {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 0rpx 0 30rpx;
			padding: 0 15%;
			.cancel, .define {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 35%;
				height: 70rpx;
				font-size: 24rpx;
			}
			.cancel {
				background: #f4f5f5;
			}
			.define {
				color: #ffffff;
			}
		}
	}
}
</style>
