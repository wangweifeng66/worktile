<style scoped>
    .smallcalendar{
        width: 100%;
        height: 100%;
    }
    .header{
        margin-top:15px;
        width:100%;
        height:50px;
        overflow:hidden;
    }
    .header .left{
        float:left;
        width:60px;
        height: 50px;
        text-align:center;
        font-size:18px;
        line-height:50px;
    }
    .header .right{
        float:right;
        width:60px;
        height: 50px;
        text-align:center;
        line-height:50px;
        font-size:18px;
        color:#8f8f8f;
    }
    .body_list{
        width:200px;
        height: 100%;
        /* background:red; */
    }
    table,tr,td,th{
        font-family: '微软雅黑';
        color:#333;
        font-weight:normal;

    }

    .body_list table{
        width: 200px;
        border-collapse: separate;
        border-spacing: 2px;
        outline: 0;
        padding-left:8px;

    }
    .body_list .table thead{
        width: 200px;
        height: 60px;
        background:skyblue;
    }
    .btn{
        font-size:16px;
    }
    .nianyue{
        height: 60px;
        text-align:center;
    }
    .gray{
        color:#c1c1c1;
    }
    table tr{
        height:30px;
    }
    .toc-section{
        width:200px;
        height: 40px;
        box-sizing:border-box;
        font-size:15px;
        text-align:left;
        line-height:40px;
        font-weight:normal;
        margin-bottom:3px;
        padding-left:10px;
        cursor:pointer;
    }
    .myschedule{
        margin-top:40px;
        background:#dcdcdc;
    }
    .myschedule span{

        font-weight:normal;
    }
    .leagulerschedule{
        width:200px;
        height: 40px;
    }
</style>


<template>
        <div class="smallcalendar">
            <div class="header">
                <div class="left">日历</div>
                <div class="right">
                    <span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                </div>
            </div>
            <!-- 放一个table显示日历用的 -->
            <div class="body_list">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span @click="gotoprevmonth"> < </span>
                            </th>
                            <th colspan="5" class="nianyue">
                                <span>{{$store.state.nowshow.year}}年{{$store.state.nowshow.month}}月</span>
                            </th>
                            <th>
                                <span @click="gotonextmonth"> > </span>
                            </th>
                        </tr>
                        <tr>
                            <th v-for="(item,index) in dayofweek" class="week gray">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="index in 6">
                            <th v-for="_index in 7"  v-bind:class="{'gray' : the42data[index - 1][_index - 1].prevmonth || the42data[index - 1][_index - 1].nextmonth}"  > {{ the42data[index - 1][_index - 1].day }}</th>
                        </tr>
                    </tbody>
                </table>
                <div class="myschedule toc-section">
                    <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                    我的日程
                    {{year}}
                </div>
                <div class="teamschedule toc-section">

                    团队日程
                </div>
                <div class="leaguerschedule toc-section">
                    成员日程
                </div>
            </div>

        </div>
</template>


<script>
    import * as actions from "../../store/todo-types.js";

    export default {
            props : ["year" , "month"],
            data : function(){
                return {
                    //表头
                    "dayofweek" : ["日","一","二","三","四","五","六"],
                    //本表中的42天的数据，数据符合{title,during,type}格式
                    "the42data" : [[],[],[],[],[],[]],
                    //本月的API格式信息
                    "themonth" : [],
                    //上个月的信息
                    "prevmonth" : [],
                    //下个月的信息
                    "nextmonth" :  []
                }
            },
            created : function(){
                this.setCanlendar();
            },
            methods : {
                //右按钮
                gotonextmonth(){
                    this.$store.commit(actions.GOTONEXTMONTH);
                    this.setCanlendar();
                },
                //左按钮
                gotoprevmonth(){
                    this.$store.commit(actions.GOTOPREVMONTH);
                    //刷新：
                    this.setCanlendar();

                },
                //这个函数的主要目的就是发出Ajax请求，请求三个月份的数据，更新这个组件的the42data、domdata两个数据。
                //the42data和表格形态有关，domdata决定了schedule的呈递。
                setCanlendar : function(){
                    this.the42data = [[],[],[],[],[],[]];
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
                        //至此，this.the42data已经生成完毕

                    }
                }
            }

        }

</script>