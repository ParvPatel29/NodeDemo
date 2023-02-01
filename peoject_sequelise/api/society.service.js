
const {societies} = require('../db_connect')


module.exports={
    create: (data,callback)=>{
        societies.create({
            id : data.id,
            flatno : data.flatno,
            fname : data.fname,
            lname : data.lname,
            mobileno:data.mobileno
        })
        .then(ans=>{
            callback(null,ans)
        })
        .catch(err=>{
            callback(err)
        })
    },
    getAll:(data,callback)=>{
       societies.findAll({
        })
        .then(ans=>{
            callback(null,ans)
        })
        .catch(err=>{
            callback(err)
        })
    },
    getOne:(data,callback)=>{
       societies.findOne({
            where:data.flatno
        })
        .then(ans=>{
            callback(null,ans)
        })
        .catch(err=>{
            callback(err)
        })
    },
    update:(data,callback)=>{
        updates={}
        if(data.fname)updates.fname=data.fname
        if(data.lname)updates.lname=data.lname
        if(data.mobileno)updates.mobileno=data.mobileno
        console.log(updates)
        societies.update(updates
        ,{where:{flatno:data.flatno}})
        .then(ans=>{
            callback(null,ans)
        })
        .catch(err=>{
            callback(err)
        })
    },
    deleteSocieties:(data,callback)=>{
       societies.destroy({where:{id:data}})
        .then(ans=>{
            callback(null,ans)
        })
        .catch(err=>{
            callback(err)
        })
    }
} 