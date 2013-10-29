/*Functions for keeping the spreadsheet of each member's latest group meeting presentation date up to date, 
automatically signing people up, reminding the group about the upcoming meeting, and reminding presenters
if their event lacks a description

trigger settings:

planNextGroupMeeting -- during group meeting
overwriteDatesifNewerScraped -- shortly after group meeting
autoSignUp -- 3 days after group meeting
reminderIfNoDescription -- 2 days before group meeting
reminderEmail -- day before group meeting

autoSignUp checks each week if someone is signed up for the upcoming meeting.  If someone is signed up, it does nothing. If
no one is signed up, it attempts to sign someone up using the follow two arrays of presentation data:
List (A) = ranked list of most recent presentation dates.
List (B) = list of names of the next n<=no. group members who have signed up to present in the upcoming weeks

Procedure:
start at top of ranked list (A).  
is no. 1 of (A) also in (B)?
 if not, sign up
 if so, go to no. 2 of (A)
if everyone in (A) is in (B), don't sign anyone up.  that means everyone is signed up to present soon anyway.
*/
var month=new Array();
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";

var groupActivitiesCalid = "manoharan.deas.harvard.edu_27q2b011enc4fc22gpci004lus@group.calendar.google.com"
var autoSignUpSheetId="0AvcRW5U_a5stdFlfRnBodE5odlNHRWc3cGZsOGVJRXc"
var mostRecentDatesSheetId="0AvcRW5U_a5stdDVqU0pBYTdxT0pkYkRoNlN4c00tT1E"
var GMAMoreInfo="https://sites.google.com/a/manoharan.deas.harvard.edu/intranet/group-meeting"
var GMAsignature='\n\nBest,\nGMA (Group Meeting Automaton)\n'+GMAMoreInfo
  
var groupEmailAddresses=new Object();
groupEmailAddresses["Ben"]="wrogers@manoharan.deas.harvard.edu"
groupEmailAddresses["Becca"]="rperry@manoharan.deas.harvard.edu"
groupEmailAddresses["Jesse"]="jcollins@manoharan.deas.harvard.edu"
//groupEmailAddresses["Maddy"]="mcorbett@manoharan.deas.harvard.edu"
groupEmailAddresses["Tom"]="tdimiduk@manoharan.deas.harvard.edu"
groupEmailAddresses["Nick"]="nschade@manoharan.deas.harvard.edu"
groupEmailAddresses["Jerome"]="jfung@manoharan.deas.harvard.edu"
groupEmailAddresses["Jin-Gyu"]="jgpark@manoharan.deas.harvard.edu"
groupEmailAddresses["Sofia"]="sofia@manoharan.deas.harvard.edu"
groupEmailAddresses["Anna"]="annawang@manoharan.deas.harvard.edu"
groupEmailAddresses["Guangnan"]="gnmeng@manoharan.deas.harvard.edu"
//groupEmailAddresses["test"]="jcollins@manoharan.deas.harvard.edu"

var groupNames=new Array();
groupNames[0]="Ben";
groupNames[1]="Jesse";
groupNames[2]="Becca";
groupNames[3]="Guangnan"
groupNames[4]="Tom"
groupNames[5]="Nick"
groupNames[6]="Jerome"
groupNames[7]="Jin-Gyu"
groupNames[8]="Sofia"
groupNames[9]="Anna"
//groupNames[10]="test"
  
