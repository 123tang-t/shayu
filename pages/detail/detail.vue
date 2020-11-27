<template>
	<view class="detail">
		<view class="title">
			<!-- <image class="img"></image> -->
			<view class="desc">123</view>
		</view>
		<view class="detail-list">
			<view class="type">
				<text class="left">类型</text>
				<text class="right">支出</text>
			</view>
			<view class="money">
				<text class="left">金额</text>
				<text class="right">20</text>
			</view>
			<view class="date">
				<text class="left">日期</text>
				<text class="right">2020-11-28</text>
			</view>
			<view class="remark">
				<text class="left">备注</text>
				<text class="right">午餐</text>
			</view>
		</view>
		<button class="btn" type="default">删除</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.detail {
	.title {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 300rpx;
		background: #ffcc00;
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
	.btn {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		
	}
}
</style>
