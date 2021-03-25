# Anime-vostfr 1.2.2
## 🎉 Update
- Improvement
## 📖 Description
Get any anime in vf and vostfr with their iformations like image, embed video, banner, trailer, description, synopsys, episodes ...
## NPM
https://www.npmjs.com/package/anime-vostfr
```
npm i anime-vostfr
```
## Api
```js
const api = require('anime-vostfr');
const data = await api.loadAnime();
const dataVF = await api.loadAnimeVF();
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
const res = await api.getMoreInformation(another[0].url).catch(err => displayError(err));

console.log("Synopsis: ",res.synop);
console.log("Banner: ",res.banner);
console.log("Youtube embed trailer link: ",res.trailer);
console.log("Episodes: ",res.eps);

/*Embed video*/
//here we take the first embed video for the first video (eps[0].url)
const resInfo = await api.getEmbed(another[0].eps[0].url).catch(err => displayError(err));
console.log("Episode 1 link iframe: ",resInfo[1]); //display first iframe link
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
const api = require('anime-vostfr.js');
const displayInfo = function(info){console.log(`[INFO]  ${info}`);}
const displayError = function(err){console.log(`[ERROR]  ${err}`);}

displayInfo("Connexion en cours...");
//VF same methods as vostfr
api.loadAnimeVF().then(async data => {
    displayInfo("Connexion effectuée...");
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
```