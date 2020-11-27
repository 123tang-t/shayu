<template>
	<view class="dialog-calendar">
		<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
			<picker-view-column>
				<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		methods: {
			bindChange: function (e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
			}
		}
	}
</script>

<style lang="scss">
	.dialog-calendar {
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 999;
		uni-picker-view {
		  display: block;
		}
		
		uni-picker-view .uni-picker-view-wrapper {
		  display: flex;
		  position: relative;
		  overflow: hidden;
		  height: 100%;
		  background-color: white;
		}
		
		uni-picker-view[hidden] {
		  display: none;
		}
		
		picker-view {
		    width: 100%;
		    height: 600upx;
		    margin-top:20upx;
		}
	}
</style>
