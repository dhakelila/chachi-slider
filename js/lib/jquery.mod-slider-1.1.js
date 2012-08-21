/*
 * jQuery mod Mod Slider v1.1
 * Free to use and abuse.
 * https://github.com/davidsingal/mod-slider
 */

(function($) {
	$.fn.modSlider = function(options) {
		var settings = $.extend({
			auto: true,
			start: 1,
			nav: true,
			arrows: true,
			textPrev: "<",
			textNext: ">",
			pause: 3000,
			velocity: 1000
		}, options);
		
		var active = false;
		
		var slider = {
			init: function(el) {
				var self = this,
					target = $(el),
					panelsWrapper = $("<div class=\"mod-panels-wrapper\"></div>"),
					wrapper = $("<div class=\"mod-wrapper\"></div>"),
					panels = target.find(".mod-panel"),
					panelWidth = target.width(),
					navHtml = "",
					links;
				
				var counter = settings.start - 1, 
					timer, interval;
					
				if (!active) {
					target.append(wrapper);	
					wrapper.append(panelsWrapper);
					panels.appendTo(panelsWrapper);
				}
				
				target.append(wrapper);	
				wrapper.append(panelsWrapper);
				panels.appendTo(panelsWrapper);
				
				self.size(panels, panelWidth, panelsWrapper);
				
				target.show();
				
				if (settings.nav) {
					var navigation = $("<div class=\"mod-nav\"></div>");
					
					target.append(navigation);
				
					for (var i = 0; i < panels.length; i++) {
						navHtml += "<li><a href=\"#panel" + i + "\">" + (i + 1) + "</a></li>";
					}
					
					if (panels.length > 1) {
						navigation.append("<ul>" + navHtml + "</ul>");
						links = navigation.find("a");
						$(links[0]).addClass("current");
					}
					
					if (panels.length > 1) {
						$.each(links, function(index, Element) {
							$(Element).click(function(ev) {
								ev.preventDefault();
								
								clearInterval(timer);
	
								t = this.href.split("#panel");
								counter = parseInt(t[1]);
								
								timer = setInterval(interval, settings.pause);
								
								moveSlide(counter);
							});
						});
					}
				}
				
				if (settings.arrows) {
					var arrows = $("<div class=\"mod-arrows\"></div>"),
						prev = $("<a href=\"#\" class=\"prev\">" + settings.textPrev + "</a>"),
						next = $("<a href=\"#\" class=\"next\">" + settings.textNext + "</a>");
						
					arrows.append(prev).append(next);
					
					target.append(arrows);
					
					prev.click(function(e) {
						e.preventDefault();
						counter--;
						if (counter < 0) counter = panels.length - 1;
						moveSlide(counter);
					});
					
					next.click(function(e) {
						e.preventDefault();
						counter++;
						if (counter == panels.length) counter = 0;
						moveSlide(counter);
					});
				}
				
				if (settings.auto) {
					interval = function() {
						counter++;
						if (counter == panels.length) counter = 0;
						moveSlide(counter);
					};
					
					timer = setInterval(interval, settings.pause);
					
					panels.hover(
						function() {
							clearInterval(timer);
						},
						function() {
							timer = setInterval(interval, settings.pause);
						}
					);
				}
				
				function moveSlide(x) {
					if (settings.nav) $(links).removeClass("current");
					
					panelsWrapper.stop().animate({
						"left": -x * (panelWidth + 20)
					}, settings.velocity, function() {
						if (settings.nav) $(links[x]).addClass("current");
					});
				}
				
				panelsWrapper.css("left", -counter * (panelWidth + 20));
				
				$(window).resize(function() {
					panelWidth = target.width();
					slider.size(panels, panelWidth, panelsWrapper);
				});
			},
			size: function(panels, panelWidth, panelsWrapper) {
				panels.css({
					"width": panelWidth + "px",
					"margin-right": 20 + "px"
				});
				panelsWrapper.css("width", ((panelWidth + 20) * panels.length) + "px");
			}
		};
		
		return this.each(function() {
			slider.init(this);
		});
	};
})(jQuery);