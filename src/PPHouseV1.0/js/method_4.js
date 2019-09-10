function $(str) {
    return document.getElementById(str);
}

var btn6 = $('btn6');
var prov6 = $('prov6');
var city6 = $('city6');
var country6 = $('country6');

var current6 = {
    prov6: '',
    city6: '',
    country6: ''
};

(function showProv6() {
    btn6.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov6.appendChild(provOpt);
    }

})();

function showCity6(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current6.prov6) {
        current6.prov6 = val;
        btn6.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city6.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city6.appendChild(cityOpt);
        }
    }
}

function showCountry6(obj) {
    var val = obj.options[obj.selectedIndex].value;
    current6.city6 = val;
    if (val != null) {
        country6.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[current6.prov6]["city"][val].districtAndCounty.length;
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[current6.prov6]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            country6.appendChild(countryOpt);
        }
    }
}

function selecCountry6(obj) {
    current6.country6 = obj.options[obj.selectedIndex].value;
    if ((current6.city6 != null) && (current6.country6 != null)) {
        btn6.disabled = false;
    }
}

//用户预测房价
function forecast() {

    var house_type = new Array(18);
    prov = provice[current6.prov6].name
    city = provice[current6.prov6]["city"][current6.city6].name
    myselect = document.getElementById('country6');
    index = myselect.selectedIndex;
    country = myselect.options[index].text;

    confidence = $('#confidence').val();
    if (confidence == null)
        confidence == 0.95;
    for_year = $('#for_year').val();
    for_month = $('#for_month').val();

    console.log(for_year, for_month)
    for (var i = 0; i < 18; i++) {
        var h_t = "#checkbox" + i.toString();
        house_type[i] = $(h_t);
        /*  if ($(house_type[1]).prop("checked") == true) {
              house_type[i] = 0;
          } else {
              house_type[i] = 1;
          }*/

    }
    $.ajax({
        type: "POST", //提交的方法
        url: "/house_forecast", //提交的地址  
        // contentType: false,
        data: {
            'prov': prov,
            'city': city,
            'country': country,
            'confidence': confidence,
            'for_year': for_year,
            'for_month': for_month,
            /*'house_type[0]': house_type[0],
            'house_type[1]': house_type[1],
            'house_type[2]': house_type[2],
            'house_type[3]': house_type[3],
            'house_type[4]': house_type[4],
            'house_type[5]': house_type[5],
            'house_type[6]': house_type[6],
            'house_type[7]': house_type[7],
            'house_type[8]': house_type[8],
            'house_type[9]': house_type[9],
            'house_type[10]': house_type[10],
            'house_type[11]': house_type[11],
            'house_type[12]': house_type[12],
            'house_type[13]': house_type[13],
            'house_type[14]': house_type[14],
            'house_type[15]': house_type[15],
            'house_type[16]': house_type[16],
            'house_type[17]': house_type[17],
            */
        },

        datatype: "json",
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");

        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    {
                        var time = new Array();
                        var price = new Array();
                        var index = 0;
                        document.getElementById("forecast_div").style.display = "";
                        document.getElementById("forecast_line").style.display = "";
                        for (var i = 0; i < 10; i++) {
                            var temp = "year_" + i.toString();
                            document.getElementById(temp).style.display = "none";
                            for (var j = 3; j <= 12; j = j + 3) {
                                temp = "y" + i.toString() + "m" + j.toString();
                                document.getElementById(temp).innerText = null;
                            }
                        }

                        for (var i = 0; i < (Number(for_year)); i++) {

                            var temp = "year_" + i.toString();
                            document.getElementById(temp).style.display = "";
                            for (var j = 3; j <= 12; j = j + 3) {
                                temp = "y" + i.toString() + "m" + j.toString();
                                document.getElementById(temp).innerText = data.first[i * 4 + Math.floor(j / 3) - 1];

                                time[index] = i.toString() + "年" + j.toString() + "月";
                                price[index] = Number(data.first[i * 4 + Math.floor(j / 3) - 1]);
                                index++;
                            }
                        }
                        if (for_month != 0) {
                            var temp = "year_" + (Number(for_year)).toString();
                            document.getElementById(temp).style.display = "";
                            for (var j = 3; j <= Number(for_month); j = j + 3) {
                                temp = "y" + i.toString() + "m" + j.toString();
                                document.getElementById(temp).innerText = data.first[(for_year) * 4 + Math.floor(j / 3) - 1];

                                time[index] = i.toString() + "年" + j.toString() + "月";
                                price[index] = Number(data.first[(for_year) * 4 + Math.floor(j / 3) - 1]);
                                index++;
                            }
                        }

                        $('#lineChart7').remove();
                        $('#line_1').append('<canvas id="lineChart7"></canvas>');
                        $(document).ready(function() {

                            'use strict';

                            var price_2 = new Array();
                            var price_3 = new Array();
                            for (var i = 0; i < Number((for_year) * 4 + Number(for_month)); i++) {
                                price_2[i] = data.second[i];
                                price_3[i] = data.third[i];
                            }
                            var LINECHART7 = $('#lineChart7');
                            var myLineChart7 = new Chart(LINECHART7, {
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
                                            display: true,
                                            gridLines: {
                                                display: true
                                            }
                                        }]
                                    },
                                    legend: { labels: { fontColor: "#777", fontSize: 12, }, display: true }
                                },


                                data: {
                                    labels: time,
                                    datasets: [{
                                            label: "预测准线",
                                            fill: true,
                                            lineTension: 0,
                                            backgroundColor: "transparent",
                                            borderColor: '#FF8C00',
                                            pointBorderColor: '#FF8C00',
                                            pointHoverBackgroundColor: ' #FFFFFF',
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            borderWidth: 3,
                                            pointBackgroundColor: " #FFFFFF",
                                            pointBorderWidth: 0,
                                            pointHoverRadius: 4,
                                            pointHoverBorderColor: "#FF8C00",
                                            pointHoverBorderWidth: 0,
                                            pointRadius: 4,
                                            pointHitRadius: 0,
                                            data: price,
                                            spanGaps: false
                                        },
                                        {
                                            label: "预测下限",
                                            fill: true,
                                            lineTension: 0,
                                            backgroundColor: "transparent",
                                            borderColor: '  #90EE90 ',
                                            pointBorderColor: ' #90EE90  ',
                                            pointHoverBackgroundColor: '#FFFFFF',
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            borderWidth: 3,
                                            pointBackgroundColor: "#FFFFFF",
                                            pointBorderWidth: 0,
                                            pointHoverRadius: 4,
                                            pointHoverBorderColor: "  #90EE90 ",
                                            pointHoverBorderWidth: 0,
                                            pointRadius: 4,
                                            pointHitRadius: 0,
                                            data: price_2,
                                            spanGaps: false
                                        },
                                        {
                                            label: "预测上限",
                                            fill: true,
                                            lineTension: 0,
                                            backgroundColor: "transparent",
                                            borderColor: ' #FF6347 ',
                                            pointBorderColor: ' #FF6347 ',
                                            pointHoverBackgroundColor: '#FFFFFF',
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            borderWidth: 3,
                                            pointBackgroundColor: " #FFFFFF ",
                                            pointBorderWidth: 0,
                                            pointHoverRadius: 4,
                                            pointHoverBorderColor: "#FF6347",
                                            pointHoverBorderWidth: 0,
                                            pointRadius: 4,
                                            pointHitRadius: 0,
                                            data: price_3,
                                            spanGaps: false
                                        }
                                    ]
                                }
                            });
                        })
                    }
                    break;
                case '1':
                    {
                        document.getElementById("forecast_div").style.display = "none";
                    }
                    alert("未查到您输入的小区或楼盘");
                    break;
                default:
                    alert("未知错误");
            }

        }

    });
}