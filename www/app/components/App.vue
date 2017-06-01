
<template>
	<div>
	 	<canlendar-programa></canlendar-programa>
	</div>
</template>


<script>
 	import * as todoTypes from "../store/todo-types.js";
 	import CanlendarPrograma from "./canlandar/CanlendarPrograma.vue";
	export default {
		components : {
			CanlendarPrograma
		},
		data(){
			return {

			}
		},
		computed : {

		},
		// 组件被创建之后，生命周期函数
		created(){

		},
		methods : {

		}
	}
</script>