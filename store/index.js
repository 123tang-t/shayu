import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		detail: [],
		datas: [{
			value: 99,
			type: 1,
			remark: '晚餐',
			createTime: '2020-11-2',
		}, {
			value: 45,
			type: 4,
			remark: '打车',
			createTime: '2020-11-2',
		}, {
			value: 145,
			type: 2,
			remark: '衣服',
			createTime: '2020-11-18',
		}, {
			value: 86,
			type: 2,
			remark: '鞋子',
			createTime: '2020-10-25',
		}]
	},
	mutations: {

	},
	actions: {
		getInterface (context, data) {
			context.state.datas.push(data)
		},
		addDetail (context, val) {
			// context.state.detail.push(val)
			// console.log(context.state.detail)
		}
	}
})
export default store;
