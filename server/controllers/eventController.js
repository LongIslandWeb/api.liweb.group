var moment = require('moment');
var config = require('../../env.config.json');

var meetup = require('meetup-api')({
    key: process.env.MEETUP_KEY || config.meetup_api || ""
});

//returns meetup ids as a CSV string 
function getMeetupIds() {
  var meetupObjects = require('../data/li-web-meetups.json');
  
  return meetupObjects.map(m => m.meetup_id).toString(); // "A,B,C"
}

//returns a promise which is an array of meetup events for the meetup groups supplied
//meetup groups are comma seperated list
function getMeetupEvents(meetupIDs) {

  return new Promise((resolve, reject) => {
    
    meetup.getEvents({'group_id' : meetupIDs}, function(error,response) {
      
      if(error) {
        reject(error);
      }

      resolve(response);
    });
  });
} 

//Loads All Meetup Events for the Meetup IDs 
exports.findAllMeetupEvents = function(req, res) {

  var meetupIDs = getMeetupIds();
  var eventsList = getMeetupEvents(meetupIDs);

  eventsList.then((response) => {
    res.json(response.results);
  });  
};

//Loads some test data
exports.findAllTestData = function(req, res) {

  var eventsTest = require('../data/events-test.json');

  res.json(eventsTest);
 
};


exports.findAllMeetupEventsFullCal = function(req, res) {

  var meetupIDs = getMeetupIds();
  var eventsList = getMeetupEvents(meetupIDs);

  eventsList.then((response) => {

    var calList = [];
    var calObj = {};
   
    response.results.forEach(event => {
      calObj = {};
      calObj.title = event.name;
      calObj.start_unix = event.time;
      calObj.start = moment(event.time + event.utc_offset);
      calObj.url = event.event_url;
      calList.push(calObj);
    });
    
    return calList;
    
  }).then((calList) => {
    res.json(calList);
  });

}