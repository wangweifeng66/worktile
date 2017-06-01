var mongoose = require('mongoose');


var businessSchema = new mongoose.Schema({
	title : String,
	year : Number,
	month : Number , //1、2、3、4、5、6、7、8、9、10、11、12
	date : Number , //日子，不是日期
	hour : Number,	//时间0、1、2、3、4……、23
	minutes : Number , //分钟0、1、2、3、……、59
	hour2 : Number,	//时间0、1、2、3、4……、23
	minutes2 : Number , //分钟0、1、2、3、……、59
	type : String,
	during : Number
});

//类
var Business = mongoose.model("Business",businessSchema);

//暴露
module.exports = Business;