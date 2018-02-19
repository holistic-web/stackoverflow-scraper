var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = 'https://stackoverflow.com/';
var data = [];

request(url, (err, res, body) => {
   var $ = cheerio.load(body);
   $('.question-summary').each((i, questionNode) => {
       let question = {}
       question.title = $(questionNode).find('.summary h3 a').text();
       question.votes = $(questionNode).find('.votes .mini-counts span').text();
       question.answers = $(questionNode).find('.status .mini-counts span').text();
       question.views = $(questionNode).find('.views .mini-counts span').text();
       question.asked = $(questionNode).find('.relativetime').text();
       question.user = $(questionNode).find('.started a:not(.started-link)').attr('href');
       let tags = [];
       $(questionNode).find('.tags a.post-tag').each((i, tagNode) => {
           tags.push($(tagNode).text());
       });
       question.tags = tags;
       console.log(JSON.stringify(question));
       console.log('');
       data.push(question);
   });

   fs.writeFile('./downloads/data.json', JSON.stringify(data));
});