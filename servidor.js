// rota = comunicação entre front e back
// requisição 200 = cria um usuario
// requisição 201 = responde com o usuraio que foi criado

import express from 'express' // importando a biblioteca express

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express() // variavel app  utilizanod o express como função
app.use(express.json()) // garante que esta utilizando o json


app.post('/login', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) // responde com os usuarios - status 201 da requisição
})

app.put('/login/:id', async (req, res) => {

    console.log(req)

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) // responde com os usuarios - status 201 da requisição
})

app.delete('/login/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

app.get('/login', async (req, res) => { // criando uma rota (que devolve algo)
let users = []

if (req.query) {
    users = await prisma.user.findMany({
        where: {
            name: req.query.name,
            email: req.query.email,
            age: req.query.age
        }
    })
} else {

    users = await prisma.user.findMany()

    }

        res.status(200).json(users) // rota de listagem de usuarios - status 200 da requisição
    }) 

app.listen(3000) // qual a porta do computador ele ta rodando 