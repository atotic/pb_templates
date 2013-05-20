function() {
"use strict"

	var soccerFieldBackground = PB.ThemeCache.resource('theme://admin@core/creators/cssBackground')
		.create( {
				css: {
					backgroundImage: "url(/t/admin@sports/soccer_field.svg)",
					backgroundSize: '100% 100%'
				}
			});

	// Photos
	var soccerStadiumPhoto = new PB.TemplatePhoto( {
		id: 'admin@sports/soccerStadium',
		iconUrl: '/t/admin@sports/soccer_stadium_icon.jpg',
		originalUrl: '/t/admin@sports/soccer_stadium.jpg',
	});

	var soccerStadiumBackground = PB.ThemeCache.resource('theme://admin@core/creators/cssBackground')
		.create( {
			css: {
				backgroundImage: "url($stadium)",
				backgroundSize: '100% 100%'
			},
			imageIds: {
				$stadium: soccerStadiumPhoto.id
			}
		});

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
		}
	};
	return Theme;
}()
