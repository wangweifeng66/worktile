<style scoped>
 	body{
 		background-color: #2f2f2f;
 	}
 	.daycalendar{
 		width:100%;
 		height: 100%;
 	}
	.canlendar{
		width: 100%;
		height:750px;
		margin: 0 auto;
		position: relative;
	}
	.canlendar .bg_box{
		width : 100%;
		height: 750px;
	}
	.canlendar .schedule_box{
		width: 100%;
		height:720px;
		top : 30px;
		left:0;
		position: absolute;
	}
	.canlendar .bg_box table{
		width:100%;
		border-collapse: collapse;
	}
	.canlendar .bg_box table thead tr{
		height:30px;
		font-size: 14px;
		font-family: "微软雅黑";
	}
	.canlendar .bg_box table tbody tr{
		height:120px;
	}
	.canlendar .bg_box table tbody td{
		border: 1px solid #f2f2f2;
		position: relative;
	}
	.canlendar .bg_box table tbody td.highlight{
		background-color: #E1F5FE;
	}
	.canlendar .schedule_box .roww{
		height:120px;
	}
	.canlendar .schedule_box .roww table{
		width:100%;
		border-collapse: collapse;
	}
	.canlendar .schedule_box .roww table thead{
		height:20px;
	}
	.canlendar .schedule_box .roww table thead tr{
		height:20px;
	}
	.canlendar .schedule_box .roww table thead th{
		width:14.285%;
		text-align: right;
		box-sizing:border-box;
		padding-right: 16px;
		padding-top: 4px;
		line-height: 16px;
		font-size: 16px;
		color:#333;
		font-family: "consolas";
	}
	.canlendar .schedule_box .roww table thead th.gray{
		color:gray;
	}
	.canlendar .schedule_box .roww table tbody td{
		width:14.285%;
		padding: 2px;
		box-sizing:border-box;
	}
	.schedule div{
		border-radius: 15px;
		font-size: 12px;
		padding: 3px 10px;

	}
	.schedule.boxshadow div{
		box-shadow: 1px 1px 1px rgba(1,1,0,.9);
	}
	.schedule.life div{
		background:-webkit-linear-gradient(top,rgba(174, 213, 129, 0.49),rgba(76, 175, 80, 0.54));
	}
	.schedule.warning div{
		background:-webkit-linear-gradient(top,darkred,red);
		color:white;
	}
	.schedule.work div{
		background:-webkit-linear-gradient(top,rgba(255, 215, 0, 0.32),rgba(255, 165, 0, 0.61));
	}
	.schedule.important div{
		background:-webkit-linear-gradient(top,rgba(135, 206, 235, 0.38),rgba(33, 150, 243, 0.7));

	}

	.leftEndPointRect div{
		border-top-left-radius: 0 !important;
		border-bottom-left-radius: 0 !important;
	}
	.rightEndPointRect div{
		border-top-right-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
	#toolBox{
		font-size: 16px;
		font-weight: bold;
		background-color: white;
		box-shadow: 1px 1px 1px black;
	}
	.tip{
		position: absolute;
		bottom: 0;
		width:100%;
		text-align: center;
		font-size: 12px;
	}
	.week{
		text-align:center;
	}
</style>


