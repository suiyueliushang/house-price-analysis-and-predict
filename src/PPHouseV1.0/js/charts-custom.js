/*global $, document*/
    var bar1;
    var BARCHART1 = $('#barChart1');
$(document).ready(function () {

    'use strict';


    // ------------------------------------------------------- //
    // Charts Gradients
    // ------------------------------------------------------ //
    var ctx1 = $("canvas").get(0).getContext("2d");
    var gradient1 = ctx1.createLinearGradient(150, 0, 150, 300);
    gradient1.addColorStop(0, 'rgba(133, 180, 242, 0.91)');
    gradient1.addColorStop(1, 'rgba(255, 119, 119, 0.94)');

    var gradient2 = ctx1.createLinearGradient(146.000, 0.000, 154.000, 300.000);
    gradient2.addColorStop(0, 'rgba(104, 179, 112, 0.85)');
    gradient2.addColorStop(1, 'rgba(76, 162, 205, 0.85)');
    var region = new Array("江宁区", "鼓楼区", "玄武区", "栖霞区", "白下区", "六合区", "溧水区");
    var price = new Array(20,18,30,30,17,49,32);


    // ------------------------------------------------------- //
    // Line Chart
    // ------------------------------------------------------ //
    var LINECHARTEXMPLE = $('#lineChartExample');
    var lineChartExample = new Chart(LINECHARTEXMPLE, {
        type: 'line',
        options: {
            legend: { labels: { fontColor: "#777", fontSize: 12 } },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }]
            },
        },
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Ste", "Oct", "Nov", "Dce"],
            datasets: [{
                    label: "City One",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: gradient1,
                    borderColor: gradient1,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: gradient1,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: gradient1,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [30, 50, 40, 61, 42, 35, 40, 46, 23, 47, 51, 34],
                    spanGaps: false
                },
                {
                    label: "City Two",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: gradient2,
                    borderColor: gradient2,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: gradient2,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: gradient2,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [50, 40, 50, 40, 45, 40, 30, 43, 23, 34, 42, 32],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Doughnut Chart
    // ------------------------------------------------------ //
    var DOUGHNUTCHARTEXMPLE = $('#doughnutChartExample');
    var pieChartExample = new Chart(DOUGHNUTCHARTEXMPLE, {
        type: 'doughnut',
        options: {
            cutoutPercentage: 70,
        },
        data: {
            labels: [
                "A",
                "B",
                "C",
                "D"
            ],
            datasets: [{
                data: [250, 50, 100, 40],
                borderWidth: 0,
                backgroundColor: [
                    '#3eb579',
                    '#49cd8b',
                    "#54e69d",
                    "#71e9ad"
                ],
                hoverBackgroundColor: [
                    '#3eb579',
                    '#49cd8b',
                    "#54e69d",
                    "#71e9ad"
                ]
            }]
        }
    });

    var pieChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Line Chart 1
    // ------------------------------------------------------ //
    var LINECHART1 = $('#lineChartExample1');
    var myLineChart1 = new Chart(LINECHART1, {
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
                    ticks: {
                        max: 40,
                        min: 0,
                        stepSize: 0.5
                    },
                    display: false,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            datasets: [{
                label: "Total Overdue",
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
                data: [20, 28, 30, 22, 24, 10, 7, 8, 10, 11, 32, 23],
                spanGaps: false
            }]
        }
    });

    // ------------------------------------------------------- //
    // Line Chart 3
    // ------------------------------------------------------ //
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
                    display: true,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: { labels: { fontColor: "#777", fontSize: 12 } }
        },
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Ste", "Oct", "Nov", "Dec"],
            datasets: [{
                    label: "City 1",
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
                    data: [20, 28, 30, 22, 24, 10, 7, 8, 10, 11, 32, 23],
                    spanGaps: false
                },
                {
                    label: "City 2",
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
                    data: [21, 22, 35, 27, 25, 20, 12, 14, 23, 24, 42, 20],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Line Chart 2
    // ------------------------------------------------------ //
    var LINECHART2 = $('#lineChartExample2');
    var myLineChart2 = new Chart(LINECHART2, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 40,
                        min: 0,
                        stepSize: 0.5
                    },
                    display: false,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            datasets: [{
                label: "Total Overdue",
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
                data: [20, 8, 30, 22, 24, 17, 20, 23, 24, 34, 23, 12],
                spanGaps: false
            }]
        }
    });


    // ------------------------------------------------------- //
    // Line Chart 4
    // ------------------------------------------------------ //
    var LINECHART4 = $('#lineChartExample4');
    var myLineChart4 = new Chart(LINECHART4, {
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
            legend: { labels: { fontColor: "#777", fontSize: 12, }, display: false }
        },
        data: {
            labels: [lastYear(getMonth() - 11), lastYear(getMonth() - 10), lastYear(getMonth() - 9), lastYear(getMonth() - 8), lastYear(getMonth() - 7), lastYear(getMonth() - 6), lastYear(getMonth() - 5), lastYear(getMonth() - 4), lastYear(getMonth() - 3), lastYear(getMonth() - 2), lastYear(getMonth() - 1), lastYear(getMonth())],
            datasets: [{
                label: "南京",
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
                data: [],
                spanGaps: false
            }]
        }
    });


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
                    display: true,
                    gridLines: {
                        display: true
                    }
                }]
            },
            legend: { labels: { fontColor: "#777", fontSize: 12, }, display: false }
        },


        data: {
            labels: [GetDateStr(-11), GetDateStr(-10), GetDateStr(-9), GetDateStr(-8), GetDateStr(-7), GetDateStr(-6), GetDateStr(-5), GetDateStr(-4), GetDateStr(-3), GetDateStr(-2), GetDateStr(-1), GetDateStr(0)],
            datasets: [{
                label: "",
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
                data: [20, 28, 30, 22, 24, 10, 7, 8, 10, 11, 32, 23],
                spanGaps: false
            }]
        }
    });


    var LINECHART6 = $('#lineChartExample6');

    var myLineChart6 = new Chart(LINECHART6, {
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
            legend: { labels: { fontColor: "#777", fontSize: 12, }, display: false }
        },


        data: {
            labels: [GetDateStr(-11), GetDateStr(-10), GetDateStr(-9), GetDateStr(-8), GetDateStr(-7), GetDateStr(-6), GetDateStr(-5), GetDateStr(-4), GetDateStr(-3), GetDateStr(-2), GetDateStr(-1), GetDateStr(0)],
            datasets: [{
                label: "南京",
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
                data: [20, 28, 30, 22, 24, 10, 7, 8, 10, 11, 32, 23],
                spanGaps: false
            }]
        }
    });

    // ------------------------------------------------------- //
    // Line Chart5 
    // ------------------------------------------------------ //
    /*var LINECHART5 = $('#lineChartExample5');
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
                    display: true,
                    gridLines: {
                        display: true
                    }
                }]
            },
            legend: { labels: { fontColor: "#777", fontSize: 12 } }
        },
        data: {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            datasets: [{
                    label: "City 1",
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
                    data: [price_array[0], price_array[1], price_array[2], price_array[3], price_array[4], price_array[5], price_array[6], price_array[7], price_array[8], price_array[9], price_array[10], price_array[11]],
                    spanGaps: false
                },
                {
                    label: "City 2",
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
                    data: [21, 22, 35, 27, 25, 20, 12, 14, 23, 24, 42, 20],
                    spanGaps: false

                }
            ]
        }
    });

*/


    // ------------------------------------------------------- //
    // Pie Chart
    // ------------------------------------------------------ //
    var PIECHARTEXMPLE = $('#pieChartExample');
    var pieChartExample = new Chart(PIECHARTEXMPLE, {
        type: 'pie',
        data: {
            labels: [
                "A",
                "B",
                "C",
                "D"
            ],
            datasets: [{
                data: [300, 50, 100, 80],
                borderWidth: 0,
                backgroundColor: [
                    '#44b2d7',
                    "#59c2e6",
                    "#71d1f2",
                    "#96e5ff"
                ],
                hoverBackgroundColor: [
                    '#44b2d7',
                    "#59c2e6",
                    "#71d1f2",
                    "#96e5ff"
                ]
            }]
        }
    });

    var pieChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    var BARCHARTEXMPLE = $('#barChartExample');
    var barChartExample = new Chart(BARCHARTEXMPLE, {
        type: 'bar',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }]
            },
        },
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Ste", "Oct", "Nov", "Dec"],
            datasets: [{
                    label: "City 1",
                    backgroundColor: [
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1
                    ],
                    hoverBackgroundColor: [
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1
                    ],
                    borderColor: [
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1
                    ],
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: "City 2",
                    backgroundColor: [
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2
                    ],
                    hoverBackgroundColor: [
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2
                    ],
                    borderColor: [
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2
                    ],
                    borderWidth: 1,
                    data: [35, 40, 60, 47, 88, 27, 30],
                }
            ]
        }
    });



    // ------------------------------------------------------- //
    // Bar Chart 1
    // ------------------------------------------------------ //
    bar1 = new Chart(BARCHART1, {
        type: 'bar',
        options: {
            scales: {
                xAxes: [{
                    display: true
                }],
                yAxes: [{
                    display: true
                }],
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: region,
            datasets: [
                {
                    label: "city 1",
                    backgroundColor:"#62a8ea",
                    borderWidth: 0,
                    data: price
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Bar Chart 2
    // ------------------------------------------------------ //
    var BARCHART2 = $('#barChart2');
    var barChartHome2 = new Chart(BARCHART2, {
        type: 'bar',
        options: {
            scales: {
                xAxes: [{
                    display: true
                }],
                yAxes: [{
                    display: false
                }],
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            datasets: [{
                label: "city 2",
                backgroundColor: [
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d'
                ],
                borderColor: [
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d',
                    '#54e69d'
                ],
                borderWidth: 1,
                data: [40, 33, 22, 28, 40, 25, 30, 40, 28, 27, 22, 15]
            }]
        }
    });


    // ------------------------------------------------------- //
    // Polar Chart
    // ------------------------------------------------------ //
    var POLARCHARTEXMPLE = $('#polarChartExample');
    var polarChartExample = new Chart(POLARCHARTEXMPLE, {
        type: 'polarArea',
        options: {
            elements: {
                arc: {
                    borderWidth: 0,
                    borderColor: '#aaa'
                }
            }
        },
        data: {
            datasets: [{
                data: [
                    11,
                    16,
                    12,
                    11,
                    7
                ],
                backgroundColor: [
                    "#e05f5f",
                    "#e96a6a",
                    "#ff7676",
                    "#ff8b8b",
                    "#fc9d9d"
                ],
                label: 'My dataset' // for legend
            }],
            labels: [
                "A",
                "B",
                "C",
                "D",
                "E"
            ]
        }
    });

    var polarChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Radar Chart
    // ------------------------------------------------------ //
    var RADARCHARTEXMPLE = $('#radarChartExample');
    var radarChartExample = new Chart(RADARCHARTEXMPLE, {
        type: 'radar',
        data: {
            labels: ["A", "B", "C", "D", "E", "C"],
            datasets: [{
                    label: "First dataset",
                    backgroundColor: "rgba(84, 230, 157, 0.4)",
                    borderWidth: 2,
                    borderColor: "rgba(75, 204, 140, 1)",
                    pointBackgroundColor: "rgba(75, 204, 140, 1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(75, 204, 140, 1)",
                    data: [65, 59, 90, 81, 56, 55]
                },
                {
                    label: "Second dataset",
                    backgroundColor: "rgba(255, 119, 119, 0.4)",
                    borderWidth: 2,
                    borderColor: "rgba(255, 119, 119, 1)",
                    pointBackgroundColor: "rgba(255, 119, 119, 1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(255, 119, 119, 1)",
                    data: [50, 60, 80, 45, 96, 70]
                }
            ]
        }
    });
    var radarChartExample = {
        responsive: true
    };



});

function getMonth() {
    var date = new Date();
    var month = date.getMonth();
    return month;
}

function lastYear(month) {
    month = (month + 12) % 12 + 1;
    return month + "月";
}



function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期

    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return m + "." + d;
}