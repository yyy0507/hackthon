var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var iconv = require("iconv-lite")
var hbs = require("hbs")
var bodyParser = require('body-parser');

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'hbs');  // 用hbs作为模版引擎
app.set('views', __dirname + '/views'); // 模版所在路径

//渲染一个index页面
app.get('/', function(req, res){
    res.render('index', {title: '网络爬虫测试'});
})

//爬取不同链接文章的内容
app.post('/search', function(req, res){console.log(req.body.url)

    var option={
        url:req.body.url,
        encoding:null
    }
    request(option, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //返回的body为抓到的网页的html内容
            console.log(body)
            var text = iconv.decode(body, 'gb2312') //转码
            var $ = cheerio.load(text); //当前的$符相当于拿到了所有的body里面的选择器
            var content=$('#wenzhangziti').text().trim(); //拿到文章内容
            var title=$('h1').text().trim(); //拿到文章标题
            res.status(response.statusCode).send({content: content,title:title});
        }
    })
});
//设置node服务端口
app.set('port', 8080);
app.listen(8080, function(){
    console.log('node http server listening on port----' + 8080)

});
module.exports = app;
