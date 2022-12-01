import puppeteer from 'puppeteer-extra'
import randomUseragent from 'random-useragent'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import * as cheerio from 'cheerio';
import { executablePath } from 'puppeteer'
import fs from 'fs/promises'
import {parseHTML,parseVIDEO} from './parser.js'
puppeteer.use(StealthPlugin())

// export default async function launchPuppetter(){
//         const browser=await puppeteer.launch({ headless: true ,executablePath: executablePath(),args: [ '--proxy-server=proxy:3128' ]});
//         console.log('Running tests..');
//         const page = await browser.newPage()

//         let url='https://www.soap2day.to/movielist?page=';
//         await page.goto(url);    
//         await page.waitForTimeout(1000);
//         await page.click('a[id="btnhome"]');
//         await page.waitForTimeout(1000);
        
//         let randomPage=Math.floor(Math.random() *493)+1;
//         // let randomPage=1;
//         await page.goto(url+randomPage.toString());
//         console.log(await page.url());

//         let content =await parseHTML(await page.content());
//         console.log(content);
    
//         const cookies = await page.cookies();
//         await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
    
//         await page.screenshot({ path: 'testresult.png', fullPage: true });
//         await browser.close();
//         console.log(`All done, check the screenshot. ✨`)
//         return content;
// }
export async function launchPuppetter(){
    const browser=await puppeteer.launch({ headless: true ,executablePath: executablePath(),args: [ '--proxy-server=proxy:3128' ]});
    console.log('Running tests..');
    const page = await browser.newPage()

    let url='https://soap2day.to';
    await page.goto(url+'/movielist');    
    await page.waitForTimeout(1000);
    await page.click('a[id="btnhome"]');
    await page.waitForTimeout(1000);
    let content =await parseHTML(await page.content());
    console.log(content);
    let urlList=[]
    content.forEach(async element => {
        let videoUrl=await findVideoUrl(page,url,await element.pageUrl);
        urlList.push(videoUrl);
    });
    
    console.log(urlList);

    const cookies = await page.cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));

    await page.screenshot({ path: 'testresult.png', fullPage: true });
    await browser.close();
    console.log(`All done, check the screenshot. ✨`)
    return content;
}
async function findVideoUrl(page,url,contentUrl){
    await page.goto(url+contentUrl);
    await page.waitForTimeout(2000);
    let videoUrl =await parseVIDEO(await page.content());
    return videoUrl;
}
await launchPuppetter()