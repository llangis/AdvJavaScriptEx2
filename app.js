import express from 'express';

const app = express();


app.get('', (req,res) => {
    res.send('Hello From Node');
}); 

app.get('/page2', (req, res) => {
    res.send('<h1>Hello from page 2</h1>');
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

app.get('/count', (req,res) => {
    console.log(req.query);
const startAt = parseInt(req.query.startAt);
const countTo = parseInt(req.query.countTo);

let html ='';

if(!isNaN(startAt) && !isNaN(countTo)) {
    if(startAt >= countTo) {
html = '<h2 style="color:red">Backwards counting not supported</h2>';
    } else {
        html = `<h3>Number to start at ${startAt}</h3>`;
        html += `<h3>Counto ${countTo}</h3>`;

        html += '<ul>';

        for(let i = startAt; i <= countTo; i++) {
            html += `<li>${i}</li>`;
        }
        html += '</ul>';
    }
}


    res.end();
});

app.listen(3000, () => {
    console.log('Express listening to port 3000.');
    
});
const vehicles = [
    {
    id: 1,
    make: 'Jeep',
    model: 'Wrangler',
    description: 'Go anywhere',
    img: 'https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb25e46530b1e3d8e88cb10/stills_0640_png/MY2021/14720/14720_st0640_116.png',
    },
    {
        id: 2,
        make: 'Land Rover',
        model: 'Defender',
        description: 'Go anywhere in style',
        img: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/161973510117619813_7bcb68e7-8a52-402b-968e-cab8e92e7247_812x.jpg?v=1620341041',
    },
    {
        id: 3,
        make: 'Toyota',
        model: '4Runner',
        description: 'Go anywhere reliably',
        img: 'https://cars.usnews.com/pics/size/776x517/images/Auto/izmo/i159614327/2021_toyota_4runner_angularfront.jpg',
    },
];


app.get('/vehicles', (req, res) => {
  const id = parseInt(req.query.id);

  let html = '<h1>Vehicles</h1>';

  if (!isNaN(id)) {
    const vehicle = vehicles.find((v) => v.id === id);

    if (vehicle) {
      // show vehicle info
      html += `<h2>${vehicle.make} ${vehicle.model}</h2>`;
      html += `<div>The ${vehicle.make} ${vehicle.model} will ${vehicle.description}</div>
              <div><img src="${vehicle.img}" style="height:200px;" /></div>
              <a href="/vehicles">List</a>`;
    } else {
      html += `<h2 style="color:red">Vehicle Id: ${id} no found</h2><a href="/vehicles">back</a>`;
    }
  } else {
    html += '<h2>Available Vehicles</h2>';

    html += '<div>';

    vehicles.forEach((v) => {
      html += `<a href="/vehicles?id=${v.id}">${v.make} ${v.model}</a>
`;
    });
  }

  res.send(html);
});