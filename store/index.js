import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 用于判断记账页面是新增还是编辑
		msg: true,
		// 用于判断数字输入弹窗是否显现
		dialog: false,
		// 图标ID
		tag_id: -1,
		token: '123',
		// 判断登陆页面显示“登录”还是“注册”
		lognRegister: '',
		// 用户信息
		user: {
			user_id: '5',
			user_name: 'tang',
			user_picture: 'http://106.55.25.207/static/user_default.png'
		},
		// 账单明细
		bill: {},
		bill_id: -1,
		ctrl: 'add'
	},
	mutations: {
		msg (state, val) {
			state.msg = val
		},
		userInfo (state, val) {
			state.user = val
		},
		getTagID (state, val) {
			state.tag_id = val
		},
		getBill (state, val) {
			state.bill = val
		},
		getBillId (state, val) {
			state.bill_id = val
		},
		getCtrl (state, val) {
			state.ctrl = val
		},
		dialogChange (state, val) {
			state.dialog = val
		}
	},
	actions: {
		lognRegister (context, val) {
			context.state.lognRegister = val
		}
	}
})
export default store;
