function() {
"use strict"

	function lowerRightText(layout, assetData, width, height, options) {
		if ( PB.ThemeUtils.assetTextCount( assetData ) > 0 ) {
			var textWidth = Math.min( width, 350);
			var textHeight = 40;
			layout.texts.push( {
				top: height - textHeight - PB.ThemeUtils.gutter,
				left: width - textWidth - PB.ThemeUtils.gutter,
				width: textWidth,
				height: textHeight
			});
		}
	}
	function lowerLeftText(layout, assetData, width, height, options) {
		if ( PB.ThemeUtils.assetTextCount( assetData ) > 0 ) {
			var textWidth = Math.min( width, 350);
			var textHeight = 40;
			layout.texts.push( {
				top: height - textHeight - PB.ThemeUtils.gutter,
				left: PB.ThemeUtils.gutter,
				width: textWidth,
				height: textHeight
			});
		}
	}
	// Single page
	var layout1 = {
		getPageLayout: function(assetData, width, height, options) {
			var layout = {
				photos: [ {
					top: 0, left: 0, width: width, height: height
				}
				],
				texts: []
			};
			lowerRightText(layout, assetData, width, height, options);
			return layout;
		}
	};
	var layout2VV = {
		getPageLayout: function(assetData, width, height, options) {
			var layout = { photos: [], texts: [] };
			var widthSegments = PB.ThemeUtils.segmentLine(width, 2);
			for (var i =0; i<2; i++)
				layout.photos.push( {
					top:0, left: widthSegments[i],
					width: widthSegments[ i+1 ] - widthSegments[i],
					height: height
				});
			lowerRightText(layout, assetData, width, height, options);
			return layout;
		}
	}

	var layout2SV = {
		getPageLayoutWide: function(assetData, width, height, options) {
			var layout = { photos: [], texts: [] };
			layout.photos.push( {
				top:0, left:0,
				width: width - height,
				height: height
			});
			layout.photos.push( {
				top: 0, left: width - height,
				width: height,
				height: height
			});
			lowerRightText(layout, assetData, width, height, options);
			return layout;
		},
		getPageLayout: function(assetData, width, height, options) {
			return PB.ThemeUtils.layoutByAspect( assetData, width, height, options, {
				wide: this.getPageLayoutWide,
				square: layout2VV.getPageLayout
			});
		}
	}

	var layout2HH = {
		getPageLayout: function(assetData, width, height, options) {
			var layout = { photos: [], texts: [] };
			var heightSegments = PB.ThemeUtils.segmentLine(height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: width,
				height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1],
				left: 0,
				width: width,
				height: heightSegments[2] - heightSegments[1]
			});
			lowerRightText(layout, assetData, width, height, options);
			return layout;
		}
	}

	var layout3HHH = {
		getPageLayout: function( assetData, width, height, options ) {
			var layout = { photos: [], texts:[] };
			var widthSegments = PB.ThemeUtils.segmentLine( width, 2);
			var heightSegments = PB.ThemeUtils.segmentLine( height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: width,
				height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1],
				left: 0,
				width: widthSegments[1],
				height: heightSegments[2] - heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1],
				left: widthSegments[1],
				width: widthSegments[2] - widthSegments[1],
				height: heightSegments[2] - heightSegments[1]
			});
			lowerRightText(layout, assetData, width, height, options);

			return layout;
		}
	}

	var layout3VHH = {
		getPageLayoutSquare: function( assetData, width, height, options) {
			var layout = { photos:[], texts:[] }
			var widthSegments = PB.ThemeUtils.segmentLine( width, 2);
			var heightSegments = PB.ThemeUtils.segmentLine( height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: widthSegments[1],
				height: height
			});
			layout.photos.push( {
				top: 0, left: widthSegments[1],
				width: widthSegments[2] - widthSegments[1],
				height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: widthSegments[1],
				width: widthSegments[2] - widthSegments[1],
				height: heightSegments[2] - heightSegments[1]
			});
			lowerRightText( layout, assetData, width, height, options );
			return layout;
		},
		getPageLayoutWide: function( assetData, width, height, options ) {
			var layout = { photos:[], texts:[] }
			var heightSegments = PB.ThemeUtils.segmentLine( height, 2);
			var w1 = Math.round( height * 0.75 );
			layout.photos.push( {
				top: 0, left: 0,
				width: w1, height: height
			});
			layout.photos.push( {
				top: 0, left: w1,
				width: width - w1, height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: w1,
				width: width - w1, height: heightSegments[2] - heightSegments[1]
			});
			lowerRightText( layout, assetData, width, height, options );
			return layout;
		},
		getPageLayout: function( assetData, width, height, options) {
			return PB.ThemeUtils.layoutByAspect( assetData, width, height, options, {
				wide: this.getPageLayoutWide,
				square: this.getPageLayoutSquare
			});
		}
	}

	var layout3SVV = {
		getPageLayoutWide: function( assetData, width, height, options) {
			var layout = { photos:[], texts:[] }
			var heightSegments = PB.ThemeUtils.segmentLine( height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: height, height: height
			});
			layout.photos.push( {
				top: 0, left: height,
				width: width - height, height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: height,
				width: width - height, height: heightSegments[2] - heightSegments[1]
			});
			lowerRightText(layout, assetData, width, height, options);
			return layout;
		},
		getPageLayout: function( assetData, width, height, options) {
			return PB.ThemeUtils.layoutByAspect( assetData, width, height, options, {
				wide: this.getPageLayoutWide,
				square: layout3VHH.getPageLayoutWide
			});
		}
	}

	var layout4HHHH = {
		getPageLayout: function( assetData, width, height, options) {
			var layout = { photos: [], texts:[] };
			var widthSegments = PB.ThemeUtils.segmentLine( width, 2);
			var heightSegments = PB.ThemeUtils.segmentLine( height, 2);
			for (var v=0; v<2; v++)
				for (var h=0; h<2; h++) {
					layout.photos.push( {
						top: heightSegments[h],
						left: widthSegments[v],
						width: widthSegments[h+1] - widthSegments[h],
						height: heightSegments[v+1] - heightSegments[v]
					});
				}
			lowerRightText(layout, assetData, width, height, options);
			return layout;
		}
	}

	var layout4sHHs = {
		getPageLayoutWide: function( assetData, width, height, options) {
			var layout = { photos: [], texts:[] };
			var heightSegments = PB.ThemeUtils.segmentLine( height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: heightSegments[1], height: heightSegments[1]
			});
			layout.photos.push( {
				top: 0, left: heightSegments[1],
				width: width - heightSegments[1], height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: 0,
				width: width - heightSegments[1], height: heightSegments[2] - heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: width - heightSegments[1],
				width: heightSegments[1], height: heightSegments[2] - heightSegments[1]
			});
			lowerLeftText(layout, assetData, width, height, options);
			return layout;
		},
		getPageLayoutSquare: function( assetData, width, height, options) {
			var layout = { photos: [], texts:[] };
			var heightSegments = PB.ThemeUtils.segmentLine( height, 2);
			var w1 = Math.round( heightSegments[1] * 3 / 4);
			layout.photos.push( {
				top: 0, left: 0,
				width: w1, height: heightSegments[1]
			});
			layout.photos.push( {
				top: 0, left: w1,
				width: width - w1, height: heightSegments[1]
			});
			w1 = Math.round( (heightSegments[2] - heightSegments[1]) * 3 / 4 );
			layout.photos.push( {
				top: heightSegments[1], left: 0,
				width: width - w1, height: heightSegments[2] - heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: width - w1,
				width: w1, height: heightSegments[2] - heightSegments[1]
			});
			lowerLeftText(layout, assetData, width, height, options);
			return layout;
		},
		getPageLayout: function( assetData, width, height, options) {
			return PB.ThemeUtils.layoutByAspect( assetData, width, height, options, {
				wide: this.getPageLayoutWide,
				square: this.getPageLayoutSquare
			});
		}
	}
	var layout5Hssss = {
		getPageLayout: function( assetData, width, height, options ) {
			var layout = { photos: [], texts: [] };
			var widthSegments = PB.ThemeUtils.segmentLine( width, 4 );
			var heightSegments = PB.ThemeUtils.segmentLine( height, 3 );
			layout.photos.push( {
				top: 0, left: 0,
				width: width, height: heightSegments[2]
			});
			for (var i=0; i < 4; i++)
				layout.photos.push( {
					top: heightSegments[2],
					left: widthSegments[i],
					width: widthSegments[ i+1] - widthSegments[i],
					height: heightSegments[3] - heightSegments[2]
				});
			if ( PB.ThemeUtils.assetTextCount( assetData ) > 0 ) {
				var textWidth = Math.min( width, 350);
				var textHeight = 40;
				layout.texts.push( {
					top: PB.ThemeUtils.gutter + 20,
					left: width - textWidth - PB.ThemeUtils.gutter,
					width: textWidth,
					height: textHeight
				});
			}
			return layout;
		}
	}

	var layout5Vhhhh = {
		getPageLayout: function( assetData, width, height, options ) {
			var layout = { photos: [], texts: [] };
			var w1 = Math.round( width * 3 / 4 );
			var heightSegments = PB.ThemeUtils.segmentLine( height, 4 );

			layout.photos.push( {
				top: 0, left: 0,
				width: w1, height: height
			});
			for (var i=0; i < 4; i++)
				layout.photos.push( {
					top: heightSegments[i],
					left: w1,
					width: width - w1,
					height: heightSegments[i+1] - heightSegments[i]
				});
			if ( PB.ThemeUtils.assetTextCount( assetData ) > 0 )
				lowerLeftText(layout, assetData, width, height, options);
			return layout;
		}
	}

	var defaultLayout = {
		gridLayout: PB.ThemeCache.resource('theme://admin@core/layouts/gridLayout'),
		getPageLayout: function(assetData, width, height, options) {
			var myAssetData = {};

			for (var p in assetData)
				if (assetData[p].type === 'photo')
					myAssetData[p] = { type: 'photo' };

			var layout = this.gridLayout.getPageLayout(myAssetData, width, height, options);
			if (layout.photos.length > 0) {
				var lastAsset = layout.photos[ layout.photos.length - 1];
				if (lastAsset.left + lastAsset.width < width)
					lastAsset.width = width - lastAsset.left;
			}
			lowerRightText(layout, assetData, width, height, options);

			return layout;
		}
	}

	var configLayout = PB.ThemeCache.resource( 'theme://admin@core/layouts/configLayout');
	var horizontalLayout = new configLayout.constructor(
	{
		1: layout1,
		2: layout2VV,
		3: layout3HHH,
		4: layout4HHHH,
		5: layout5Hssss,
		'default': defaultLayout
	});
	var verticalLayout = new configLayout.constructor(
	{
		1: layout1,
		2: layout2VV,
		3: layout3VHH,
		4: layout4sHHs,
		5: layout5Vhhhh
	});


	var Theme = {
		id: "admin@modern_full",
		title: "Modern Theme (full)",
		description: "Long description",
		screenshots: ["/t/_test/family/showcase1.jpg"],
		designs: {
		},
		layouts: {
			horizontalLayout: horizontalLayout,
			verticalLayout: verticalLayout
		},
		backgrounds: {
		},
		frames: {
		},
		widgets: {
		},
		sized: {
		}
	};
	return Theme;
}()
