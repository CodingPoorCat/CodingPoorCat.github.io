
var dataList = [
    { "ID": "1", "HREF": "http://www.baidu.com", "taskName": "课程一", "startTime": "2016.5.1", "endTime": "2016.5.30", "num": 10, "course": 2, "labelOne": ["test"], "labelTwo": ["从入门到放弃"] },
    { "ID": "2", "HREF": "http://www.google.com", "taskName": "课程二", "startTime": "2016.6.1", "endTime": "2016.6.30", "num": 103, "course": 23, "labelOne": ["？？？"], "labelTwo": ["程序猿护理指南"] },
    { "ID": "3", "HREF": "", "taskName": "课程三", "startTime": "2016.7.1", "endTime": "2016.7.30", "num": 173, "course": 73, "labelOne": ["码农", "Buger"], "labelTwo": ["如何低效开发软件", "天呐怎么有这种课程"] },
    { "ID": "4", "HREF": "", "taskName": "妈妈说名字很长很长才能吸引到人过来我这里", "startTime": "2016.7.1", "endTime": "2016.7.30", "num": 173, "course": 73, "labelOne": ["码农", "Buger"], "labelTwo": ["如何低效开发软件", "天呐怎么有这种课程", "天呐怎么有这种课程", "天呐怎么有这种课程", "天呐怎么有这种课程", "天呐怎么有这种课程"] }

]

function course(dataList) {
    var html = [];
    for (var i = 0, len = dataList.length; i < len; i++) {
        data = dataList[i];
        html[html.length] = '<li><div class="item">';
        html[html.length] = '<a href="' + data.HREF + '"class="item_box">';
        html[html.length] = '<img src="" alt=""><div data-id='+data.ID+' class="task_name">' + data.taskName + '</div>';
        html[html.length] = ' <div class="time">';
        html[html.length] = '<span class="word_style">开始</span>';
        html[html.length] = '<span class="start_time">' + data.startTime + '</span>';
        html[html.length] = '<span class="word_style">结束</span>';
        html[html.length] = '<span class="end_time">' + data.endTime + '</span>';
        html[html.length] = '</div>';
        html[html.length] = '<div class="infobar">';
        html[html.length] = '<span class="num"><i class="iconfont icon-yonghuming"></i><span>' + data.num + '</span></span>';
        html[html.length] = '<span class="course"><i class="iconfont icon-ziliaoku"></i><span>' + data.course + '</span></span>';
        html[html.length] = '<span class="setting"><i class="iconfont icon-shezhi"></i></span>';
        html[html.length] = '</div>';
        html[html.length] = '</a>';
        html[html.length] = '<div class="course_info">';
        html[html.length] = '<div class="labels"><i class="iconfont icon-iconyonghu"></i>';
        for (var j = 0, len2 = data.labelOne.length < 3 ? data.labelOne.length : 2; j < len2; j++) {
            html[html.length] = '<span class="label ellipsis">' + data.labelOne[j] + '</span>';
        }
        html[html.length] = '</div>';
        html[html.length] = '<div class="labels"><i class="iconfont icon-caidan"></i>';
        for (var k = 0, len3 = data.labelTwo.length < 3 ? data.labelTwo.length : 2; k < len3; k++) {
            html[html.length] = '<span class="label ellipsis">' + data.labelTwo[k] + '</span>';
        }
        html[html.length] = '</div>';
        html[html.length] = '</div>';
        html[html.length] = '</div></li>';

    }
    return html.join("");
}
$(document).ready(function() {
    $('#list').append(course(dataList));
    $("#del").click(del);
    $("body").click(function () {
        if(event.target.className!="iconfont icon-shezhi"&&event.target!=$("#settingBox input").get(0)){
            $("#settingBox").hide();
        }
    });
    $("#addItem").click(addItem);
})


// 通过事件代理，将设置函数，增加函数委托给$("#list")来触发处理函数
// 
$("#list").delegate("i", "click", bindEvent);

function bindEvent() {
    if (event.target.className !== "item_box")
        event.preventDefault();
    switch (event.target.className) {
        case "iconfont icon-ziliaoku":
        case "iconfont icon-yonghuming":
            event.target.nextSibling.innerHTML = event.target.nextSibling.innerHTML - 0 + 1;
            break;
        case "iconfont icon-shezhi":
            setting ();
            break;
    }
}

// 对课程的设置函数
// 将设置编辑节点$("#settingBox") 移动为课程节点的兄弟节点
// 获取课程的名称，将课程名字赋值到input
// 显示编辑节点$("#settingBox")
// 设置编辑节点$("#settingBox")监听keyup事件，将输入的值同步到课程名
function setting () {
    $(event.target).parents(".item").append($("#settingBox"));
    var taskName = $(event.target).parents(".infobar").siblings(".task_name").text();
    $("#settingBox").children("input").val(taskName);
    $("#settingBox").show();
    $("#settingBox").children("input").keyup(function () {
        $("#settingBox").siblings(".item_box").children(".task_name").text($(this).val());
    })
}

// 删除课程函数
// 获取要删除的课程的<li>节点
// 将$("#settingBox")移除该节点，避免一起删除
// 删除节点
// 隐藏$("#settingBox")
function del () {
    var delNode = $(this).parents("li");
    $(".courseList").append($("#settingBox"));
    delNode.remove();
    $("#settingBox").hide();
}


// 增加
function addItem () {
    var newItem = [
    { "ID": "0", "HREF": "http://www.baidu.com", "taskName": "新建的课程", "startTime": "？？？", "endTime": "？？？", "num": 0, "course": 0, "labelOne": ["test"], "labelTwo": ["从入门到放弃"] }
    ];
    $("#firstItem").after(course(newItem));
}