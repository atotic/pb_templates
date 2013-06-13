function() {
// admin@sports theme
"use strict"

	// SOCCER

	var soccerFieldBackground = PB.ThemeCache.resource('theme://admin@core/creators/cssBackground')
		.create( {
			css: {
				backgroundImage: "url(/t/admin@sports/soccer_field.svg)",
				backgroundSize: '100% 100%'
			}
		});

	var soccerStadiumPhoto = PB.TemplatePhoto.create( {
		iconUrl: '/t/admin@sports/soccer_stadium_icon.jpg',
		originalUrl: '/t/admin@sports/soccer_stadium.jpg',
	});

	var soccerStadiumBackground = PB.ThemeCache.resource('theme://admin@core/creators/cssBackground')
		.create( {
			css: {
				backgroundImage: "url($stadium)",
				backgroundSize: '100% 100%'
			},
			imageIds: {
				$stadium: soccerStadiumPhoto.id
			}
		});

	var soccerBallWidget = PB.ThemeCache.resource( 'theme://admin@core/creators/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/soccer_ball_shaded.svg',
			width: 70,
			height: 55
		});
	var soccerSilhouetteWidget = PB.ThemeCache.resource( 'theme://admin@core/creators/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/soccer_silhouette.svg',
			width: 54,
			height: 113
		});
	var soccerBallFlamingWidget = PB.ThemeCache.resource('theme://admin@core/creators/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/soccer_ball_flaming.svg',
			width: 128,
			height: 82
		});

	var soccerGreenFrame = PB.ThemeCache.resource('theme://admin@core/creators/cssFrame')
		.create( {
			css: {
				backgroundColor: "#73FA79",
			},
			inset: [5,5,5,5]
		});

	var soccerDesign1 =  {
		id: 'theme://admin@sports/designs/soccerDesign1',
		layoutTemplate: PB.ThemeCache.resource('theme://admin@rotate/layouts/horizontalLayout'),
 		getPageLayout: function( page, layoutData ) {
 			var assets = page.getAssets();
 			var layout = this.layoutTemplate.getPageLayout( page, layoutData );
 			var top = 0;
 			var d = page.dimensions;
 			layout.widgets = [];
 			var myAssetIds = PB.ThemeUtils.assetWidgetIdByCreator(assets, this.id);
 			for (var i=0; i<myAssetIds.length; i++) {
 				var asset = assets[ myAssetIds[i] ];
 				var widget = ThemeCache.resource(asset.widgetId);
 				var width = widget.width( asset.widgetOptions);
 				var height = widget.height( asset.widgetOptions);
 				layout.widgets.push( {
 					top: top,
 					left: d.width - width,
 					width: width,
 					height: height
 				});
 				top += height;
 			}
 			return layout;
 		},
 		getBackgroundId: function(width, height) {
 			return 'theme://admin@sports/backgrounds/soccerField';
 		},
 		getWidgets: function(page) {
 			var photoCount = PB.ThemeUtils.countAssets( page.getAssets(), 'photo');
			var widgetList = [
 				{ id: 'theme://admin@sports/widgets/soccerBallWidget',
 					options: { width: 70, height: 55}
 				},
 				{ id: 'theme://admin@sports/widgets/soccerSilhouetteWidget',
 					options: { width: 54, height: 113 }
 				},
 				{ id: 'theme://admin@sports/widgets/soccerBallFlaming',
 					options: { width: 64, height: 41 }
 				},
 			];
 			return widgetList.slice(0, Math.min( photoCount, widgetList.length));
 		}
	}

	var soccerDesign2 = {
		id: 'theme://admin@sports/designs/soccerDesign2',
		getPageLayout: function( page, layoutData ) {
			var assets = page.getAssets();
 			var layout = soccerDesign1.layoutTemplate.getPageLayout( page, layoutData );
 			// Add frames
 			layout.photos.forEach(function(asset) {
 				asset.frameId = 'theme://admin@sports/frames/soccerGreen'
 			});
 			// Position widgets
 			var top = 0;
 			var left = 0;
 			layout.widgets = [];
 			var myAssetIds = PB.ThemeUtils.assetWidgetIdByCreator(assets, this.id);
 			for (var i=0; i<myAssetIds.length; i++) {
 				var asset = assets[ myAssetIds[i] ];
 				var widget = ThemeCache.resource(asset.widgetId);
 				var width = widget.width( asset.widgetOptions);
 				var height = widget.height( asset.widgetOptions);
 				layout.widgets.push( {
 					top: top,
 					left: left,
 					width: width,
 					height: height
 				});
 				top += height;
 			}
 			return layout;
		},
		getBackgroundId: function( width, height ) {
			return 'theme://admin@sports/backgrounds/soccerStadium';
		},
		getWidgets: function( page ) {
			return soccerDesign1.getWidgets( page );
		}
	}

	// BASKETBALL
	var basketballCourtPix = PB.TemplatePhoto.create( {
		originalUrl: '/t/admin@sports/basketball_court_back.jpg',
		iconUrl: '/t/admin@sports/basketball_court_back_icon.jpg'
	});

	var basketballBackground1 = PB.ThemeCache.resource('theme://admin@core/creators/cssBackground')
		.create( {
			css: {
				backgroundImage: "url($pix)",
				backgroundSize: '100% 100%'
			},
			imageIds: {
				$pix: basketballCourtPix.id
			}
		});

	var basketballWidget = PB.ThemeCache.resource( 'theme://admin@core/creators/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/basketball_ball.svg',
			width: 121,
			height: 143
		});
	var basketballNetWidget = PB.ThemeCache.resource( 'theme://admin@core/creators/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/basketball_net.svg',
			width: 158,
			height: 185
		});
	var basketballOutlineWidget = PB.ThemeCache.resource( 'theme://admin@core/creators/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/basketball_outline.svg',
			width: 112,
			height: 232
		});
	var basketballOrangeFrame = PB.ThemeCache.resource('theme://admin@core/creators/cssFrame')
		.create( {
			css: {
				backgroundColor: "#FF9300"
			},
			inset: [10,10,10,10]
		});

	var purpleFrame = PB.ThemeCache.resource('theme://admin@core/creators/cssFrame')
		.create( {
			css: {
					backgroundColor: '#9400d3',
					boxShadow: '5px 5px 5px rgba(148,0,211,0.3)'
			},
			inset: [1,1,1,1]
		});

	var basketballDesign1 =  {
		id: 'theme://admin@sports/designs/basketballDesign1',
		layoutTemplate: PB.ThemeCache.resource('theme://admin@rotate/layouts/verticalLayout'),
 		getPageLayout: function( page, layoutData ) {
 			var assets = page.getAssets();
 			var layout = this.layoutTemplate.getPageLayout( page, layoutData );
 			var top = 0;
 			var d = page.dimensions;
 			layout.widgets = [];
 			var myAssetIds = PB.ThemeUtils.assetWidgetIdByCreator(assets, this.id);
 			for (var i=0; i<myAssetIds.length; i++) {
 				var asset = assets[ myAssetIds[i] ];
 				var widget = ThemeCache.resource(asset.widgetId);
 				var width = widget.width( asset.widgetOptions);
 				var height = widget.height( asset.widgetOptions);
 				layout.widgets.push( {
 					top: top,
 					left: d.width - width,
 					width: width,
 					height: height
 				});
 				top += height;
 			}
 			return layout;
 		},
 		getBackgroundId: function(width, height) {
 			return 'theme://admin@sports/backgrounds/basketballBackground1';
 		},
 		getWidgets: function(page) {
 			var photoCount = PB.ThemeUtils.countAssets( page.getAssets(), 'photo');
			var widgetList = [
 				{ id: 'theme://admin@sports/widgets/basketball',
 					options: { width: 121 * 0.8, height: 143 * 0.8}
 				},
 				{ id: 'theme://admin@sports/widgets/basketballNet',
 					options: { width: 63, height: 74 }
 				},
 				{ id: 'theme://admin@sports/widgets/basketballOutline',
 					options: { width: 50, height: 100 }
 				},
 			];
 			return widgetList.slice(0, Math.min( photoCount, widgetList.length));
 		}
	}

	var basketballHoopPix = PB.TemplatePhoto.create( {
		originalUrl: '/t/admin@sports/basketball_hoop_back.jpg',
		iconUrl: '/t/admin@sports/basketball_hoop_back_icon.jpg'
	});

	var basketballHoopBackground = PB.ThemeCache.resource('theme://admin@core/creators/cssBackground')
		.create( {
			css: {
				backgroundImage: "url($pix)",
				backgroundSize: '100% 100%'
			},
			imageIds: {
				$pix: basketballHoopPix.id
			}
		});

	var basketballDesign2 =  {
		id: 'theme://admin@sports/designs/basketballDesign2',
		layoutTemplate: PB.ThemeCache.resource('theme://admin@rotate/layouts/verticalLayout'),
 		getPageLayout: function( page, layoutData ) {
 			var assets = page.getAssets();
 			var layout = this.layoutTemplate.getPageLayout( page, layoutData );
 			// frames
 			layout.photos.forEach( function(asset) {
 				asset.frameId = 'theme://admin@sports/frames/basketballOrange';
 			});
 			// widgets
			var top = 0;
 			var left = 0;
 			layout.widgets = [];
 			var myAssetIds = PB.ThemeUtils.assetWidgetIdByCreator(assets, this.id);
 			for (var i=0; i<myAssetIds.length; i++) {
 				var asset = assets[ myAssetIds[i] ];
 				var widget = ThemeCache.resource(asset.widgetId);
 				var width = widget.width( asset.widgetOptions);
 				var height = widget.height( asset.widgetOptions);
 				layout.widgets.push( {
 					top: top,
 					left: left,
 					width: width,
 					height: height
 				});
 				top += height;
 			}
 			return layout;
 		},
 		getBackgroundId: function(width, height) {
 			return 'theme://admin@sports/backgrounds/basketballHoopBackground';
 		},
 		getWidgets: function(page) {
 			var photoCount = PB.ThemeUtils.countAssets( page.getAssets(), 'photo');
			var widgetList = [
 				{ id: 'theme://admin@sports/widgets/basketball',
 					options: { width: 121 * 0.8, height: 143 * 0.8}
 				},
 				{ id: 'theme://admin@sports/widgets/basketballNet',
 					options: { width: 63, height: 74 }
 				},
 				{ id: 'theme://admin@sports/widgets/basketballOutline',
 					options: { width: 50, height: 100 }
 				},
 			];
 			return widgetList.slice(0, Math.min( photoCount, widgetList.length));
 		}
	}

	var Theme = {
		id: "admin@sports",
		title: "Sports theme",
		description: "Soccer, Basketball, Football",
		screenshots: ["/t/admin@core/showcase.jpg"],
		designs: {
			soccerDesign1: soccerDesign1,
			soccerDesign2: soccerDesign2,
			basketballDesign1: basketballDesign1,
			basketballDesign2: basketballDesign2
		},
		layouts: {
		},
		backgrounds: {
			soccerField: soccerFieldBackground,
			soccerStadium: soccerStadiumBackground,
			basketballBackground1: basketballBackground1,
			basketballHoopBackground: basketballHoopBackground
		},
		frames: {
			soccerGreen: soccerGreenFrame,
			basketballOrange: basketballOrangeFrame,
			purple: purpleFrame
		},
		widgets: {
			soccerBallWidget: soccerBallWidget,
			soccerSilhouetteWidget: soccerSilhouetteWidget,
			soccerBallFlaming: soccerBallFlamingWidget,
			basketball: basketballWidget,
			basketballNet: basketballNetWidget,
			basketballOutline: basketballOutlineWidget
		},
		photos: {
			soccerStadium: soccerStadiumPhoto
		}
	};
	return Theme;
}()
