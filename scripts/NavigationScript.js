/// {Name: Navigation}
// {Description: All intents to be used for navigation.}

//Going to the homepage - News Page
intent('(Go|Head|Take me) to (the|) $(Q news|home) page', (p) => {
    p.play('(Okay|Alright|Sure), going to the $(Q) page');
    p.play({ command: 'goToNews'})
})

//Going to the news information cards
intent('(Go|Take me|Head) (back|)(to the news instructions|to the news information cards|)', (p) => {
    p.play('(Okay|Alright|Sure), going back');
    p.play({ command: 'newHeadlines', articles: []})
})

//Going to the Coffee Ordering page
intent('(Go|Head|Take me) to (the|) coffee (ordering|) page', (p) => {
    p.play('(Okay|Alright|Sure), going to the coffee ordering page');
    p.play({ command: 'goToCoffee'})
})

//Going to the Weather page
intent('(Go|Head|Take me) to (the|) weather page', (p) => {
    p.play('(Okay|Alright|Sure), going to the weather page');
    p.play({ command: 'goToWeather'})
})
