


let $ = cheerio.load(res.text);
let hoteNname =[];
let price =[];
$('li.qt-bb-x1 .list-info .qt-black.hotel-title').each((i, el) => hoteNname.push($(el).text()));
$('li.qt-bb-x1 .list-info .right .price').each((i, el) => price.push($(el).text()));
const info = hoteNname.map((h, i) => `${h} --- ${price[i]}`);
console.log(info);