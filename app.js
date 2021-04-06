

const express = require('express')
const app = express()


const fs = require('fs')
const PORT = 8000

app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

// http://localhost:8000
app.get('/', (req, res) => {
    fs.readFile('./data/bottom.json', (err, data) => {
        if (err) throw err

        const bottom = JSON.parse(data)

        res.render('home', { bottom: bottom })
    })
})

app.post('/add', (req, res) => {
    const formData = req.body

    if (formData.text.trim() == '') {
        fs.readFile('./data/bottom.json', (err, data) => {
            if (err) throw err

            const bottom = JSON.parse(data)

            res.render('home', { error: true, bottom: bottom })
        })
    } else {
       fs.readFile('./data/bottom.json', (err, data) => {
           if (err) throw err

           const bottom = JSON.parse(data)

           const text = {
               id: id(), 
               description: formData.text,
               done: false
           }

           bottom.push(text)

           fs.writeFile('./data/bottom.json', JSON.stringify(bottom), (err) => {
               if (err) throw err

               fs.readFile('./data/bottom.json', (err, data) => {
                   if (err) throw err

                   const bottom = JSON.parse(data)

                   res.render('home', { success: true, bottom: bottom })
               })
           })
       })
    }
})

app.listen(PORT, (err) =>{
    if (err) throw err

    console.log('This app is running on port ${ PORT }')
})


function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }