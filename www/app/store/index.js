import Vue from "vue";
import Vuex from "vuex";
import createLogger from "./logger/logger.js";
import todoActions from "./actions/todoActions.js";
import * as todoTypes from "./todo-types.js";

Vue.use(Vuex);

let store = new Vuex.Store({
	//store中的四大属性state、mutations、getters、actions、plugins
	"state" : {
		"nowshow" : {
			"year" : 2017,
			"month" : 5
		}
	},
	"mutations" : {
		[todoTypes.GOTONEXTMONTH] (state , todos){
			if(state.nowshow.month == 12){
				state.nowshow.year ++;
				state.nowshow.month = 1;
			}else{
				state.nowshow.month++;
			}
		},
		[todoTypes.GOTOPREVMONTH] (state , todos){
			if(state.nowshow.month == 1){
				state.nowshow.year --;
				state.nowshow.month = 12;
			}else{
				state.nowshow.month--;
			}
		}
	},
	"actions" : {
		...todoActions
	},
	"plugins": [createLogger()],
	"getters" : {
		 
	}
});

export default store;