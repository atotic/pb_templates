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

	var SampleTheme = {
		id: "admin@sample",
		title: "Sample Theme",
		description: "Long description",
		screenshots: ["/t/_test/family/showcase1.jpg"],
		designs: {
		},
		layouts: {
			framedLayout: new FramedLayout()
		},
		backgrounds: {
		},
		frames: {
		},
		widgets: {
			soccerBall: PB.ThemeCache.resource( 'theme://admin@core/widgets/photoWidget').create({
				originalUrl: '/t/admin@sample/soccer_small.svg',
				width: 397,
				height: 266
			}),
			eightBall: {}
		}
	};
	return SampleTheme;
}()
