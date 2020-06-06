const express = require("express")
const server = express()

// Configurando pasta publica
server.use(express.static("public"))

// Utilizando template engine
const nunJucks = require("nunjucks")
nunJucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurações de rotas
// index
server.get("/", (req, res) => {
    return res.render("index.html")
} )

// Create-point
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
} )

// Search-results
server.get("/search", (req, res) => {
    return res.render("search-results.html")
} )

// Ligar servidor
server.listen(3000)