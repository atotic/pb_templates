function() {
"use strict"
	var FramedLayout = function(defaults) {
		this.defaults = $.extend( {
			frameWidth: 10,	// syntax same as border-image-width https://developer.mozilla.org/en-US/docs/CSS/border-image-width
			spaceOffset: 10
		}, defaults);
	}


	FramedLayout.prototype = {
		id: 'framedLayout',
		getPageLayout: function(assetData, width, height, options) {
			options = $.extend({}, this.defaults, options);
			var layout = PB.ThemeCache.resource('theme://admin@core/layouts/gridSpacedLayout').getPageLayout(assetData, width, height, options );
			var rotate = 5;
			var frameOffset = PB.ThemeUtils.canonicalFrameWidth(options.frameWidth);
			var applyFrame = function(asset) {
				asset.rotate = rotate;
				rotate += 20;
				asset.frameId =
				asset.frameId = 'theme://admin@core/frames/cssFrame';
				asset.frameOffset = frameOffset;
				asset.frameData = { backgroundColor: 'red'}
			}
			layout.photos.forEach( applyFrame );
			layout.texts.forEach( applyFrame );
			return layout;
		}
	};

	// Single page
	var layout1 = {
		getSizeLayout: function(width, height) {
			return this;
		},
		getPageLayout: function(assetData, width, height, options) {
			var layout = {
				photos: [ {
					top: 0, left: 0, width: width, height: height
				}
				],
				texts: []
			};
			if ( PB.ThemeUtils.assetPhotoCount( assetData ) > 0 ) {
				var textWidth = Math.min( width, 350);
				var textHeight = 40;
				layout.texts.push( {
					top: height - textHeight - PB.ThemeUtils.gutter,
					left: width - textWidth - PB.ThemeUtils.gutter,
					width: textWidth,
					height: textHeight
				});
			}
			return layout;
		}
	};
	var layout2VV = {
		getSizeLayout: function() { return this; },
		getPageLayout: function(assetData, width, height, options) {
			var layout = { photos: [], texts: [] };
			var widthSegments = PB.ThemeUtils.segmentLine(width, 2);
			for (var i =0; i<2; i++)
				layout.photos.push( {
					top:0, left: widthSegments[i],
					width: widthSegments[ i+1 ] - widthSegments[i],
					height: height
				});
			if ( PB.ThemeUtils.assetPhotoCount( assetData ) > 0 ) {
				var textWidth = Math.min( width, 350);
				var textHeight = 40;
				layout.texts.push( {
					top: height - textHeight - PB.ThemeUtils.gutter,
					left: width - textWidth - PB.ThemeUtils.gutter,
					width: textWidth,
					height: textHeight
				});
			}
			return layout;
		}
	}

	var layout3HHH = {
		getSizeLayout: function() { return this;},
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
			if ( PB.ThemeUtils.assetPhotoCount( assetData ) > 0 ) {
				var textWidth = Math.min( width, 350);
				var textHeight = 40;
				layout.texts.push( {
					top: height - textHeight - PB.ThemeUtils.gutter,
					left: width - textWidth - PB.ThemeUtils.gutter,
					width: textWidth,
					height: textHeight
				});
			}
			return layout;
		}
	}

	var layout4HHHH = {
		getSizeLayout: function() { return this;},
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
			if ( PB.ThemeUtils.assetPhotoCount( assetData ) > 0 ) {
				var textWidth = Math.min( width, 350);
				var textHeight = 40;
				layout.texts.push( {
					top: height - textHeight - PB.ThemeUtils.gutter,
					left: width - textWidth - PB.ThemeUtils.gutter,
					width: textWidth,
					height: textHeight
				});
			}
			return layout;
		}
	}
	var uniformLayout = {
		id: 'layoutFamilyUniform',
		layouts: {
			1: layout1,
			'1t': layout1,
			2: layout2VV,
			'2t': layout2VV,
			3: layout3HHH,
			'3t': layout3HHH,
			4: layout4HHHH,
			'4t': layout4HHHH,
			'default': PB.ThemeCache.resource('theme://admin@core/layouts/gridLayout')
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

	var SampleTheme = {
		id: "admin@sample",
		title: "Sample Theme",
		description: "Long description",
		screenshots: ["/t/_test/family/showcase1.jpg"],
		designs: {
		},
		layouts: {
			framedLayout: new FramedLayout(),
			uniformLayout: uniformLayout
		},
		backgrounds: {
		},
		frames: {
		},
		widgets: {
			soccerBall: PB.ThemeCache.resource( 'theme://admin@core/widgets/photoWidget')
				.constructor({
					url: '/t/admin@sample/soccer_small.svg',
					defaultWidth: 397,
					defaultHeight: 266
				}),
			eightBall: {}
		},
		sized: {
			s8x8: {
				sizes: {width: 8, height: 8 }
			}
		}
	};
	return SampleTheme;
}()
