# Anime-vostfr
## Description
Get any anime iformation like image, embed video, banner, trailer, description...
## Npm
https://www.npmjs.com/package/anime-vostfr
```
npm i anime-vostfr
```
## Api
```js
const api = require('anime-vostfr');
```
## How to use ?
Search anime
```js
//Get data from api.loadAnime().then(data => {});
var result = api.searchAnime(data, name);
```
Search movie anime
```js
var result = api.searchMovieAnime(data, name);
```
Get genres for anime
```js
var anime = api.searchAnime(data, name);
var genres = api.getGenres(anime);
```
Get more information (trailer + banner + description + episodes) and embed link video
```js
var anime = api.searchAnime(data, name);
/*More information*/
await api.getMoreInformation(anime.url).then(res => {
        console.log("Synopsis: ",res.synop);
        console.log("Banner: ",res.banner);
        console.log("Youtube embed trailer link: ",res.trailer);
        console.log("Episodes: ",res.eps);

        //register episodes list for embed video
        anime[0]["eps"] = res.eps;
});

/*Embed video*/
//here we take the first embed video for the first video (eps[0].url)
await api.getEmbed(anime[0].eps[0].url).then( res => {
    console.log("Episode 1 link iframe: ",res[0]); //display first iframe link
});
```
Get popular anime
```js
var result = api.popularAnime(data);
```
Get best score anime
```js
var result = api.bestScoreAnime(data);
```
Get all movie anime
```js
var result = api.movieAnime(data);
```
## Example
```js
const displayInfo = function(info){console.log(`[INFO]  ${info}`);}
const displayError = function(err){console.log(`[ERROR]  ${err}`);}

displayInfo("Connexion en cours...");
api.loadAnime().then(async data => {
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
    await api.getMoreInformation(another[0].url).then(res => {
        console.log("Synopsis: ",res.synop);
        console.log("Banner: ",res.banner);
        console.log("Youtube embed trailer link: ",res.trailer);
        console.log("Episodes: ",res.eps);
        another[0]["eps"] = res.eps;
    },
    err => {displayError(err);});

    /*Get embed link for video*/ 
    displayInfo("Lien video en cours de traitement...");
    await api.getEmbed(another[0].eps[0].url).then( res => {
        console.log("Episode 1 link iframe: ",res[0]); //display first iframe link
    }, 
    err => {displayError(err);});

},
err => {displayError(err);});
```
