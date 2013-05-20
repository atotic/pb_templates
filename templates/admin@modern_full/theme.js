function() {
"use strict"

	function lowerRightText(layout, page, options) {
		var d = page.dimensions;
		if ( PB.ThemeUtils.assetTextCount( page.getAssets() ) > 0 ) {
			var textWidth = Math.min( d.width, 350);
			var textHeight = 40;
			layout.texts.push( {
				top: d.height - textHeight - PB.ThemeUtils.gutter,
				left: d.width - textWidth - PB.ThemeUtils.gutter,
				width: textWidth,
				height: textHeight
			});
		}
	}
	function lowerLeftText(layout, page, options) {
		var d = page.dimensions;
		if ( PB.ThemeUtils.assetTextCount( page.getAssets() ) > 0 ) {
			var textWidth = Math.min( d.width, 350);
			var textHeight = 40;
			layout.texts.push( {
				top: d.height - textHeight - PB.ThemeUtils.gutter,
				left: PB.ThemeUtils.gutter,
				width: textWidth,
				height: textHeight
			});
		}
	}
	// Single page
	var layout1 = {
		getPageLayout: function(page, options) {
			var d = page.dimensions;
			var layout = {
				photos: [ {
					top: 0, left: 0, width: d.width, height: d.height
				}
				],
				texts: []
			};
			lowerRightText(layout, page, options);
			return layout;
		}
	};
	var layout2VV = {
		getPageLayout: function(page, options) {
			var d = page.dimensions;
			var layout = { photos: [], texts: [] };
			var widthSegments = PB.ThemeUtils.segmentLine(d.width, 2);
			for (var i =0; i<2; i++)
				layout.photos.push( {
					top:0, left: widthSegments[i],
					width: widthSegments[ i+1 ] - widthSegments[i],
					height: d.height
				});
			lowerRightText(layout, page, options);
			return layout;
		}
	}

	var layout2SV = {
		getPageLayoutWide: function(page, options) {
			var assets = page.getAssets();
			var d = page.dimensions;
			var layout = { photos: [], texts: [] };
			layout.photos.push( {
				top:0, left:0,
				width: d.width - d.height,
				height: d.height
			});
			layout.photos.push( {
				top: 0, left: d.width - d.height,
				width: d.height,
				height: d.height
			});
			lowerRightText(layout, page, options);
			return layout;
		},
		getPageLayout: function(page, options) {
			return PB.ThemeUtils.layoutByAspect( page, options, {
				wide: this.getPageLayoutWide,
				square: layout2VV.getPageLayout
			});
		}
	}

	var layout2HH = {
		getPageLayout: function(page, options) {
			var layout = { photos: [], texts: [] };
			var d = page.dimensions;
			var heightSegments = PB.ThemeUtils.segmentLine(d.height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: d.width,
				height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1],
				left: 0,
				width: d.width,
				height: heightSegments[2] - heightSegments[1]
			});
			lowerRightText(layout, page, options);
			return layout;
		}
	}

	var layout3HHH = {
		getPageLayout: function( page, options ) {
			var layout = { photos: [], texts:[] };
			var d = page.dimensions;
			var widthSegments = PB.ThemeUtils.segmentLine( d.width, 2);
			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: d.width,
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
			lowerRightText(layout, page, options);

			return layout;
		}
	}

	var layout3VHH = {
		getPageLayoutSquare: function( page, options) {
			var layout = { photos:[], texts:[] }
			var d = page.dimensions;
			var widthSegments = PB.ThemeUtils.segmentLine( d.width, 2);
			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: widthSegments[1],
				height: d.height
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
			lowerRightText( layout, page, options );
			return layout;
		},
		getPageLayoutWide: function( page, options ) {
			var layout = { photos:[], texts:[] }
			var d = page.dimensions;
			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 2);
			var w1 = Math.round( d.height * 0.75 );
			layout.photos.push( {
				top: 0, left: 0,
				width: w1, height: d.height
			});
			layout.photos.push( {
				top: 0, left: w1,
				width: d.width - w1, height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: w1,
				width: d.width - w1, height: heightSegments[2] - heightSegments[1]
			});
			lowerRightText( layout, page, options );
			return layout;
		},
		getPageLayout: function( page, options) {
			return PB.ThemeUtils.layoutByAspect( page, options, {
				wide: this.getPageLayoutWide,
				square: this.getPageLayoutSquare
			});
		}
	}

	var layout3SVV = {
		getPageLayoutWide: function( page, options) {
			var layout = { photos:[], texts:[] }
			var d = page.dimensions;
			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: d.height, height: d.height
			});
			layout.photos.push( {
				top: 0, left: d.height,
				width: d.width - d.height, height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: d.height,
				width: d.width - d.height, height: heightSegments[2] - heightSegments[1]
			});
			lowerRightText(layout, page, options);
			return layout;
		},
		getPageLayout: function( page, options) {
			return PB.ThemeUtils.layoutByAspect( page, options, {
				wide: this.getPageLayoutWide,
				square: layout3VHH.getPageLayoutWide
			});
		}
	}

	var layout4HHHH = {
		getPageLayout: function( page, options) {
			var layout = { photos: [], texts:[] };
			var d = page.dimensions;
			var widthSegments = PB.ThemeUtils.segmentLine( d.width, 2);
			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 2);
			for (var v=0; v<2; v++)
				for (var h=0; h<2; h++) {
					layout.photos.push( {
						top: heightSegments[h],
						left: widthSegments[v],
						width: widthSegments[h+1] - widthSegments[h],
						height: heightSegments[v+1] - heightSegments[v]
					});
				}
			lowerRightText(layout, page, options);
			return layout;
		}
	}

	var layout4sHHs = {
		getPageLayoutWide: function( page, options) {
			var layout = { photos: [], texts:[] };
			var d = page.dimensions;

			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 2);
			layout.photos.push( {
				top: 0, left: 0,
				width: heightSegments[1], height: heightSegments[1]
			});
			layout.photos.push( {
				top: 0, left: heightSegments[1],
				width: d.width - heightSegments[1], height: heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: 0,
				width: d.width - heightSegments[1], height: heightSegments[2] - heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: d.width - heightSegments[1],
				width: heightSegments[1], height: heightSegments[2] - heightSegments[1]
			});
			lowerLeftText(layout, page, options);
			return layout;
		},
		getPageLayoutSquare: function( page, options) {
			var layout = { photos: [], texts:[] };
			var d = page.dimensions;
			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 2);
			var w1 = Math.round( heightSegments[1] * 3 / 4);
			layout.photos.push( {
				top: 0, left: 0,
				width: w1, height: heightSegments[1]
			});
			layout.photos.push( {
				top: 0, left: w1,
				width: d.width - w1, height: heightSegments[1]
			});
			w1 = Math.round( (heightSegments[2] - heightSegments[1]) * 3 / 4 );
			layout.photos.push( {
				top: heightSegments[1], left: 0,
				width: d.width - w1, height: heightSegments[2] - heightSegments[1]
			});
			layout.photos.push( {
				top: heightSegments[1], left: d.width - w1,
				width: w1, height: heightSegments[2] - heightSegments[1]
			});
			lowerLeftText(layout, page, options);
			return layout;
		},
		getPageLayout: function( page, options) {
			return PB.ThemeUtils.layoutByAspect( page, options, {
				wide: this.getPageLayoutWide,
				square: this.getPageLayoutSquare
			});
		}
	}
	var layout5Hssss = {
		getPageLayout: function( page, options ) {
			var layout = { photos: [], texts: [] };
			var d = page.dimensions;
			var widthSegments = PB.ThemeUtils.segmentLine( d.width, 4 );
			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 3 );
			layout.photos.push( {
				top: 0, left: 0,
				width: d.width, height: heightSegments[2]
			});
			for (var i=0; i < 4; i++)
				layout.photos.push( {
					top: heightSegments[2],
					left: widthSegments[i],
					width: widthSegments[ i+1] - widthSegments[i],
					height: heightSegments[3] - heightSegments[2]
				});
			if ( PB.ThemeUtils.assetTextCount( page.getAssets() ) > 0 ) {
				var textWidth = Math.min( d.width, 350);
				var textHeight = 40;
				layout.texts.push( {
					top: PB.ThemeUtils.gutter + 20,
					left: d.width - textWidth - PB.ThemeUtils.gutter,
					width: textWidth,
					height: textHeight
				});
			}
			return layout;
		}
	}

	var layout5Vhhhh = {
		getPageLayout: function( page, options ) {
			var layout = { photos: [], texts: [] };
			var d = page.dimensions;
			var w1 = Math.round( d.width * 3 / 4 );
			var heightSegments = PB.ThemeUtils.segmentLine( d.height, 4 );

			layout.photos.push( {
				top: 0, left: 0,
				width: w1, height: d.height
			});
			for (var i=0; i < 4; i++)
				layout.photos.push( {
					top: heightSegments[i],
					left: w1,
					width: d.width - w1,
					height: heightSegments[i+1] - heightSegments[i]
				});
			lowerLeftText(layout, page, options);
			return layout;
		}
	}

	var defaultLayout = {
		gridLayout: PB.ThemeCache.resource('theme://admin@core/layouts/gridLayout'),
		getPageLayout: function( page, options) {
			var assets = page.getAssets();
			var d = page.dimensions;
			var myAssets = {};

			for (var p in assets)
				if (assets[p].type === 'photo')
					myAssets[p] = { type: 'photo' };

			var layout = this.gridLayout.getPageLayout(
					PB.ThemeUtils.layoutMockupPage(myAssets, d),
					options
				);
			if (layout.photos.length > 0) {
				var lastAsset = layout.photos[ layout.photos.length - 1];
				if (lastAsset.left + lastAsset.width < d.width)
					lastAsset.width = d.width - lastAsset.left;
			}
			lowerRightText(layout, page, options);

			return layout;
		}
	}

	var configLayout = PB.ThemeCache.resource( 'theme://admin@core/creators/configLayout');
	var horizontalLayout = configLayout.create(
	{
		1: layout1,
		2: layout2HH,
		3: layout3HHH,
		4: layout4HHHH,
		5: layout5Hssss,
		'default': defaultLayout
	});
	var verticalLayout = configLayout.create(
	{
		1: layout1,
		2: layout2VV,
		3: layout3VHH,
		4: layout4sHHs,
		5: layout5Vhhhh,
		'default': defaultLayout
	});


	var Theme = {
		id: "admin@modern_full",
		title: "Modern Theme (full)",
		description: "Full coverage layouts.",
		screenshots: ["/t/admin@modern_full/showcase.jpg"],
		designs: {
		},
		layouts: {
			horizontalLayout: horizontalLayout,
			verticalLayout: verticalLayout,
		},
		rawlayouts: {
			layout1: layout1,
			layout2VV: layout2VV,
			layout2SV: layout2SV,
			layout2HH: layout2HH,
			layout3HHH: layout3HHH,
			layout3VHH: layout3VHH,
			layout3SVV: layout3SVV,
			layout4HHHH: layout4HHHH,
			layout4sHHs: layout4sHHs,
			layout5Hssss: layout5Hssss,
			layout5Vhhhh: layout5Vhhhh
		},
		backgrounds: {
		},
		frames: {
		},
		widgets: {
		}
	};
	return Theme;
}()
