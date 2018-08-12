// const Koa = require('koa');
// const Router = require('koa-router');
// const cors = require('koa2-cors');
// const fetch = require('cross-fetch');
// const bodyParser = require('koa-bodyparser');
//
// const app = new Koa();
// const router = new Router();
//
//
// app.use(cors({credentials: true}));
// app.use(bodyParser())
//
// router.get('/getData',async (ctx) => {
//     const query = ctx.query;
//
//     console.log(query)
//     url = `http://hotel.qunar.com/city/beijing_city/?fromDate=2018-08-05&cityurl=beijing_city&from=qunarHotel&toDate=2018-08-06`;
//     let data = await fetch(url).then(res => res.body).then(res => console.log(res));
//
//     // let routeData = await data.json();
//     // console.log(data)
//     ctx.body = data;
// });
//
// app.use(router.routes())
//
// app.listen('3010', () => {
//     console.log('[demo] 3010 port is success');
// });


const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const fetch = require('cross-fetch');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();


app.use(cors({credentials: true}));
app.use(bodyParser())

router.get('/getData',async (ctx) => {
    let {fromDate, month, fto} = ctx.query;
    console.log(ctx.query)
    // url = `https://ws.qunar.com/lpisearchd?from=${encodeURIComponent(ffrom)}&to=${fto}&month=${month}&type=ow&source=fhome&_=1533294820150`;
    url = `http://hotel.qunar.com/city/beijing_city/?fromDate=2018-08-05&cityurl=beijing_city&from=qunarHotel&toDate=2018-08-06`;
    let data = await fetch(url);

    // let routeData = await data.json();
    console.log(data)
    ctx.body = data;
});

app.use(router.routes())

app.listen('3010', () => {
    console.log('[demo] 3010 port is success');
});