groupNames.sort()
/*groupNames[11]="Rebecca"
groupNames[12]="Madeleine"*/
  
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

  
function scrapeCalendarforLatestPresentationDates(xDaysPrior) {//Scrape the google calendar for the latest dates on it
  xDaysPrior = typeof xDaysPrior !== 'undefined' ? xDaysPrior : 365*2;//default ending date to two years prior to today
  var startDate, cal, d, day, eSum, eSumSubstring, events, groupActivitiesCalid, groupLatestDates, hasNames, i, ind, j, l, latest, month, n, s, tomorrow, year;
  groupActivitiesCalid = "manoharan.deas.harvard.edu_27q2b011enc4fc22gpci004lus@group.calendar.google.com";
  d = new Date();
  month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  n = month[d.getMonth()];
  year = d.getFullYear();
  day = d.getDate();
  tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  startDate = new Date();
  startDate.setDate(startDate.getDate() - xDaysPrior);
  groupLatestDates = new Object();
  i = 0;
  while (i < groupNames.length) {
    groupLatestDates[groupNames[i]] = "";
    i++;
  }
  cal = CalendarApp.getCalendarById(groupActivitiesCalid);
  events = cal.getEvents(startDate, tomorrow);
  hasNames = new Array();
  i = events.length - 1;
  while (i > 0) {
    eSum = events[i].getSummary();
    eSum = eSum.toUpperCase();
    s = "GROUP MEETING";
    l = s.length;
    ind = eSum.indexOf("GROUP MEETING");
    if (ind !== -1) {
      eSumSubstring = eSum.substr(ind + l + 1);
      if (eSumSubstring !== "") {
        j = 0;
        while (j < groupNames.length) {
          if (eSumSubstring.indexOf(groupNames[j].toUpperCase()) !== -1) {
            if (groupLatestDates[groupNames[j]] === "") {
              latest = events[i].getStartTime();
              groupLatestDates[groupNames[j]] = latest.getMonth()+1 + "/" + latest.getDate() + "/" + latest.getFullYear().toString();
            }
          }
          j++;
        }
      }
    }
    i--;
  }
  Logger.log(groupLatestDates);
  return groupLatestDates
};

function convertHashToNumArray(hash_array) {//a function that coverts a javascript hash array/object to a numeric array
var numeric_array = [];
for ( var item in hash_array ){
    numeric_array.push( [item,hash_array[ item ]] );
}
return numeric_array}

function convertNumToHashArray(num_array) {//needs work
  var hsh_array=Object();
  for (var item in num_array){hsh_array[num_array[item]]=item
  }
     return hsh_array}


function getNameDateAssociativeArray() {//load name:date pairs from spreadsheet into an object/associative array
 var sheet = SpreadsheetApp.openById("0AvcRW5U_a5stdDVqU0pBYTdxT0pkYkRoNlN4c00tT1E");
 var lastRow=sheet.getActiveSheet().getLastRow();
 var currentValues=sheet.getActiveSheet().getRange(1, 1, lastRow, 2).getValues();
 var hashNamesDates=Object();
 i = 0;
  while (i < lastRow) {
    hashNamesDates[currentValues[i][0]] = currentValues[i][1];
    i++;
  }
 Logger.log(hashNamesDates)
 return hashNamesDates
}

function scrapeLatestWritetoSheet(xDaysPrior) {//scrapes the calendar and writes the latest dates from that to the spreadsheet
  //Deprecated
  xDaysPrior = typeof xDaysPrior !== 'undefined' ? xDaysPrior : 365*2;
  var sheet = SpreadsheetApp.openById(mostRecentDatesSheetId);
  ld=scrapeCalendarforLatestPresentationDates();
  ldTable=convertHashToNumArray(ld)
  sheet.getActiveSheet().getRange(1,1,Object.size(ld),2).setValues(ldTable);
}

function overwriteDatesifNewerScraped() {/*compare two arrays of name:date pairs.  
  for example, let's say the automaton scrapes this past week's group meeting to update the spreadsheet. 
  it updates only the spreadsheet values of the people who presented this past week. O(N)
  */
  var mostRecentArray=[];
  var calND=scrapeCalendarforLatestPresentationDates(20);//latest name:dates from 20 days ago on calendar. why don't 7 or 10 work?
  var sheetND=getNameDateAssociativeArray();//latest name:dates from spreadsheet
  for (var item in calND) {//check each name in the name:date pairs from the calendar
    if (/\S/.test(calND[item])){//true if there is at least one non-whitespace character present in calND[item]
      calDate=new Date(calND[item])
        if (calDate>sheetND[item]){
          sheetND[item]=calDate;
  ndTable=convertHashToNumArray(sheetND);
  var sheet = SpreadsheetApp.openById(mostRecentDatesSheetId);
  sheet.getActiveSheet().getRange(1,1,Object.size(ndTable),2).setValues(ndTable);
    }
  }
}
}

