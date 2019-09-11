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
			$(".line_area").html(district);
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
		/*if($("#selectD").length > 0){
			var house_type = $("#selectD a").html();
		}*/

		city = $("#citySelect").html();
		$.ajax({
			type:"POST",
			url:"/query_prices",
			datatype:"json",
			data: {
				'city': city.replace(/市/, ""),
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
				$("#lineChartExample4").remove();
				$("#line_chart").append('<canvas id="lineChartExample4"></canvas>');
				$(document).ready(function() {
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
									display: true,
									gridLines: {
										display: true
									}
								}]
							},
							legend: {
								labels: {
									fontColor: "#777",
									fontSize: 12
								},
								display: false
							}
						},
						data: {
							labels: [lastYear(getMonth() - 11), lastYear(getMonth() - 10), lastYear(getMonth() - 9), lastYear(getMonth() - 8), lastYear(getMonth() - 7), lastYear(getMonth() - 6), lastYear(getMonth() - 5), lastYear(getMonth() - 4), lastYear(getMonth() - 3), lastYear(getMonth() - 2), lastYear(getMonth() - 1), lastYear(getMonth())],
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
								data: [data.one, data.two, data.three, data.four, data.five, data.six, data.seven, data.eight, data.nine, data.ten, data.eleven, data.twelve],
								spanGaps: false
							}]
						}
					});
					var a = '<li class="list-item"><div class="item"><lable style="display: none" class="house_id"></lable><div class="item-img"><img class="img_container" src="#" width="180" height="135" /></div><div class="house-details"><div class="house-title"><a class="house_title" title="" href="#" target="_blank" id="house_title"></a></div><div class="details-item"><span class="house_type" id="house_type"></span><em class="spe-lines">|</em><span class="area" id="area"></span><em class="spe-lines">|</em><span class="floor"></span></div><div class="tags-bottom"></div></div><div class="pro-price"><span class="price-det"><strong class="total_price" id="total_price"></strong>万</span><span class="unit-price" id="ave_price"></span></div></div><div class="actions"><button class="add_to_compare">加入对比</button><button class="add_to_collection">关注</button></div><div class="delete_checkbox" style="display: none"><input type="checkbox"></div></li>';
					$(".sale-left ul").empty();
					for (var i = 0; i < data.houses.length; i++) {
						if(data.houses[i].firm_name!=""){
							$(".sale-left ul").append(a);
							$(".img_container").eq(i).attr("src","full/no_img.jpg");
							$(".house_title").eq(i).html(data.houses[i].firm_name);
							//$(".address").eq(i).html(data.houses[i].address);
							$(".house_type").eq(i).html(data.houses[i].house_type);
							$(".unit-price").eq(i).html(data.houses[i].average_price+"元/㎡");
							$(".total_price").eq(i).html(data.houses[i].total_price);
							$(".area").eq(i).html(data.houses[i].area+"㎡");
							$(".floor").eq(i).html(data.houses[i].height);
							//$(".direction").eq(i).html(data.houses[i].direction);
							$(".house_id").eq(i).html(data.houses[i].id);
							$(".list-item .house_title").eq(i).attr("href", "house.html?id=" + data.houses[i].id +"&img="+ $(".img_container").eq(i).attr("src"));
							if (data.houses[i].new) {
								$(".list-item .tags-bottom").eq(i).append('<span class="item-tags tag-1">新房</span>');
							}
							if (data.houses[i].elevator == "有") {
								$(".list-item .tags-bottom").eq(i).append('<span class="item-tags tag-2">有电梯</span>');
							}
							if (data.houses[i].zhuangxiu == "精装") {
								$(".list-item .tags-bottom").eq(i).append('<span class="item-tags tag-3">精装</span>');
							}
						}
					}
					if(data.houses.length == 0){
						$("#result").html("抱歉！暂时没有该地区的房源！");
						$("#Pagination").pagination(1);
					}
					if(data.houses.length < 20){
						$("#result").html("为您找到以下房源");
						$("#Pagination").pagination(1);
					}
					else{
						$("#result").html("为您找到以下房源");
						$("#Pagination").pagination(data.page_num);
					}
				});
				}
		});
	});

	/*$("#pricerange_search").click(function(){
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
	});*/
	
	$(".sort-con a").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
});

/* 点击具体房源行加载链接 */
$(document).on("click",'.list-item .item',function(){
	$("a",this)[0].click();
});

