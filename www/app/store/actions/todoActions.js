import * as todoTypes from "../todo-types.js";
export default {
	//初始化
	[todoTypes.ADD]({commit}){
		commit(todoTypes.ADD);
	}
}