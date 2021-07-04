import express, { Application, NextFunction, Request, Response }  from "express";

const app: Application = express();

app.get('/', (req: Request, response: Response, next: NextFunction) => {
    response.send('Hello');
});

app.listen(3000, () => { console.log('Server running') });