var Business = require("../models/Business.js");
var formidable = require('formidable');
var ObjectId = require("mongodb").ObjectId;

exports.getschedule = function(req,res){
	var year = parseInt(req.params.year);
	var month =  parseInt(req.params.month);

	Business.find({"year" : year , "month" : month},function(err,results){
		var r = [];
		//这个月有多少天
		if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
			var days = 31;
		}else if(month != 2){
			var days = 30;
		}else if(month == 2){
			if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
				var days = 29;
			}else{
				var days = 28;
			}
		}

		//遍历这么多天
		for(var i = 1 ; i <= days ; i++){
			//寻找这一天做的事情，本月的事情是results
			//过筛子
			var schedule = results.filter(function(item){
				return item.date == i;
			});

			//排序
			schedule.sort(function(a,b){
				if(a.hour > b.hour){
					return 1;
				}else if(a.hour == b.hour){
					if(a.minutes > b.minutes){
						return 1;
					}
				}
				return -1;
			});

			r.push({
				"day" : i,
				"prevmonth": false,
				"nextmonth": false,
				"schedule" : schedule
			});
		}
		res.json({"results" : r});
	});
}



exports.addschedule = function(req,res){
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		//fields普通控件，files文件控件
		var title = fields.title;
		var type = fields.type;
		var during = fields.during;
		var r = /^(.+)\-(.+)\-(.+)$/.exec(fields.date);

		var year = r[1];
		var month = r[2];
		var date = r[3];

		var r = /^(.+)\:(.+)$/.exec(fields.time);
		var hour = r[1];
		var minutes = r[2];

		var r = /^(.+)\:(.+)$/.exec(fields.time2);
		var hour2 = r[1];
		var minutes2 = r[2];

		var b = new Business({
			year : year,
			month : month,
			date : date,
			hour : hour,
			minutes : minutes,
			hour2 : hour2,
			minutes2 : minutes2,
			title : title,
			type : type,
			during : during
		});

		b.save();

		res.send("ok");
	});
}



exports.modifyschedule = function(req,res){
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		var _id = fields._id;
		var title = fields.title;
		var type = fields.type;
		var during = fields.during;

		var r = /^(.+)\-(.+)\-(.+)$/.exec(fields.date);

		var year = r[1];
		var month = r[2];
		var date = r[3];

		var r = /^(.+)\:(.+)$/.exec(fields.time);
		var hour = r[1];
		var minutes = r[2];


		var r = /^(.+)\:(.+)$/.exec(fields.time2);
		var hour2 = r[1];
		var minutes2 = r[2];

		Business.find({"_id" : ObjectId(_id)},function(err,results){
			if(results.length == 0){
				res.send("wrong");
				return;
			}
			var b = results[0];


			b.year 		= year;
			b.month 	= month;
			b.date 		= date;
			b.hour 		= hour;
			b.minutes 	= minutes;
			b.hour2 	= hour2;
			b.minutes2 	= minutes2;
			b.title 	= title;
			b.type 		= type;
			b.during 	= during;

			b.save();

			res.send("ok");
		});

	});
}


//拖拽的时候改变日期
exports.modifydate = function(req,res){
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		var _id = fields._id;

		var r = /^(.+)\-(.+)\-(.+)$/.exec(fields.date);

		var year = r[1];
		var month = r[2];
		var date = r[3];


		Business.find({"_id" : ObjectId(_id)},function(err,results){
			if(results.length == 0){
				res.send("wrong");
				return;
			}
			var b = results[0];

			b.year 		= year;
			b.month 	= month;
			b.date 		= date;

			b.save();

			res.send("ok");
		});

	});
}