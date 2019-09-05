function $(str) {
    return document.getElementById(str);
}

var btn5 = $('btn5');
var prov5 = $('prov5');
var city5 = $('city5');
var country5 = $('country5');
var time_5 = $('time_5');

var current5 = {
    prov5: '',
    city5: '',
    country5: ''
};

(function showProv5() {
    btn5.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov5.appendChild(provOpt);
    }
    var len_0 = 10;
    for (var i = 0; i < len_0; i++) {
        var year_time = 2019 - i;
        var timeOpt = document.createElement('option');
        timeOpt.innerText = year_time;
        timeOpt.value = i;
        time_5.appendChild(timeOpt);
    }
})();

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

function selecCountry5(obj) {
    current5.country5 = obj.options[obj.selectedIndex].value;
    if ((current5.city5 != null) && (current5.country5 != null)) {
        btn5.disabled = false;
    }
}