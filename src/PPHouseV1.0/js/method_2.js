//****************针对第一种方式的具体js实现部分******************//
//****************所使用的数据是city.js******************//

/**
 * 实现选择框拉取省 市
 * 点击按钮传送数据
 * 服务器返回数据生成折线图
 * 
 * @author: 71117418 苏雨
 * 
 */

/*根据id获取对象*/
function $(str) {
    return document.getElementById(str);
}

var addrShow2 = $('addr-show2');
var btn2 = $('btn2');
var prov2 = $('prov2');
var city2 = $('city2');
var time_2 = $('time_2');
var btn3 = $('btn3');
var prov3 = $('prov3');
var city3 = $('city3');
var addrShow3 = $('addr-show3');
var time_3 = $('time_3');
var price_array2 = new Array(12);
var price_array3 = new Array(12);
var city_1;
var city_2;

/*用于保存当前所选的省市区*/
var current2 = {
    prov2: '',
    city2: ''
};
var current3 = {
    prov3: '',
    city3: ''
};

/*自动加载时间列表*/



/*自动加载省份列表*/
(function showProv2() {
    btn2.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov2.appendChild(provOpt);
    }
    var len_2=10;
    for(var i = 0; i<len_2; i++) {
        var year_time=2019-i;
        var timeOpt = document.createElement('option');
        timeOpt.innerText=year_time;
        timeOpt.value = i;
        time_2.appendChild(timeOpt);
    }
})();

(function showProv3() {
    btn3.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov3.appendChild(provOpt);
    }
    var len_3=10;
    for(var i = 0; i<len_3; i++) {
        var year_time=2019-i;
        var timeOpt = document.createElement('option');
        timeOpt.innerText=year_time;
        timeOpt.value = i;
        time_3.appendChild(timeOpt);
    }
})();

/*根据所选的省份来显示城市列表*/
function showCity2(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current2.prov2) {
        current2.prov2 = val;
        addrShow2.value = '';
        btn2.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city2.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city2.appendChild(cityOpt);
        }
    }
}
function showCity3(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current3.prov3) {
        current3.prov3 = val;
        addrShow3.value = '';
        btn3.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city3.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city3.appendChild(cityOpt);
        }
    }
}

/*根据所选的城市来显示县区列表
function showCountry2(obj) {
    var val = obj.options[obj.selectedIndex].value;
    current2.city2 = val;
    if (val != null) {
        country2.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[current2.prov2]["city"][val].districtAndCounty.length;
        if (countryLen == 0) {
            addrShow2.value = provice[current2.prov2].name + '-' + provice[current2.prov2]["city"][current2.city2].name;
            return;
        }
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[current2.prov2]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            country2.appendChild(countryOpt);
        }
    }
}*/
/*选择县区之后的处理函数*/
function deal_2(obj) {
    current2.city2 = obj.options[obj.selectedIndex].value;
    if (current2.city2 != null) {
        btn2.disabled = false;
    }
}
function deal_3(obj) {
    current3.city3 = obj.options[obj.selectedIndex].value;
    if (current3.city3 != null) {
        btn3.disabled = false;
    }
}

