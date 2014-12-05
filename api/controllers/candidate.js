

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
    !REQ._cv  || (candidate._cv = mongoose.Types.ObjectId(REQ.location));

   
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


      !REQ.userid  || (query._usuario = mongoose.Types.ObjectId(REQ.userid));      
      
   if(!REQ.userid)
          {
            res.send(500,'invalid params');
            return;
          }

      !REQ.candidateid  || (query._usuario = mongoose.Types.ObjectId(REQ.candidateid));      

// Use the Candidate model to find all candidate
    Candidate.find(query)
    .populate('_usuario')
    .exec(function (err, candidates) {
      if (err) {
        res.send(err);
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
  server.post(global.apiBaseUri + '/candidate/usuario/:userid', post);
  server.put(global.apiBaseUri + '/candidate/:candidateid', put);
  server.del(global.apiBaseUri + '/candidate/:candidateid', del);

};

module.exports = ctrlCandidate;