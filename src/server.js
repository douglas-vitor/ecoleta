const express = require("express")
const server = express()

// Resgatando BD
const db = require("./database/db")

// Configurando pasta publica
server.use(express.static("public"))

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))

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
    //console.log(req.query)
    return res.render("create-point.html")
} )

server.post("/savepoint", (req, res) => {
    // Inserir dados no BD
    const query = `
INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
) VALUES (?,?,?,?,?,?,?);
`

const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
]

function afterInsertData(err) {
    if(err) {
        console.log(err)
        return res.send("Erro no cadastro.")
    }
    console.log("Cadastrado com sucesso.")
    console.log(this)
    return res.render("create-point.html", {saved: true})

}
    db.run(query, values, afterInsertData)    

})

// Search-results
server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == "") {
        // Pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    // Pegar dados do BD
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length
        // Mostra a pagina html com os dados do BD
        return res.render("search-results.html", { places : rows, total: total})
    })

} )

// Ligar servidor
server.listen(3000)