// 定义一些工具方法
var Util = {
	/**
	 * 获取模板内容
	 * @id  	元素的id
	 * return 	模板内容
	 **/ 
	tpl:function (id) {
		// console.log(1)
		return document.getElementById(id).innerHTML
	},
	/**
	 * 获取异步数据的方法
	 * @url 	请求地址
	 * @fn 		成功时候的回调函数
	 ***/
	ajax: function (url, fn) {
		// 创建xhr对象
		var xhr = new XMLHttpRequest();
		// 监听事件
		xhr.onreadystatechange = function () {
			// 监听readystate
			if(xhr.readyState === 4) {
				// 监听 status
				if (xhr.status === 200) {
					// console.log(xhr)
					// 将解析 的数据传递给fn
					fn && fn(JSON.parse(xhr.responseText))
				}
			}
		}
		// 打开请求
		xhr.open('GET', url, true)
		// 发送数据
		xhr.send(null)
	}
}

// 定义过滤器
// 价格过滤器
Vue.filter('itemPrice', function (str) {
	return str + '元';
})
// 原价过滤器
Vue.filter('itemOrigin', function (str) {
	return '门市价：' + str + '元';
})
// 销售数量过滤器
Vue.filter('itemSale', function (str) {
	return '已售' + str;
})

// 第二步 定义组件
// 首页组件
var Home = Vue.extend({
	template: Util.tpl('tpl_home'),
	// 数据绑定在data属性中
	data: function () {
	// 	// 返回值才是绑定的数据
		return {
			// 定义广告数据
			celan: [],
			// 定义商品数据
			fenlei: [],
			ayi:[],
			pxh:[],
			xqy:[]
		}
	},
	// 商品以及广告的数据，应该在组件创建完成之后，才请求
	created: function () {
		// 通知父组件显示搜索框
		// this.$dispatch('showSeach', true);
		var that = this;
		// console.log(that)
		// console.log(this, arguments)
		// console.log(222)
		// 请求数据
		// console.log(222)
		Util.ajax('data/home.json', function (res) {
			// console.log(111)
			// console.log(this)
			// console.log(res)
			// 判断请求成功
			if (res && res.data) {
				// 更新广告数据
				that.celan = res.data.celan;
				// 更新列表数据
				that.fenlei = res.data.fenlei;
				that.ayi = res.data.ayi;
				that.pxh = res.data.pxh;
				that.xqy = res.data.xqy;
				// that.$set('list', res.data.list)
				// console.log(res);
				// console.log(that.xqy)
			}
		})
	},
	methods:{
		showcelan:function(event){
		     $('.main').toggleClass('translate');
		     event.stopPropagation();
		     event.cancelBubble=true;
		},
       hidecelan:function(){
		     $('.main').removeClass('translate');
		}
	}
})
// 列表页组件1
var List2=Vue.extend({
	template:Util.tpl('tpl_list2'),
	data:function(){
		return{
			pxh:[]
		}
	},
	created: function () {
		// 通知父组件显示搜索框
		// this.$dispatch('showSeach', false);
		// 缓存this
		var that = this;
		// 发送请求
		Util.ajax('data/list.json', function (res) {
			console.log(res)
			if (res && res.errno === 0) {
				that.pxh = res.data.pxh;
			}
		})
	}
})
var List = Vue.extend({
	// props捕获属性数据
	// props: ['query'],
	// 定义props，将搜索的字段注册到组件数据中
	// props: ['compSearch'],
	template: Util.tpl('tpl_list'),
	// 绑定数据
	data: function () {
		return {
			// 商品数据需要异步请求获取
			celan:[],
			pjl:[],
			xqy:[],
			// 定义剩余产品
			other:[]
		}
	},
	// 异步请求写在生命周期created方法中
	created: function () {
		// 通知父组件显示搜索框
		// this.$dispatch('showSeach', true);
		var that = this;
		// console.log(this.query)
		// console.log(this.$parent.query)
		// var key = this.$parent.query[0];
		// var id = this.$parent.query[1]
		// console.log(this)
		// 发送请求获取数据,携带商品的类别信息
		Util.ajax('data/list.json', function (res) {
			// console.log(res)
			if (res && res.errno === 0) {
				// 存储数据
				// 最开始只渲染三个数据，所以要截取前三个
				that.celan=res.data.celan;
				that.pjl=res.data.pjl;
				that.xqy = res.data.xqy.slice(0,8);
				// 存储剩余的产品数据
				that.other = res.data.xqy.slice(8);
			}
		})
	},
	// 定义方法
	methods: {
		loadMore: function () {
			// 显示所有的产品
			this.xqy = [].concat(this.xqy, this.other)
			// 清空other
			this.other = [];
		},
		// 点击排序按钮，对产品排序
		productSortBy: function (e) {
			// 优惠的排序是 根据： 原价-现价
			if (e === 'cutprice') {
				this.xqy.sort(function (a, b) {
					// 原价减去现价，再排序
					var aCutPrice = a.old_money.replace(/¥+/g,"") - a.money;
					var bCutPrice = b.old_money.replace(/¥+/g,"") - b.money;
					// 升序
					// return aCutPrice - bCutPrice
					// 降序
					return bCutPrice - aCutPrice
				})
				// return ;
			} else if(e==="sell"){
				// 对list数组排序
			   this.xqy.sort(function (a, b) {
					// 对e变量对应的字段排序  升序
				return b[e].replace(/\D+/g,"")-a[e].replace(/\D+/g,"")
				 })
			}else{
				this.xqy.sort(function (a, b) {
						return a[e] - b[e]
					})
					// 降序
					// return b[e] - a[e]
				}
			// console.log(e)
			// console.log(e.currentTarget.getAttribute('data-id'))
		},
		showcelan:function(event){
		     $('.main').toggleClass('translate');
		     event.stopPropagation();
		     event.cancelBubble=true;
		},
       hidecelan:function(){
		     $('.main').removeClass('translate');
		},
		goBack:function(){
			history.go(-1)
		}
	  }
})
// 详情页组件
var Detail = Vue.extend({
	template: Util.tpl('tpl_detail'),
	data: function () {
		return {
			intro:[],
			detail:[],
			xqy:[]
		}
	},
	// 在生命周期create方法中请求数据
	created: function () {
		// 通知父组件显示搜索
		// this.$dispatch('showSeach', false);
		// 缓存this
		var that = this;
		// 发送请求
		Util.ajax('data/product.json?id' + that.$parent.query[0], function (res) {
			// console.log(res)
			if (res && res.errno === 0) {
				that.intro = res.data.intro;
				that.detail = res.data.detail;
				that.xqy=res.data.xqy;
			}
		})
	},
	ready:function(){
		//tab切换
         $(".slideBox").slide({autoPlay:true});
        //首页轮播切换
		//  $(function() {
		//    $('.flex_300 .flexslider').flexslider({
		//          animation: "slide",     
		//          before: function(){
		//          $('.flex_420').css({'background':'#000'});
		//          }
		//    });
		// });
		   //详情页轮播切换
         var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        loop:true,
	        effect: 'flip',
	        grabCursor: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev'
	    });
	},
	methods:{
		goBack:function(){
			history.go(-1)
		}
	}
})

