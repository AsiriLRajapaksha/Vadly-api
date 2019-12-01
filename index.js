const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const gneres = [
    {id :1 , name: 'gneres1'},
    {id :2 , name: 'gneres2'},
    {id :3 , name: 'gneres3'}
];

app.get('/vidly.com/api/gneres' , (request ,response) => {
    response.send(gneres);
});

app.get('/vidly.com/api/gneres/:id' , (request , response ) => {
    const gnere = gneres.find( c => c.id === parseInt(request.params.id));
    if(!gnere) return response.status(404).send('Not Found');

    response.send(gnere);
});

app.post('/vidly.com/api/gneres' , (request , response) => {
    const { error } = gneresValidation(request.body);
    if(error) return response.status(400).send(error.details[0].message);

    gnere = {
        id : gneres.length + 1,
        name : request.body.name  
    };
    
    gneres.push(gnere);
    response.send(gneres);
});

app.put('/vidly.com/api/gneres/:id' , (request , response) => {
    const gnere = gneres.find( c => c.id === parseInt(request.params.id) );
    if(!gnere) return response.status(404).send('Not Found');

    const { error } = gneresValidation(request.body);
    if(error) return response.status(400).send(error.details[0].message);

    gnere.name = request.body.name;
    response.send(gnere);

    // const gnere = gneres.find( c => c.id === parseInt(request.params.id) );
    // if(!gnere) return response.status(404).send('Not Found');

    // const {error} = gneresValidation(request.body)
    // if(error) return response.status(400).send(error.details[0].message);

    
    // gnere.name = request.body.name;
    // response.send(gnere);
});

function gneresValidation(gnere){
    const schema = { name :Joi.string().min(3).required()};

    return Joi.validate( gnere , schema );
}

const port = process.env.PORT || 3000 ;
app.listen(port , () => { console.log(`Listing on port ${port}`)});

