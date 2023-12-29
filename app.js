const app = require("express")()

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/static/html/index.html")
})
app.get("/static/*", function(req, res) {
    res.sendFile(__dirname + req.originalUrl)
})


app.listen(3000, function() {
    console.log("Listening")
})