import express, { json, response } from "express";

const Time = new Date();
var reqTime =
  Time.getFullYear().toString() +
  Time.getMonth().toString() +
  Time.getDate().toString();

const router = express.Router();

router.get("/", (req, res) => {
  var request = require("request");

  var url = "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst";
  var queryParams =
    url +
    "?" +
    encodeURIComponent("serviceKey") +
    "=CO5AAa%2Bz%2FvhOJ88caWzYfMEzejHmUUAt7AjDXNfaMzaDLDUMTppC82szj9hBh86dhjsOIcWyQO6ag4SWOv6XbA%3D%3D"; /* Service Key*/
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
    const data = JSON.parse(body);

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
    "=CO5AAa%2Bz%2FvhOJ88caWzYfMEzejHmUUAt7AjDXNfaMzaDLDUMTppC82szj9hBh86dhjsOIcWyQO6ag4SWOv6XbA%3D%3D"; /* Service Key*/
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
    const data = JSON.parse(body);

    return res.status(202).send(data);
  });
});

export default router;
