import express, { json, response } from "express";

const request = require("request");
const fs = require('fs');

var today = new Date();

fs.readFile('C:\\Users\\Nextop\\Documents\\기민수\\키 파일들\\today.txt', 'utf8' , (err, data) => {
  if (err) {
     console.error(err);
     return
 }
   datas = data;
})
//보안을 위하여 서비스키는 다른 파일에서 읽어오는 형식으로 구현

var year = today.getFullYear();
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var day = ("0" + today.getDate()).slice(-2);
var datas;

var reqTime = year + month + day;

const router = express.Router();

router.get("/", (req, res) => {
  
  const key = datas;
  const WeatherUrl =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";

  var queryParams =
    WeatherUrl +
    "?" +
    encodeURIComponent("serviceKey") +
    "=" +
    key; /* Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("1000"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("base_date") +
    "=" +
    encodeURIComponent(reqTime); /* */
  queryParams +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent("0500"); /* */
  queryParams +=
    "&" + encodeURIComponent("nx") + "=" + encodeURIComponent("55"); /* */
  queryParams +=
    "&" + encodeURIComponent("ny") + "=" + encodeURIComponent("127"); /* */

  request(queryParams, (err: any, response: any, body: any) => {
    const data = body;

    return res.status(202).send(data);
  });
});

export default router;
