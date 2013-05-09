// Base Theme 'theme://admin@core/'
function() {


/* sample config:
	1: layout1,
	2: layout2VV,
	'2t': layout2HH,
	3: layout3SVV,
	'3t': layout3SVV,
	4: layout4sHHs,
	'4t': layout4sHHs,
	5: layout5Hssss,
	'5t': layout5Hssss,
	'default': defaultLayout
*/
	var ConfigLayout = function(config) {
		this.layouts = config;
		if (config && !('default' in config))
			console.warn("ConfigLayout has no default", config);
	}

	ConfigLayout.prototype = {
		constructor: ConfigLayout,
		getMatchingLayout: function(assetData, width, height, layoutOptions) {
			var photoCount = PB.ThemeUtils.assetPhotoCount( assetData );
			var textCount = PB.ThemeUtils.assetTextCount( assetData );
			var photoIndex = photoCount;
			var textIndex = textCount ? photoIndex + "t" : null;
			if (textIndex && textIndex in this.layouts)
				return this.layouts[ textIndex ];
			if (photoIndex in this.layouts)
				return this.layouts[ photoIndex];
			return this.layouts[ 'default' ];
		},
		getPageLayout: function(assetData, width, height, layoutOptions) {
			var layout = this.getMatchingLayout( assetData, width, height, layoutOptions);
			return layout.getPageLayout( assetData, width, height, layoutOptions );
		}
	}

	var GridLayout = function(defaults) {
		this.defaults = $.extend( {
			inset: 0
		}, defaults );
	}

	GridLayout.prototype = {
		constructor: GridLayout,
		getPageLayout: function(assetData, width, height, layoutData) {
			layoutData = $.extend( {}, this.defaults, layoutData );
			width = Math.max(width - 2 * layoutData.inset, 0);
			height = Math.max(height - 2 * layoutData.inset, 0);
			if (!width || width < 50 || !height || height < 50) {
				console.error('getPageLayout width/height too small', width, height);
				return;
			}
			// Generate optimum tiles
			var photoCount = PB.ThemeUtils.assetPhotoCount(assetData);
			var textCount = PB.ThemeUtils.assetTextCount(assetData);
			var totalCount = photoCount + textCount;
			var tileCountH = Math.round(Math.sqrt(totalCount * width / height));
			var tileCountV = Math.ceil(totalCount / tileCountH);
			var widthSegments = PB.ThemeUtils.segmentLine(width, tileCountH);
			var heightSegments = PB.ThemeUtils.segmentLine(height, tileCountV);
			var layout = { photos: [], texts: [] }
			for (var v=0; v < tileCountV; v++) {
				for (var h=0; h < tileCountH; h++) {
					var imgIdx = v * tileCountH + h;
					if (imgIdx >= totalCount)
						break;
					var assetData = {
						top: layoutData.inset + heightSegments[v],// v * tileHeight,
						left: layoutData.inset + widthSegments[h], //h * tileWidth,
						height: heightSegments[v+1] - heightSegments[v], //tileHeight
						width: widthSegments[h+1] - widthSegments[h] //tileWidth,
					}
					if (imgIdx < photoCount) {
						assetData.type = 'photo';
						layout.photos.push( assetData );
					}
					else {
						assetData.type = 'text';
						layout.texts.push( assetData );
					}
				}
			}
			return layout;
		}
	};

	var GridSpacedLayout = function(defaults) {
		this.defaults = $.extend( {
			spaceOffset: 0
		}, defaults );
	}
	GridSpacedLayout.prototype = {
		constructor: GridSpacedLayout,
		getPageLayout: function(assetData, width, height, layoutData) {
			layoutData = $.extend( {}, this.defaults, layoutData );
			var layout = CoreTheme.layouts.gridLayout.getPageLayout(assetData, width, height, $.extend({ inset: layoutData.spaceOffset}, layoutData));
			var applyOffset = function( asset ) {
				asset.top += layoutData.spaceOffset;
				asset.left += layoutData.spaceOffset;
				asset.width -= layoutData.spaceOffset * 2;
				asset.height -= layoutData.spaceOffset * 2;
			}
			layout.photos.forEach( applyOffset );
			layout.texts.forEach( applyOffset );
			return layout;
		},
	};

	var CssBackground = function(defaultCss) {
		this.defaultCss = defaultCss || {
			css: { // from http://lea.verou.me/css3patterns/#weave
				background: 'linear-gradient(135deg, #708090 22px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px), linear-gradient(225deg, #708090 22px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px) 0 64px',
				backgroundColor: '#708090',
				backgroundSize: '64px 128px',
				backgroundImageSample: 'url($IMG)'
			},
			imageIds: {	// backgroundImage
				$IMG: 'PB.TemplatePhoto image id'
			}
		}
	}

	CssBackground.prototype = {
		constructor: CssBackground,
		fillBackground: function( $div, backgroundData, options) {
			options = $.extend( {}, {
				resolution: PB.PhotoProxy.LARGE
			}, options);
			backgroundData = $.extend( {}, this.defaultCss, backgroundData );
			if (backgroundData.css.backgroundImage) {
				var defaultSize = 'original';
				var match = backgroundData.css.backgroundImage.match(/(\$[\w]+)/g);
				if (match) {
					for (var i=0; i<match.length; i++)
						try {
							if (! (match[i] in backgroundData.imageIds))
								throw new Error('CssBackground.fillBackground cant find photo id' + match[i]);
							var tPhoto = PB.TemplatePhoto.get( backgroundData.imageIds[ match[i]] );
							backgroundData.css.backgroundImage =
								backgroundData.css.backgroundImage.replace(
									match[i],
									tPhoto.getUrl(options.resolution)
								);
						}
						catch(ex) {
							console.error('error creating background image', ex.message);
						}
				}
			}
			$div.css(backgroundData.css);
		}
	}

	var CssFrame = {
		id: 'cssFrame',
		fillFrame: function($div, frameOffset, frameData, options) {
			frameData = $.extend({
				css: {
					backgroundColor: 'green',
					boxShadow: '5px 5px 5px rgba(0,0,0,0.3)'
				}
			}, frameData);
			$div.css(frameData.css);
		}
	};

	var PhotoWidget = function(options) {
		this.options = $.extend( {
			url: 'data:image/svg+xml;utf8,<?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" height="100px" width="100px" version="1.1" y="0px" x="0px" overflow="visible" viewBox="0 0 100 100" ><rect width="100" height="100" fill="#F6EC43"/><text font-size="14"  transform="matrix(1 0 0 1 25 40)">Photo</text><text font-size="14" transform="matrix(1 0 0 1 25 60)">Widget</text></svg>',
			defaultWidth: 100,
			defaultHeight: 100
		}, options);
	};
	PhotoWidget.prototype = {
		prototype: PhotoWidget,
		defaultWidth: function( widgetOptions ) {
			return widgetOptions.defaultWidth || this.options.defaultWidth;
		},
		defaultHeight: function( widgetOptions ) {
			return widgetOptions.defaultHeight || this.options.defaultHeight;
		},
		generateDom: function(width, height, widgetOptions, displayOptions) {
			widgetOptions = $.extend({}, this.options, widgetOptions);
			var dom = $('<img>')
				.prop('src', widgetOptions.url);
			return dom;
		}
	}


	var CoreTheme = {
		id: 'admin@core',
		layouts: {
			configLayout : new ConfigLayout(),
			gridLayout : new GridLayout(),
			gridSpacedLayout : new GridSpacedLayout()
		},
		backgrounds: {
			cssBackground: new CssBackground()
		},
		frames: {
			cssFrame: CssFrame
		},
		widgets: {
			photoWidget: new PhotoWidget()
		}
	 };
	 return CoreTheme;
}()
