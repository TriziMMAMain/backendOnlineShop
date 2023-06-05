// file system

// const fs = require('fs')

// ------ СОЗДАНИЕ ФАЙЛА + ЧТЕНИЕ

// let result = fs.readFileSync('src/some.txt', 'utf-8')
// fs.writeFileSync('src/some.txt', result + 'Hello')
// fs.writeFileSync('src/some.txt', 'Hello')

// fs.readFile('src/some.txt', 'utf-8', (err, data) => {
//     fs.writeFile('src/some.txt', data + '\nSome text', (err, data) => {
//         console.log(`ok, ${err}, ${data}`)
//     })
// })

// ------ СОЗДАНИЕ ПАПКИ + УДАЛЕНИЕ

// fs.mkdirSync('src/text_files')

// fs.mkdir('src/text_files', () => {
//     fs.writeFile('src/text_files/some.txt', 'Hello!', () => console.log(`ok`))
// })

// fs.unlink('src/text_files/some.txt', () => {
//     fs.rmdir('src/text_files', () => {})
// })


// ------------------ СОЗДАНИЕ СЕРВЕРА

// --- БЕЗ HTML

// const http = require('http')
//
// let server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8',})
//     res.end('Hello NODE JS')
// })
//
// const PORT = 9000
// const HOST = 'localhost'
//
// server.listen(PORT, HOST, () => {
//     console.log(`Good: http://${HOST}:${PORT}`)
// })

// --- С HTML

// const http = require('http')
//
// let server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8',})
//     res.end(`<!doctype html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport"
//           content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>NODE JS</title>
// </head>
// <body>
// <div class="asd">
//   <h1 class="asdff">Hello</h1>
// </div>
// </body>
// </html>`)
// })
//
// const PORT = 9000
// const HOST = 'localhost'
//
// server.listen(PORT, HOST, () => {
//     console.log(`Good: http://${HOST}:${PORT}`)
// })

// --- Правильный HTML

// const http = require('http')
// const fs = require('fs')
//
// let server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
//
//     if (req.url === '/') {
//         const stream = fs.createReadStream('./src/template/index.html').pipe(res)
//     } else if (req.url === '/about') {
//         const stream = fs.createReadStream('./src/template/index2.html').pipe(res)
//     }
//
//
// })
//
// const PORT = 9000
// const HOST = 'localhost'
//
// server.listen(PORT, HOST, () => {
//     console.log(`Good: http://${HOST}:${PORT}`)
// })

// --- EXPRESS JS

// const express = require('express')
//
// const app = express()
//
// app.get('/', (req, res) => {
//     res.send('This home page')
// })
//
// app.get('/about', (req, res) => {
//     res.send('This about page')
// })
//
// const PORT = 9000
// const HOST = 'localhost'
//
// app.listen(PORT, () => {
//     console.log(`Server started: http://${HOST}:${PORT}/`)
// })

// ---

// const express = require('express')
//
// const app = express()
//
// app.get('/', (req, res) => {
//     res.send('This home page')
// })
//
// app.get('/about', (req, res) => {
//     res.send('This about page')
// })
//
// app.get('/user/:name/:id', (req, res) => {
//     res.send(`User ID: ${req.params.id}. Username: ${req.params.name}`)
// })
//
//
// const PORT = 9000
// const HOST = 'localhost'
//
// app.listen(PORT, () => {
//     console.log(`Server started: https://${HOST}:${PORT}/`)
// })





















