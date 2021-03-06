const express = require('express');
const cors = require('cors');
const serveStatic = require("serve-static")
const path = require('path');
const app = express();
app.use(cors());

app.use(serveStatic(path.join(__dirname, 'dist')));
//pyyntöjen käsittely, jotka liittyvät muihin polkuihin:
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
});
const port = process.env.PORT || 8080;
app.listen(port);