function() {
"use strict"

	var inset = 45;
	var textHeight = 30;
	var textWidth = 300;
	var textMargin = 16;

	function centerText(layout, assetData, width, height, options) {
		if ( PB.ThemeUtils.assetTextCount( assetData ) > 0 ) {
			var myWidth = Math.min( width, textWidth);
			layout.texts.push( {
				top: height - textHeight - inset,
				left: (width - myWidth) / 2,
				width: myWidth,
				height: textHeight
			});
		}
	}

	var layout1H = {
		getPageLayout: function(assetData, width, height, options) {
			var hasText = PB.ThemeUtils.assetTextCount( assetData ) > 0;
			var bottomInset = hasText ? inset + textHeight + textMargin: inset;
			var photoWidth = width - 2 * inset;
			var photoHeight = photoWidth * 3 / 4;
			var heightRatio = photoHeight / (height - inset - bottomInset);
			if (heightRatio > 1) {
				photoWidth = Math.round( photoWidth / heightRatio);
				photoHeight = Math.round( photoHeight / heightRatio);
			}
			var photoRect = new GUI.Rect({ width: photoWidth, height: photoHeight });
			photoRect = photoRect.centerIn({ width: width, height: height });
			if (hasText) {
				var diff = height - textHeight - inset - textMargin - photoRect.bottom;
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
			centerText( layout, assetData, width, height, options);
			return layout;
		}
	}

	var defaultLayout = {
		gridLayout: PB.ThemeCache.resource('theme://admin@core/layouts/gridSpacedLayout'),
		getPageLayout: function(assetData, width, height, options) {
			var myAssetData = {};
			for (var p in assetData)
				if (assetData[p].type === 'photo')
					myAssetData[p] = { type: 'photo' };
			var hasText = PB.ThemeUtils.assetTextCount( assetData ) > 0;
			var myHeight = hasText ? height - textHeight - inset: height;
			var layout = this.gridLayout.getPageLayout(myAssetData, width, myHeight, { spaceOffset: 12 });
			var rotations = [1, -2, 2, -1, 3, 1, -1];
			for (var i=0; i< layout.photos.length; i++)
				layout.photos[i].rotate = rotations[i % rotations.length ];
			centerText( layout, assetData, width, height, options);
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
