function() {
"use strict"

	var inset = 45;
	var textHeight = 30;
	var textWidth = 300;
	var textMargin = 16;

	function centerText(layout, page, options) {
		if ( PB.ThemeUtils.assetTextCount( page.getAssets() ) > 0 ) {
			var d = page.dimensions;
			var myWidth = Math.min( d.width, textWidth);
			layout.texts.push( {
				top: d.height - textHeight - inset,
				left: (d.width - myWidth) / 2,
				width: myWidth,
				height: textHeight
			});
		}
	}

	var layout1H = {
		getPageLayout: function(page, options) {
			var d = page.dimensions;

			var hasText = PB.ThemeUtils.assetTextCount( page.getAssets() ) > 0;
			var bottomInset = hasText ? inset + textHeight + textMargin: inset;
			var photoWidth = d.width - 2 * inset;
			var photoHeight = photoWidth * 3 / 4;
			var heightRatio = photoHeight / (d.height - inset - bottomInset);
			if (heightRatio > 1) {
				photoWidth = Math.round( photoWidth / heightRatio);
				photoHeight = Math.round( photoHeight / heightRatio);
			}
			var photoRect = new GUI.Rect({ width: photoWidth, height: photoHeight });
			photoRect = photoRect.centerIn({ width: d.width, height: d.height });
			if (hasText) {
				var diff = d.height - textHeight - inset - textMargin - photoRect.bottom;
				if (diff < 0)
					photoRect.top = photoRect.top + diff;
			}
			var layout = {
				photos: [ {
					top: photoRect.top, left: photoRect.left,
					width: photoRect.width, height: photoRect.height,
					rotate: 2
				}
				],
				texts: []
			}
			centerText( layout, page, options);
			return layout;
		}
	}

	var layout2HH = {
		getPageLayoutWide: function(page, options) {

		},
		getPageLayoutSquare: function(page, options) {

		},
		getPageLayout: function(page, options) {
			PB.ThemeCache.layoutByAspect(page, options, {
				wide: this.getPageLayoutWide,
				square: this.getPageLayoutSquare
			});
		}
	}

	var defaultLayout = {
		gridLayout: PB.ThemeCache.resource('theme://admin@core/layouts/gridSpacedLayout'),
		getPageLayout: function(page, options) {
			var assets = page.getAssets();
			var d = page.dimensions;
			var myAssets = {};
			for (var p in assets)
				if (assets[p].type === 'photo')
					myAssets[p] = { type: 'photo' };
			var hasText = PB.ThemeUtils.assetTextCount( assets ) > 0;
			var myHeight = hasText ? d.height - textHeight - inset: d.height;
			var layout = this.gridLayout.getPageLayout(
					PB.ThemeUtils.layoutMockupPage( myAssets, {width: d.width, height: myHeight}),
				 	{ spaceOffset: 12 }
				);
			var rotations = [1, -2, 2, -1, 3, 1, -2];
			for (var i=0; i< layout.photos.length; i++)
				layout.photos[i].rotate = rotations[i % rotations.length ];
			centerText( layout, page, options);
			return layout;
		}
	}

	var configLayout = PB.ThemeCache.resource( 'theme://admin@core/layouts/configLayout');

	var horizontalLayout = new configLayout.constructor(
	{
		1: layout1H,
		'default': defaultLayout
	}
	);

	var Theme = {
		id: "admin@rotate",
		title: "Rotated layouts",
		description: "Rotated photos",
		screenshots: ["/t/admin@core/showcase.jpg"],
		designs: {
		},
		layouts: {
			horizontalLayout: horizontalLayout
		},
		rawlayouts: {
			layout1H: layout1H
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
