function change42DataToDomData(the42data , the42daythingsnumber , domdata){
	//最终要返回的值
	//arrindex表示行序号，0、1、2、3、4、5
	for(var arrindex = 0 ; arrindex < 6 ; arrindex++){
		var weekarr = the42data[arrindex];
		//计算总tr数
		weekarr.forEach((item,index)=>{
			if(!item.hasOwnProperty("occupation")) item.occupation = [];
			the42daythingsnumber[arrindex][index] += item.schedule.length;
			//遍历这个item看看有没有项目有during属性
			item.schedule.forEach((JSON,index2)=>{
				if(JSON.during && JSON.during > 1){
					//在后面的日期加上这个长度
					for(var i = index + 1 ; i < index + JSON.during ; i++){
						if(arrindex + parseInt(i / 7) >= 6){
							continue;
						}
						// TODOS：一会儿这里要考虑出月份，等于说arrindex + parseInt(i / 7)只能是0、1、2、3、4、5
						the42daythingsnumber[arrindex + parseInt(i / 7)][i % 7] ++;
					}
				}
			});
		});
		var max = _.max(the42daythingsnumber[arrindex]);
		var times = max > 3 ? 3 : max; //循环次数


		//生成了DOM
		weekarr.forEach((item,index)=>{
			item.firstnumber = 0;
			for(var i = 0 ; i < times ; i++){
				//如果这一项目没有被占用
				if(_.indexOf(item.occupation , i) == -1){
					var first = item.schedule[item.firstnumber++];	 
					if(first === undefined){
						domdata[arrindex][i].push({"colspan":1,"title":"","empty" : true});
					}else{
						domdata[arrindex][i].push({"colspan":first.during || 1,"title":first.title , "classname" : first.type , "rightEndPointRect" : index + first.during > 7 , "_id" : first._id ,   "date" : first.date , "month" : first.month , "hour" : first.hour , "minutes" : first.minutes,"hour2" : first.hour2 , "minutes2" : first.minutes2 , "year" : first.year});
						//干一件事儿，在后面那么多天的occupation中加入自己的行号
						if(first.during && first.during != 1){
							//不能超过星期6，end：1、2、3、4、5、6、7
							//这行循环的终点
							let end = index + first.during > 7 ? 7 : index + first.during;
							//还剩
							let rest = (first.during - (7 - index));
							//改变这个星期的occupation
							for(let _i = index + 1 ; _i < end ; _i++){
								weekarr[_i].occupation.push(i);
							}
							
							var _rest;
							var count = 0;
							while(rest > 0){
								_rest = rest > 7 ? 7 : rest;
								rest -= _rest;
								count++;
							 	//改变下一个星期的occupation
								let nextweekarr = the42data[arrindex + count];
								//如果越界了，抑制住就行，不需要做任何事情。
								if(nextweekarr == undefined){
									continue;
								}

								for(let _i = 0 ; _i < _rest ; _i++){
									if(!nextweekarr[_i].hasOwnProperty("occupation")){
										nextweekarr[_i].occupation = [];
									}
									//改变下一周前几天的occupation
									nextweekarr[_i].occupation.push(i);
									//把下一周每日数量数组改变
									if(the42daythingsnumber[arrindex + count] == undefined){
										continue;
									}
									the42daythingsnumber[arrindex + count][_i] ++;
									//改变下一周的结果montharr（总结过）
									domdata[arrindex + count][i] = [{"title" : first.title , "classname" : first.type , "colspan" : _rest, "leftEndPointRect" : true , "rightEndPointRect" : rest != 0 , "_id" : first._id , "date" : first.date , "month" : first.month , "hour" : first.hour , "minutes" : first.minutes, "year" : first.year, "minutes" : first.minutes,"hour2" : first.hour2 , "minutes2" : first.minutes2 }];
								}
							}
						}
					}
				}
			}
		});
	}
}


export default change42DataToDomData;