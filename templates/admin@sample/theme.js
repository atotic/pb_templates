{
	id: "admin@sample",
	title: "Sample Theme",
	description: "Long description",
	screenshots: ["/t/_test/family/showcase1.jpg"],
	designs: {
	},
	layouts: {
	},
	backgrounds: {
	},
	frames: {
	},
	widgets: {
		soccerBall: ThemeCache.resource( 'theme://admin@base/widgets/photoWidget')
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
}
