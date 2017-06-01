<style>

</style>

<template>
	<div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">{{boxtitle}}</h4>
	      </div>
	      <div class="modal-body">
	      		<form class="form-horizontal">
	       		 <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">日程安排</label>
				    <div class="col-sm-7">
				      <input type="email" class="form-control" id="title" v-model="myform.title">
				    </div>
				  </div>
				 <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">日期</label>
				    <div class="col-sm-7">
				      <input type="date" class="form-control" id="date" v-model="myform.date">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">开始时间</label>
				    <div class="col-sm-7">
				      <input type="time" class="form-control" id="time" v-model="myform.time">
				    </div>
				  </div>
				   <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">结束时间</label>
				    <div class="col-sm-7">
				      <input type="time" class="form-control" id="time" v-model="myform.time2">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">类型</label>
				    <div class="col-sm-7">
				      <select class="form-control" v-model="myform.type">
				      	<option v-for="(val, key, index) in init.schedule_types" v-bind:value="key">{{val}}</option>

				      </select>
				    </div>
				  </div>
				   <div class="form-group">
					    <label for="inputEmail3" class="col-sm-2 control-label">持续几天</label>
					    <div class="col-sm-7">
					      <input type="number" class="form-control" id="during" v-model.number="myform.during">
					    </div>
				  	</div>
			 	</form>
	      	</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" @click="addschedule">保存日程</button>
			</div>
	    </div>
  </div>

</template>

<script type="text/javascript">
	import init from "./init.js";

	export default {
		data(){
			return {
				"boxtitle" : "增加日程",
				"myform" : {
					"title" : "",
					"time" : "10:00",
					"time2" : "11:00",
					"date" : "",
					"type" : "life",
					"during" : 1
				},
				"init" : init
			}
		},
		methods : {
			addschedule(){
				if(this.myform.date == ""){
					alert("请填写日期！");
					return;
				}

				if(this.myform.title == ""){
					alert("请填写啥事儿！！");
					return;
				}

				if(this.myform.during > 20){
					alert("持续时间不能超过20天！");
					return;
				}

				var self = this;
				$.post("/addschedule",this.myform,function(data){
					if(data == "ok"){
						self.$emit("closeaddbox");
					}
				});
			}
		}
	}
</script>