/*点击确定按钮显示用户所选的地址*/
function showAddr2 () {
    var myselect=document.getElementById('time_2');
    var index=myselect.selectedIndex;
    var time2_name=myselect.options[index].text;
    addrShow2.value = time2_name + '-' + provice[current2.prov2].name + '-' + provice[current2.prov2]["city"][current2.city2].name;
    city_1=provice[current2.prov2]["city"][current2.city2].name;
    var city_name=provice[current2.prov2]["city"][current2.city2].name;
    /*与后台交互数据*/
    $.ajax({
		type:"POST",//
        url:"/contrast_city",//
        datatype:"json",
		data: {
			'city_name' :city_name,
			'year': time2_name
        },
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
		success:function(data) {
            price_array2[0]=data.one;
            price_array2[1]=data.two;
            price_array2[2]=data.three;
            price_array2[3]=data.four;
            price_array2[4]=data.five;
            price_array2[5]=data.six;
            price_array2[6]=data.seven;
            price_array2[7]=data.eight;
            price_array2[8]=data.nine;
            price_array2[9]=data.ten;
            price_array2[10]=data.eleven;
            price_array2[11]=data.twelve;
            }
    });
    $('#lineChartExample5').remove();
    $('#line_5').append('<canvas id="lineChartExample5"></canvas>');
    $(document).ready(function () {

        'use strict';
        var LINECHART5 = $('#lineChartExample5');
    var myLineChart5 = new Chart(LINECHART5, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    display:true,
                    gridLines: {
                        display: true
                    }
                }]
            },
            legend: {labels:{fontColor:"#777", fontSize: 12}}
        },
        data: {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            datasets: [
                {
                    label: city_1,
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#6ccef0',
                    pointBorderColor: '#59c2e6',
                    pointHoverBackgroundColor: '#59c2e6',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#59c2e6",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [price_array2[0], price_array2[1], price_array2[2], price_array2[3], price_array2[4], price_array2[5], price_array2[6], price_array2[7], price_array2[8], price_array2[9], price_array2[10], price_array2[11]],
                    spanGaps: false
                },
                {
                    label: city_2,
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#ff7676',
                    pointBorderColor: '#ff7676',
                    pointHoverBackgroundColor: '#ff7676',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#ff7676",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [price_array3[0], price_array3[1], price_array3[2], price_array3[3], price_array3[4], price_array3[5], price_array3[6], price_array3[7], price_array3[8], price_array3[9], price_array3[10], price_array3[11]],
                    spanGaps: false
                }
            ]
        }
    });
    });
}
function showAddr3() {
    var myselect=document.getElementById('time_3');
    var index=myselect.selectedIndex;
    var time3_name=myselect.options[index].text;
    addrShow3.value = time3_name + '-' + provice[current3.prov3].name + '-' + provice[current3.prov3]["city"][current3.city3].name;
    city_2=provice[current3.prov3]["city"][current3.city3].name;
    var city_name=provice[current3.prov3]["city"][current3.city3].name;
    /*与后台交互数据*/
    $.ajax({
		type:"POST",//
        url:"/contrast_city",//
        datatype:"json",
		data: {
			'city_name' :city_name,
			'year': time3_name
        },
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
		success:function(data) {
            price_array3[0]=data.one;
            price_array3[1]=data.two;
            price_array3[2]=data.three;
            price_array3[3]=data.four;
            price_array3[4]=data.five;
            price_array3[5]=data.six;
            price_array3[6]=data.seven;
            price_array3[7]=data.eight;
            price_array3[8]=data.nine;
            price_array3[9]=data.ten;
            price_array3[10]=data.eleven;
            price_array3[11]=data.twelve;
            }
    });
    $('#lineChartExample5').remove();
    $('#line_5').append('<canvas id="lineChartExample5"></canvas>');
    $(document).ready(function () {

        'use strict';
        var LINECHART5 = $('#lineChartExample5');
    var myLineChart5 = new Chart(LINECHART5, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    display:true,
                    gridLines: {
                        display: true
                    }
                }]
            },
            legend: {labels:{fontColor:"#777", fontSize: 12}}
        },
        data: {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            datasets: [
                {
                    label: city_1,
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#6ccef0',
                    pointBorderColor: '#59c2e6',
                    pointHoverBackgroundColor: '#59c2e6',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#59c2e6",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [price_array2[0], price_array2[1], price_array2[2], price_array2[3], price_array2[4], price_array2[5], price_array2[6], price_array2[7], price_array2[8], price_array2[9], price_array2[10], price_array2[11]],
                    spanGaps: false
                },
                {
                    label: city_2,
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#ff7676',
                    pointBorderColor: '#ff7676',
                    pointHoverBackgroundColor: '#ff7676',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#ff7676",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [price_array3[0], price_array3[1], price_array3[2], price_array3[3], price_array3[4], price_array3[5], price_array3[6], price_array3[7], price_array3[8], price_array3[9], price_array3[10], price_array3[11]],
                    spanGaps: false
                }
            ]
        }
    });
    });
}