/* 加入/删除对比点击事件 */
$(document).on("click",".add_to_compare",function(){
	if($(this).html()=="加入对比"){
		if(!sessionStorage.getItem("house_list")){
			var house_list = [$(this).parent(".actions").siblings(".item").children(".house_id").html()];
			var house_img = [$(this).parent(".actions").siblings(".item").children(".item-img").children(".img_container").attr("src")];
			sessionStorage.setItem("house_list",JSON.stringify(house_list));
			sessionStorage.setItem("house_img",JSON.stringify(house_img));
			$(".compare .compare_num").html("1");
			$(this).html("已加入对比");
		}else{
			var house_list = JSON.parse(sessionStorage.getItem("house_list"));
			var house_img = JSON.parse(sessionStorage.getItem("house_img"));
			if(house_list.length>3){
				alert("最多支持4个房源对比！");
			}
			else{
				house_list.push($(this).parent(".actions").siblings(".item").children(".house_id").html());
				house_img.push($(this).parent(".actions").siblings(".item").children(".item-img").children(".img_container").attr("src"));
				sessionStorage.removeItem("house_list");
				sessionStorage.setItem("house_list",JSON.stringify(house_list));
				sessionStorage.removeItem("house_img");
				sessionStorage.setItem("house_img",JSON.stringify(house_img));
				$(".compare .compare_num").html(house_list.length);
				$(this).html("已加入对比");
			}
		}
	}
	else{
		var house_list = JSON.parse(sessionStorage.getItem("house_list"));
		var a = house_list.indexOf($(this).parent(".actions").siblings(".item").children(".house_id").html());
		var house_img = JSON.parse(sessionStorage.getItem("house_img"));
		var b = house_img.indexOf($(this).parent(".actions").siblings(".item").children(".item-img").children(".img_container").attr("src"));
		house_list.splice(a,1);
		house_img.splice(b,1);
		sessionStorage.removeItem("house_list");
		sessionStorage.setItem("house_list",JSON.stringify(house_list));
		sessionStorage.removeItem("house_img");
		sessionStorage.setItem("house_img",JSON.stringify(house_img));
		if(house_list.length>0){
			$(".compare .compare_num").html(house_list.length);
		}else{
			$(".compare .compare_num").html("0");
		}
		$(this).html("加入对比");
	}
});

/* 加入/删除关注点击事件 */
$(document).on("click",".add_to_collection",function(){
	//alert($(this).parent(".actions").siblings(".item").children(".house_id").html());
	if($(this).html()=="关注"){//添加关注
		$.ajax({
			type:"POST",
			url:"/add_collection",
			datatype:"json",
			data: {
				'id': $(this).parent(".actions").siblings(".item").children(".house_id").html()
			},
			async: false,
			error: function(request) {
				alert("Connection error");
			},
			success:function(data) {
				$(this).html("已关注");
			}
		});
	}
	else{//删除关注
		$.ajax({
			type:"POST",
			url:"/delete_collection",
			datatype:"json",
			data: {
				'id': $(this).parent(".actions").siblings(".item").children(".house_id").html()
			},
			async: false,
			error: function(request) {
				alert("Connection error");
			},
			success:function(data) {
				$(this).html("关注");
			}
		});
	}
});

/* checkbox事件 */
$(document).on("change",".delete_checkbox input",function(){
	if($(this).prop('checked')){
		$(this).closest(".list-item").attr("style","background:#f3f3eb");
		for(var i=0; i<20; i++){
			if(!$(".delete_checkbox input").eq(i).prop('checked')){
				return;
			}
		}
		$(".all_delete").attr("checked",true);
	}
	else{
		$(this).closest(".list-item").attr("style","background:inherit");
		for(var i=0; i<20; i++){
			if(!$(".delete_checkbox input").eq(i).prop('checked')){
				$(".all_delete").attr("checked",false);
			}
		}
	}
});

/* checkbox全选事件 */
$(document).on("change",".all_delete",function(){
	if($(this).prop('checked')){
		$(".delete_checkbox input").attr("checked",true);
		$(".list-item").attr("style","background:#f3f3eb");
	}
	else{
		$(".delete_checkbox input").attr("checked",false);
		$(".list-item").attr("style","background:inherit");
	}
});

/* 反选事件 */
$(document).on("click",".reverse",function(){
	for(var i=0; i<20; i++){
		if($(".delete_checkbox input").eq(i).prop('checked')){
			$(".delete_checkbox input").eq(i).attr("checked",false);
			$(".list-item").eq(i).attr("style","background:inherit");
		}
		else{
			$(".delete_checkbox input").eq(i).attr("checked",true);
			$(".list-item").eq(i).attr("style","background:#f3f3eb");
		}
	}
});

/* 删除按钮事件 */
$(document).on("click",".delete",function(){
	for(var i=0; i<20; i++){
		var delete_list = new Array;
		if($(".delete_checkbox input").eq(i).prop('checked')){
			delete_list.push($(".list-item lable").eq(i).html());
			$(".delete_checkbox input").eq(i).attr("checked",false);
			$(".list-item").eq(i).attr("style","background:inherit");
			$(".delete_checkbox input").eq(i).attr("disabled",true);
		}
	}
	$.ajax({
		type: "post",
		url: "/delete_house_info",
		datatype: "json",
		data: {
			"id": house_list
		},
		async: false,
		traditional: true,
		error: function(request) {
			alert("Connection error");
		},
		success(data) {}
	});
});