function $(str) {
    return document.getElementById(str);
}

var btn5 = $('btn5');
var prov5 = $('prov5');
var city5 = $('city5');
var country5 = $('country5');
var time_5 = $('time_5');

var btn7 = $('btn7');
var prov7 = $('prov7');
var city7 = $('city7');
var country7 = $('country7');
var time_7 = $('time_7');
var admin_delete_data = $('admin_delete_data');

var current5 = {
    prov5: '',
    city5: '',
    country5: ''
};

var current7 = {
    prov7: '',
    city7: '',
    country7: ''
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

(function showProv7() {
    btn7.disabled = true;
    admin_delete_data.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov7.appendChild(provOpt);
    }
    var len_0 = 10;
    for (var i = 0; i < len_0; i++) {
        var year_time = 2019 - i;
        var timeOpt = document.createElement('option');
        timeOpt.innerText = year_time;
        timeOpt.value = i;
        time_7.appendChild(timeOpt);
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


function showCity7(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current7.prov7) {
        current7.prov7 = val;
        btn7.disabled = true;
        admin_delete_data.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city7.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city7.appendChild(cityOpt);
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

function showCountry7(obj) {
    var val = obj.options[obj.selectedIndex].value;
    current7.city7 = val;
    if (val != null) {
        country7.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[current7.prov7]["city"][val].districtAndCounty.length;
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[current7.prov7]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            country7.appendChild(countryOpt);
        }
    }
}

function selecCountry5(obj) {
    current5.country5 = obj.options[obj.selectedIndex].value;
    if ((current5.city5 != null) && (current5.country5 != null)) {
        btn7.disabled = false;
        admin_delete_data.disabled = false;
    }
}

function selecCountry7(obj) {
    current7.country7 = obj.options[obj.selectedIndex].value;
    if ((current7.city7 != null) && (current7.country7 != null)) {
        btn7.disabled = false;
        admin_delete_data.disabled = false;
    }
}
//管理员增加新房源
function admin_add_house() {

    date = $('#date').val();
    province = $('#province').val();
    city = $('#city').val();
    district = $('#district').val();


    address = $('#address').val();
    firm_name = $('#firm_name').val();
    house_type = $('#house_type').val();
    direction = $('#direction').val();

    area = $('#area').val();
    average_price = $('#average_price').val();
    total_price = $('#total_price').val();
    elevator = $('#elevator').val();

    heigth = $('#heigth').val();
    huxing_jiegou = $('#huxing_jiegou').val();
    jianzhuleixing = $('#jianzhuleixing').val();
    new_h = $('#new_h').val();

    nianxian = $('#nianxian').val();
    ti_bili = $('#ti_bili').val();
    zhuangxiu = $('#zhuangxiu').val();
    kaiaipan_shijian = $('#kaiaipan_shijian').val();

    $.ajax({
        type: "POST", //提交的方法
        url: "/add_users", //提交的地址  
        // contentType: false,
        data: {
            'date': date,
            'province': province,
            'city': city,
            'district': district,

            'address': address,
            'firm_name': firm_name,
            'house_type': house_type,
            'direction': direction,

            'area': area,
            'average_price': average_price,
            'total_price': total_price,
            'elevator': elevator,

            'heigth': heigth,
            'huxing_jiegou': huxing_jiegou,
            'jianzhuleixing': jianzhuleixing,
            'new_h': new_h,

            'nianxian': nianxian,
            'ti_bili': ti_bili,
            'zhuangxiu': zhuangxiu,
            'kaiaipan_shijian': kaiaipan_shijian,

        },

        datatype: "json",
        //$('#login_form').serialize(), // 序列化表单值  
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    alert("提交成功");
                    break;
                default:
                    alert("未知错误");

            }
        }

    });
};


function admin_delete_data() {

    $.ajax({
        type: "POST", //提交的方法
        url: "/delete_district_price", //提交的地址  
        // contentType: false,
        data: {
            'time': time_7.val(),
            'prov': prov7.val(),
            'city': city7.val(),
            'country': country7.val(),
        },

        datatype: "json",
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    document.getElementById('div_1').innerText = "删除成功";
                    break;
                case '1':
                    document.getElementById('div_1').innerText = "删除失败,不存在该数据,可能已删除";
                    break;
                default:
                    alert("未知错误");
            }
        }

    });
}

function admin_change_data() {

    admin_change_house = $('admin_change_house').val();
    time = $('time_7').val();
    prov = $('prov7').val();
    city = $('city7').val();
    country = $('country7').val();
    $.ajax({
        type: "POST", //提交的方法
        url: "/add_district_price", //提交的地址  
        // contentType: false,
        data: {
            'time': time,
            'prov': prov,
            'city': city,
            'country': country,
            'admin_change_house': admin_change_house,
        },

        datatype: "json",
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    document.getElementById('div_2').innerText = "新增或修改成功";
                    break;
                case '1':
                    document.getElementById('div_2').innerText = "新增或修改失败";
                    break;
                default:
                    alert("未知错误");
            }
        }

    });
}