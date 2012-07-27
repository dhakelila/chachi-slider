/*
 * jQuery mod Mod Slider v1.0
 * Free to use and abuse.
 * https://github.com/davidsingal/mod-slider
 */

(function($) {
	$.fn.modSlider = function(options) {
		
		var settings = $.extend({
			velocity: 1000
		}, options);
		
		var slider = {
			init: function(el) {
			
				var self = this,
					target = $(el),
					panelWidth = $(target).width(),
					panelsWrapper = $("<div class=\"mod-panels-wrapper\"></div>"),
					navigation = $("<div class=\"mod-nav\"></div>"),
					panels = target.find(".mod-panel"),
					wrapper = $("<div class=\"mod-wrapper\"></div>"),
					navHtml = "",
					links;
				
				target.append(navigation);
				
				for (var i = 0; i < panels.length; i++) {
					navHtml += "<li><a href=\"#panel" + i + "\">" + (i+1) + "</a></li>";
				}
				
				navigation.append("<ul>" + navHtml + "</ul>");		
				
				links = navigation.find("a");
				
				$(links[0]).addClass("current");
				
				target.append(wrapper);
				
				wrapper.append(panelsWrapper);
				
				panels.appendTo(panelsWrapper);
				
				panelWidth = $(target).width();
				
				self.size(panels, panelWidth, panelsWrapper);
				
				panels.css("width", panelWidth + "px");
				
				panelsWrapper.css("width", (panelWidth * panels.length) + "px");
				
				$.each(links, function(index, Element) {
					$(Element).click(function(ev) {
						ev.preventDefault();
						
						$(links).removeClass("current");
						
						t = this.href.split("#panel");
						
						panelsWrapper.stop().animate({
							"left": -t[1] * panelWidth
						}, settings.velocity, function() {
							$(Element).addClass("current");
						});
					});
				});
				
				$(window).resize(function() {
					panelWidth = target.width();
					slider.size(panels, panelWidth, panelsWrapper);
				});
			},
			size: function(panels, panelWidth, panelsWrapper) {
				panels.css("width", panelWidth + "px");
				panelsWrapper.css("width", (panelWidth * panels.length) + "px");
			}
		};
		
		
		
		return this.each(function() {
			slider.init(this);
		});
		
	};
})(jQuery);