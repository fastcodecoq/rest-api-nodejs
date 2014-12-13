

var ctrlCandidate = function (server) {

  // Load required packages
  var Candidate = require('../models/candidate');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Candidate model
    var candidate = new Candidate;

// Set the candidate properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    !REQ.userid  || (candidate._usuario = mongoose.Types.ObjectId(REQ.userid));
    !REQ.location  || (candidate.location = REQ.location);
    !REQ._cv  || (candidate._cv = mongoose.Types.ObjectId(REQ.cv));
    !REQ.active  || (candidate.active = mongoose.Types.ObjectId(REQ.active));

   
    console.log(candidate);    

// Save the candidate and check for errors
    candidate.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'Candidate added', data: candidate});
    });
  }


  function get(req, res) {

// Use the Candidate model to find a specific candidate
     var query = {};
     var REQ = req.params;


      !REQ.candidateid  || (query._id = mongoose.Types.ObjectId(REQ.candidateid));      

      !REQ.usuarioid  || (query._usuario = mongoose.Types.ObjectId(REQ.usuarioid));      

// Use the Candidate model to find all candidate
    Candidate.find(query)
    .populate('_usuario _cv')
    .exec(function (err, candidates) {
      if (err) {
        res.send(err);
        return;
      }

      if(candidates.length === 0)
      {
        res.send(200,{message:'Not records found'});
        return;        
       }

      res.json({data:candidates});
    });

  }



  function put(req, res) {

    var data = {};
    var REQ = req.params;
    
    !REQ.userid  || (data._usuario = mongoose.Types.ObjectId(REQ.userid));          
    !REQ._cv  || (data._cv = mongoose.Types.ObjectId(REQ.cv));          
    !REQ.active  || (data.active = mongoose.Types.ObjectId(REQ.active));


   if(!REQ.userid)
          {
            res.send(500,'invalid params');
            return;
          }

// Use the Candidate model to find a specific candidate
    Candidate.update({    
      _usuario: mongoose.Types.ObjectId(REQ.userid),
      _id: mongoose.Types.ObjectId(REQ.candidateid)
    }, data, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Candidate model to find a specific candidate and remove it
    Candidate.remove({_id: mongoose.Types.ObjectId(req.params.candidateid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Candidate removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/candidate/:candidateid', get);    
  server.get(global.apiBaseUri + '/candidate', get);    
  server.get(global.apiBaseUri + '/candidate/usuario/:userid', get);
  server.post(global.apiBaseUri + '/candidate/usuario/:userid', post);
  server.put(global.apiBaseUri + '/candidate/:candidateid', put);
  server.del(global.apiBaseUri + '/candidate/:candidateid', del);

};

module.exports = ctrlCandidate;