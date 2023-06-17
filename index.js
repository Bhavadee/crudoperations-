const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

const Schema = mongoose.Schema;
const dataSchema = new Schema({
  username: String,
  password: String
});

const Data = mongoose.model('Data', dataSchema);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/insert.html');
    
})
app.get('/show', (req, res) => {
    res.sendFile(__dirname + '/public/show.html');    
})
app.get('/updatee', (req, res) => {
    res.sendFile(__dirname + '/public/updatee.html');    
})
app.get('/delete', (req, res) => {
    res.sendFile(__dirname + '/public/delete.html');    
})

app.post('/submit', async (req, res) => {
    const { username, password } = req.body;
    const newData = new Data({
      username,
      password
    });
    console.log(newData);
      await newData.save();
      res.sendFile(__dirname + '/home.html');
  });
  app.post("/list",async (req,res) =>{
    let data = await Data.find();
    res.send(data);
})
app.post("/dele",async (req,res) =>{
  let data = await Data.findOneAndDelete({ username:req.body.username});
  res.send("deleted");
});

app.post("/updatee",async (req,res) =>{
  let data = await Data.findOneAndUpdate(
      { username: req.body.username }, 
      { password: req.body. password},
      { new: true }
    );
res.send("updated");
});
const port = 9930;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});