<template>
	<div class="daycalendar">
		<div class="canlendar">

			<!-- 放一个table显示边框用的 -->
			<div class="bg_box">
				<table>
					<thead>
						<tr>
							<th v-for="(item,index) in dayofweek" class="week">{{item}}</th>
						</tr>
					</thead>
					<tbody class="monthtbody">
						<tr v-for="(tr,rowindx) in the42data">
							<td v-for="(col,colindex) in tr" v-bind:data-row="rowindx" v-bind:data-col="colindex">
								<span class="tip" v-if="col.schedule.length > 3">
									...{{col.schedule.length - 3}} more
								</span>
							</td>
						</tr>
 					</tbody>
				</table>
			</div>

			<!-- 核心数据 -->
			<div class="schedule_box">
				<div class="roww" v-for="index in 6">
					<table>
						<thead>
							<tr>
								<!-- 显示日期数字 -->
								<th v-for="_index in 7" v-if="the42data[index - 1].length != 0" v-bind:class="{'gray' : the42data[index - 1][_index - 1].prevmonth || the42data[index - 1][_index - 1].nextmonth}"  > {{ the42data[index - 1][_index - 1].day }}</th>
							</tr>
						</thead>
						<tbody>
							<!-- 日程表 -->
							<tr v-for="tr in domdata[index - 1]">
								<td v-for="td in tr" v-bind:colspan="td.colspan" v-bind:class="['schedule',td.classname , {'leftEndPointRect' : td.leftEndPointRect} , {'rightEndPointRect' : td.rightEndPointRect} , {'boxshadow' : td.title != ''}]" v-bind:data-_id="td._id" v-bind:data-month="td.month" v-bind:data-date="td.date" v-bind:data-hour="td.hour" v-bind:data-minutes="td.minutes" v-bind:data-hour2="td.hour2" v-bind:data-minutes2="td.minutes2" v-bind:data-title="td.title"  v-bind:data-type="td.classname" v-bind:data-during="td.colspan" v-bind:data-year="td.year" v-bind:empty="td.empty">
									<div v-bind:empty="td.empty">{{td.title}}</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<!--工具框 -->
		<div id="toolBox" style="display:none;width:380px;height:160px;padding:20px;">
			<div class="row">
				<div class="col-lg-12">{{toolBox.title}}</div>
			</div>
			<div class="row">
				<div class="col-lg-6 col-md-6">{{toolBox.month}}月{{toolBox.date}}日 {{toolBox.hour | time}}:{{toolBox.minutes | time}} ~ {{toolBox.hour2 | time}}:{{toolBox.minutes2 | time}}</div>
				<div class="col-lg-3 col-md-3">{{chinesetype(toolBox.type)}}</div>
				<div class="col-lg-3 col-md-3">持续{{toolBox.during}}天</div>
			</div>
		 	<br>

			<input type="button" value="修改日程" class="btn btn-info" @click="modify">
			<input type="button" value="删除日程" class="btn btn-danger">
		</div>=
	</div>
</template>


