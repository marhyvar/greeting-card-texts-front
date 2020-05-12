# Sanna - sovellus tervehdyskorttitekstien hallintaan

## Johdanto

Projektin aiheena on rakentaa sovellus, jolla käyttäjä voi organisoida tervehdyskorttitekstejä aihepiireittäin. Järjestelmä toteutetaan käyttämällä Vue.js-kehystä käyttöliittymän puolella ja Express.js-kehystä palvelinpuolella. Tietokantajärjestelmänä toimii PostgreSQL. Sovellus on julkaistu Heroku-alustalle ja löytyy osoitteesta:

https://greeting-card-texts.herokuapp.com/

## Järjestelmän määrittely

Sanna-sovellus on tarkoitettu käyttäjälle, joka tarvitsee tekstejä erityyppisiin tervehdyskortteihin. Sovelluksen avulla käyttäjä voi selata tervehdystekstejä teemoittain. Käyttäjä voi lisätä, muokata ja poistaa tekstejä. Lisäksi käyttäjä voi lisätä teemoja. 

## Käyttöliittymä

Käyttöliittymän päänäkymässä esitetään kaikki tekstit, joita voi suodattaa hakukentän avulla. Päänäkymästä on siirtymät lisäysnäkymiin sekä tervehdystekstin muokkausnäkymään. 


![käyttöliittymäkaavio](kuvat/kaavio.png)

## Tietokanta

![tietokantamalli](kuvat/tietokantamalli.png)

> ### _Tekstit_
> _Tekstit-taulu sisältää tervehdystekstit._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> id | int PK | Tekstin id
> teksti | varchar(500) |  Tervehdysteksti
> teema_id | int FK | Tekstin teema, viittaus [teemat](#Teemat)-tauluun

> ### _Teemat_
> _Teemat-taulu sisältää tervehdysteksteihin liittyvät teemat._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> teema_id | int PK | Teeman id
> teema | varchar(100) |  Teema

## Tekninen kuvaus

![tekninen kuvaus](kuvat/tekn_kuvaus.png)

Palvelin on toteutettu Node.js Express-sovelluskehyksellä, tietokantana toimii PostgreSQL ja asiakaskäyttöliittymä on toteutettu Vue.js-sovelluskehyksellä.

### Rajapinnan kuvaus

> Metodi | Url | Toiminto
> ------ | ------ | ------
> GET | api/v1/teemat | Hakee kaikki teemat
> GET | api/v1/teemat/:id/tekstit |  Hakee samaan teemaan kuuluvat tekstit
> POST | api/v1/teemat | Lisää uuden teeman
> GET | api/v1/tekstit | Hakee kaikki tekstit
> GET | api/v1/tekstit/:id | Hakee tekstin id:llä
> POST | api/v1/tekstit | Lisää uuden tekstin
> PUT | api/v1/tekstit/:id | Muokkaa tekstiä
> DELETE | api/v1/tekstit/:id | Poistaa tekstin

[Linkki palvelinrepositoryyn](https://github.com/marhyvar/greeting-card-texts-api)


## Asennustiedot

### Järjestelmän kehitysympäristö 

Lataa ja asenna [Git](https://git-scm.com/downloads), [VisualStudioCode](https://code.visualstudio.com/), [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), [Node](https://nodejs.org/en/download/) ja tämän jälkeen [VueCLI](https://cli.vuejs.org/):
```
npm install -g @vue/cli
```
Kloonaa projekti:
```
git clone https://github.com/marhyvar/greeting-card-texts-front.git
```
```
cd greeting-card-texts-front
```
Asenna riippuvuudet:
```
npm install
```
Käynnistä sovellus:
```
npm run serve
```

### Tuotantoympäristöön (Herokuun) julkaiseminen

Projektissa on käytössä yksinkertainen Express-palvelin:
```
npm install express serve-static
```
Tiedostossa server.js on määritelty sovelluksen polut seuraavanlaisesti:
```javascript
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`Palvelin kuulolla portissa: ${port}`)
```
Tiedoston package.json skriptit, jotta Heroku tietää, miten palvelin käynnistetään:
```javascript
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "start": "node server.js" 
  },
```
Hanki [Heroku-tili](https://signup.heroku.com/) ja lataa sekä asenna [Heroku-CLI](https://devcenter.heroku.com/articles/heroku-cli). Tarkemmat ohjeet Node-projektien julkaisemisesta [täällä](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

Luo uusi projekti Herokuun, lisää projektille heroku remote repository ja pushaa koodi sinne:
```
git remote add heroku <projektin_url>
```

```
git push heroku master
```

## Käynnistys- ja käyttöohje

Sovelluksen käynnistys:
```
npm run serve
```
Avaa selaimessa http://localhost:8080

## Käytetyt lähteet

[Intro to Vue.js](https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance)

[Single file components](https://medium.com/js-dojo/vue-js-single-file-components-vue-cli-and-example-of-how-to-build-reusable-components-cf0991adbc2f)

[Vue + Express + PostgreSQL](https://bezkoder.com/vue-node-express-postgresql/)

[Deploying your Vue apps to Heroku -the right way!](https://medium.com/binarcode/deploying-vue-apps-to-heroku-the-right-way-26b11c1ae5cd)

[Deploy Vue app on Heroku](https://www.codementor.io/@ravianand1988/easily-4-steps-to-continuous-delivery-auto-deploy-vue-js-app-on-heroku-xljk977pq)

