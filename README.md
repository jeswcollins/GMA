GMA
===

Group Meeting Automaton -- Facilitates the Choosing of a Group Member to Lead a Recurring Event and Related Tasks
    (so that we can all focus our brains on something else, such as "doing science")

Automated Reminders, Sign Ups, and Latest Presentation Date Tracking for Planning Group Meetings (Google Script)

  - Dependencies: Google Calendar and Documents, Group Member Names and E-mail Addresses
  - Features:
      - Maintains a spreadsheet of the latest dates each group member putatively gave a presentation (or lead an event more generally)
      - Signs someone up automatically to lead the next event if no one is signed up.  In our experience, the GMA signs up typically the person who has had the most time elapse since they previously lead the event, although the algorithm is set not to select that person if they are signed up to present shortly thereafter.  The GMA encourages/warns its choice to sign up voluntarily before the GMA signs him or her up automatically. 
      - Reminders: The GMA reminds the group about each upcoming meeting.   The GMA reminds the leader of the upcoming event to describe their event if they haven't. 


As the group meeting scheduling Czar/Tsar, I wrote this code to smooth the process of choosing a speaker for the weekly group meeting of our laboratory group in Applied Physics/Physics at Harvard.

The hope was that more of us would volunteer more frequently for group meeting and that we'd spend less time awkwardly waiting for someone to volunteer or for our boss to decide who would "volunteer." I think the GMA did reduce the amount of time spent on scheduling, and may have encouraged people to sign up on their own. 

In principle one could "outsmart" the GMA by continuously signing up to lead a meeting a week or a few more after the coming meeting, waiting some days or weeks, then removing their name from that time slot with more than a week to go and quickly signing up for another time slot slightly further in the future. I don't think anyone actually did that.  

I have not received any requests that we go back to the old, GMA-free system.  People seem to have gotten some laughs out of the GMA.  At least one person seemed to be uncertain whether the GMA is a separate entity from me or just a handle I have been using to sign some emails.  I'm not sure I'd say that I've gone out of my way to convince anyone that the GMA is anything more than a moniker I suddenly started assuming in emails pertaining to group meetings.

I have more recently turned off the GMA's Auto-Sign Up feature so that it only provides reminders.  With Auto-Sign Up disabled, more group meetings seem to approach without anyone having signed up, at which point the GMA declares the meeting cancelled while asking the group members to reinstate the meeting via a group-wide email if any of them would like to do so.  So far no one besides our boss has attempted to reinstate the meeting at that point, and so far he has only reinstated the meeting after the GMA's cancellation of it once. It is difficult to say that the lack of participation has been caused by the Auto Sign Up disabling, in part because our boss hasn't been in town during much of the same time.  Our boss claimed he became aware of our tendency to not hold meetings in his absence because he read the cancellation e-mails that the GMA started sending out every week.



Sign up for group meeting by adding your name to the Group Meeting Event on the date you would like to present.  The Group Meeting Events are on the Group Activities Calendar. 

Here is a more detailed explanation for how to sign up:
Go to the intranet homepage (click "Home" on the left).  Or the calendar to the right of this text on this webpage.
You should see the "Group Activities" calendar on the upper right hand side.  Find the date you want to talk and click on "Group Meeting" on that date, then click "more details >>".
This should bring up the intranet Google calendar group meeting event for that date.  You should be able to click on and modify these details.  Be sure you are signed in with your manoharan.deas.harvard.edu google account.
Click the meeting title and append your name to the title of the meeting, so it reads like this "Group Meeting: <Your Name>" where <Your Name> is your name.  If someone already signed up, feel free to build a list, like this: "Group Meeting: Jesse, Jerome, etc."
If you have a title and/or abstract for your talk, add it to the description field.  The listing of these talks, with names and descriptions, will appear on our Intranet homepage as well as the lab's public site. Feel free to include the approximate time you'd like to talk in the description (but this is not necessary).  You can talk for as short or as long as you'd like (up to 1.5hrs).
Click the "Save" button.
At the "Edit recurring event" box, click "Only this instance."
At the "Send update?" box,  click "Don't send," or "Send", either is fine.
If these directions don't work for you, let me know (jcollins@fas.harvard.edu) and I'll see if I can help.  And edit or replace them if you find improvements.



Group Meeting Automaton:

We're trying an experiment, using Google App Scripts to automate aspects of the Group Meeting organizational process. For now, the automaton sends reminder emails about group meeting, reminds you if you're signed up but have not included a description on your group meeting event, and automatically signs someone up if certain conditions are met.

All group members should be able to access and edit the Automaton here:
https://script.google.com/a/manoharan.deas.harvard.edu/d/1CT2w7GdMed1TN5Y5UGyY0yjpKKOsW5xCwcAHT5E0MdTNIKqKpQ7Bwgo3/edit. The automaton is written in .gs, or Google Script, which is basically javascript that plays nice with various google apps, such as Calendar, Spreadsheets, and email.
Suggestions and code edits are welcome


Automatic sign-ups:

Here's how the automaton's automatic sign-up feature (allegedly) works. During group meeting, the automaton checks if there is a meeting next week and if someone has signed up.  If there is someone signed up, the automaton does nothing.  If no one is signed up, it tries to find a candidate.

The automaton sorts the list of the group members according to the last time they have presented at group meeting.  This list is updated weekly by the automaton and can also be edited by all the group members.  Here it is: https://docs.google.com/a/manoharan.deas.harvard.edu/spreadsheet/ccc?key=0AvcRW5U_a5stdDVqU0pBYTdxT0pkYkRoNlN4c00tT1E.  The automaton builds this list by checking past Group Activities calendar description fields.  If people have given group meeting without signing up on the calendar, their most recent date on this spreadsheet may be incorrect.  If that is your case, please feel free to click the link and correct it with a rough estimate of your last presentation date (preferably in MM/DD/YYYY format).

The automaton starts with the person who it thinks has had the most time elapse since their previous group meeting talk.  If that person is not signed up to talk in the next n weeks, where n is currently set to the number of group members who give talks regularly (G2s and up, including post-docs), then the automaton will inform that person via an email that they will be automatically signed up in 3 days if no one signs up before then.  If that person is signed up to present soon, then the automaton will proceed to the person with the next greatest amount of time elapsed since their previous talk.  This means that if everyone is signed up in the next n weeks, except for the upcoming week, then the group meeting automaton might not fill the upcoming week's spot.   If someone else besides the person the automaton chose signs up, that automaton won't force its choice--it will let the other person fill in for the one it chose.

How to set up the triggers for the automaton:

In this example, group meeting takes place on Thursdays at 10:30-12:00.
