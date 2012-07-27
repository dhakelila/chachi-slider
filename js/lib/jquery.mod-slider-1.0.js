/*
 * jQuery mod Mod Slider v1.0
 * Free to use and abuse.
 * https://github.com/davidsingal/mod-slider
 */

(function($) {
	$.fn.modSlider = function(options) {
		
		var settings = $.extend({
			velocity: 1000,
			showNav: true
		}, options);
		
		var target, panelWidth, panelsWrapper, navigation;
		
		var slider = {
			init: function(el) {
				target = $(el);
				panels = target.find(".mod-panel");
				panelsWrapper = $("<div class=\"mod-panels-wrapper\"></div>");
				navigation = $("<div class=\"mod-nav\"></div>");
				
				var self = this,
					wrapper = $("<div class=\"mod-wrapper\"></div>"),
					navHtml = "";			
				
				if (settings.showNav) {
					target.append(navigation);
					
					for (var i = 0; i < panels.length; i++) {
						navHtml += "<li><a href=\"#panel" + i + "\">" + (i+1) + "</a></li>";
					}
					
					navigation.append("<ul>" + navHtml + "</ul>");
				}			
				
				target.append(wrapper);
				
				wrapper.append(panelsWrapper);
				
				panels.appendTo(panelsWrapper);
				
				self.size();
				
				links = navigation.find("a");
				
				$(links[0]).addClass("current");
				
				$.each(links, function(index, Element) {
					$(Element).click(function(ev) {
						ev.preventDefault();
						
						$(links).removeClass("current");
						
						t = this.href.split("#panel");
						
						$(el).find("div.mod-panels-wrapper").stop().animate({
							"left": -t[1] * panelWidth
						}, settings.velocity, function() {
							$(Element).addClass("current");
						});
					});
				});
				
				console.log(panelsWrapper);
			},
			size: function() {
				var self = this;
				panelWidth = $(target).width();
				
				panels.css("width", panelWidth + "px");
				panelsWrapper.css("width", (panelWidth * panels.length) + "px");
			}
		};
		
		$(window).resize(function() {
			slider.size();
		});
		
		return this.each(function(index, Element) {
			slider.init(Element);
		});
		
	};
})(jQuery);