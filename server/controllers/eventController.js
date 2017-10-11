var moment = require('moment');
var config = require('../../env.config.json');

var meetup = require('meetup-api')({
    key: process.env.MEETUP_KEY || config.meetup_api || ""
});




exports.findAllLIWeb = function(req, res) {

  var meetups = require('../data/li-web-meetups.json');

  var ids = ''
  
  meetups.forEach(function(meetup) {
    ids += meetup.meetup_id + ","
  });

  if(ids.length > 0) {
    ids = ids.substring(0, ids.length-1);
  }

  //console.log(ids);

meetup.getEvents({'group_id' : ids}, function(error,response) {
  if(error) {
    console.error(error);
  }

  res.send(response);
 });


};

function getTestEvents() {
  var eventsTest = require('../data/events-test.json');

  return eventsTest;
}

exports.findAllTests = function(req, res) {

  
  
 
  res.send(getTestEvents());
 

};


exports.fullCalendar = function(req, res) {

  console.log(req);
  
  var eventsList = getTestEvents().results;
  var calList = [];
  var calObj = {}
  eventsList.forEach(event => {
    calObj = {};
    calObj.title = event.name;
    calObj.start_unix = event.time;
    calObj.start = moment(event.time + event.utc_offset);
    calObj.url = event.event_url;
    calList.push(calObj);
  });

  res.send(calList);
}