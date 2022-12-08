import express, { json, response } from "express";

const request = require("request");
const convert = require("xml-js");

var today = new Date();

var year = today.getFullYear();
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var day = ("0" + today.getDate()).slice(-2);

var reqTime = year + month + day;

const router = express.Router();

router.get("/", (req, res) => {
  const key =
    "CO5AAa%2Bz%2FvhOJ88caWzYfMEzejHmUUAt7AjDXNfaMzaDLDUMTppC82szj9hBh86dhjsOIcWyQO6ag4SWOv6XbA%3D%3D";
  const WeatherUrl =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

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
    const data = JSON.parse(body);

    return res.status(202).send(data);
  });
});

export default router;
