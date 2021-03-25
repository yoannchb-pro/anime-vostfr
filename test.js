const api = require('./anime-vostfr.js');
const displayInfo = function(info){console.log(`[INFO]  ${info}`);}
const displayError = function(err){console.log(`[ERROR]  ${err}`);}

displayInfo("Connexion en cours...");
//VF
api.loadAnimeVF().then(async data => {
    displayInfo("Connexion effectuée...");
    //same methods as vostfr
    console.log(data);
}).catch(err => displayError(err));

displayInfo("Connexion en cours...");
//VOSTFR
api.loadAnime().then(async (data) => {
    displayInfo("Connexion effectuée...");

    let another = api.searchAnime(data, "another");
    console.log("Result for another: ",another);
    console.log("Result for another genres: ",api.getGenres(another));
    console.log("Result for movie naruto: ",api.searchMovieAnime(data, "naruto")); 
    console.log("All movie: ",api.movieAnime(data));
    console.log("Popular anime: ",api.popularAnime(data));
    console.log("Best score anime: ",api.bestScoreAnime(data));

    /*Get more information synopsis + trailer + banner + episodes*/
    displayInfo("Informations en cours de traitement...");
    const res = await api.getMoreInformation(another[0].url).catch(err => displayError(err));

    console.log("Synopsis: ",res.synop);
    console.log("Banner: ",res.banner);
    console.log("Youtube embed trailer link: ",res.trailer);
    console.log("Episodes: ",res.eps);
    another[0]["eps"] = res.eps;

    /*Get embed link for video*/ 
    displayInfo("Lien embed en cours de traitement...");
    const resInfo = await api.getEmbed(another[0].eps[0].url).catch(err => displayError(err));
    console.log("Episode 1 link iframe: ",resInfo[1]); //display first iframe link
    another[0].embedOne = resInfo[1];
    
}).catch(err => displayError(err));