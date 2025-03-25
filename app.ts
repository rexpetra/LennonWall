import express from 'express';
import expressSession from 'express-session';
import path from 'path';

const app = express()

app.use(
    expressSession({
        secret: 'I love TypeScipt',
        resave: true,
        saveUninitialized: true,
    }),
)

// let lastID: string | null = null;

// app.use((req, res, next) => {
//     if (lastID === req.session.id) {
//         res.status(404);
//         res.sendFile(path.resolve('./public/404.html'))
//     } else {
//         lastID = req.session.id
//         next()
//     }
// })

declare module 'express-session' {
    interface SessionData {
        counter?: number
    }
}

app.use((req, _, next) => {
    if (!req.session.counter) {
        req.session.counter = 1;
    } else {
        // req.session.counter += 1;
        req.session.counter++;
    }

    console.log(`Counter value: ${req.session.counter}`)
    const time = new Date()
    console.log(`[${time.toLocaleString()}] Request ${req.path}`)
    next()
})

app.use(express.static("./public"))

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.resolve('./public/404.html'))
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`listening on Port: ${PORT}`)
})
