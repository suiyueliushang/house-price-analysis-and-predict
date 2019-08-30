//****************针对第一种方式的具体js实现部分******************//
//****************所使用的数据是city.js******************//

/*根据id获取对象*/
function $(str) {
    return document.getElementById(str);
}

var addrShow2 = $('addr-show2');
var btn = document.getElementsByClassName('met1')[0];
var prov2 = $('prov2');
var city2 = $('city2');
var time_2 = $('time_2');
var btn3 = $('btn3');
var prov3 = $('prov3');
var city3 = $('city3');
var addrShow3 = $('addr-show3');
var time_3 = $('time_3');

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
    btn.disabled = true;
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
        btn.disabled = true;
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
        btn.disabled = false;
    }
}
function deal_3(obj) {
    current3.city3 = obj.options[obj.selectedIndex].value;
    if (current3.city3 != null) {
        btn3.disabled = false;
    }
}

/*点击确定按钮显示用户所选的地址*/
function showAddr2() {
    var myselect=document.getElementById('time_2');
    var index=myselect.selectedIndex;
    var time2_name=myselect.options[index].text;
    addrShow2.value = time2_name + '-' + provice[current2.prov2].name + '-' + provice[current2.prov2]["city"][current2.city2].name;
}
function showAddr3() {
    var myselect=document.getElementById('time_3');
    var index=myselect.selectedIndex;
    var time3_name=myselect.options[index].text;
    addrShow3.value = time3_name + '-' + provice[current3.prov3].name + '-' + provice[current3.prov3]["city"][current3.city3].name;
}
