function() {
"use strict"

	var cssBackground = PB.ThemeCache.resource('theme://admin@core/backgrounds/cssBackground');

	var soccerFieldBackground = new cssBackground.constructor( {
		css: {
			backgroundImage: "url(/t/admin@sports/soccer_field.svg)",
			backgroundSize: '100% 100%'
		}
	});

	// Photos
	var soccerStadiumPhoto = PB.TemplatePhoto.create( {
		id: 'admin@sports/soccerStadium',
		iconUrl: '/t/admin@sports/soccer_stadium_icon.jpg',
		originalUrl: '/t/admin@sports/soccer_stadium.jpg',
	});

	var soccerStadiumBackground = new cssBackground.constructor( {
		css: {
			backgroundImage: "url($stadium)",
			backgroundSize: '100% 100%'
		},
		imageIds: {
			$stadium: soccerStadiumPhoto.id
		}
	});

	var soccerBallWidget = PB.ThemeCache.resource( 'theme://admin@core/widgets/photoWidget')
		.create( {
			originalUrl: '/t/admin@sports/soccer_ball_shaded.svg',
			width: 700,
			height: 550
		});

	var soccerStadiumImage = PB.ServerPhotoCache
	var Theme = {
		id: "admin@sports",
		title: "Sports theme",
		description: "Soccer, Basketball, Football",
		screenshots: ["/t/admin@core/showcase.jpg"],
		designs: {
		},
		layouts: {
		},
		backgrounds: {
			soccerField: soccerFieldBackground,
			soccerStadium: soccerStadiumBackground
		},
		frames: {
		},
		widgets: {
			soccerBallWidget: soccerBallWidget
		},
		photos: {
			soccerStadium: soccerStadiumPhoto
		}
	};
	return Theme;
}()
