const  Sequelize  = require('sequelize');
const sequelize = new Sequelize('db_sequelize','root','',{
    host:'localhost',
    dialect:'mysql'
})
 const user=sequelize.define('user',{
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING
})
const societies=sequelize.define('societies',{
      id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
        flatno:Sequelize.INTEGER,
        fname: Sequelize.STRING,
        lname: Sequelize.STRING,
        mobileno:Sequelize.INTEGER
})
sequelize.sync().then(()=>{
  console.log("Tables created in database successfully")
}).catch(err=>{
    console.log(err)
})
module.exports={
   user,
   societies
}

//module.exports=User