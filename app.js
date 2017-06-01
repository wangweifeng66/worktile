var express = require('express');
var app = express();
var mainctrl = require("./controller/mainctrl.js");

//链接数据库，nodejs进程实时和数据库保持链接
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/worktile');

//开启静态资源路由
app.use(express.static('www'));
//路由清单
app.get("/schedule/:year/:month", mainctrl.getschedule);  //获得初始日程接口
app.post("/addschedule", mainctrl.addschedule);  //增加日程接口
app.post("/modifyschedule", mainctrl.modifyschedule);		//修改日程接口
app.post("/modifydate", mainctrl.modifydate)	//拖拽时修改日期


var server = app.listen(3000, function () {
  console.log("运行在了3000端口");
});