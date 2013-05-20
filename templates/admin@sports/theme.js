function() {
"use strict"

	var soccerFieldBackground = PB.ThemeCache.resource('theme://admin@core/creators/cssBackground')
		.create( {
			css: {
				backgroundImage: "url(/t/admin@sports/soccer_field.svg)",
				backgroundSize: '100% 100%'
			}
		});

	// Photos
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
			width: 700,
			height: 550
		});
	var soccerSilhouetteWidget = PB.ThemeCache.resource( 'theme://admin@core/creators/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/soccer_silhouette.svg',
			width: 108,
			height: 227
		});
	var soccerBallFlaming = PB.ThemeCache.resource('theme://admin@core/creators/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/soccer_ball_flaming.svg',
			width: 646,
			height: 416
		});
	var soccerDesign1 =  {
		id: 'theme://admin@sports/designs/soccerDesign1',
		layoutTemplate: PB.ThemeCache.resource('theme://admin@rotate/layouts/horizontalLayout'),
 		getPageLayout: function( page, layoutData ) {
 			var assets = page.getAssets();
 			var layout = this.layoutTemplate.getPageLayout( page, layoutData );
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
 			return 'theme://admin@sports/backgrounds/soccerField';
 		},
 		getWidgets: function(page) {
 			var photoCount = PB.ThemeUtils.assetPhotoCount( page.getAssets() );
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

	var soccerStadiumImage = PB.ServerPhotoCache
	var Theme = {
		id: "admin@sports",
		title: "Sports theme",
		description: "Soccer, Basketball, Football",
		screenshots: ["/t/admin@core/showcase.jpg"],
		designs: {
			soccerDesign1: soccerDesign1
		},
		layouts: {
		},
		backgrounds: {
			soccerField: soccerFieldBackground,
			soccerStadium: soccerStadiumBackground
		},
		frames: {
		},
		widgets: {
			soccerBallWidget: soccerBallWidget,
			soccerSilhouetteWidget: soccerSilhouetteWidget,
			soccerBallFlaming: soccerBallFlaming
		},
		photos: {
			soccerStadium: soccerStadiumPhoto
		}
	};
	return Theme;
}()