function scrapeCalendarforPresentationDates(xDaysPrior,xDaysAhead) {//Scrape the google calendar for the latest dates on it
  xDaysPrior = typeof xDaysPrior !== 'undefined' ? xDaysPrior : 100*2;//default ending date to two years prior to today
  xDaysAhead = typeof xDaysAhead !== 'undefined' ? xDaysAhead : groupNames.length*7;//default ending date to n weeks where n=no. of presenters
  var startDate, cal, d, day, eSum, eSumSubstring, events, groupActivitiesCalid, groupLatestDates, hasNames, i, ind, j, l, latest, month, n, s, endDate, year;
  groupActivitiesCalid = "manoharan.deas.harvard.edu_27q2b011enc4fc22gpci004lus@group.calendar.google.com";
  d = new Date();
  var month=new Array();
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";
  n = month[d.getMonth()];
  year = d.getFullYear();
  day = d.getDate();
  endDate = new Date();
  endDate.setDate(endDate.getDate() + xDaysAhead);
  startDate = new Date();
  startDate.setDate(startDate.getDate() - xDaysPrior);
  groupLatestDates = new Object();
  i = 0;
  while (i < groupNames.length) {
    groupLatestDates[groupNames[i]] = "";
    i++;
  }
  cal = CalendarApp.getCalendarById(groupActivitiesCalid);
  events = cal.getEvents(startDate, endDate);
  hasNames = new Array();
  i = events.length - 1;
  while (i > 0) {
    eSum = events[i].getSummary();
    eSum = eSum.toUpperCase();
    s = "GROUP MEETING";
    l = s.length;
    ind = eSum.indexOf("GROUP MEETING");
    if (ind !== -1) {
      eSumSubstring = eSum.substr(ind + l + 1);
      Logger.log(eSumSubstring)
      if (eSumSubstring !== "") {
        j = 0;
        while (j < groupNames.length) {
          if (eSumSubstring.indexOf(groupNames[j].toUpperCase()) !== -1) {
            if (groupLatestDates[groupNames[j]] === "") {
              latest = events[i].getStartTime();
              groupLatestDates[groupNames[j]] = latest.getMonth()+1 + "/" + latest.getDate() + "/" + latest.getFullYear().toString();
            }
          }
          j++;
        }
      }
    }
    i--;
  }
  Logger.log(groupLatestDates);
  Logger.log(endDate)
  return groupLatestDates
};

function whoIsSignedUp(nWeeksAhead) {//check the next nWeeksAhead in the group Meeting calendar for anyone signed up
   nWeeksAhead = typeof nWeeksAhead !== 'undefined' ? nWeeksAhead : groupNames.length*7;
   signedUp=scrapeCalendarforPresentationDates(0,nWeeksAhead);
   return signedUp
}


function sortedByElapsedTime() {/*get the list from the spreadsheet and order names, first name has had most time elapsed since
  their last talk, and so on*/
  sheetND=getNameDateAssociativeArray()
  sheetND=convertHashToNumArray(sheetND)
  var i=0;
  while (i< sheetND.length) {//switch the order from [[name,date]] to [[date,name]] for sorting
    d=new Date(sheetND[i][1])
    t=d.getTime()//sort by time since epoch
    sheetND[i]=[t,sheetND[i][0]];
  i++;}
  sheetND.sort()
  i=0;
  while (i< sheetND.length) {//switch the order from [[date,name]] to [[name,date]]
    sheetND[i]=[sheetND[i][1],sheetND[i][0]];
  i++;}
  //sheetND=convertNumToHashArray(sheetND)
  //Logger.log(sheetND)
  return sheetND//returns a numeric array
}


function autoSignUpCandidate() {/*If no one is signed up for next week, try to find someone to auto sign up according to this process:

1)check if each person has presented in the past n weeks OR is signed up to present in the next n weeks, in order of ranked list
of elapsed time since previous
2)if someone doesn't fit either criteria, choose them to sign up automatically

this doesn't necessarily find someone.
could reduce window size until it finds someone.

returns either "" or a string name
*/
  var sortedArray=sortedByElapsedTime();//num array from spreadsheet
  var signedUp=whoIsSignedUp();//
  sortedArray=convertNumToHashArray(sortedArray);
  count=0
  var result=""
  for (item in sortedArray){
    item=item.split(',');
    if (!/\S/.test(signedUp[item[0]])){//true if no non-white space character present, i.e. true if the person is not signed up
          if (count==0) {//prepare to sign this person up!
            result=item[0];
            count++}
        }
  }
  Logger.log(result)
  return result
}

