const mongose =require('mongoose')
const Schema=mongose.Schema


let usuario = new Schema({
  name:{type:String},
  img:{type:String}
 

})

module.exports=mongose.model('usuario',usuario)