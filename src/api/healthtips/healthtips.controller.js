const { response } = require('express')
const {
  createHealthTips,
  getHealthTips,
  updateHealthTips,
  deleteHealthTips,
  getHealthTipsById,
  getHealthtipsTags,
  getNextHealthTipId,
  getPrevHealthTipId,
} = require('./healthtips.service')

const moment = require('moment')

var authToken = require('../../auth/token_validation')
const { getAllTags, createTags } = require('../tags/tags.service')

module.exports = {
  createHealthTips: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.htDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    createHealthTips(body, (error, resultOfHealthtip) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      getAllTags(body, (error, resultFromTable) => {
        if (error) {
          return res.status(200).json({
            success: 0,
            message: 'Database connection error',
            error: error,
          })
        } else {
          let tagsFromRes = JSON.parse(body.htTags)
          let tagsFromTable = []
          resultFromTable.map((item) => {
            tagsFromTable.push(item.name)
          })
          let uniqueTags = tagsFromRes.filter(function (obj) {
            return tagsFromTable.indexOf(obj) == -1
          })

          let multiTagsWithData = []

          uniqueTags.length > 0 &&
            uniqueTags.map((item) => {
              multiTagsWithData.push({
                name: item,
              })
            })
          let tagArray = multiTagsWithData.map((data) => {
            return new Promise((resolve, reject) => {
              data.created_by = 0
              data.updated_by = 0
              data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
              data.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
              createTags(data, (error, result) => {
                if (error) {
                  reject(error)
                }
                resolve(result)
              })
            })
          })

          Promise.all(tagArray)
            .then(function (results) {
              console.log('resultsoftag', results)
            })
            .catch(function (error) {
              console.log('rerrorsoftag', error)
            })
        }
      })
      return res.status(200).json({
        success: 1,
        data: resultOfHealthtip,
      })
    })
  },
  getHealthTips: (req, res) => {
    getHealthTips(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (!results) {
        return res.status(200).json({
          success: 0,
          message: 'Records not found',
        })
      }
      return res.json({
        success: 1,
        data: results,
      })
    })
  },
  // getHealthtipsById: (req, res) => {
  //   const body = req.body
  //   const Id = req.params.id

  //   getHealthtipsById(req, (error, results) => {
  //     if (error) {
  //       return res.status(200).json({
  //         success: 0,
  //         message: 'Database connection error',
  //         error: error,
  //       })
  //     }
  //     if (!results) {
  //       return res.status(200).json({
  //         success: 0,
  //         message: 'Records not found',
  //       })
  //     }
  //     return res.json({
  //       success: 1,
  //       data: results,
  //     })
  //   })
  // },

  updateHealthTips: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateHealthTips(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      getAllTags(body, (error, resultFromTable) => {
        if (error) {
          return res.status(200).json({
            success: 0,
            message: 'Database connection error',
            error: error,
          })
        } else {
          let tagsFromRes = JSON.parse(body.htTags)
          let tagsFromTable = []
          resultFromTable.map((item) => {
            tagsFromTable.push(item.name)
          })
          let uniqueTags = tagsFromRes.filter(function (obj) {
            return tagsFromTable.indexOf(obj) == -1
          })

          let multiTagsWithData = []

          uniqueTags.length > 0 &&
            uniqueTags.map((item) => {
              multiTagsWithData.push({
                name: item,
              })
            })
          let medicineArray = multiTagsWithData.map((data) => {
            return new Promise((resolve, reject) => {
              data.created_by = 0
              data.updated_by = 0
              data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
              data.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
              createTags(data, (error, result) => {
                if (error) {
                  reject(error)
                }
                resolve(result)
              })
            })
          })

          Promise.all(medicineArray)
            .then(function (results) {
              console.log('resultsoftag', results)
            })
            .catch(function (error) {
              console.log('rerrorsoftag', error)
            })
        }
      })
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  deleteHealthTips: (req, res) => {
    const body = req.body
    const userId = req.params.id

    deleteHealthTips(userId, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  getHealthTipsById: (req, res) => {
    const body = req.body
    const healthTipId = req.params.id

    getHealthTipsById(healthTipId, (error, results) => {
      if (error) {
        console.log('rerr', error)
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getHealthtipsTags: (req, res) => {
    getHealthtipsTags(req, (error, results) => {
      if (error) {
        console.log('rerr', error)
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
        })
      }

      function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index)
      }

      let resulTags = []

      results.map((item) => {
        resulTags.push(JSON.parse(item.htTags))
      })

      var mergeArr = [].concat.apply([], resulTags)

      let uniqueArr = removeDuplicates(mergeArr)

      console.log('merged', uniqueArr)
      return res.status(200).json({
        success: 1,
        data: uniqueArr,
      })
    })
  },

  getNextHealthTipId: (req, res) => {
    const currentId = req.params.id

    getNextHealthTipId(currentId, (error, results) => {
      if (error) {
        console.log('rerr', error)
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getPrevHealthTipId: (req, res) => {
    const currentId = req.params.id

    getPrevHealthTipId(currentId, (error, results) => {
      if (error) {
        console.log('rerr', error)
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
}
