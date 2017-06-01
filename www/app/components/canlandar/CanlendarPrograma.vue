<style scoped>
	.section{
		width: 100%;
		height: 836px;
	}
	.container-fluid{
		padding:0;
		width:100%;
		height: 836px;
	}
	.container-fluid .box1{
		height: 100%;
	}
	.container-fluid .box1 .left{
		width:300px;
		height: 100%;
		position:relative;
		overflow:hidden;
		padding-right:0;
	}
	.container-fluid .box1 .left .mynav{
		float:left;
 		width:60px;
 		height:100%;
 		background:#4bbcb7;
 		box-sizing:border-box;
 		padding-top:35px;
 		padding-bottom:15px;
 	}
 	.container-fluid .box1 .left .mynav>div{
 		float:left;
 	}
 	.container-fluid .box1 .left .mynav .top-area .logo img{
		width:60px;
    	height: 50px;
    	border-radius: 3px;
 	}
 	.container-fluid .box1 .left .mynav .middle-area{
		width:60px;
		margin-top:50px;
 	}
	.container-fluid .box1 .left .mynav .middle-area a{
		display:block;
		width:60px;
		height: 80px;
		font-size:18px;
		text-align:center;
		line-height:80px;
		color:#a1fffb;
		text-decoration:none;
	}
	.container-fluid .box1 .left .mynav .middle-area a.cur{
		background:#3ca29d;
	}
	.container-fluid .box1 .left .mynav .middle-area a:hover{
		background:#3ca29d;
	}
 	.container-fluid .box1 .left .mynav .bottom-area{
		position:absolute;
		bottom:0;
		width:60px;
		height: 130px;
 	}
 	.container-fluid .box1 .left .mynav .bottom-area a{
 		display:block;
		width:60px;
		height: 80px;
		font-size:18px;
		text-align:center;
		line-height:80px;
		color:#a1fffb;
		text-decoration:none;
 	}
 	.container-fluid .box1 .left .mynav .bottom-area a:hover{
 		background:#3ca29d;
 	}
 	.container-fluid .box1 .left .mynav .bottom-area div{
 		width:60px;
		height: 60px;
		padding:10px;
		box-sizing:border-box;
 	}
 	.container-fluid .box1 .left .mynav .bottom-area div span{
 		display:block;
 		width:40px;
		height: 40px;
		background:#c87ab7;
		font-size:14px;
		text-align:center;
		line-height:40px;
		color:white;
 	}
 	.container-fluid .box1 .left .smallcalendar{
 		float:left;
 		width:200px;
 		height: 100%;
 		background:#eeeeea;
 	}
	.scoped{
		float: left;
		width:30%;
	}

 	.monthbtnbox span{
	    font-size: 20px;
	    font-family: "微软雅黑";
 	}
 	.monthbtnbox button{
 		font-size: 12px;
 		font-weight: bold;
 		outline: none;
 		margin: 0 10px;
 	}
 	.topbar{
 		padding-top: 10px;
 		padding-bottom: 10px;
 	}
 	.right{
 		padding:10px;
 	}
</style>
<template>
	<section class="section">
		<div class="container-fluid">
			<div class="box1 row">
				<div class="left col-lg-3">
					<div class="mynav">
						<div class="top-area">
							<a href="#" class="logo">
								<img src="https://s3.cn-north-1.amazonaws.com.cn/lclogo/team_logo_default.png" alt="">
							</a>
						</div>
						<div class="middle-area">
							<a href="#">消息</a>
							<a href="#">任务</a>
							<a href="#" class="cur">日历</a>
							<a href="#">网盘</a>
						</div>
						<div class="bottom-area">
							<a href="#">通讯录</a>
							<div><span>WA</span></div>
						</div>
					</div>
					<div class="smallcalendar">
						<small-calendar ></small-calendar>
					</div>
				</div>
				<div class="right col-lg-9">
					<div class="row topbar">
						<div class="monthbtnbox col-lg-4">
							<button class="btn btn-sm" @click="gotoprevmonth"> < </button>
							<span>{{$store.state.nowshow.year}}年{{$store.state.nowshow.month}}月</span>
							<button class="btn btn-sm" @click="gotonextmonth"> > </button>
						</div>
						<div class="col-lg-8 text-right">
							<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#addbox">+ 增加日程</button>

							<div class="btn-group btn-group-lg" role="group" aria-label="...">
								<button type="button" v-bind:class="['btn' ,'btn-default' , {'active' : section=='月视图'}]" @click="changesection('月视图')">月视图</button>
								<button type="button" v-bind:class="['btn' ,'btn-default' , {'active' : section=='周视图'}]" @click="changesection('周视图')">周视图</button>
								<button type="button" v-bind:class="['btn' ,'btn-default' , {'active' : section=='日视图'}]" @click="changesection('日视图')">日视图</button>
							</div>
						</div>
					</div>
					<div class="row">
						<month-canlendar v-if="section=='月视图'" ref="bigcanlendar" v-on:modify="modify"></month-canlendar>
						<week-canlendar v-if="section=='周视图'" ></week-canlendar>
						<day-canlendar v-if="section=='日视图'" ></day-canlendar>
					</div>
				</div>
			</div>
		</div>

		<!-- 弹出的“增加日程”对话框 -->
		<div class="modal fade" id="addbox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  	<add-box v-on:closeaddbox="closeaddbox" ></add-box>
		</div>

		<!-- 弹出的“修改日程”对话框 -->
		<div class="modal fade" id="modifybox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<modify-box v-on:closemodifybox="closemodifybox" v-bind:info="info"></modify-box>
		</div>
	</section>
</template>

<script>
	import MonthCanlendar from "./MonthCanlendar.vue";
	import WeekCanlendar from "./WeekCanlendar.vue";
	import DayCanlendar from "./DayCanlendar.vue";
	import * as actions from "../../store/todo-types.js";
	import AddBox from "./AddBox.vue";
	import ModifyBox from "./ModifyBox.vue";
	import SmallCalendar from "./SmallCalendar.vue";

	export default {
		components : {
			MonthCanlendar,
			ModifyBox,
			AddBox,
			DayCanlendar,
			WeekCanlendar,
			SmallCalendar
		},
		data(){
			return {
				"info" : {

				},
				"section" : "月视图"

			}
		},
		methods : {
			changesection(str){
				this.section = str;
			},
			//右按钮
			gotonextmonth(){
				this.$store.commit(actions.GOTONEXTMONTH);
				//刷新：
				this.$refs.bigcanlendar.setCanlendar();
			},
			//左按钮
			gotoprevmonth(){
				this.$store.commit(actions.GOTOPREVMONTH);
				//刷新：
				this.$refs.bigcanlendar.setCanlendar();

			},
			//关闭增加框
			closeaddbox(){
				$('#addbox').modal('hide');
				//刷新
				this.$refs.bigcanlendar.setCanlendar();
			},
			//修改
			modify(info){
				this.info = info;
				console.log(this.info)
				$('#modifybox').modal('show');
			},
			// 关闭修改窗口
			closemodifybox(){
				$('#modifybox').modal('hide');
				//刷新
				this.$refs.bigcanlendar.setCanlendar();
			},
		}
	};
</script>