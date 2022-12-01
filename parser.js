import fetch from "node-fetch";
import * as cheerio from 'cheerio';
import fs from 'fs/promises'
import pretty from 'pretty';

export async function parseHTML(raw){
    let $=cheerio.load(raw);
	let listContainers=$('[class="thumbnail text-center"]');
	let data=[];
	listContainers.each((i,el)=>{
		const content= {
			name:'',
			year:'',
			image:'',
			pageUrl:''
		}
		let img=$(el).children('.img-group');
		content.year=$(img).children('[class="img-tip label label-info"]').text();
		content.image=$(img).children("a").children('img').attr('src');
		content.pageUrl=$(img).children("a").attr('href');
		content.name=$(el).children('div:last').children('h5').children('a').text();
		data.push(content);
	});
	return data;
}
export async function parseVIDEO(raw){
    let $=cheerio.load(raw);
	let videoUrl=$('[class="jw-video jw-reset"]').attr('src');
	return videoUrl;
}
