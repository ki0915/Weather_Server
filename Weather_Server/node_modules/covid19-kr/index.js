'use strict'

/**
 * covid19-kr
 * 
 * @author LimeOrangePie <ji5489@gmail.com>
 * @author qwlake <qwlake@gmail.com>
 * @license GPLv3
 */

const axios = require('axios')
const moment = require('moment')

module.exports = {
    Covid19KR: function (options) {
        return new Covid19(options)
    }
}

class Covid19 {
    static RequestInfo = Object.freeze({
        Path: {
            getCovid19InfStateJson: "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson",
            getCovid19SidoInfStateJson: "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"
        }
    })

    constructor(options) {
        this.apiKey = options.apiKey
        this.numOfRows = 10
    }

    async getCovidKRByState(rows = 10, pageNo = 1, startDate = moment().subtract(1, 'month').format('yyyyMMDD'),
        endDate = moment().format('yyyyMMDD')) {

        return this.requestCovid(Covid19.RequestInfo.Path.getCovid19SidoInfStateJson,
            rows,
            pageNo,
            startDate,
            endDate
        )
    }

    async requestCovid(requestBaseURL, rows, pageNo, startDate, endDate) {
        const requestURL = requestBaseURL +
            `?serviceKey=${this.apiKey}&numOfRows=${rows}` +
            `&pageNo=${pageNo}&startCreateDt=${startDate}&endCreateDt=${endDate}`

        const response = await axios.get(requestURL)
        const responseHeader = response.data.response.header
        if (responseHeader.resultCode != '00')
            throw new Error(`Got invalid response(${responseHeader.resultCode}): ${responseHeader.resultMsg}`)

        if (!(response.data && response.data.response && response.data.response.body &&
            response.data.response.body.totalCount != undefined && response.data.response.body.items)) {
            this.__errorBody__ = response.data
            throw new Error(`No valid response body found - check response data with Covid19.__errorBody__ !`)
        }
        const responseBody = response.data.response.body

        // const itemCount = responseBody.totalCount
        // const itemList = responseBody.items.item

        return responseBody
    }


    async getCovidStatisticsBetweenClear(begin, end) {
        var pageNo = 1
        var rows = 10

        const requestURL = Covid19.RequestInfo.Path.getCovid19SidoInfStateJson +
            `?serviceKey=${this.apiKey}&numOfRows=${rows}` +
            `&pageNo=${pageNo}&startCreateDt=${begin}&endCreateDt=${end}`

        var parser = new xml2js.Parser()
        var isolClearCnt = 0
        request(requestURL, function(error, response, body) {     
            parser.parseString(body, function(err,result){
                var obj = JSON.stringify(result)

                var jsonArray = JSON.parse(obj).response.body[0].items[0].item
                var days = end - begin
                for (var i = 18; i < jsonArray.length; i = i + (days * 19)) {
                    var array = JSON.stringify(jsonArray[i])
                    if (i == 18)
                        isolClearCnt = parseInt(JSON.parse(array).isolClearCnt[0])
                    else
                        isolClearCnt = isolClearCnt - parseInt(JSON.parse(array).isolClearCnt[0])
                }
            })
        })
        return isolClearCnt
    }

    async getCovidStatisticsBetweenSick(begin, end) {
        var pageNo = 1
        var rows = 10

        const requestURL = Covid19.RequestInfo.Path.getCovid19SidoInfStateJson +
            `?serviceKey=${this.apiKey}&numOfRows=${rows}` +
            `&pageNo=${pageNo}&startCreateDt=${begin}&endCreateDt=${end}`

        var parser = new xml2js.Parser()
        var defCnt = 0
        request(requestURL, function(error, response, body) {     
            parser.parseString(body, function(err,result){
                var obj = JSON.stringify(result)

                var jsonArray = JSON.parse(obj).response.body[0].items[0].item
                var days = end - begin
                for (var i = 18; i < jsonArray.length; i = i + (days * 19)) {
                    var array = JSON.stringify(jsonArray[i])
                    if (i == 18)
                        defCnt = parseInt(JSON.parse(array).defCnt[0])
                    else
                        defCnt = defCnt - parseInt(JSON.parse(array).defCnt[0])
                }
            })
        })
        return defCnt
    }

