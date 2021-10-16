const Joi = require('joi');
const express = require ("express");

const app = express();

app.use(express.json());

const userDetails = [

{
    name: 'Stephen Hockey',
    age: '26',
    gender: 'Male',
    job: 'Designer',
    location: 'California, USA',
    id:1
},

{
    name: 'Maria Ogene',
    age: '22',
    gender: 'Female',
    job: 'UI/UX',
    location: 'Edo, Nigeria',
    id:2
},

{
    name: 'Philp Huntely',
    age: '30',
    gender: 'Male',
    job: 'Web developer',
    location: 'London, England',
    id:3
}
]

app.get('/userDetails', (req, res) => {
    res.status(200).send(userDetails);
});

app.get('/userDetails/:id', (req, res) => {
    const user = userDetails.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('user ID not found')
    res.status(200).send(user);
});

app.post('/userDetails/:id', (req, res) => {
    const newUser = [
        {
            name: 'Benedit Okey',
            age: '23',
            gender: 'Male',
            job: 'DevOps',
            location: 'Imo, Nigeria',
            id:4
        },
        
        {
            name: 'Juliet Austin',
            age: '20',
            gender: 'Female',
            job: 'UI/UX',
            location: 'Atalanta, USA',
            id:5
        }
    ]
    userDetails.push(newUser);
    res.status(200).send(newUser);

    const next = newUser.find(u => u.id === parseInt(req.params.id));
    if (!next) return res.status(404).send('user ID not found')
    res.status(200).send(next);    
})

app.delete('/userDetails/:id', (req, res) => {
    const newUser = userDetails.find(c => c.id === parseInt(req.params.id));
    if (!newUser) return res.status(404).send('user ID was not found')
    
    const index = userDetails.indexOf(newUser);
    userDetails.splice(index, 1);

    res.status(200).send(newUser);
});

app.put('/userDetails/:id', (req, res) => {
    const newUser = userDetails.find(c => c.id === parseInt(req.params.id));
    if (!newUser ) return res.status(404).send('The course with the given ID was not found')

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    
    newUser.age = req.body.age;
    res.send(newUser);
});

function validateCourse(newUser) {
    const schema = {
        age: Joi.string().max(3).required()
    };

    return Joi.validate(newUser, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));