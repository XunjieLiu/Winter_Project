const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('Hello world!!!')
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4]);
});

/*
app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params.id);
    // req.params: {"id":"4"} 
    res.send(req.query);
    // http://localhost:3000/api/courses/1?sortBy=name
    // {"sortBy":"name"}
});
*/

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if(!course){
        res.status(404).send('Not found');
    }
    res.send(course.name);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    // console.log(result);

    if(result.error){
        // 400 Bad request
        res.status(400).send("Name is not valid");
        return;
    }
    var new_id = courses.length + 1;
    const course = {
        id: new_id,
        name: req.body.name // 假定POST的方式是发送JSON格式数据，
        // 所以body会有name这个属性
    };
    courses.push(course);
    res.send(course);
    // res.send('The lenth is : ' + courses.length);
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));