function autoSignUp() {/*Run this 3 days after group meeting.
get candidate from AutoSignUp sheet.
candidate== "" or a name
if "", do nothing
if a name, check description for next group meeting
if description is blank, add the name and send that person an email.
if not blank, do not add name.  (could also tell the candidate they are off the hook and thank the person for signing up)
*/
var signUpSheet=SpreadsheetApp.openById(autoSignUpSheetId);
var candidate=signUpSheet.getActiveCell().getValue()
if (candidate.length>1.0)
{//candidate is a person in the group we assume, now check description for next group meeting
  var gm=findNextGroupMeetingEvent()
      if (gm == "" || gm == "cancelled") {//group meeting was cancelled or not found within 7 days
        return
      }
      else //group meeting this week was found was found
        var sum=gm.getSummary()
        if (sum == "Group Meeting" || sum == "Group Meeting:" || sum == "Group Meeting: ") {//group meeting was found and no one is signed up
              gm.setSummary("Group Meeting: "+candidate)
            }
            
}
}

function findNextGroupMeetingEvent(xDaysPrior,xDaysAhead) {/*Scrape the google calendar for the next group meeting event
returns the event if it finds one with the words "Group Meeting" in it (case matters at the moment) and not "cancelled" or the like.
returns "cancelled" if it finds one with words indicating the meeting is cancelled
returns "" if it doesn't find an event in the given time frame (week by default) with "Group Meeting" in the summary

test output with (event_cur == "" || event_cur == "cancelled") --> false if it did find and output a calendar event
*/
  xDaysPrior = typeof xDaysPrior !== 'undefined' ? xDaysPrior : 0;//default today
  xDaysAhead = typeof xDaysAhead !== 'undefined' ? xDaysAhead : 7;//default one week from today
  var endDate,startDate, cal, events,event_cur,i,sum
  endDate = new Date();
  endDate.setDate(endDate.getDate() + xDaysAhead);
  startDate = new Date();
  startDate.setDate(startDate.getDate() - xDaysPrior);
  cal = CalendarApp.getCalendarById(groupActivitiesCalid);
  events = cal.getEvents(startDate, endDate);
  i=0;
  while (i<events.length){
  event_cur=events[i];
  sum=event_cur.getSummary();
    if (sum.indexOf("Group Meeting")!=-1)
    {if (sum.indexOf("No Group Meeting") !=-1 || sum.indexOf("cancelled") !=-1 || sum.indexOf("Cancelled") !=-1  ) {
    return "cancelled"
    }
      else
    i=events.length+1;
    return event_cur}
}
return ""
}
  
