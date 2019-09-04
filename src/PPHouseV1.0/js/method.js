//****************针对第一种方式的具体js实现部分******************//
//****************所使用的数据是city.js******************//

/*根据id获取对象*/
function $(str) {
    return document.getElementById(str);
}

var addrShow = $('addr-show');
var addrShow1= $('addr-show1');
var addrShow4= $('addr-show4');
var btn = document.getElementsByClassName('met1')[0];
var btn1 = $('btn1');
var btn4 = $('btn4');
var prov = $('prov');
var prov1= $('prov1');
var prov4= $('prov4');
var city = $('city');
var city1= $('city1');
var city4= $('city4');
var country = $('country');
var country1 = $('country1');
var time_0 = $('time_0');
var time_1= $('time_1');
var time_4= $('time_4');
var city_region = new Array();
var price_array = new Array(12);
var price_array1 = new Array(12);
var price4 = new Array(20000,25000,30000,16000,27000,32000,26000,17000,21000,23000,30000,24000,25000);
var region_1;
var region_2;
var btn5 = $('btn5');
var prov5 = $('prov5');
var city5 = $('city5');
var country5 = $('country5');
var time_5 = $('time_5');


/*用于保存当前所选的省市区*/
var current = {
    prov: '',
    city: '',
    country: ''
};
var current1 = {
    prov1: '',
    city1: '',
    country1: ''
};
var current4 = {
    prov4: '',
    city4: ''
};
var current5 = {
    prov5: '',
    city5: '',
    country5: ''
};

/*自动加载省份列表*/
(function showProv() {
    btn.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov.appendChild(provOpt);
    }
    var len_0=10;
    for(var i = 0; i<len_0; i++) {
        var year_time=2019-i;
        var timeOpt = document.createElement('option');
        timeOpt.innerText=year_time;
        timeOpt.value = i;
        time_0.appendChild(timeOpt);
    }
})();

(function showProv1() {
    btn1.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov1.appendChild(provOpt);
    }
    var len_1=10;
    for(var i = 0; i<len_1; i++) {
        var year_time=2019-i;
        var timeOpt = document.createElement('option');
        timeOpt.innerText=year_time;
        timeOpt.value = i;
        time_1.appendChild(timeOpt);
    }
})();

(function showProv4() {
    btn4.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov4.appendChild(provOpt);
    }
    var len_2=10;
    for(var i = 0; i<len_2; i++) {
        var year_time=2019-i;
        var timeOpt = document.createElement('option');
        timeOpt.innerText=year_time;
        timeOpt.value = i;
        time_4.appendChild(timeOpt);
    }
})();

(function showProv5() {
    btn5.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov5.appendChild(provOpt);
    }
    var len_0=10;
    for(var i = 0; i<len_0; i++) {
        var year_time=2019-i;
        var timeOpt = document.createElement('option');
        timeOpt.innerText=year_time;
        timeOpt.value = i;
        time_5.appendChild(timeOpt);
    }
})();

/*根据所选的省份来显示城市列表*/
function showCity(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current.prov) {
        current.prov = val;
        addrShow.value = '';
        btn.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city.appendChild(cityOpt);
        }
    }
}

function showCity1(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current1.prov1) {
        current1.prov1 = val;
        addrShow1.value = '';
        btn1.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city1.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city1.appendChild(cityOpt);
        }
    }
}

function showCity4(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current4.prov4) {
        current4.prov4 = val;
        addrShow4.value = '';
        btn4.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city4.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city4.appendChild(cityOpt);
        }
    }
}

function showCity5(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current5.prov5) {
        current5.prov5 = val;
        btn5.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city5.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city5.appendChild(cityOpt);
        }
    }
}

/*根据所选的城市来显示县区列表*/
function showCountry(obj) {
    var val = obj.options[obj.selectedIndex].value;
    current.city = val;
    if (val != null) {
        country.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[current.prov]["city"][val].districtAndCounty.length;
        if (countryLen == 0) {
            addrShow.value = provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name;
            return;
        }
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[current.prov]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            country.appendChild(countryOpt);
        }
    }
}
function showCountry1(obj) {
    var val = obj.options[obj.selectedIndex].value;
    current1.city1 = val;
    if (val != null) {
        country1.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[current1.prov1]["city"][val].districtAndCounty.length;
        if (countryLen == 0) {
            addrShow1.value = provice[current1.prov1].name + '-' + provice[current1.prov1]["city"][current1.city1].name;
            return;
        }
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[current1.prov1]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            country1.appendChild(countryOpt);
        }
    }
}

function showCountry5(obj) {
    var val = obj.options[obj.selectedIndex].value;
    current5.city5 = val;
    if (val != null) {
        country5.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[current5.prov5]["city"][val].districtAndCounty.length;
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[current5.prov5]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            country5.appendChild(countryOpt);
        }
    }
}

/*选择县区之后的处理函数*/
function selecCountry(obj) {
    current.country = obj.options[obj.selectedIndex].value;
    if ((current.city != null) && (current.country != null)) {
        btn.disabled = false;
    }
}

