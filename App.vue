<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {
			// uni.getProvider ({
			// 	service: 'oauth',
			// 	success: (res) => {
			// 		if (~res.provider.indexOf('weixin')) {
			// 			uni.login({
			// 				provider: 'weixin',
			// 				success: (res) => {
			// 					console.log(res)
			// 					uni.getUserInfo ({
			// 						provider: 'weixin',
			// 						success: (info) => {
			// 							console.log(info.userInfo.nickName)
			// 						}
			// 					})
			// 				}
			// 			})
			// 		}
			// 	}
				
			// })
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	/* @import url("./common/uni-app.scss"); */
</style>
