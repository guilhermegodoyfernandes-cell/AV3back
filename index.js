// npm init

// npm i dotenv
const dotenv = require("dotenv")
dotenv.config()

// npm i express

// http://localhost:3000​/cliente

const express = require("express")
const app = express()
const port = process.env.API_PORT
app.use(express.json())

// npm i mysql2
const db = require("./db")

// npm i bcrypt
const bcrypt = require("bcrypt")

// npm i jsonwebtoken
const jwt = require("jsonwebtoken")

// npm i cors
const cors = require("cors")
app.use(cors())

const path = require("path")
app.use("/img", express.static(path.join(__dirname, 'img')))
// http://localhost:3000/img/1/1.jpg

// CADASTRAR CLIENTE
app.post("/cliente", async (req, res) => {
    try {
        const cliente = req.body

        const senhaCript = bcrypt.hashSync(cliente.senha, 10)
        cliente.senha = senhaCript

        const resultado = await db.pool.query(
            `INSERT INTO cliente (
                nome, cpf, celular, email, senha
            ) VALUES (?, ?, ?, ?, ?)`,
            [
                cliente.nome,
                cliente.cpf,
                cliente.celular,
                cliente.email,
                cliente.senha
            ]
        )

        res.status(201).json({
            msg: "Cliente cadastrado, ID = " + resultado[0].insertId
        })

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

app.post("/login", async (req,res) => {
    try { 
        const user = req.body
        const resultado = await db.pool.query(
            "SELECT id, nome, email, senha FROM cliente WHERE email = ?", [user.email]
        )
        const dados_bd = resultado[0][0]
        if(!dados_bd) {
            return res.status(401).json({msg: "Email não cadastrado!"})
        }
        
        const senha_valida = await bcrypt.compare(user.senha, dados_bd.senha)

        if(!senha_valida) {
            return res.status(401).json({msg: "Credenciais inválidas!"})
        }
        const payload ={
            id: dados_bd.id,
            email: dados_bd.email
        }
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2m'})
        return res.status(200).json({nome: dados_bd.nome, token: token})
        
    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})


// CONSULTAR TODOS OS CLIENTES
app.get("/cliente", async (req, res) => {
    try {

        const resultado = await db.pool.query(
            "SELECT * FROM cliente"
        )

        res.status(200).json(resultado[0])

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

// CONSULTAR UM CLIENTE ESPECÍFICO
app.get("/cliente/perfil", autenticar, async (req, res) => {
    try {

        const id = req.usuario.id

        const resultado = await db.pool.query(
            "SELECT * FROM cliente WHERE id = ?",
            [id]
        );
    
        if (resultado[0].length === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        }
        
        const perfil = resultado[0][0]
        // delete perfil.senha

        res.status(200).json(perfil)

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

// ALTERAR CLIENTE
app.put("/cliente/:id", async (req, res) => {
    try {

        const id = req.params.id
        const cliente = req.body

        const senhaCript = bcrypt.hashSync(cliente.senha, 10)

        const resultado = await db.pool.query(
            `UPDATE cliente
             SET nome = ?,
                 cpf = ?,
                 celular = ?,
                 email = ?,
                 senha = ?
             WHERE id = ?`,
            [
                cliente.nome,
                cliente.cpf,
                cliente.celular,
                cliente.email,
                senhaCript,
                id
            ]
        )

        if (resultado[0].affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        }

        res.status(200).json({
            mensagem: "Cliente alterado com sucesso"
        })

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

// EXCLUIR CLIENTE
app.delete("/cliente/:id", async (req, res) => {
    try {

        const id = req.params.id

        const resultado = await db.pool.query(
            "DELETE FROM cliente WHERE id = ?",
            [id]
        )

        if (resultado[0].affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        }

        res.status(200).json({
            mensagem: "Cliente excluído com sucesso"
        })

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

// CONSULTAR PRODUTOS (busca, filtros, ordenação e paginação)
app.get("/produto", async (req, res) => {
    try {
        let sql = "SELECT * FROM produto WHERE 1=1"
        const params = []

        // Query Parameters
        const {
            busca,
            ordenacao,
            categoria,
            preco_min,
            preco_max,
            pagina
        } = req.query

        // Filtro de busca por nome
        if (busca) {
            sql += " AND nome LIKE ?"
            params.push(`%${busca}%`)
        }

        // Filtro por categoria
        if (categoria) {
            sql += " AND categoria = ?"
            params.push(categoria)
        }

        // Filtro por preço mínimo
        if (preco_min) {
            sql += " AND preco >= ?"
            params.push(preco_min)
        }

        // Filtro por preço máximo
        if (preco_max) {
            sql += " AND preco <= ?"
            params.push(preco_max)
        }

        // Ordenação por menor ou maior preço
        let orderBy = " ORDER BY id ASC"
        if (ordenacao) {
            const ordem = String(ordenacao).toLowerCase()
            if (ordem === "maior preco" || ordem === "maior_preco" || ordem === "desc") {
                orderBy = " ORDER BY preco DESC"
            } else if (ordem === "menor preco" || ordem === "menor_preco" || ordem === "asc") {
                orderBy = " ORDER BY preco ASC"
            }
        }
        sql += orderBy

        // Paginação: quantidade fixa de 10 produtos por página
        const limite = 10
        let paginaAtual = parseInt(pagina)
        if (isNaN(paginaAtual) || paginaAtual < 1) {
            paginaAtual = 1
        }
        const offset = (paginaAtual - 1) * limite

        sql += " LIMIT ? OFFSET ?"
        params.push(limite, offset)

        const resultado = await db.pool.query(sql, params)
        res.status(200).json(resultado[0])
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})

app.get("/produto/:id", async (req, res) => {
    try {
        // Path Parameter
        const id = req.params.id
        const resultado = await db.pool.query("SELECT * FROM produto WHERE id = ?", [id])
        const produto = resultado[0][0]
        res.status(200).json(produto)
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})

// CADASTRAR COMPRA
app.post("/compra", autenticar, async (req, res) => {
    let connection
    try {
        const compra = req.body
        const produtos = compra.produtos

        if (!Array.isArray(produtos) || produtos.length === 0) {
            return res.status(400).json({
                msg: "Informe ao menos um produto na compra"
            })
        }

        const ids = produtos.map(item => Number(item.id))
        if (new Set(ids).size !== ids.length) {
            return res.status(400).json({
                msg: "Não é possível repetir produtos na mesma compra"
            })
        }

        if (!compra.idEndereco && !compra.endereco) {
            return res.status(400).json({
                msg: "Informe idEndereco ou os dados de endereco"
            })
        }

        if (!compra.forma_pagamento) {
            return res.status(400).json({
                msg: "Informe a forma de pagamento"
            })
        }

        connection = await db.pool.getConnection()
        await connection.beginTransaction()

        let id_endereco = compra.idEndereco

        if (!id_endereco && compra.endereco) {
            const endereco = compra.endereco

            if (!endereco.numero || !endereco.rua || !endereco.bairro || !endereco.cidade || !endereco.estado) {
                throw erro_validacao("Dados de endereço incompletos", 400)
            }

            const resultado_endereco = await connection.query(
                `INSERT INTO endereco (
                    idCliente, numero, rua, bairro, cidade, estado
                ) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    req.usuario.id,
                    endereco.numero,
                    endereco.rua,
                    endereco.bairro,
                    endereco.cidade,
                    endereco.estado
                ]
            )

            id_endereco = resultado_endereco[0].insertId
        }

        const resultado_produtos = await connection.query(
            "SELECT id, preco, quantidade FROM produto WHERE id IN (?)",
            [ids]
        )
        const produtos_bd = resultado_produtos[0]

        if (produtos_bd.length !== ids.length) {
            throw erro_validacao("Um dos produtos da compra não foi encontrado", 404)
        }

        let valor_total = 0

        for (const item of produtos) {
            const produto_bd = produtos_bd.find(p => p.id === Number(item.id))
            const quantidade = Number(item.quantidade)

            if (isNaN(quantidade) || quantidade < 1) {
                throw erro_validacao("Quantidade inválida para o produto " + item.id, 400)
            }

            if (produto_bd.quantidade < quantidade) {
                throw erro_validacao("Estoque insuficiente para o produto " + item.id, 400)
            }

            valor_total += Number(produto_bd.preco) * quantidade
        }

        const resultado_compra = await connection.query(
            `INSERT INTO compra (
                idCliente, idEndereco, data, forma_pagamento, valor_total
            ) VALUES (?, ?, ?, ?, ?)`,
            [
                req.usuario.id,
                id_endereco,
                new Date(),
                compra.forma_pagamento,
                valor_total
            ]
        )

        const id_compra = resultado_compra[0].insertId

        for (const item of produtos) {
            const produto_bd = produtos_bd.find(p => p.id === Number(item.id))
            const quantidade = Number(item.quantidade)

            await connection.query(
                `INSERT INTO produtocompra (
                    idproduto, idcompra, quantidade, valor_unitario
                ) VALUES (?, ?, ?, ?)`,
                [
                    produto_bd.id,
                    id_compra,
                    quantidade,
                    produto_bd.preco
                ]
            )

            await connection.query(
                "UPDATE produto SET quantidade = quantidade - ? WHERE id = ?",
                [quantidade, produto_bd.id]
            )
        }

        await connection.commit()

        res.status(201).json({
            msg: "Compra cadastrada, ID = " + id_compra,
            valor_total: valor_total
        })

    } catch (error) {
        if (connection) {
            await connection.rollback()
        }
        if (error.status) {
            return res.status(error.status).json({
                msg: error.message
            })
        }
        res.status(500).json({
            erro: error.message
        })
    } finally {
        if (connection) {
            connection.release()
        }
    }
})

// CONSULTAR COMPRAS DO USUÁRIO
app.get("/compra", autenticar, async (req, res) => {
    try {

        const id = req.usuario.id

        const resultado = await db.pool.query(
            `SELECT c.id, c.data, c.forma_pagamento, c.valor_total,
                    e.rua, e.numero, e.bairro, e.cidade, e.estado,
                    p.id AS idproduto, p.nome AS produto, p.caminho_img,
                    pc.quantidade, pc.valor_unitario
             FROM compra c
             INNER JOIN endereco e ON c.idEndereco = e.id
             INNER JOIN produtocompra pc ON c.id = pc.idcompra
             INNER JOIN produto p ON pc.idproduto = p.id
             WHERE c.idCliente = ?
             ORDER BY c.id DESC, p.id ASC`,
            [id]
        )

        res.status(200).json(resultado[0])

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

app.listen(port, () => {
    console.log("API rodando na porta " + port)
})

// https//:dontpad.com/backendapi
function autenticar(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return res.status(401).json({erro: "Token não enviado, usar Authorization Bearer <token>"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) return res.status(403).json({erro: "Token inválido"})
        req.usuario = usuario
        next()
    })   
}

function erro_validacao(msg, status) {
    const erro = new Error(msg)
    erro.status = status
    return erro
}
