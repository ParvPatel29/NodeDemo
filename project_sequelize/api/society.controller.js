const {
    create,
    getAll,
    getOne,
    update,
    deleteSocieties}=require('./society.service')

module.exports={
    create:(req,res)=>{
        console.log(req.body)
        const body = req.body
        create(body,(error,results)=>{
            if(error){
              return res.json({
                error:error,
                data:"database connection error"
              })
            }
            return res.status(200).json({
                data:results
            })
        })
    },
    getAll:(req,res)=>{
      const body = req.body
      getAll(body,(error,results)=>{
         if(error){
              return res.json({
                error:error,
                data:"database connection error"
              })
            }
            return res.status(200).json({
                data:results
            })
      })
    },
    getOne:(req,res)=>{
      const body = req.body
      getOne(body,(error,results)=>{
         if(error){
              return res.json({
                error:error,
                data:"database connection error"
              })
            }
            return res.status(200).json({
                data:results
            })
      })
    },
    update:(req,res)=>{
       const body = req.body
       update(body,(error,results)=>{
         if(error){
              return res.json({
                error:error,
                data:"database connection error"
              })
            }
            return res.status(200).json({
                data:results
            })
       })
    },
    deleteSocieties:(req,res)=>{
       const body = req.params.id
       deleteSocieties(body,(error,results)=>{
         if(error){
              return res.json({
                error:error,
                data:"database connection error"
              })
            }
            return res.status(200).json({
                data:results
            })
       })
    }
}