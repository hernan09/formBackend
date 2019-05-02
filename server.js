const expres=require('express')
const mongose=require('mongoose')
const bodyParser=require('body-parser')
const path=require('path')
const morgan =require('morgan')

const usuario =require('./schema')


const app=expres()

const port=process.env.PORT || 4000

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader('Content-Type', 'application/json')

  next()
})
app.use(expres.static(path.join(__dirname,'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
mongose.connect('mongodb://localhost:27017/usuarios', { useNewUrlParser: true },(err)=>{
  if(err) console.log(err)

  console.log('conected db')

  app.listen(port,(err)=>{
    if (err) console.log(err)

    console.log(`http:localhost:${port}`)
  })
})

app.post('/enviar',(req,res)=>{
 let usuario1=new usuario()
 usuario1.name=req.body.name,
 usuario1.img = req.body.img,
   


   usuario1.save((err,userSave)=>{
     if(err) res.status(500).send(err)

     res.status(200).send(userSave)
   })
})

app.get('/view',(req,res)=>{
     
  const { page,limit } = req.query;

  usuario.find({},{},{skip:limit*(page-1),limit:5},(err,usuarios)=>{
    if(err) res.status(500).send(err)
    if(!usuario)res.status(404).json({mesage:'not found'})

    res.status(200).send(usuarios)
   
  })
})

app.delete('/delete',(req,res)=>{
  let id=Number
  usuario.findOneAndDelete(id,(err,userDelete)=>{
    if (err) res.status(500).send(err)
    if (!usuario) res.status(404).json({ mesage: 'not delete' })
    res.status(200).send(userDelete)
  })
})