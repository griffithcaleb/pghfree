const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Event = require('../models/events.js')
const UserEvent = require ('../models/userEvent.js')
const data = require('../models/seedData.js')
const moment = require('moment')
//logout button
router.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
  })

//index for app
 router.get('/',(req,res) => {
   if(req.session.currentUser){
     res.render('./app/pghindex.ejs')
   }else{res.redirect('/sessions/new')}
 })

//get index of scraped events

router.get('/events', (req, res)=>{
    if(req.session.currentUser){
      Event.
find({
}).
sort({ date: 1 }).
exec((err,foundEvents) => {
   res.render('./app/events.ejs',{
     events:foundEvents
   });
});
} else{res.redirect('/sessions/new')}
})

//get index of user created events
router.get('/userevents', (req, res)=>{
    if(req.session.currentUser){
      UserEvent.
find({
}).
sort({ date: 1 }).
exec((err,foundEvents) => {
   res.render('./app/userevents.ejs',{
     events:foundEvents,

   });
});
} else{res.redirect('/sessions/new')}
})

//show route for admin events
router.get('/events/:id', (req, res)=>{
  if(req.session.currentUser){
    Event.findById(req.params.id, (err, foundEvent)=>{
        res.render('./app/pgheventshow.ejs',{
          event:foundEvent
        });
    });
  } else {res.redirect('/sessions/new')}
});

//seed data from eventbrite
  router.get('/seed',(req,res) => {
    // login needed
    Event.create(data,(err,data) => {
      console.log(data);
    })
  })


//new route for app
router.get('/userevents/new',(req,res) => {
  if(req.session.currentUser){
      res.render('./app/new.ejs');
  } else {
      res.redirect('/sessions/new');
  }
})


//create

router.post('/userevents/new',(req,res) => {
if(req.session.currentUser){
  console.log(req.body.date);
  UserEvent.create(req.body,(err,createdEvent) => {



    res.redirect('/pghfree/userevents')
  })
} else{res.redirect('/sessions/new')}
})




//show
router.get('/userevents/:id', (req, res)=>{
  if(req.session.currentUser){
    UserEvent.findById(req.params.id, (err, foundEvent)=>{
        res.render('./app/usereventshow.ejs',{
          event:foundEvent
        });
    });
  } else {res.redirect('/sessions/new')}
});






//delete
router.delete('/userevents/:id',(req,res) => {
  if(req.session.currentUser){
  UserEvent.findByIdAndRemove(req.params.id,(err,data) => {
      res.redirect('/pghfree/userevents')
  })
} else {res.redirect('/sessions/new')}
})

// edit

router.get('/userevents/:id/edit', (req, res)=>{
  if(req.session.currentUser){
    UserEvent.findById(req.params.id, (err, foundEvent)=>{
        res.render(
    		'./app/pghedit.ejs',
    		{
    			event: foundEvent
    		}
    	);
    });
  } else {res.redirect('/sessions/new')}
});

//put


router.put('/usersevents/:id', (req, res)=>{
  if(req.session.currentUser){
    UserEvent.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/pghfree/userevents');
    });
  } else {res.redirect('/sessions/new')}
});



module.exports = router