<script>
	import change42DataToDomData from "./change42DataToDomData.js";
	import init from "./init.js";

	export default {
			props : ["year" , "month"],

			data : function(){
				return {
					//表头
					"dayofweek" : ["周日","周一","周二","周三","周四","周五","周六"],
					//本表中的42天的数据，数据符合{title,during,type}格式
					"the42data" : [[],[],[],[],[],[]],
					//本表中的42个小格的DOM情形，Vue就是遍历这个数组来生成DOM的，里面存放colspan、title、classname等信息
					"domdata" : [[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]],
					//本表中42个小格每天的任务数量
					"the42daythingsnumber" : [
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0]
					],
					//本月的API格式信息
					"themonth" : [],
					//上个月的信息
					"prevmonth" : [],
					//下个月的信息
					"nextmonth" :  [],
					"chupeng_id" : "",
					"toolBox" : {
						"title" : "",
						"date" : "",
						"month" : "",
						"during" : "",
						"type" : "",
						"hour" : "",
						"hour2" : "",
 						"minutes" : "",
 						"minutes2" : ""
					}
				}
			},
			created : function(){
			 	this.setCanlendar();
			},
			mounted : function(){
				//绑定监听
				var self = this;
				//在日程条上面移动的时候
				$("table").delegate("td.schedule[data-_id]","mousemove",function(event){
					event.preventDefault();
					var $this = $(this);
					$("#toolBox").css({
						"position" : "fixed",
						"top" : (function(){
							if(event.clientY > $(window).height() - 160){
								return $(window).height() - 160;
							}else{
								return  $this.offset().top - $(window).scrollTop() + 30;
							}
						})(),
						"left" : $this.offset().left
					});
					self.chupeng_id = $(this).attr("data-_id");
				});
				//鼠标离开日程条
				$("table").delegate("td.schedule","mouseleave",function(event){
					$("#toolBox").stop(true).delay(500).hide(100);
				});
				//鼠标进入日程条
				$("table").delegate("td.schedule[data-_id]","mouseenter",function(event){
					$("#toolBox").stop(true).show(100);

					//改变数据就行
					self.toolBox = {
						title : $(this).attr("data-title"),
						month : $(this).attr("data-month").length == 1 ? "0" + $(this).attr("data-month") : $(this).attr("data-month"),
						date : $(this).attr("data-date").length == 1 ? "0" + $(this).attr("data-date") : $(this).attr("data-date"),
						hour : $(this).attr("data-hour").length == 1 ? "0" + $(this).attr("data-hour") : $(this).attr("data-hour"),
						minutes : $(this).attr("data-minutes").length == 1 ? "0" + $(this).attr("data-minutes") : $(this).attr("data-minutes"),
						hour2 : $(this).attr("data-hour2").length == 1 ? "0" + $(this).attr("data-hour") : $(this).attr("data-hour2"),
						minutes2 : $(this).attr("data-minutes2").length == 1 ? "0" + $(this).attr("data-minutes2") : $(this).attr("data-minutes2"),
						type : $(this).attr("data-type"),
						during : $(this).attr("data-during"),
						year : $(this).attr("data-year"),
						_id : $(this).attr("data-_id")
					}
				});
				//鼠标进入提示框
				$("#toolBox").bind("mouseenter",function(event){
					event.preventDefault();
					$("#toolBox").stop(true,true).show(100);
				});
				//鼠标离开提示框
				$("#toolBox").bind("mouseleave",function(event){
					$("#toolBox").stop(true,true).hide(100);
				});


			},
			//页面更新完毕之后
			updated : function(){
				var self = this;
				//拖拽事件。之所以在updated里面添加，是因为这时候td已经上树
				$("td.schedule div").draggable({
					"containment" : ".monthtbody",
					"drag" : function(event , ui){
						$("#toolBox").hide();

						var left = event.clientX + $(window).scrollLeft();
						var top  = event.clientY + $(window).scrollTop();
						var $this = $(this);

						$(".bg_box table tbody tr td").each(function(){
							var T = $(this).offset().top;
							var R = $(this).offset().left + $(this).width();
							var B = $(this).offset().top + $(this).height();
							var L = $(this).offset().left;
							if(left > L && left < R && top > T && top < B){
								let row = Number($(this).attr("data-row"));
								let col = Number($(this).attr("data-col"));

								let data = self.the42data[row][col];

								let during = Number($this.parent().attr("data-during"));

								$(".bg_box tbody td").removeClass("highlight")
								for(let i = row * 7 + col ; i < row * 7 + col + during ; i++){
									 $(".bg_box tbody td").eq(i).addClass("highlight");
								}
							}
						});
					},
					"stop" : function(event, ui){
						var left = event.clientX + $(window).scrollLeft();
						var top  = event.clientY + $(window).scrollTop();

					 	$(".bg_box tbody td").removeClass("highlight")
						var $this = $(this);

						//遍历42个格格
						$(".bg_box table tbody tr td").each(function(){
							var T = $(this).offset().top;
							var R = $(this).offset().left + $(this).width();
							var B = $(this).offset().top + $(this).height();
							var L = $(this).offset().left;

							if(left > L && left < R && top > T && top < B){
								let row = $(this).attr("data-row");
								let col = $(this).attr("data-col");

								let data = self.the42data[row][col];

								let month = (function(){
									if(data.prevmonth){
										if(self.$store.state.nowshow.month == 1){
											return 12;
										}else{
											return self.$store.state.nowshow.month - 1;
										}
									}else if(data.nextmonth){
										if(self.$store.state.nowshow.month == 12){
											return 1;
										}else{

											return self.$store.state.nowshow.month + 1;
										}
									}else{
										return self.$store.state.nowshow.month;
									}
								})();

								let year = (function(){
									if(data.prevmonth){
										if(self.$store.state.nowshow.month == 1){
											return self.$store.state.nowshow.year - 1;
										}else{
											return self.$store.state.nowshow.year;
										}
									}else if(data.nextmonth){
										if(self.$store.state.nowshow.month == 12){
											return self.$store.state.nowshow.year + 1;
										}else{
											return self.$store.state.nowshow.year;
										}
									}else{
										return self.$store.state.nowshow.year;
									}
								})();

								let date = data.day;


								$.post("/modifydate",{
									"_id" : $this.parent().attr("data-_id"),
									"date" : `${year}-${month}-${date}`
								},function(){
									self.setCanlendar();
								});
							}
						})
					}
				});


			},
			methods : {
				//修改按钮
				modify(){
					this.$emit("modify",this.toolBox);
				},
				//将英语的类型名字变为中文
				chinesetype(type){

					return init.schedule_types[type];
				},
				//这个函数的主要目的就是发出Ajax请求，请求三个月份的数据，更新这个组件的the42data、domdata两个数据。
				//the42data和表格形态有关，domdata决定了schedule的呈递。
				setCanlendar : function(){
					//复原
					this.domdata = [[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]];
					this.the42data = [[],[],[],[],[],[]];
					this.the42daythingsnumber = [
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0]
					];

					var self = this;
					//今年
					var y = this.$store.state.nowshow.year;
					//本月
					var m = this.$store.state.nowshow.month;
					//上一月所在的年
					var prevy = m == 1 ? y - 1 : y;
					//上一月
					var prevm = m == 1 ? 12 : m - 1;
					//下一月所在的年
					var nexty = m == 12 ? y + 1 : y;
					//下一月
					var nextm = m == 12 ? 1 : m + 1;


					$.get("/schedule/" + y + "/" + m,function(benyue){
						self.themonth = benyue.results;

						$.get("/schedule/" + prevy + "/" + prevm,function(shangyue){
							self.prevmonth = shangyue.results;
							$.get("/schedule/" + nexty + "/" + nextm,function(xiayue){
								self.nextmonth = xiayue.results;
								set.call(self);
							});
						});
					});

					function set(){
						var themonth = _.clone(this.themonth);
						var prevmonth = _.clone(this.prevmonth);
						var nextmonth = _.clone(this.nextmonth);



						//本月第一天，日期对象
						var thefirstdate = new Date(this.$store.state.nowshow.year , this.$store.state.nowshow.month - 1 , 1);
						//查看本月第一天星期几
						var thefirestdateday = thefirstdate.getDay();
						//星期几就补几个上月（星期0特殊补充7个，星期1补充1个，星期2补充2个……星期6补充6个）
						//上月需要补充的个数
						var shangyuebuchonggeshu = thefirestdateday == 0 ? 7 : thefirestdateday;
						//将上月的补充到第一行
						while(shangyuebuchonggeshu--){
							let o = prevmonth.pop();
							o.prevmonth = true;
							this.the42data[0].unshift(o)
						}


						//第0行还需要本月的个数
						var count = thefirestdateday != 0 ? 0 : 1;
						var diyihangbenyuegeshu = 7 - thefirestdateday;
						while(diyihangbenyuegeshu--){
							this.the42data[count].push(themonth.shift());
						}

						while(themonth.length > 7){
							count ++;
							this.the42data[count] = themonth.slice(0,7);
							themonth = themonth.slice(7)
						}
						//剩下的本月天数推进去
						this.the42data[++count] = themonth;
						//这不满的这一行需要下月的天数个数
						var zhehangxiayuetianshu = 7 - themonth.length;
						while(zhehangxiayuetianshu--){
							let o = nextmonth.shift();
							o.nextmonth = true;
							this.the42data[count].push(o);
						}

						//补满7天，
						this.the42data[++count] = nextmonth.slice(0,7);
						//遍历最后一行7天，加上nextmonth = true;
						this.the42data[count].forEach((item)=>{
							item.nextmonth = true;
						});
						//至此，this.the42data已经生成完毕，下面要根据这个数组来生成42天的DOM情形




						//【分析跨月】
						//这里可以看看4月份还没有做完的，遗留到本月的
						//遍历上个月的数组
						var self = this;
						//计数器，计算下来有多少个事情跨月了
						var count = 0;
						for(let i = 0 ; i < prevmonth.length ; i++){
							prevmonth[i].schedule.forEach((item,index)=>{
								if(item.during + i > prevmonth.length){
									//发生了跨月的情况
									//计算剩到本月多少天
									let rest = item.during - (prevmonth.length - i);


									//干三件事儿！
									for(let m = 0 ; m < rest ; m++){
										let hanghao = parseInt(m / 7);
										let liehao = m % 7;

										//第一件事儿，改变the42daythingsnumber
										self.the42daythingsnumber[hanghao][liehao] ++;

										//第二件事儿，改变这些天的occupation
										if(!self.the42data[hanghao][liehao].hasOwnProperty("occupation")){
											self.the42data[hanghao][liehao].occupation = [];
										}
										self.the42data[hanghao][liehao].occupation.push(count);
									}


									for(let tang = 0 ; tang < Math.ceil(rest / 7) ; tang++){
										if(tang != Math.ceil(rest / 7) - 1){
											this.domdata[tang][count] = [{"title" : item.title, "classname" : item.type , "colspan" : 7 , "leftEndPointRect" : true , "rightEndPointRect" : true , "_id" : item._id , "date" : item.date , "month" : item.month , "hour" : item.hour , "minutes" : item.minutes , "year" : item.year,"hour2" : item.hour2 , "minutes2" : item.minutes2 }]
										}else{
											this.domdata[tang][count] = [{"title" : item.title, "classname" : item.type , "colspan" : rest % 7 == 0 ? 7 : rest % 7 ,"leftEndPointRect" : true, "_id" : item._id , "date" : item.date , "month" : item.month , "hour" : item.hour , "minutes" : item.minutes ,"year" : item.year,"hour2" : item.hour2 , "minutes2" : item.minutes2}]
										}
									}

									count ++;
								}
							});
						}

						//调用函数
						change42DataToDomData(this.the42data , this.the42daythingsnumber , this.domdata);


					}
				}
			}

		}

</script>