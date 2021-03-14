<template>
	<view v-if="menu.res && menu.res.length >= 1">
		<view class="left">
			<text>{{menu.createTime.substring(5, 10)}}</text>
		</view>
		<detailList 
			v-for="(item, index) in menu.res"
			:key="index"
			:menu="item"/>
	</view>
	<view v-else class="list-child">
		<view class="category">
			<image
				class="list-img"
				:src="projectList[item.type].url">
			</image>
		</view>
		<view class="text-content">
			<view class="desc">
				{{item.remark ? item.remark : projectList[item.type].desc}}
			</view>
			<view class="money">-{{item.value}}</view>
		</view>
	</view>
</template>

<script>
	import { detailList } from './detailList.vue'
	export default {
		components: {
			detailList
		},
		props: {
			menu: Object
		},
		data() {
			return {
				projectList: [
					{
						url: require('../../static/icon/15.png'),
						desc: '餐饮',
					}, {
						url: require('../../static/icon/17.png'),
						desc: '购物',
					}, {
						url: require('../../static/icon/16.png'),
						desc: '日用',
					}, {
						url: require('../../static/icon/18.png'),
						desc: '交通',
					}, {
						url: require('../../static/icon/15.png'),
						desc: '餐饮',
					}, {
						url: require('../../static/icon/17.png'),
						desc: '购物',
					}, {
						url: require('../../static/icon/16.png'),
						desc: '日用',
					}, {
						url: require('../../static/icon/18.png'),
						desc: '交通',
					}
				]
			}
		},
		onShow () {
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