function selecCountry1(obj) {
    current1.country1 = obj.options[obj.selectedIndex].value;
    if ((current1.city1 != null) && (current1.country1 != null)) {
        btn1.disabled = false;
    }
}

function selecCountry5(obj) {
    current5.country5 = obj.options[obj.selectedIndex].value;
    if ((current5.city5 != null) && (current5.country5 != null)) {
        btn5.disabled = false;
    }
}

function deal_4(obj) {
    city_region = new Array();
    current4.city4 = obj.options[obj.selectedIndex].value; 
    if (current4.city4 != null) {
        btn4.disabled = false;
        var countryLen = provice[current4.prov4]["city"][current4.city4].districtAndCounty.length;
        for (var n = 0; n < countryLen; n++) {
            city_region[n] = provice[current4.prov4]["city"][current4.city4].districtAndCounty[n];
        }
    }
    
}

/*点击确定按钮显示用户所选的地址*/
function showAddr() {
    var myselect=document.getElementById('time_0');
    var index=myselect.selectedIndex;
    var time0_name=myselect.options[index].text;
    addrShow.value = time0_name +  '-' + provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name + '-' + provice[current.prov]["city"][current.city].districtAndCounty[current.country];
    region_1 = provice[current.prov]["city"][current.city].districtAndCounty[current.country];
    var region_name = provice[current.prov]["city"][current.city].districtAndCounty[current.country];
    $.ajax({
		type:"POST",//
        url:"/contrast_district",//
        datatype:"json",
		data: {
			'region_name' :region_name,
			'year': time0_name
        },
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
		success:function(data) {
            price_array[0]=data.one;
            price_array[1]=data.two;
            price_array[2]=data.three;
            price_array[3]=data.four;
            price_array[4]=data.five;
            price_array[5]=data.six;
            price_array[6]=data.seven;
            price_array[7]=data.eight;
            price_array[8]=data.nine;
            price_array[9]=data.ten;
            price_array[10]=data.eleven;
            price_array[11]=data.twelve;
            }
    });
    $('#lineChartExample3').remove();
    $('#line_3').append('<canvas id="lineChartExample3"></canvas>');
    $(document).ready(function () {

        'use strict';
        var LINECHART3 = $('#lineChartExample3');
    var myLineChart5 = new Chart(LINECHART3, {
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
                    label: region_1,
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
                    data: price_array,
                    spanGaps: false
                },
                {
                    label: region_2,
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
                    data: price_array1,
                    spanGaps: false
                }
            ]
        }
    });
    });
}

function showAddr1() {
    var myselect=document.getElementById('time_1');
    var index=myselect.selectedIndex;
    var time1_name=myselect.options[index].text;
    addrShow1.value = time1_name + '-' + provice[current1.prov1].name + '-' + provice[current1.prov1]["city"][current1.city1].name + '-' + provice[current1.prov1]["city"][current1.city1].districtAndCounty[current1.country1];
    region_2 = provice[current1.prov1]["city"][current1.city1].districtAndCounty[current1.country1];
    var region_name = provice[current1.prov1]["city"][current1.city1].districtAndCounty[current1.country1];
    $.ajax({
		type:"POST",//
        url:"/contrast_district",//
        datatype:"json",
		data: {
			'region_name' :region_name,
			'year': time1_name
        },
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
		success:function(data) {
            price_array1[0]=data.one;
            price_array1[1]=data.two;
            price_array1[2]=data.three;
            price_array1[3]=data.four;
            price_array1[4]=data.five;
            price_array1[5]=data.six;
            price_array1[6]=data.seven;
            price_array1[7]=data.eight;
            price_array1[8]=data.nine;
            price_array1[9]=data.ten;
            price_array1[10]=data.eleven;
            price_array1[11]=data.twelve;
            }
    });
    $('#lineChartExample3').remove();
    $('#line_3').append('<canvas id="lineChartExample3"></canvas>');
    $(document).ready(function () {

        'use strict';
        var LINECHART3 = $('#lineChartExample3');
    var myLineChart3 = new Chart(LINECHART3, {
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
                    label: region_1,
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
                    data: price_array,
                    spanGaps: false
                },
                {
                    label: region_2,
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
                    data: price_array1,
                    spanGaps: false
                }
            ]
        }
    });
    });
}


function showAddr4 () {
    var myselect=document.getElementById('time_4');
    var index=myselect.selectedIndex;
    var time4_name=myselect.options[index].text;
    addrShow4.value = time4_name + '-' + provice[current4.prov4].name + '-' + provice[current4.prov4]["city"][current4.city4].name;
    $('#barChart1').remove();
    $('#bar_1').append('<canvas id="barChart1"></canvas>');
    $(document).ready(function () {

        'use strict';
        var BARCHART1 = $('#barChart1');
        bar1 = new Chart(BARCHART1, {
            type: 'bar',
            options:
            {
                scales:
                {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        ticks:{
                            min:10000

                        },
                        display: true
                    }],
                },
                legend: {
                    display: false
                }
            },
            data: {
                labels: city_region,
                datasets: [
                    {
                        label: "city 1",
                        backgroundColor:"#62a8ea",
                        borderWidth: 0,
                        data: price4
                    }
                ]
            }
        });

    });
    

}