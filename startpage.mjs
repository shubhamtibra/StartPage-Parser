const search_phrases = ["holonomic+functions+pdf", "ore+algebra+pdf", "weyl+algebra+pdf", "D-finite+functions+pdf", "differential+equations+with+polynomial+coefficients+pdf"]
import {writeFileSync} from "fs"

/**
 * A function that parses the search results from startpage.com
 * @param {String} searchPhrase - the search phrase
 * @param {Number} page - the page number of the search results
 * @returns {Promise<void>}
 */
async function parseStartPageResults(searchPhrase, page) {
    if (!searchPhrase || !page) {
        throw new Error("searchPhrase and page must be set");
    }

    const searchResultsUrl = "https://www.startpage.com/sp/search";
    const requestHeaders = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,hi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "priority": "u=0, i",
        "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "startpage-extension": "ext-chrome",
        "startpage-extension-version": "3.0.1",
        "upgrade-insecure-requests": "1",
        "Referer": "https://www.startpage.com/",
        "Referrer-Policy": "origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    };
    const requestBody = `lui=english&language=english&query=${searchPhrase}&cat=web&t=device&segment=startpage.defaultchx&page=${page}&abd=0`;

    try {
        const response = await fetch(searchResultsUrl, {
            headers: requestHeaders,
            body: requestBody,
            method: "POST"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const filename = `dir/${searchPhrase}_${page}.html`;
        writeFileSync(filename, html);
    } catch (error) {
        console.error(error);
        page--;
    }
}

/**
 * A function that parses the search results from startpage.com
 * @param {String[]} searchPhrases - the search phrases
 * @returns {Promise<void>}
 */
async function parseStartPageResultsForAllPhrases(searchPhrases) {
    for (const searchPhrase of searchPhrases) {
        for (let page = 0; page < 50; page++) {
            await parseStartPageResults(searchPhrase, page);
        }
    }
}

await parseStartPageResultsForAllPhrases(search_phrases)
