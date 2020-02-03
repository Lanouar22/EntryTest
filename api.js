var express     =   require('express');
var axios       =   require('axios');
var csvtojson   =   require('csvtojson');
const PORT = 50041;
const apiKey = "dd764f40"
const urlAirJazz = "https://my.api.mockaroo.com/air-jazz/flights"
const urlAirMoon = "https://my.api.mockaroo.com/air-moon/flights"
//const urlAirBeam = "https://my.api.mockaroo.com/air-beam/flights"
//bad adress to test error API
const urlAirBeam = "https://my.api.mockaroo.com/air-beam/flights"

// Set up the express app
const app = express()

// Get all fligths
app.get('/api/flights', async (req, res) => {
    let result = []
    let promise1 = getDataExternalAPI(apiKey, urlAirJazz)
    let promise2 = getDataExternalAPI(apiKey, urlAirMoon)
    let promise3 = getDataExternalAPI(apiKey, urlAirBeam)
    await Promise.all([promise1, promise2, promise3])
    .then(res => {
        res.forEach(e => {
            result.push(...e)
        })
    })
    result = sortAndSplice(result)
    res.status(200).send({
        data: result
    })
})

function sortAndSplice(tab) {
    tab.sort((a, b) => {
        return(a.price - b.price)
    })
    return tab.slice(0, 50)
}

async function  csvTransform(data) {
    return await csvtojson()
        .fromString(data)
        .then(json => { 
            return json
        })
}

function    addProviderAndClean(providerName, data) {
    if (providerName == 'AIR_JAZZ') {
        data.forEach(e => {
            e.departure_time = e.dtime
            e.arrival_time = e.atime
            delete e.dtime
            delete e.atime
        })
    }
    if (providerName == 'AIR_BEAM') {
        data.forEach(e => {
            e.price = parseFloat(e.p)
            e.departure_time = e.departure
            e.arrival_time = e.arrival
            delete e.p
            delete e.departure
            delete e.arrival
        })
    }
    data.forEach(e => {
        e.provider = providerName
        delete e.id
    })
    return data;
}

async function getDataExternalAPI(apiKey, url) {
    return await axios({
        method: 'get',
        url: url,
        headers: {
            'X-API-Key': apiKey
        }
    }).then(async (res) => {
        console.log("API response status", res.status, "url", url)
        let tab = []
        if (url == urlAirJazz) {
            tab = addProviderAndClean('AIR_JAZZ', res.data) 
        }
        if (url == urlAirMoon) {
            tab = addProviderAndClean('AIR_MOON', res.data) 
        }
        if (url == urlAirBeam) {
            tab = await csvTransform(res.data)
            tab = addProviderAndClean('AIR_BEAM', tab) 
        }
        return tab
    }).catch(e => {
        console.log('Api request is not working, error code', e.response.status)
        return([])
    })
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})