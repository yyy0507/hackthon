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
	res.render('index', {title: '酒店价格抓取'});
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

			var text = iconv.decode(body, 'utf-8') //转码
			console.log(body)
			var $ = cheerio.load(text); //当前的$符相当于拿到了所有的body里面的选择器
			let hotel = [],
				price = [];
			// var hotel=$('.hotel-title').html(); //拿到酒店名称
			$('.hotel-title').each((i,el) => hotel.push($(el).text()));
			// console.log(111,hotel)
			// var price=$('.price').html().split('¥'); //拿到酒店价格
			$('.price').each((i,el) => price.push($(el).text()))
			// console.log(price)
			const info = hotel.map((h, i) => `${h} --- ${price[i]}`);
			console.log(info);
			res.status(response.statusCode).send({hotel: hotel,price:price,info:info});

		}
	})
});
//设置node服务端口
app.set('port', 3000);
app.listen(3000, function(){
    console.log('node http server listening on port----' + 3000)
    
});
module.exports = app;




// let hoteNname =[];
// let price =[];
// $('li.qt-bb-x1 .list-info .qt-black.hotel-title').each((i, el) => hoteNname.push($(el).text()));
// $('li.qt-bb-x1 .list-info .right .price').each((i, el) => price.push($(el).text()));
// const info = hoteNname.map((h, i) => `${h} --- ${price[i]}`);
// console.log(info);