(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"20ba":function(t,e,n){"use strict";(function(t){n("ad0d");u(n("66fd"));var e=u(n("63ee"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},2172:function(t,e,n){},"63ee":function(t,e,n){"use strict";n.r(e);var u=n("c369"),r=n("cbd9");for(var s in r)"default"!==s&&function(t){n.d(e,t,(function(){return r[t]}))}(s);n("bdc2");var a,i=n("f0c5"),o=Object(i["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);e["default"]=o.exports},bdc2:function(t,e,n){"use strict";var u=n("2172"),r=n.n(u);r.a},c369:function(t,e,n){"use strict";var u;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return u}));var r=function(){var t=this,e=t.$createElement;t._self._c},s=[]},cbd9:function(t,e,n){"use strict";n.r(e);var u=n("fa17"),r=n.n(u);for(var s in u)"default"!==s&&function(t){n.d(e,t,(function(){return u[t]}))}(s);e["default"]=r.a},fa17:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={data:function(){var t=new Date,e=t.getFullYear(),u=t.getMonth()+1,r=t.getDate();return{year:e,month:u,day:r,token:"",user:{},number:{},menuList:[{url:n("d71d"),desc:"消息"},{url:n("eaff"),desc:"我的微章"},{url:n("0599"),desc:"我的积分"},{url:n("4dc2"),desc:"邀请好友"},{url:n("d013"),desc:"设置"}]}},onLoad:function(){},onShow:function(){this.user=this.$store.state.user,this.token=this.$store.state.token,this.initUser()},computed:{msg:function(){return this.$store.state.msg}},methods:{initUser:function(){var e=this,n=Math.round((new Date).getTime()/1e3).toString();this.user.user_id&&t.request({url:"http://106.55.25.207/user/user_center",data:{user_id:this.user.user_id,token:this.token,time:n},method:"POST",success:function(t){e.number=t.data.data}})},toLognRegister:function(e){this.$store.dispatch("lognRegister",e),t.navigateTo({url:"/pages/lognRegister/lognRegister"})}}};e.default=u}).call(this,n("543d")["default"])}},[["20ba","common/runtime","common/vendor"]]]);