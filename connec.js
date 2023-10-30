const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
app.get('/', (req, res) => res.send('<h2> Hello World! </h2>'));
app.get("/makan", (req, res) => res.send("Udah Makan?"));
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))