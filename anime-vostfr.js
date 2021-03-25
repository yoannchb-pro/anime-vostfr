//Modules
const cloudscraper = require('cloudscraper');
const DomParser = require('dom-parser');

/**
 * Retourne un anime en fonction de son nom (shortcut function)
 * @param {Object} elem 
 * @param {String} name 
 * @returns {Boolean}
 */
function getAnimeByTitle(elem, name){
    name = name.toLowerCase().trim();

    let title = elem.title ? elem.title.toLowerCase().trim().includes(name) : false;
    let title_english = elem.title_english ? elem.title_english.toLowerCase().trim().includes(name) : false;
    let title_romanji = elem.title_romanji ? elem.title_romanji.toLowerCase().trim().includes(name) : false;
    let others = elem.others ? elem.others.toLowerCase().trim().includes(name) : false;

    return title || title_english || title_romanji || others;
}


/**
 * Permet de load les animes à partir d'un fichier json
 * @returns {Promise}
 */
exports.loadAnime = async () => {
        const result = await cloudscraper("https://www.neko-sama.fr/animes-search-vostfr.json");
        return JSON.parse(result);
}

/**
 * Permet de load les animes en vf à partir d'un fichier json
 * @returns {Promise}
 */
exports.loadAnimeVF = async () => {
    const result = await cloudscraper("https://neko-sama.fr/animes-search-vf.json");
    return JSON.parse(result);
}
/**
 * Permet de récuperer le lien de la vidéo en embed
 * @param {String} url 
 * @returns {Promise}
 */
exports.getEmbed = async (url) => {
    const html = await cloudscraper("https://www.neko-sama.fr"+url);
    let video = [];
    let result = html.substring(html.indexOf('else'));
    result = result.substring(4,result.indexOf('}')+1);
    eval(result);
    return video;
}

/**
 * Permet de retourner la bannière, la synopsy, le trailer d'un anime et les episodes avec leurs informations
 * @param {String} url 
 * @returns {Object}
 */
exports.getMoreInformation = async (url) => {
    const html = await cloudscraper("https://www.neko-sama.fr"+url);
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

    return{
        synop: synop,
        banner: banner,
        trailer: ytb ? ytb.getAttribute('src') : false,
        eps: result
    };
}


/**
 * Permettais dans les ancienne version de retourner les genres
 * Plus d'utilité pour le moment
 * @param {Array} result 
 * @returns {Array}
 */
exports.getGenres = (result) => {
    //let keys = Object.keys(result); keys.splice(0, keys.indexOf('nb_eps')+1); return keys;
    return result.genres;
}



/**
 * Permet de chercher un anime par son nom (Film et animes)
 * @param {Array} data 
 * @param {String} name 
 * @returns {Array}
 */
exports.searchAnime = (data, name) => {
    if(!data || typeof data != "object") throw 'invalid data object (data,name)';
    if(!name) throw '"name" should be declared (data,name)';
    let result = data.filter(elem => getAnimeByTitle(elem, name));
    return result;
}

/**
 * Recherche un anime qui n'est pas un film en fonction de son nom
 * @param {Array} data 
 * @param {String} name 
 * @returns {Array}
 */
exports.searchAnimeNotMovie = (data, name) => {
    if(!data || typeof data != "object") throw 'invalid data object (data,name)';
    if(!name) throw '"name" should be declared (data,name)';

    name = name.toLowerCase().trim();
    
    let result = data.filter(elem => getAnimeByTitle(elem, name) && elem.nb_eps != "Film");
    return result;
}

/**
 * Permet de rechercher un anime de type film
 * @param {Array} data 
 * @param {String} name 
 * @returns {Array}
 */
exports.searchMovieAnime = (data, name) => {
    if(!data || typeof data != "object") throw 'invalid data object (data,name)';
    if(!name) throw '"name" should be declared (data,name)';
    let result = data.filter(elem => getAnimeByTitle(elem, name) && elem.nb_eps == "Film");
    return result;
}

/**
 * Retourne la liste des animes populaire
 * @param {Array} data 
 * @returns {Array}
 */
exports.popularAnime = (data) => {
    if(!data || typeof data != "object") throw 'invalid data object (data)';
    let result = data.filter(elem => Number(elem.popularity) > 10);
    return result;
}

/**
 * Permet de retourner tous les animes de type Film
 * @param {Array} data 
 * @returns {Array}
 */
exports.movieAnime = (data) => {
    if(!data || typeof data != "object") throw 'invalid data object (data)';
    let result = data.filter(elem => elem.nb_eps == "Film");
    return result;
}

/**
 * Retourne la liste des animes avec la meilleur note (>4)
 * @param {Array} data 
 * @returns {Array}
 */
exports.bestScoreAnime = (data) => {
    if(!data || typeof data != "object") throw 'invalid data object (data)';
    let result = data.filter(elem => Number(elem.score) > 4);
    return result;
}