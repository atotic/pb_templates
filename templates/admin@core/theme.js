// Base Theme 'theme://admin@core/'
function() {

"use strict"
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

	ConfigLayout.create = function(config) {
		return new ConfigLayout(config);
	}

	ConfigLayout.prototype = {
		getMatchingLayout: function(page, layoutOptions) {
			var assets = page.getAssets();
			var photoCount = PB.ThemeUtils.countAssets( assets, 'photo' );
			var textCount = PB.ThemeUtils.countAssets( assets, 'text' );
			var photoIndex = photoCount;
			var textIndex = textCount ? photoIndex + "t" : null;
			if (textIndex && textIndex in this.layouts)
				return this.layouts[ textIndex ];
			if (photoIndex in this.layouts)
				return this.layouts[ photoIndex];
			return this.layouts[ 'default' ];
		},
		getPageLayout: function(page, layoutOptions) {
			var layout = this.getMatchingLayout( page, layoutOptions);
			return layout.getPageLayout( page, layoutOptions );
		}
	}

	var GridLayout = function(defaults) {
		this.defaults = $.extend( {
			inset: 0
		}, defaults );
	}

	GridLayout.create = function(defaults) {
		return new GridLayout(defaults);
	}

	GridLayout.prototype = {
		getPageLayout: function(page, layoutData) {
			layoutData = $.extend( {}, this.defaults, layoutData );
			var d = page.dimensions;
			var assets = page.getAssets();

			var width = Math.max(d.width - 2 * layoutData.inset, 0);
			var height = Math.max(d.height - 2 * layoutData.inset, 0);
			if (!width || width < 50 || !height || height < 50) {
				console.error('getPageLayout width/height too small', d.width, d.height);
				return;
			}
			// Generate optimum tiles
			var photoCount = PB.ThemeUtils.countAssets(assets, 'photo');
			var textCount = PB.ThemeUtils.countAssets(assets, 'text');
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

	GridSpacedLayout.create = function(defaults) {
		return new GridSpacedLayout();
	}

	GridSpacedLayout.prototype = {
		getPageLayout: function(page, layoutData) {
			layoutData = $.extend( {}, this.defaults, layoutData );
			var layout = CoreTheme.layouts.gridLayout.getPageLayout(page, $.extend({ inset: layoutData.spaceOffset}, layoutData));
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

	CssBackground.create = function(defaultCss) {
		return new CssBackground( defaultCss );
	}

	CssBackground.prototype = {
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

	var CssFrame = function( options ) {
		this.options = $.extend(
			{
				css: {
					backgroundColor: 'green',
					boxShadow: '5px 5px 5px rgba(0,0,0,0.3)'
				},
				inset: [10,10,10,10]
			}
		, options);
	};

	CssFrame.create = function( options ) {
		return new CssFrame( options );
	}

	CssFrame.prototype = {
		getInset: function(options) {
			return ( options && options.inset) || this.options.inset;
		},
		fillFrame: function($div, options, displayOptions) {
			options = $.extend({}, this.options, options);
			$div.css(options.css);
		}
	};


	var photoWidgetPlaceholder = PB.TemplatePhoto.create( {
		id: 'admin@core/photoWidgetPlaceholder',
		originalUrl: 'data:image/svg+xml;utf8,<?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" height="100px" width="100px" version="1.1" y="0px" x="0px" viewBox="0 0 100 100" ><rect width="100" height="100" fill="#F6EC43"/><text font-size="14"  transform="matrix(1 0 0 1 25 40)">Photo</text><text font-size="14" transform="matrix(1 0 0 1 25 60)">Widget</text></svg>',
		width: 100,
		height: 100
	});

	var PhotoWidget = function(options) {
		this.options = $.extend( {
			photoId: 'admin@core/photoWidgetPlaceholder'
		}, options);
	};

	// Preferred way to create photo widgets
	PhotoWidget.create = function(templatePhotoOptions) {
		var photo = PB.TemplatePhoto.create( templatePhotoOptions );
		return new PhotoWidget( {
			photoId: photo.id
		});
	};

	PhotoWidget.prototype = {
		photo: function(widgetOptions) {
			return PB.TemplatePhoto.get( widgetOptions.photoId || this.options.photoId );
		},
		width: function( widgetOptions ) {
			widgetOptions = $.extend({}, this.options, widgetOptions);
			return widgetOptions.width || this.photo( widgetOptions ).width;
		},
		height: function( widgetOptions ) {
			widgetOptions = $.extend({}, this.options, widgetOptions);
			return widgetOptions.height || this.photo( widgetOptions ).height;
		},
		generateDom: function(width, height, widgetOptions, displayOptions) {
			widgetOptions = $.extend({}, this.options, widgetOptions );
			var dom = $('<img>')
				.prop('src',
					this.photo( widgetOptions ).getUrl( displayOptions ? displayOptions.resolution : null)
					)
				.css({
					width: width,
					height: height
				});
			return dom;
		}
	}

	var inBottomLeftPositioner = {
		getPosition: function( page, childAssetId ) {
			var child = page.getAsset( childAssetId );
			var parent = page.getAsset( child.childOf.assetId );
			// TODO measure text wodth, height
			var width = Math.min( 200, parent.css.width);
			var height = 30;
			return {
				top: parent.css.top + parent.css.height - height,
				height: height,
				left: parent.css.left,
				width: width
			};
		}
	};
	var CoreTheme = {
		id: 'admin@core',
		layouts: {
			gridLayout : new GridLayout(),
			gridSpacedLayout : new GridSpacedLayout()
		},
		backgrounds: {
			cssBackground: new CssBackground()
		},
		frames: {
			cssFrame: new CssFrame()
		},
		widgets: {
			photoWidget: new PhotoWidget()
		},
		creators: {
			photoWidget: PhotoWidget,
			configLayout: ConfigLayout,
			gridLayout: GridLayout,
			gridSpacedLayout: GridSpacedLayout,
			cssBackground: CssBackground,
			cssFrame: CssFrame
		},
		positioners: {
			default: inBottomLeftPositioner,
			inBottomCenter: inBottomLeftPositioner
		}
	 };
	 return CoreTheme;
}()
