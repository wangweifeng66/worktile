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
						<input type="text" class="form-control" id="titletxt"  v-bind:value="info.title">
				    </div>
				  </div>
				 <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">日期</label>
				    <div class="col-sm-7">
				      <input type="date" class="form-control" id="datetxt"  v-bind:value="info.year + '-' + info.month + '-' + info.date">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">开始时间</label>
				    <div class="col-sm-7">
				      <input type="time" class="form-control" id="timetxt"  v-bind:value="info.hour + ':' + info.minutes">
				    </div>
				  </div>
				   <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">结束时间</label>
				    <div class="col-sm-7">
				      <input type="time" class="form-control" id="time2"  v-bind:value="info.hour2 + ':' + info.minutes2">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">类型</label>
				    <div class="col-sm-7">
				      <select class="form-control"  id="type">
				      	<option v-for="(val, key, index) in init.schedule_types" v-bind:value="key" v-bind:selected="info.type == key">{{val}}</option>
				      </select>
				    </div>
				  </div>
				   <div class="form-group">
					    <label for="inputEmail3" class="col-sm-2 control-label">持续几天</label>
					    <div class="col-sm-7">
					      <input type="number" class="form-control" id="duringtxt" v-bind:value="info.during">
					    </div>
				  	</div>
			 	</form>
	      	</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" @click="modifyschedule">保存日程</button>
			</div>
	    </div>
  </div>

</template>

<script type="text/javascript">
	import init from "./init.js";

	export default {
		props : ["info"],
		data(){
			return {
				"boxtitle" : "修改日程",
				"init" : init
			}
		},
		methods : {
			modifyschedule(){
				var o = {
					_id 	: this.info._id,
					title 	: $("#titletxt").val(),
					date 	: $("#datetxt").val(),
					time 	: $("#timetxt").val(),
					time2 	: $("#time2").val(),
					type 	: $("#type").val(),
					during 	: $("#duringtxt").val()
				}

				if(o.during > 20){
					alert("持续时间不能超过20天");
					return;
				}


				var self = this;
				$.post("/modifyschedule",o,function(data){
					if(data == "ok"){
						self.$emit("closemodifybox");
					}
				});
			}
		}
	}
</script>