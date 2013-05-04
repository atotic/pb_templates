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
		getPageLayout: function( assetData, width, height, options) {
			var layout = { photos:[], texts:[] }
			var widthSegments = PB.ThemeUtils.segmentLine( width, 2);
			var heightSegments = PB.ThemeUtils.segmentLine( height, 2);
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

	var layout5Hhhhh = {
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


	var uniformLayout = {
		id: 'layoutFamilyUniform',
		layouts: {
			1: layout1,
			'1t': layout1,
			2: layout2VV,
			'2t': layout2HH,
			3: layout3HHH,
			'3t': layout3HHH,
			4: layout4HHHH,
			'4t': layout4HHHH,
			5: layout5Hhhhh,
			'5t': layout5Hhhhh,
			'default': defaultLayout
		},
		getMatchingLayout: function(assetData, width, height, layoutOptions) {
			var photoCount = PB.ThemeUtils.assetPhotoCount( assetData );
			var textCount = PB.ThemeUtils.assetTextCount( assetData );
			var layoutIndex = photoCount + (textCount ? 't' : '');
			if (layoutIndex in this.layouts)
				return this.layouts[ layoutIndex ];
			else
				return this.layouts[ 'default' ];
		},
		getPageLayout: function(assetData, width, height, layoutOptions) {
			var layout = this.getMatchingLayout( assetData, width, height, layoutOptions);
			return layout.getPageLayout( assetData, width, height, layoutOptions );
		}
	}

	var Theme = {
		id: "admin@modern_full",
		title: "Modern Theme (full)",
		description: "Long description",
		screenshots: ["/t/_test/family/showcase1.jpg"],
		designs: {
		},
		layouts: {
			uniformLayout: uniformLayout
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
