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
		if($("#selectA").length > 0){
			var district = $("#selectA a").html();
		}
		if($("#selectB").length > 0){
			var price = $("#selectB a").html();
		}
		if($("#selectC").length > 0){
			var area = $("#selectC a").html();
		}
		if($("#selectD").length > 0){
			var house_type = $("#selectD a").html();
		}
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
	
});