function planNextGroupMeeting() {/*function to run during or just after current group meeting to plan the next one
  if group meeting is cancelled, announce it to all
  if group meeting has a person signed up, announce to all
  if group meeting has no one signed up, send emails one email to group.
    if someone has been selected for auto-sign up, this email will state that fact without naming the person
        send an email to this individual informing them of their auto-sign-up status.
    if no one has been selected for auto-sign up, this email will state that fact */

//var emailList="jcollins@manoharan.deas.harvard.edu"
var emailList="manoharanlab@seas.harvard.edu"

var gm=findNextGroupMeetingEvent(-2,7)
if (gm == "")
{GmailApp.sendEmail(emailList,
                   "No Group Meeting next week",
                   'I found no group meeting scheduled in the next 7 days.\n\n'+                                                                                                                                                            
                   'I will check again the day before the usual meeting.\n\n'
                  +'Best,\nGMA (Group Meeting Automaton)');
}
  else if (gm == "cancelled")
{GmailApp.sendEmail(emailList,
                   'Group Meeting Next Week is Cancelled',// ('+tomorrowMonth+' '+tomorrowDate+')',
                   'The next weekly group meeting is cancelled.\n\n'+                                                                                                                                                            
                   'If you would like to reinstate this group meeting, please send an email to the group.\n\n'
                  +'Best,\nGMA (Group Meeting Automaton)');
}
  else {/*there is a meeting within a week
check if there is anyone signed up
if so, send email to list saying that this person is signed up
if not,look for candidate. 
   if candidate found, inform group and candidate 
   if not, inform group that no candidate has been found.
*/
var e0Sum=gm.getSummary()
var nextMeetingMonth=gm.getStartTime().getMonth()
var nextMeetingDate=gm.getStartTime().getDate()
 if (e0Sum == "Group Meeting" || e0Sum == "Group Meeting:")
   { var candidate=autoSignUpCandidate();
    Logger.log(candidate)
      if (candidate==""){//Include a link to make it easy to sign up
        var autoSignUpSheet= SpreadsheetApp.openById(autoSignUpSheetId)// open sheet and set current candidate
   autoSignUpSheet.getActiveSheet().getRange("a1").setValue(candidate)
     GmailApp.sendEmail(emailList,
                   e0Sum+' (Next Group Meeting, '+month[nextMeetingMonth]+' '+nextMeetingDate+')',
                   'No one is signed up for Group Meeting next week and the automaton did not find someone to sign up automatically.\n\n'+
                   'Please sign-up for group meetings by adding some text to the rest of the field after "Group Meeting" such as your name.\n\n'
                       +'Best,\nGMA (Group Meeting Automaton)');
   }
    if (candidate!=""){
      var autoSignUpSheet= SpreadsheetApp.openById(autoSignUpSheetId)// open sheet and set current candidate
   autoSignUpSheet.getActiveSheet().getRange("a1").setValue(candidate)
      GmailApp.sendEmail(emailList,
                   e0Sum+' (Next Group Meeting, '+month[nextMeetingMonth]+' '+nextMeetingDate+')',
                   'No one is signed up for Group Meeting next week but the automaton found someone to sign up automatically.\n\n'+
                   'The automaton is informing this person of their auto-sign up status.\n\n'+
                   'If no one signs up in 3 days, this person will be signed up automatically. \n\n'
                       +'Best,\nGMA (Group Meeting Automaton)');
       GmailApp.sendEmail(groupEmailAddresses[candidate],
                   e0Sum+' (Next Group Meeting, '+month[nextMeetingMonth]+' '+nextMeetingDate+')',
                   'Hello '+candidate+',\n\n'+
                   'You have been selected to present next week at Group Meeting.\n\n'+
                   'If no one signs up in 3 days, you will be signed up automatically. \n\n'
                       +'Best,\nGMA (Group Meeting Automaton)');
    }
}
 else //description has the words "Group Meeting" but not only those words, i.e. hopefully at least a name after them
 { 
   var autoSignUpSheet= SpreadsheetApp.openById(autoSignUpSheetId)// open sheet and set current candidate
   autoSignUpSheet.getActiveSheet().getRange("a1").setValue("")
   var sm=gm.getStartTime().getMinutes();
var st=gm.getStartTime().getHours();
var sd="AM"
var sh=st;  
   if (sh >= 12) {
        sh = st-12;
        sd = "PM";
    }
    if (sh == 0) {
        sh = 12;
    }
sm = sm<10?"0"+sm:sm
var em=gm.getEndTime().getMinutes();
var et=gm.getEndTime().getHours();
var ed="AM"
var eh=et;  
   if (eh >= 12) {
        eh = et-12;
        ed = "PM";
    }
    if (eh == 0) {
        eh = 12;
    }
em = em<10?"0"+em:em
  
GmailApp.sendEmail(emailList,
                   e0Sum+' (Next Group Meeting, '+month[nextMeetingMonth]+' '+nextMeetingDate+')',
                   'Here is the Group Meeting description for next week (it may need to be filled yet): \n\n'+
                   gm.getDescription()+'\n\nTime: '+
                   sh+':'+sm+'-'+eh+':'+em+'\n'+'Location: '+gm.getLocation()+'\n\n'+'Best,\nGMA (Group Meeting Automaton)');
}
}
}


function remindIfNoDescription() {/*function to run day before the day before group meeting
 reminds the presenters to fill description field.
*/
//var emailList="jcollins@manoharan.deas.harvard.edu"
//var emailAddress="jcollins@manoharan.deas.harvard.edu"
var emailList="manoharanlab@seas.harvard.edu"

event0=findNextGroupMeetingEvent(0,5);
//Logger.log(event0)
  if (event0 != "" || event0 != "cancelled") {  
  var e0Sum=event0.getSummary()  
  var desc=event0.getDescription()
     //Logger.log(desc+'<-desc')
     //Logger.log(!/\S/.test(desc))
     if (!/\S/.test(desc)){
var sm=event0.getStartTime().getMinutes();
var st=event0.getStartTime().getHours();
var sd="AM"
var sh=st;  
   if (sh >= 12) {
        sh = st-12;
        sd = "PM";
    }
    if (sh == 0) {
        sh = 12;
    }
sm = sm<10?"0"+sm:sm
var em=event0.getEndTime().getMinutes();
var et=event0.getEndTime().getHours();
var ed="AM"
var eh=et;  
   if (eh >= 12) {
        eh = et-12;
        ed = "PM";
    }
    if (eh == 0) {
        eh = 12;
    }
em = em<10?"0"+em:em
  for (item in groupEmailAddresses){  
    if (e0Sum.indexOf(item)!=-1) {
GmailApp.sendEmail(groupEmailAddresses[item],
                   'Your Group Meeting event lacks description field, ('+month[event0.getStartTime().getMonth()]+' '+event0.getStartTime().getDate()+')',
                    'Hello '+item+',\n\n'+
                   'I see that you are presenting this week, but there is no description listed for your talk. \n\n'+
                   'Please consider adding a title and/or abstract to the calendar event, so that I can inform your audience about what to look forward to. \n\n'
                   +'Here is a link to the group home page where you can find your presentation date and add a description: https://sites.google.com/a/manoharan.deas.harvard.edu/intranet/Home\n\n'+'Best,\nGMA (Group Meeting Automaton)');
  }}
}
}
}
  

