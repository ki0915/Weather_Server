import express, { json, response } from "express";

const Time = new Date();

var reqTime =
  Time.getFullYear().toString() +
  Time.getMonth().toString() +
  Time.getDate().toString();
var datas;
const router = express.Router();
const fs = require('fs');

fs.readFile('C:\\Users\\Nextop\\Documents\\기민수\\키 파일들\\today.txt', 'utf8' , (err, data) => {
  if (err) {
     console.error(err);
     return
 }
   datas = data;
});

var datas;

router.get("/", (req, res) => {
  var request = require("request");


  var url = "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst";
  var queryParams =
    url +
    "?" +
    encodeURIComponent("serviceKey") + "=" +
    datas; /* Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("10"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /* */
  queryParams +=
    "&" + encodeURIComponent("stnId") + "=" + encodeURIComponent("108"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("tmFc") +
    "=" +
    encodeURIComponent(reqTime.toString() + "0500"); /* */

  //console.log('Status', response.statusCode);
  //console.log('Headers', JSON.stringify(response.headers));
  //console.log('Reponse received', body);
  request(queryParams, (err: any, response: any, body: any) => {
    const data = body;

    return res.status(202).send(data);
  });
});

router.get("/tempeture", (req, res) => {
  var request = require("request");

  var url = "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa";
  var queryParams =
    url +
    "?" +
    encodeURIComponent("serviceKey") +
    "=" + datas; /* Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("10"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /* */
  queryParams +=
    "&" + encodeURIComponent("stnId") + "=" + encodeURIComponent("108"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("tmFc") +
    "=" +
    encodeURIComponent(reqTime.toString() + "0600"); /* */

  request(queryParams, (err: any, response: any, body: any) => {
    const data = body;

    return res.status(202).send(data);
  });
});

export default router;
