/**
 * 房价查询界面的分页脚本，包括跳页
 * 该脚本需要JQuery 1.4.2版本以上
 * @author 71117419 蒋亚琪
 * @version 1.0
 * @param {int} maxentries 可访问的总页数
 * @param {Object} opts 一些设置
 * @return {Object} jQuery对象
 */

 (function($){
	/**
	 * @class 计算页码值
	 */
	$.PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	}
	
	$.extend($.PaginationCalculator.prototype, {
		/**
		 * 计算总页数
		 * @method
		 * @returns {Number}
		 */
		numPages:function() {
			return Math.ceil(this.maxentries/this.opts.items_per_page);
		},

		/**
		 * 计算首页和尾页
		 * @returns {Array}
		 */
		getInterval:function(current_page)  {
			var ne_half = Math.floor(this.opts.num_display_entries/2);
			var np = this.numPages();
			var upper_limit = np - this.opts.num_display_entries;
			var start = current_page > ne_half ? Math.max( Math.min(current_page - ne_half, upper_limit), 0 ) : 0;
			var end = current_page > ne_half?Math.min(current_page+ne_half + (this.opts.num_display_entries % 2), np):Math.min(this.opts.num_display_entries, np);
			return {start:start, end:end};
		}
	});
	
	// 为分页渲染器初始化jQuery对象容器
	$.PaginationRenderers = {}
	
	/**
	 * @class 默认渲染器
	 */
	$.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new $.PaginationCalculator(maxentries, opts);
	}
	$.extend($.PaginationRenderers.defaultRenderer.prototype, {
		/**
		 * 用于生成单个链接的辅助函数（如果是当前页面，则为span标记）
		 * @param {Number} page_id 新项目的页面ID
		 * @param {Number} current_page 
		 * @param {Object} appendopts 新项目的选项：文本和类
		 * @returns {jQuery} 包含链接的jQuery对象
		 */
		createLink:function(page_id, current_page, appendopts){
			var lnk, np = this.pc.numPages();
			page_id = page_id<0?0:(page_id<np?page_id:np-1); // 将页面ID标准化为合理值
			appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
			if(page_id == current_page){
				lnk = $("<a class='current'>" + appendopts.text + "</a>");
			}
			else
			{
				lnk = $("<a>" + appendopts.text + "</a>")
					.attr('href', this.opts.link_to.replace(/__id__/,page_id));
			}
			if(appendopts.classes){ lnk.addClass(appendopts.classes); }
			lnk.data('page_id', page_id);
			return lnk;
		},
		// 生成一系列数字链接 
		appendRange:function(container, current_page, start, end, opts) {
			var i;
			for(i=start; i<end; i++) {
				this.createLink(i, current_page, opts).appendTo(container);
			}
		},
		getLinks:function(current_page, eventHandler) {
			var begin, end,
				interval = this.pc.getInterval(current_page),
				np = this.pc.numPages(),
				fragment = $("<div class='pagination'></div>");
			
			// 生成“上一页”链接
			if(this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)){
				fragment.append(this.createLink(current_page-1, current_page, {text:this.opts.prev_text, classes:"prev"}));
			}

			// 生成首页链接
			if (interval.start > 0 && this.opts.num_edge_entries > 0)
			{
				end = Math.min(this.opts.num_edge_entries, interval.start);
				this.appendRange(fragment, current_page, 0, end, {classes:'sp'});
				if(this.opts.num_edge_entries < interval.start && this.opts.ellipse_text)
				{
					$("<span class='pagination-break'>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
			}

			// 生成间隔
			this.appendRange(fragment, current_page, interval.start, interval.end);
			
			// 生成尾页链接
			if (interval.end < np && this.opts.num_edge_entries > 0)
			{
				if(np-this.opts.num_edge_entries > interval.end && this.opts.ellipse_text)
				{
					$("<span class='pagination-break'>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
				begin = Math.max(np-this.opts.num_edge_entries, interval.end);
				this.appendRange(fragment, current_page, begin, np, {classes:'ep'});
				
			}

			// 生成“下一页”链接
			if(this.opts.next_text && (current_page < np-1 || this.opts.next_show_always)){
				fragment.append(this.createLink(current_page+1, current_page, {text:this.opts.next_text, classes:"next"}));
			}
			$('a', fragment).click(eventHandler);
			return fragment;
		}
	});
	
	// 扩展jQuery
	$.fn.pagination = function(maxentries, opts){
		
		// 初始化默认值
		opts = $.extend({
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
		
		var containers = this,
			renderer, links, current_page;

		//跳页事件
    $(".page-btn").one("click",function(){
		var allPage = $(".allPage").text();
    	//console.log(allPage);
      var goPage = $(".page-go input").val()-1; //跳转页数
      if(goPage > -1 && goPage < allPage){
		opts.current_page = goPage;
      	$("#Pagination").pagination(allPage,opts);
		
		/* 保存筛选条件 */
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
		city = $("#citySelect").html();
		/* 数据请求 */
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
				'page': goPage+1
			},
			async: false,
			error: function(request) {
				alert("Connection error");
			},
			success:function(data) {
				$(document).ready(function(){
					/* 动态加载房源 */
					var a = '<li class="list-item"><div class="item"><lable style="display: none" class="house_id"></lable><div class="item-img"><img class="img_container" src="#" width="180" height="135" /></div><div class="house-details"><div class="house-title"><a class="house_title" title="" href="#" target="_blank" id="house_title"></a></div><div class="details-item"><span class="house_type" id="house_type"></span><em class="spe-lines">|</em><span class="area" id="area"></span><em class="spe-lines">|</em><span class="floor"></span></div><div class="tags-bottom"></div></div><div class="pro-price"><span class="price-det"><strong class="total_price" id="total_price"></strong>万</span><span class="unit-price" id="ave_price"></span></div></div><div class="actions"><button class="add_to_compare">加入对比</button><button class="add_to_collection">关注</button></div><div class="delete_checkbox" style="display: none"><input type="checkbox"></div></li>';
					$(".sale-left ul").empty();
					for (var i = 0; i < data.houses.length; i++) {
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
				});
			}
		});
		window.scrollTo(0,0);
      }else {
      	$("#Pagination").pagination(allPage);
      }
      //清空用户跳转页数
      $(".page-go input").val("");
    });
		
		/**
		 * 分页链接事件处理
		 * @param {int} page_id
		 */
		function paginationClickHandler(evt){
			var links, 
				new_current_page = $(evt.target).data('page_id'),
				continuePropagation = selectPage(new_current_page);
			
			/* 保留筛选条件 */
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
			city = $("#citySelect").html();
			/* 请求数据 */
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
					'page': new_current_page+1
				},
				async: false,
				error: function(request) {
					alert("Connection error");
				},
				success:function(data) {
					$(document).ready(function(){
						/* 动态加载房源 */
						var a = '<li class="list-item"><div class="item"><lable style="display: none" class="house_id"></lable><div class="item-img"><img class="img_container" src="#" width="180" height="135" /></div><div class="house-details"><div class="house-title"><a class="house_title" title="" href="#" target="_blank" id="house_title"></a></div><div class="details-item"><span class="house_type" id="house_type"></span><em class="spe-lines">|</em><span class="area" id="area"></span><em class="spe-lines">|</em><span class="floor"></span></div><div class="tags-bottom"></div></div><div class="pro-price"><span class="price-det"><strong class="total_price" id="total_price"></strong>万</span><span class="unit-price" id="ave_price"></span></div></div><div class="actions"><button class="add_to_compare">加入对比</button><button class="add_to_collection">关注</button></div><div class="delete_checkbox" style="display: none"><input type="checkbox"></div></li>';
						$(".sale-left ul").empty();
						for (var i = 0; i < data.houses.length; i++) {
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
					});
				}
			});
			window.scrollTo(0,0);
			if (!continuePropagation) {
				evt.stopPropagation();
			}
			return continuePropagation;
		}
		
		/**
		 * 处理内部事件，在分页容器对象上设置新的当前页面，为分页链接生成新的HTMl片段并调用回调函数。
		 */
		function selectPage(new_current_page) {
			// 更新所有容器的链接显示
			containers.data('current_page', new_current_page);
			links = renderer.getLinks(new_current_page, paginationClickHandler);
			containers.empty();
			links.appendTo(containers);
			// 如果没有返回false，则调用回调函数并传播该事件
			var continuePropagation = opts.callback(new_current_page, containers);
			return continuePropagation;
		}
		
		/**
		 * 初始化容器
		 */
        current_page = parseInt(opts.current_page);
		containers.data('current_page', current_page);
		// 为maxentries和items_per_page创建一个合理的值
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		
		if(!$.PaginationRenderers[opts.renderer])
		{
			throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
		}
		renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
		
		// 将控制事件附加到DOM元素
		var pc = new $.PaginationCalculator(maxentries, opts);
		var np = pc.numPages();
		containers.bind('setPage', {numPages:np}, function(evt, page_id) { 
				if(page_id >= 0 && page_id < evt.data.numPages) {
					selectPage(page_id); return false;
				}
		});
		containers.bind('prevPage', function(evt){
				var current_page = $(this).data('current_page');
				if (current_page > 0) {
					selectPage(current_page - 1);
				}
				return false;
		});
		containers.bind('nextPage', {numPages:np}, function(evt){
				var current_page = $(this).data('current_page');
				if(current_page < evt.data.numPages - 1) {
					selectPage(current_page + 1);
				}
				return false;
		});
		
		// 添加链接
		links = renderer.getLinks(current_page, paginationClickHandler);
		containers.empty();
		if(np > 1 || opts.show_if_single_page) {
			links.appendTo(containers);
		}
		// 调用回调函数
		if(opts.load_first_page) {
			opts.callback(current_page, containers);
		}
	}
	
})(jQuery);
