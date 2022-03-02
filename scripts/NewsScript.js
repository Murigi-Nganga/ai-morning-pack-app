/// {Name: News}
// {Description: Gives the latest news based on the source, category and terms.}

//TODO: Add pages to all commands to simulate a "visual state"
//Popup fires once the button is in the ready state
onUserEvent((p, e) => {
    console.info(`EVENT`, e.event);
    if (e.event == `buttonReady`) {
        p.showPopup({
            html: `<div class="popup"><div class="popup_header"></div>\<div class="popup_body"><div>Ask questions and perform other tasks with voice</div><div class="popup_pointer-button"><div class="popup_pointer-button_bg"><div class="popup_pointer-button_arrow"></div></div><div class="popup_pointer-button_text">Click here to speak!</div></div></div></div>`,
            style:`.popup{ max-width: 394px; height: 324px; max-height: 324px; background: #fff; box-shadow: 0 5px 14px rgba(0, 0, 0, .25); overflow: hidden; border-radius: 10px; display: -webkit-box; display: -ms-flexbox; display: flex; flex-direction: column } .top .popup { flex-direction: column-reverse } .top .popup_body { flex-direction: column-reverse; justify-content: flex-end; padding-top: 20px } .popup_header { height: 190px; background-image: url(https://tse3.mm.bing.net/th?id=OIP.n5la_tH3rKiVODuANA9kvAHaD4&pid=Api&P=0&w=310&h=163); background-repeat: no-repeat; background-size: cover; } .popup_body { display: flex; flex-direction: column; font-weight: 400; font-size: 16px; line-height: 28px; text-align: center; color: #000; padding: 6px 70px 0; height: 133px } .popup_pointer-button { width: 170px; height: 36px; margin: 7px auto 10px; position: relative } .right .popup_pointer-button { padding-right: 16px } .left .popup_pointer-button { padding-left: 16px } .popup_pointer-button_text { position: absolute; height: 100%; width: 100%; font-size: 16px; line-height: 36px; text-align: center; color: #fff } .popup_pointer-button_bg { position: absolute; height: 100%; width: 100%; background: #0D75FF; border-radius: 7px } .popup_pointer-button_arrow { position: absolute; background-color: #0D75FF; text-align: left; top: 3px; right: -10px; transform: rotate(-90deg) skewX(-30deg) scale(1, .866) } .popup_pointer-button_arrow:after, .popup_pointer-button_arrow:before { content: ''; position: absolute; background-color: inherit } .popup_pointer-button_arrow, .popup_pointer-button_arrow:after, .popup_pointer-button_arrow:before { width: 20px; height: 20px; border-top-right-radius: 30% } .popup_pointer-button_arrow:before { transform: rotate(-135deg) skewX(-45deg) scale(1.414, .707) translate(0, -50%) } .popup_pointer-button_arrow:after { transform: rotate(135deg) skewY(-45deg) scale(.707, 1.414) translate(50%) } .left .popup_pointer-button_bg { transform: rotate(180deg) }`,
            overlay: true,
            buttonMarginInPopup: 15,
            force: true,
        });
    }
});


const API_KEY = process.env.REACT_APP_NEWS_API_KEY    //Individual API key
const sources = ['CNN', 'Wired', 'BBC News', 'Fox News', 'CBS News', 'BuzzFeed', 'ABC News']
const sourcesChoices = sources.join('|')
const categories = ['business', 'entertainment', 'health', 'sports', 'technology'];
const categoriesChoices = `${categories.map((category) => `${category}~${category}`).join('|')}`;

let savedArticles = [];

//Search News by Source
intent('Give me the news from $(source* (.*))', (p) => {

    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.source.value) {
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join("-")}&language=en`;
    }
    
    console.log(NEWS_API_URL)

    api.request(NEWS_API_URL, (error, response, body) => {
        const {articles} = JSON.parse(body);
        
       if(!articles.length) {
        p.play("Sorry, please try searching for news from a different source");
        return;
       }

    savedArticles = articles;

    p.play({command: 'newHeadlines', articles});
    p.play(`Here are the (latest|recent) ${p.source.value}.`);
        
    p.play('(Would you like me to|should I) read the headlines?');
    p.then(confirmation);
    })
})

//Search News by Category

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${categoriesChoices})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${categoriesChoices}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&language=en`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
 
        p.play('(Would you like me to|should I) read the headlines?');
        p.then(confirmation);
    });
});

//Search News by Terms
intent('what\'s (going on|up|going on with|) with $(term* (.*))', 
       'what\'s (going on|up) with $(term* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&language=en`;
    
    if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for something else.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
})

// Read the headlines - Global context
intent('(Could you|please|) read the $(Q headlines|news|articles)', async (p) => {
    p.play('(Okay|Sure|Alright), reading the $(Q)')
    for(let i = 0; i < savedArticles.length; i++){
        p.play({ command: 'highlightNews', article: savedArticles[i]});
        p.play(`${savedArticles[i].title}`);
    }
})

//Confirm whether the headlines should be read or not
const confirmation = context(() => {
    intent('(yes|sure|yeah)', async (p) => {
        for(let i = 0; i < savedArticles.length; i++){
            p.play({ command: 'highlightNews', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
        p.resolve()      //Return to the global context
    })
    
    intent('no', (p) => {
        p.play('(Okay|Alright|Sure), (wonderful|sounds good to me).')
        p.resolve()
    })
})


// Opening a article to its URL
intent('Open (the|) (article|) (number|) $(NUMBER)',
       (p) => {
    if(p.NUMBER.value) {
        p.play("Opening the article")
        p.play({ command:'openArticle', number: p.NUMBER.number, articles: savedArticles})
    }
})