// 第三步 注册组件
Vue.component('home', Home)
Vue.component('list', List)
Vue.component('list2', List2)
Vue.component('detail', Detail)

// 实例化vue
var app = new Vue({
	// 定义容器元素
	el: '#app',
	// 绑定数据
	data: {
		// msg: '爱创课堂'
		// 定义切换组件的变量
		view: 'home',
		// 路由参数
		query: [],
		// 搜索输入框输入的字段
		search: '',
		// 要传递给组件搜索的字段
		sendSeach: '',
		// 是否显示搜索框
		isShowSeach: true
	},
	// 定义事件回调函数
	methods: {
		goSeach: function () {
			// 更新sendSeach数据
			this.sendSeach = this.search;
			// location.hash = '#/list/seach/' + this.search
		},
		// 返回逻辑
		goBack: function () {
			history.go(-1)
		}
	},
	// 订阅消息
	events: {
		'showSeach': function (value) {
			// 根据value值决定是否显示搜索框
			this.isShowSeach = value;
		}
	}
})

// 定义路由方法
function route () {
	// 获取hash 
	var hash = location.hash;	// #/list/type/1
	// 删除#  #/list/type/1 => /list/type/1
	hash = hash.slice(1)
	// 删除可能存在	/list/type/1 => list/type/1
	hash = hash.replace(/^\//, '')	
	// 切割hash字段 list/type/1 => ['list', 'type', '1']
	hash = hash.split('/')
	// var hash1 = location.hash.slice(1).replace(/^\//, '').split('/')
	// console.log(hash1)
	// 定义组件名称映射表
	var map = {
		home: true,
		list: true,
		list2:true,
		detail: true
	}
	// 根据hash[0]决定渲染哪个组件，就是切换app.view值
	// 要判断hash[0]是否可以切换
	if (map[hash[0]]) {
		app.view = hash[0]
	// 否则进入默认路由，首页
	} else {
		app.view = 'home'
	}
	// 将路由参数保存在参数中, 后面要根据路由参数，请求数据
	app.query = hash.slice(1);

}

// 绑定hashchange事件
window.addEventListener('hashchange', route)
// 页面加载后会触发load事件，此时也要检测路由
window.addEventListener('load', route)