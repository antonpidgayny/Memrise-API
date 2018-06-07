import * as http from 'https';
import * as iconv from 'iconv-lite';
import * as jwt from 'jsonwebtoken';
import * as prom from 'es6-promisify';
import * as Prm from 'es6-promise';
import * as request from 'request';
import * as cookieSetHeaderParser from 'set-cookie-parser';
class Requester{

  public headers;
  private requestGetPromisified;
  private requestPostPromisified;
  constructor(){
      this.headers = {
        'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        'Accept-Language': 'uk-UA,uk;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6',
        'Cache-Control' : 'no-cache',
        'Connection' : 'keep-alive',
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Host' : 'www.memrise.com',
        'Origin' : 'https://www.memrise.com',
        'Pragma' : 'no-cache',
        'Referer' : 'https://www.memrise.com/login/',
        'Upgrade-Insecure-Requests' : 1,
        'Accept-Charset' : 'utf-8'
      },
      this.requestGetPromisified = prom.promisify(request.get),
      this.requestPostPromisified = prom.promisify(request.post)
  }
  public async getMemriseRequest(url, cookies_str, cookies_url){
    if (cookies_url == undefined){
      cookies_url = url;
    }else{
      this.headers.Referer = 'https://www.memrise.com/home/';
    }
    this.headers['Content-Type'] = 'text/html; charset=utf-8' ;
    let resp = await this.requestGetPromisified({url : url, jar : this.formCoookies(cookies_str, cookies_url) , headers : this.headers});
    let cookies = cookieSetHeaderParser.parse(resp, {
      decodeValues: true
    });
    return ({cookie : cookies, body : resp.body});
  }
  public async postMemriseRequest(url, cookies_str, form){
    this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    let resp = await this.requestPostPromisified({url:url, jar : this.formCoookies(cookies_str, url), headers : this.headers, form: form});
    let cookies = cookieSetHeaderParser.parse(resp, {
      decodeValues: true  // default: true
    });
    return ({cookie : cookies, body : resp.body});
  }
  private formCoookies(cookies_str, url){
      let j = request.jar();
      let cookie = '';
      //console.log(cookies_str);
      cookies_str.split(';').forEach(function(elem){
        j.setCookie(request.cookie(elem), url);
      });
      console.log(j);
      //console.log(j);
      return j;
  }
  private getCookies(str){
      let pos = str.search("csrfmiddlewaretoken");
      return str.slice(pos+28,pos+92);
  }
  private getUnusualCookies(str){
      let pos = str.search("csrftoken");
      return str.slice(pos+12,pos+76);
  }
  private getLevel(str){
    let pos = str.search("data-level-id");
    return str.slice(pos+15,pos+22);
  }
  public async add(list, url, cookie_str){
    let resp = await this.getMemriseRequest(url, cookie_str, undefined);
    //console.log(resp.body);
    let csrfmiddlewaretoken = this.getUnusualCookies(resp.body);
    let level = this.getLevel(resp.body);
    url = "https://www.memrise.com/ajax/level/thing/add/";
    let form = {
      "columns": {"1":"llol","2":"d"},
      "level_id": level
    }
    cookie_str = (cookie_str.split(';')[0] +';'+ "csrftoken=" + csrfmiddlewaretoken);
    console.log("chto?", cookie_str);
    //return level;
    this.headers['x-csrftoken'] = csrfmiddlewaretoken;
    return await this.postMemriseRequest(url, cookie_str, form);
  }
  public async create(obj, url, cookie_str){
    let resp = await this.getMemriseRequest(url, cookie_str, undefined);
    //return resp;
    let csrfmiddlewaretoken = this.getCookies(resp.body);
    let form = {
      'csrfmiddlewaretoken': csrfmiddlewaretoken,
      'name': obj.name,
      'target': 6,
      'source': 10,
      'tags': obj.tags,
      'description': obj.desc,
      'short_description': obj.short 
    };
    //console.log(cookie_str);
    cookie_str = (cookie_str.split(';')[0] +';'+ "csrftoken=" + csrfmiddlewaretoken);
    //return 'success';
    return await this.postMemriseRequest(url, cookie_str, form);
  }
  public async auth(url){
    try {
      let resp = await this.getMemriseRequest(url, "", undefined);
      let csrfmiddlewaretoken = this.getCookies(resp.body); 
      let form = {
        'csrfmiddlewaretoken': csrfmiddlewaretoken,
        'username' : process.env.email,
        'password' : process.env.password,
        'next' : ''
      };
      let cookie_str = 'csrftoken='+csrfmiddlewaretoken+';';
      url = 'https://www.memrise.com' ;
      resp = await this.postMemriseRequest('https://www.memrise.com/login/', cookie_str, form);
      cookie_str = resp.cookie['1'].name+'='+resp.cookie['1'].value+'; ';
      resp = await this.getMemriseRequest("https://www.memrise.com/home/", cookie_str, undefined); 
      return resp.cookie;
    }catch(e){
      console.log(e);
      throw "lol"
    }
  }
}

//export
export default new Requester();