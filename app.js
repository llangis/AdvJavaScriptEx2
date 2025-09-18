import express from 'express';

const app = express();


app.get('', (req,res) => {
    res.send('Hello From Node');
}); 

app.get('/page2', (req, res) => {
    res.send(<h1>Hello from page 2</h1>);
});

app.get('/datetime', (req, res) => {
    const now = new Date();
    const html = `<h1 style="text-align:center;">The current date and time is: </h1>
    <p style="text-align center;">${now}</p>`;
    res.send(html);
});



app.get('/count/:x', (req, res) => {
    const countParam = parseInt(req.params.x);
    let html = 'The route parameter must be numeric';

    if(!isNaN(countParam)) {
        html = '<ul>';

        for(let i = 1; i <= countParam; i++) {
            html += `<li>${i}</li>`;

            html += '</ul>';
        }
        res.send(html);
    }
});

app.listen(3000, () => {
    console.log('Express listening to port 3000.');
    
});

