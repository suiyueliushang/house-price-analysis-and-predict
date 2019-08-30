//****************针对第一种方式的具体js实现部分******************//
//****************所使用的数据是city.js******************//

/*根据id获取对象*/
function $(str) {
    return document.getElementById(str);
}

var addrShow = $('addr-show');
var addrShow1= $('addr-show1');
var btn = document.getElementsByClassName('met1')[0];
var btn1 = $('btn1');
var prov = $('prov');
var prov1= $('prov1');
var city = $('city');
var city1= $('city1');
var country = $('country');
var country1 = $('country1');
var time_0 = $('time_0');
var time_1= $('time_1');


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

/*点击确定按钮显示用户所选的地址*/
function showAddr() {
    var myselect=document.getElementById('time_0');
    var index=myselect.selectedIndex;
    var time0_name=myselect.options[index].text;
    addrShow.value = time0_name +  '-' + provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name + '-' + provice[current.prov]["city"][current.city].districtAndCounty[current.country];
}

function showAddr1() {
    var myselect=document.getElementById('time_1');
    var index=myselect.selectedIndex;
    var time1_name=myselect.options[index].text;
    addrShow1.value = time1_name + '-' + provice[current1.prov1].name + '-' + provice[current1.prov1]["city"][current1.city1].name + '-' + provice[current1.prov1]["city"][current1.city1].districtAndCounty[current1.country1];
}