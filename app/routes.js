var User = require('./models/user');
var Follow = require('./models/follow');
var async = require('async');
var _ = require('underscore');

module.exports = function(app) {
  var isLoggedin = function(req, res, next) {
    if (req.session && req.session.user) {
      next();
    } else res.send({error: 'unauthorized'}, 401);
  }

  app.get('/api', function(req,res) {
    res.send({'message': 'api is running', 'status': res.status});
  });

  app.get('/api/isloggedin', function(req, res) {
    console.log(req.session.user);
    if (req.session && req.session.user) {
      console.log('loggedin');
      res.send({data: 'loggedin'});
    } else {
      console.log('not logged in');
      res.send({data: 'not logged in'});
    }
  });

  app.post('/api/login', function(req, res) {
    if (!(req.session && req.session.user)) {
      User.findOne({username: req.body.username}, function(err, user) {
        if (err) res.send({error: err});
        else if (user) {
          req.session.user = user;
          res.send({data: 'done'});
        } else {
          res.send({error: 'unauthorized'}, 401);
        }
      });
    } else res.send({data: req.session.user});
  });

  app.post('/api/logout', function(req, res) {
    req.session.reset();
    res.send({data: 'logout'});
  });

  app.post('/api/register', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
      if (err) res.send({error: err});
      else if (user) {
        req.session.reset();
        req.session.user = user;
        res.send({data: 'login'});
      } else {
        var new_user = new User(req.body);
        new_user.save(function(err1) {
          if (err1) res.send({error: err1});
          else res.send({data: new_user});
        });
      }
    });
  });

  app.get('/api/users', function(req, res) {
    var query = req.query ? req.query : {};
    User.find(query, function(err, user) {
      if (!err) return res.send({'data': user});
      else res.send({error: err});
    });
  });

  app.get('/api/users/:user_id', function(req, res) {
    User.findOne({_id: req.params.user_id}, function(err, user) {
      if (!err) res.send({'data': user});
      else res.send({error: err});
    });
  });

  app.get('/api/users/:user_id/followers', function(req, res) {
    Follow.find({broadcaster: req.params.user_id}, function(err, follows) {
      if (!err) res.send({'data': follows});
      else res.send({error: err});
    });
  });

  app.get('/api/users/:user_id/followings', function(req, res) {
    Follow.find({follower: req.params.user_id}, function(err, follows) {
      if (!err) res.send({'data': follows});
      else res.send({error: err});
    });
  });

  app.put('/api/users/:user_id', isLoggedin, function(req, res) {
      var id = req.params.user_id;
      User.update(
        {_id: id},
        {
          $set: req.body
        }, function(err, s, data) {
          if (err) res.send({error: err});
          else res.send({'data': data});
        }
      );
    });

  app.post('/api/follows/:user_id', isLoggedin, function(req, res) {
    var follow = new Follow({
      follower: req.session.user._id,
      broadcaster: req.params.user_id
    });

    async.parallel([
      function(callback) {
        follow.save(function(err) {
          if (err) callback(err);
          else callback(null);
        });
      },
      function(callback) {
        User.update({_id: req.session.user._id},
          {
            $inc: {followings: 1}
          },
          function(err) {
            if (err) callback(err);
            else callback(null);
          });
      },
      function(callback) {
        User.update({_id: req.params.user_id},
          {
            $inc: {followers: 1}
          },
          function(err) {
            if (err) callback(err);
            else callback(null);
          });
      }
    ], function(err) {
      if (err) res.send({error: err});
      else res.send({data: follow});
    });
  });

  app.delete('/api/follows/:follow_id', isLoggedin, function(req, res) {
    async.parallel([
      function(callback) {
        Follow.remove({_id: req.params.follow_id}, function(err) {
          if (err) callback(err);
          else callback(null);
        });
      },
      function(callback) {
        User.update({_id: req.session.user._id},
          {
            $inc: {followings: -1}
          },
          function(err) {
            if (err) callback(err);
            else callback(null);
          });
      },
      function(callback) {
        User.update({_id: req.params.user_id},
          {
            $inc: {followers: -1}
          },
          function(err) {
            if (err) callback(err);
            else callback(null);
          });
      }
    ], function(err) {
      if (err) res.send({error: err});
      else res.send({data: "done"});
    });

  });

}
