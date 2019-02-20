var express = require('express')
var router = express.Router()

router.get('/',(req,res)=>{
  res.send('get Route on things')
})
router.post('/',(req,res)=>{
  res.send('post Route on things')
})

module.exports = router
