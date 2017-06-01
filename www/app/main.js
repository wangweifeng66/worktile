import Vue from "vue";
import Vuex from "vuex";
import App from "./components/App.vue";

//全局store
import store from "./store/index.js";

//自定义一个过滤器
Vue.filter("time",function(value){
	return value.length == 1 ? "0" + value : value;
});

//new 一个vue的实例
new Vue({
	el : "#app",
	store,
	components : {
		App
	}
});