    async getCovidStatisticsBetweenDeath(begin, end) {
        var pageNo = 1
        var rows = 10

        const requestURL = Covid19.RequestInfo.Path.getCovid19SidoInfStateJson +
            `?serviceKey=${this.apiKey}&numOfRows=${rows}` +
            `&pageNo=${pageNo}&startCreateDt=${begin}&endCreateDt=${end}`

        var parser = new xml2js.Parser()
        var deathCnt = 0
        request(requestURL, function(error, response, body) {     
            parser.parseString(body, function(err,result){
                var obj = JSON.stringify(result)

                var jsonArray = JSON.parse(obj).response.body[0].items[0].item
                var days = end - begin
                for (var i = 18; i < jsonArray.length; i = i + (days * 19)) {
                    var array = JSON.stringify(jsonArray[i])
                    if (i == 18)
                        deathCnt = parseInt(JSON.parse(array).deathCnt[0])
                    else
                        deathCnt = deathCnt - parseInt(JSON.parse(array).deathCnt[0])
                }
            })
        })
        return deathCnt
    }

    async getCovidStatisticsDayClear(day) {
        var pageNo = 1
        var rows = 10
        var begin = day - 1

        const requestURL = Covid19.RequestInfo.Path.getCovid19SidoInfStateJson +
            `?serviceKey=${this.apiKey}&numOfRows=${rows}` +
            `&pageNo=${pageNo}&startCreateDt=${begin}&endCreateDt=${day}`

        var parser = new xml2js.Parser()
        var deathCnt = 0
        request(requestURL, function(error, response, body) {     
            parser.parseString(body, function(err,result){
                var obj = JSON.stringify(result)

                var jsonArray = JSON.parse(obj).response.body[0].items[0].item
                var days = end - begin
                for (var i = 18; i < jsonArray.length; i = i + (days * 19)) {
                    var array = JSON.stringify(jsonArray[i])
                    if (i == 18)
                        deathCnt = parseInt(JSON.parse(array).deathCnt[0])
                    else
                        deathCnt = deathCnt - parseInt(JSON.parse(array).deathCnt[0])
                }
            })
        })
        return deathCnt
    }

    async getCovidStatisticsDaySick(day) {
        var pageNo = 1
        var rows = 10
        var begin = day - 1

        const requestURL = Covid19.RequestInfo.Path.getCovid19SidoInfStateJson +
            `?serviceKey=${this.apiKey}&numOfRows=${rows}` +
            `&pageNo=${pageNo}&startCreateDt=${begin}&endCreateDt=${end}`

        var parser = new xml2js.Parser()
        var deathCnt = 0
        request(requestURL, function(error, response, body) {     
            parser.parseString(body, function(err,result){
                var obj = JSON.stringify(result)

                var jsonArray = JSON.parse(obj).response.body[0].items[0].item
                var days = end - begin
                for (var i = 18; i < jsonArray.length; i = i + (days * 19)) {
                    var array = JSON.stringify(jsonArray[i])
                    if (i == 18)
                        deathCnt = parseInt(JSON.parse(array).deathCnt[0])
                    else
                        deathCnt = deathCnt - parseInt(JSON.parse(array).deathCnt[0])
                }
            })
        })
        return deathCnt
    }

    async getCovidStatisticsDayDeath(day) {
        var pageNo = 1
        var rows = 10
        var begin = day - 1

        const requestURL = Covid19.RequestInfo.Path.getCovid19SidoInfStateJson +
            `?serviceKey=${this.apiKey}&numOfRows=${rows}` +
            `&pageNo=${pageNo}&startCreateDt=${begin}&endCreateDt=${end}`

        var parser = new xml2js.Parser()
        var deathCnt = 0
        request(requestURL, function(error, response, body) {     
            parser.parseString(body, function(err,result){
                var obj = JSON.stringify(result)

                var jsonArray = JSON.parse(obj).response.body[0].items[0].item
                var days = end - begin
                for (var i = 18; i < jsonArray.length; i = i + (days * 19)) {
                    var array = JSON.stringify(jsonArray[i])
                    if (i == 18)
                        deathCnt = parseInt(JSON.parse(array).deathCnt[0])
                    else
                        deathCnt = deathCnt - parseInt(JSON.parse(array).deathCnt[0])
                }
            })
        })
        return deathCnt
    }
}