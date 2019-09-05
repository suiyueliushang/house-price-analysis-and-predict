$(document).ready(function(){
							
	$("#select1 dd").click(function () {
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectA").remove();
		} else {
			var copyThisA = $(this).clone();
			if ($("#selectA").length > 0) {
				$("#selectA a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisA.attr("id", "selectA"));
			}
		}
	});
	
	$("#select2 dd").click(function () {
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectB").remove();
		} else {
			var copyThisB = $(this).clone();
			if ($("#selectB").length > 0) {
				$("#selectB a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisB.attr("id", "selectB"));
			}
		}
	});
	
	$("#select3 dd").click(function () {
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectC").remove();
		} else {
			var copyThisC = $(this).clone();
			if ($("#selectC").length > 0) {
				$("#selectC a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisC.attr("id", "selectC"));
			}
		}
	});

	$("#select4 dd").click(function () {
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectD").remove();
		} else {
			var copyThisD = $(this).clone();
			if ($("#selectD").length > 0) {
				$("#selectD a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisD.attr("id", "selectD"));
			}
		}
	});
	
	$("#selectA").live("click", function () {
		$(this).remove();
		$("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
	});
	
	$("#selectB").live("click", function () {
		$(this).remove();
		$("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
	});
	
	$("#selectC").live("click", function () {
		$(this).remove();
		$("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
	});

	$("#selectD").live("click", function () {
		$(this).remove();
		$("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
	});
	
	$(".select dd").live("click", function () {
		if ($(".select-result dd").length > 1) {
			$(".select-no").hide();
			$("#smit").show();
		} else {
			$(".select-no").show();
			$("#smit").hide();
		}
	});

	$("#smit").click(function(){

		var min_price = 0;
		var max_price = 10000000;
		var min_area = 0;
		var max_area = 5000;
		var district = "";
		if($("#selectA").length > 0){
			district = $("#selectA a").html();
			var pat1 = new RegExp("区");
			var pat2 = new RegExp("县");
			if(pat1.test(district)){
				district = district.replace(/区/,"");
			}
			if(pat2.test(district)){
				district = district.replace(/县/,"");
			}
		}
		if($("#selectB").length > 0){
			var price = $("#selectB a").html();
			var patt1 = new RegExp("万以下");
			var patt2 = new RegExp("万以上");
			var n = new Array(2);
			if(patt1.test(price)){
				max_price = price.replace(/万以下/,"");
			}
			else if(patt2.test(price)){
				min_price = price.replace(/万以上/,"");
			}
			else{
				n = price.match(/\d+/g);
				min_price = n[0];
				max_price = n[1];
			}
		}
		if($("#selectC").length > 0){
			var area = $("#selectC a").html();
			var patt1 = new RegExp("㎡以下");
			var patt2 = new RegExp("㎡以上");
			var n = new Array(2);
			if(patt1.test(area)){
				max_area = area.replace(/㎡以下/,"");
			}
			else if(patt2.test(area)){
				min_area = area.replace(/㎡以上/,"");
			}
			else{
				n = area.match(/\d+/g);
				min_area = n[0];
				max_area = n[1];
			}
		}
		if($("#selectD").length > 0){
			var house_type = $("#selectD a").html();
		}

		var opts = $.extend({
			items_per_page:1,
			num_display_entries:4,
			current_page:0,
			num_edge_entries:1,
			link_to:"#",
			prev_text:"<i></i>上一页",
			next_text:"下一页 <i></i>",
			ellipse_text:"...",
			prev_show_always:true,
			next_show_always:true,
			renderer:"defaultRenderer",
			show_if_single_page:false,
			load_first_page:false,
			callback:function(){return false;}
		},opts||{});

		var region_price = new Array(12);
		$("#region").html(district);

		$.ajax({
			type:"POST",
			url:"/query_prices",
			datatype:"json",
			data: {
				'city': $("#citySelect").html(),
				'district' :district,
				'month': getMonth()+1,
				'min_price': min_price,
				'max_price': max_price,
				'min_area': min_area,
				'max_area': max_area,
				'page': 1
			},
			async: false,
			error: function(request) {
				alert("Connection error");
			},
			success:function(data) {
				region_price[0]=data.one;
				region_price[1]=data.two;
				region_price[2]=data.three;
				region_price[3]=data.four;
				region_price[4]=data.five;
				region_price[5]=data.six;
				region_price[6]=data.seven;
				region_price[7]=data.eight;
				region_price[8]=data.nine;
				region_price[9]=data.ten;
				region_price[10]=data.eleven;
				region_price[11]=data.twelve;
				$(document).ready(function(){
					for(var i=0; i<20; i++){
						$(".house_title").eq(i).html(data.houses[i].firm_name);
						$(".address").eq(i).html(data.houses[i].address);
						$(".house_type").eq(i).html(data.houses[i].house_type);
						$(".ave_price").eq(i).html(data.houses[i].average_price);
						$(".total_price").eq(i).html(data.houses[i].total_price);
						$(".area").eq(i).html(data.houses[i].area);
						$(".floor").eq(i).html(data.houses[i].heigth);
						$(".house_id").eq(1).html(date.houses[i].id);
						if(data.houses[i].new){
							$(".list-item .tags-bottom").append('<span class="item-tags tag-metro">新房</span>');
						}
						if(data.houses[i].elevator=="有"){
							$(".list-item .tags-bottom").append('<span class="item-tags tag-metro">有电梯</span>');
						}
						if(data.houses[i].zhuangxiu=="精装"){
							$(".list-item .tags-bottom").append('<span class="item-tags tag-metro">精装</span>');
						}
					}
					$("#Pagination").pagination(data.page_num,opts);
					$("#allPage").html(data.page_num);
				});
				}
		});
		$("#lineChartExample4").remove();
		$("#line_chart").append('<canvas id="lineChartExample4"></canvas>');
		$(document).ready(function () {
			'use strict';
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
						display:true,
						gridLines: {
							display: true
						}
					}]
				},
				legend: {labels:{fontColor:"#777", fontSize: 12},display:false}
			},
			data: {
				labels: [lastYear(getMonth()-11), lastYear(getMonth()-10), lastYear(getMonth()-9), lastYear(getMonth()-8), lastYear(getMonth()-7), lastYear(getMonth()-6), lastYear(getMonth()-5), lastYear(getMonth()-4), lastYear(getMonth()-3), lastYear(getMonth()-2), lastYear(getMonth()-1), lastYear(getMonth())],
				datasets: [
					{
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
						data: [region_price[0], region_price[1], region_price[2], region_price[3], region_price[4], region_price[5], region_price[6], region_price[7], region_price[8], region_price[9], region_price[10], region_price[11]],
						spanGaps: false
					}
				]
			}
		});
		});
	});

	$("#pricerange_search").click(function(){
		$("#from_price").css("color","#f60");
		$("#to_price").css("color","#f60");
		$(this).hide();
		$("#select2 .selected").removeClass("selected");

	});

	$("#arearange_search").click(function(){
		$("#from_area").css("color","#f60");
		$("#to_area").css("color","#f60");
		$(this).hide();
		$("#select3 .selected").removeClass("selected");
	});


	$("#from_price").focus(function(){
		$("#pricerange_search").show();
	});

	$("#to_price").focus(function(){
		$("#pricerange_search").show();
	});

	$("#from_price").blur(function(){
		$("#pricerange_search").hide();
	});

	$("#to_price").blur(function(){
		$("#pricerange_search").hide();
	});

	$("#from_area").focus(function(){
		$("#arearange_search").show();
	});

	$("#to_area").focus(function(){
		$("#arearange_search").show();
	});

	$("#from_area").blur(function(){
		$("#arearange_search").hide();
	});

	$("#to_area").blur(function(){
		$("#arearange_search").hide();
	});
	
	$(".sort-con a").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
});