function reminderEmail() {
  
var emailList="manoharanlab@seas.harvard.edu"
Logger.log('hi')
var event0=findNextGroupMeetingEvent(0,3)
Logger.log(event0+'<--')
if (event0 == "")
{GmailApp.sendEmail(emailList,
                   "No Group Meeting this week",                                                                                                                                                           
                   'I will get back to you later about next week\n\n'
                  +'Best,\nGMA (Group Meeting Automaton)');
}
  else if (event0 == "cancelled")
{GmailApp.sendEmail(emailList,
                   'Group Meeting is Cancelled',// ('+tomorrowMonth+' '+tomorrowDate+')',
                    'Group meeting is cancelled.\n\n'+
                    "In other words, I found the text 'cancelled' or something similar in the group meeting event title."+
                   ' If you would like to reinstate this group meeting, please send an email to the group.\n\n'
                  +'Best,\nGMA (Group Meeting Automaton)');
}
  else {var e0Sum=event0.getSummary();//confident event0 is a group meeting event
        if (e0Sum == "Group Meeting" || e0Sum == "Group Meeting:" || e0Sum == "Group Meeting: ")
   {GmailApp.sendEmail(emailList,
                   e0Sum+' (Tomorrow, '+month[event0.getStartTime().getMonth()]+' '+event0.getStartTime().getDate()+')',
                       'This group meeting is hereby cancelled because the event title field was left as "Group Meeting:" without further text.\n\n'+
                       'Please sign-up for group meetings by adding some text to the rest of the field after "Group Meeting:" (preferably your name).\n\n'+
                   'If you would like to reinstate this group meeting, please send an email to the group. \n\n'
                       +'Best,\nGMA (Group Meeting Automaton)');
}
 else //e0Sum has some added text, hopefully name(s)
 {var sm=event0.getStartTime().getMinutes();
var st=event0.getStartTime().getHours();
var sd="AM"
var sh=st;  
   if (sh >= 12) {
        sh = st-12;
        sd = "PM";
    }
    if (sh == 0) {
        sh = 12;
    }
sm = sm<10?"0"+sm:sm
var em=event0.getEndTime().getMinutes();
var et=event0.getEndTime().getHours();
var ed="AM"
var eh=et;  
   if (eh >= 12) {
        eh = et-12;
        ed = "PM";
    }
    if (eh == 0) {
        eh = 12;
    }
em = em<10?"0"+em:em
  
GmailApp.sendEmail(emailList,
                   e0Sum+' (Tomorrow, '+month[event0.getStartTime().getMonth()]+' '+event0.getStartTime().getDate()+')',
                   'Here is the Group Meeting description for tomorrow: \n\n'+
                   event0.getDescription()+'\n\nTime: '+
                   sh+':'+sm+'-'+eh+':'+em+'\n'+'Location: '+event0.getLocation()+'\n\n'+'Best,\nGMA (Group Meeting Automaton)');
}
}
}


function test() {
 /*var sheet = SpreadsheetApp.openById("0AvcRW5U_a5stdDVqU0pBYTdxT0pkYkRoNlN4c00tT1E");
 var lastRow=sheet.getActiveSheet().getLastRow();
 var currentValues=sheet.getActiveSheet().getRange(1, 1, lastRow, 2).getValues();
 */
 var e=findNextGroupMeetingEvent(-7,14)
 var sum=e.getSummary();
 //e.setSummary("Group Meeting:")
 Logger.log(sum)
 }
