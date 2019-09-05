/**
 * This jQuery plugin displays pagination links inside the selected elements.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
 (function($){
	/**
	 * @class Class for calculating pagination values
	 */
	$.PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	}
	
	$.extend($.PaginationCalculator.prototype, {
		/**
		 * Calculate the maximum number of pages
		 * @method
		 * @returns {Number}
		 */
		numPages:function() {
			return Math.ceil(this.maxentries/this.opts.items_per_page);
		},
		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
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
	
	// Initialize jQuery object container for pagination renderers
	$.PaginationRenderers = {}
	
	/**
	 * @class Default renderer for rendering pagination links
	 */
	$.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new $.PaginationCalculator(maxentries, opts);
	}
	$.extend($.PaginationRenderers.defaultRenderer.prototype, {
		/**
		 * Helper function for generating a single link (or a span tag if it's the current page)
		 * @param {Number} page_id The page id for the new item
		 * @param {Number} current_page 
		 * @param {Object} appendopts Options for the new item: text and classes
		 * @returns {jQuery} jQuery object containing the link
		 */
		createLink:function(page_id, current_page, appendopts){
			var lnk, np = this.pc.numPages();
			page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
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
		// Generate a range of numeric links 
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
			
			// Generate "Previous"-Link
			if(this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)){
				fragment.append(this.createLink(current_page-1, current_page, {text:this.opts.prev_text, classes:"prev"}));
			}
			// Generate starting points
			if (interval.start > 0 && this.opts.num_edge_entries > 0)
			{
				end = Math.min(this.opts.num_edge_entries, interval.start);
				this.appendRange(fragment, current_page, 0, end, {classes:'sp'});
				if(this.opts.num_edge_entries < interval.start && this.opts.ellipse_text)
				{
					$("<span class='pagination-break'>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
			}
			// Generate interval links
			this.appendRange(fragment, current_page, interval.start, interval.end);
			// Generate ending points
			if (interval.end < np && this.opts.num_edge_entries > 0)
			{
				if(np-this.opts.num_edge_entries > interval.end && this.opts.ellipse_text)
				{
					$("<span class='pagination-break'>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
				begin = Math.max(np-this.opts.num_edge_entries, interval.end);
				this.appendRange(fragment, current_page, begin, np, {classes:'ep'});
				
			}
			// Generate "Next"-Link
			if(this.opts.next_text && (current_page < np-1 || this.opts.next_show_always)){
				fragment.append(this.createLink(current_page+1, current_page, {text:this.opts.next_text, classes:"next"}));
			}
			$('a', fragment).click(eventHandler);
			return fragment;
		}
	});
	
	// Extend jQuery
	$.fn.pagination = function(maxentries, opts){
		
		// Initialize options with default values
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

		//goto
    $(".page-btn").one("click",function(){
    	var allPage = $(".allPage").text();
    	//console.log(allPage);
      var goPage = $(".page-go input").val() - 1; //跳转页数
      if(goPage > -1 && goPage < allPage){
			opts.current_page = goPage;
		
		var min_price = 0;
		var max_price = 10000000;
		//var min_area = 0;
		//var max_area = 5000;
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
		/*if($("#selectC").length > 0){
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
		}*/
		$.ajax({
			type:"POST",
			url:"/query_prices",
			datatype:"json",
			data: {
				'city': $('#citySelect').html(),
				'district' :district,
				'month': getMonth()+1,
				'min_price': min_price,
				'max_price': max_price,
				//'min_area': min_area,
				//'max_area': max_area,
				'page': goPage
			},
			async: false,
			error: function(request) {
				alert("Connection error");
			},
			success:function(data) {
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
				});
				}
		});
      	$("#Pagination").pagination(allPage,opts);
      }else {
      	$("#Pagination").pagination(allPage);
      }
      //清空用户跳转页数
      $(".page-go input").val("");
    });
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function paginationClickHandler(evt){
			var links, 
				new_current_page = $(evt.target).data('page_id'),
				continuePropagation = selectPage(new_current_page);
			
			var min_price = 0;
			var max_price = 10000000;
			//var min_area = 0;
			//var max_area = 5000;
			var district = "";
			if($("#selectA").length > 0){
				district = $("#selectA a").html();
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
			$.ajax({
				type:"POST",
				url:"/query_prices",
				datatype:"json",
				data: {
					'city': $("#citySelect").html(),
					'district' :district,
					'month': getMonth()+1,
					'min': min_price,
					'max': max_price,
					'page': new_current_page+1
				},
				async: false,
				error: function(request) {
					alert("Connection error");
				},
				success:function(data) {
					$(document).ready(function(){
						for(var i=0; i<20; i++){
							$(".house_title").eq(i).html(data.houses[i].firm_name);
							$(".address").eq(i).html(data.houses[i].address);
							$(".house_type").eq(i).html(data.houses[i].house_type);
							$(".ave_price").eq(i).html(data.houses[i].average_price);
							$(".total_price").eq(i).html(data.houses[i].total_price);
							$(".area").eq(i).html(data.houses[i].area);
						}
					});
				}
			});
			if (!continuePropagation) {
				evt.stopPropagation();
			}
			return continuePropagation;
		}
		
		/**
		 * This is a utility function for the internal event handlers. 
		 * It sets the new current page on the pagination container objects, 
		 * generates a new HTMl fragment for the pagination links and calls
		 * the callback function.
		 */
		function selectPage(new_current_page) {
			// update the link display of a all containers
			containers.data('current_page', new_current_page);
			links = renderer.getLinks(new_current_page, paginationClickHandler);
			containers.empty();
			links.appendTo(containers);
			// call the callback and propagate the event if it does not return false
			var continuePropagation = opts.callback(new_current_page, containers);
			return continuePropagation;
		}
		
		// -----------------------------------
		// Initialize containers
		// -----------------------------------
                current_page = parseInt(opts.current_page);
		containers.data('current_page', current_page);
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		
		if(!$.PaginationRenderers[opts.renderer])
		{
			throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
		}
		renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
		
		// Attach control events to the DOM elements
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
		
		// When all initialisation is done, draw the links
		links = renderer.getLinks(current_page, paginationClickHandler);
		containers.empty();
		if(np > 1 || opts.show_if_single_page) {
			links.appendTo(containers);
		}
		// call callback function
		if(opts.load_first_page) {
			opts.callback(current_page, containers);
		}
	} // End of $.fn.pagination block
	
})(jQuery);
