const express = require('express');
const { Subscriber } = require('../models/Subscriber');
const router = express.Router();

//=================================
//             subscribe
//=================================

router.post("/subscribeNumber",  (req, res) => {
    
    Subscriber.find({'userTo':req.body.userTo})
    .exec((err,subscribe)=>{
        if(err) return res.status(400).send(err)

        return res.status(200).json({success:true,subscribeNumber:subscribe.length})
    })
});

router.post("/subscribed",  (req, res) => {
    
    Subscriber.find({'userTo':req.body.userTo , 'useFrom':req.body.userFrom})
    .exec((err,subscribe)=>{
        if(err) return res.status(400).send(err)

        let result = false

        if(subscribe.length!==0){
            result = true
        }

        return res.status(200).json({success:true,subscribed : result})
    })
});


router.post("/unSubscribe",  (req, res) => {
    
    Subscriber.findOneAndDelete({'userTo':req.body.userTo , 'useFrom':req.body.userFrom})
    .exec((err,doc)=>{
        if(err) return res.status(400).json({success:false})
        
        return res.status(200).json({success:true,doc})
    })
});

router.post("/subscribe",  (req, res) => {
    const subscribe = new Subscriber(req.body)
    subscribe.save((err,doc)=>{
        if(err) return res.status(400).json({success:false,err})

        return res.status(200).json({success:true})
    })
    
});


module.exports = router;
