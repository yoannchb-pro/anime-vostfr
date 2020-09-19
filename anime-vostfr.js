const cloudscraper = require('cloudscraper');
const DomParser = require('dom-parser');

exports.loadAnime = function(callback){
    return new Promise((resolve, reject) => {
        cloudscraper("https://www.neko-sama.fr/animes-search.json").then(function(result){
            resolve(JSON.parse(result));
        }, function(err){reject(err);});
    });
}

exports.getEmbed = function(url, callback){
    return new Promise((resolve, reject) => {    
        cloudscraper("https://www.neko-sama.fr"+url).then(function(html){
            try{
                let video = [];
                let result = html.substring(html.indexOf('else'));
                result = result.substring(4,result.indexOf('}')+1);
                eval(result);
                resolve(video);
            } catch(e) {
                reject("Compilation error in the anime data");
            }
        }, function(err){reject(err);});
    });
}


exports.getMoreInformation = function(url){
    return new Promise((resolve, reject) => {
        cloudscraper("https://www.neko-sama.fr"+url).then(function(html){
            try{
                let parser  = new DomParser();
                let document = parser.parseFromString(html);
                let synop = document.getElementsByClassName('synopsis')[0].getElementsByTagName('p')[0].innerHTML;
                let ytb = document.getElementsByTagName('iframe')[0];
                let banner = document.getElementById('head').getAttribute('style');
                banner = banner.substring(banner.indexOf('url('));
                banner = banner.substring(4,banner.indexOf(')'));
        
                let result = html.substring(html.indexOf('episodes'));
                result = result.substring(0,result.indexOf('$(document)'));
                result = eval(result);
        
                resolve({
                    synop: synop,
                    banner: banner,
                    trailer: ytb ? ytb.getAttribute('src') : false,
                    eps: result
                });
            } catch(e) {
                reject("Compilation error in the anime data");
            }
        }, function(err){reject(err);});
    })
}

exports.getGenres = function(result){
    let keys = Object.keys(result);
    keys.splice(0, keys.indexOf('nb_eps')+1);
    return keys;
}


exports.searchAnime = function(data, name){
    if(!data || typeof data != "object") throw 'invalid data object (data,name)';
    if(!name) throw '"name" should be declared (data,name)';
    let result = data.filter(elem => elem.title.toLowerCase().trim().includes(name));
    return result;
}

exports.searchMovieAnime = function(data, name){
    if(!data || typeof data != "object") throw 'invalid data object (data,name)';
    if(!name) throw '"name" should be declared (data,name)';
    let result = data.filter(elem => elem.title.toLowerCase().trim().includes(name) && elem.nb_eps == "Film");
    return result;
}

exports.popularAnime = function(data){
    if(!data || typeof data != "object") throw 'invalid data object (data)';
    let result = data.filter(elem => Number(elem.popularity) > 10);
    return result;
}

exports.movieAnime = function(data){
    if(!data || typeof data != "object") throw 'invalid data object (data)';
    let result = data.filter(elem => elem.nb_eps == "Film");
    return result;
}

exports.bestScoreAnime = function(data){
    if(!data || typeof data != "object") throw 'invalid data object (data)';
    let result = data.filter(elem => Number(elem.score) > 4);
    return result;
}