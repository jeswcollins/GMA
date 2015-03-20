GMA
===

Group Meeting Automaton -- Google Web App that Chooses a Group Member to Lead a Recurring Event and Sends Reminders
    (so that we can all focus our brains on something else, such as "doing science")
    
  - Requires: Google Calendar and Documents, Group Member Names and E-mail Addresses
  - Features:
      - Maintains a spreadsheet of the latest dates each group member putatively gave a presentation (or lead an event more generally)
      - Signs someone up automatically to lead the next event if no one is signed up.  The GMA's algorithm chooses the person who has had the most time elapse since they previously lead the event, unless that person is signed up to present shortly thereafter.  The GMA encourages/warns its choice to sign up voluntarily before the GMA signs them up automatically. 
      - Reminders: The GMA reminds the group about each upcoming meeting.   The GMA reminds the leader of the upcoming event to describe their event if they haven't. 

<b>Background/Motivation</b>

As the group meeting scheduling Czar/Tsar, I wrote this code to smooth the process of choosing a speaker for the weekly group meeting of our laboratory group in Applied Physics/Physics at Harvard. The hope was that more of us would volunteer more frequently for group meeting and that we'd spend less time awkwardly waiting for someone to volunteer or for our boss to decide who would "volunteer."

<b>Method/Implementation</b>

We use this code as a Google App script. Here are the triggers as set up for a weekly meeting on Thursdays 10:30 am-noon:

    autoSignUp 10am to 11am Every Sunday
    reminderEmail 10am to 11am Every Wednesday
    overwriteDatesifNewerScraped 11am to noon Every Thursday
    remindifNoDescription 10am to 11am Every Tuesday
    scrapeLatestWritetoSheet 11am to noon Every Thursday
    planNextGroupMeeting Noon to 1pm Every Thursday

<b>Results</b>

In principle one could "outsmart" the GMA by continuously signing up to lead a meeting a week or a few more after the coming meeting, waiting some days or weeks, then removing their name from that time slot with more than a week to go and quickly signing up for another time slot slightly further in the future. I don't think anyone actually did that.  

I have not received any requests that we go back to the old, GMA-free system.  The GMA seems to have inspired some jokes/laughs among team members.  At least one person seemed to be uncertain whether the GMA is a separate entity from me or just a handle I have been using to sign some emails.  I'm not sure I'd say that I've gone out of my way to convince anyone that the GMA is anything more than a moniker I suddenly started assuming in emails pertaining to group meetings.

Over the GMA's first summer, I had turned off the GMA's Auto-Sign Up feature so that it only provided reminders.  With Auto-Sign Up disabled, more group meetings seemed to approach without anyone having signed up, at which point the GMA declared the meetings cancelled while asking the group members to reinstate the meeting via a group-wide email if any of them would like to do so.  So far no one besides our boss has attempted to reinstate the meeting at that point, and so far he has only reinstated the meeting after the GMA's cancellation of it once. It is difficult to say that the lack of participation had been caused by the Auto Sign Up disabling, in part because our boss hadn't been in town during much of the same time.  Our boss claimed he became aware of our tendency to not hold meetings in his absence because he read the cancellation e-mails that the GMA started sending out every week.  Shortly after he insisted we have meetings without him, the rest of the group decided to re-implement the GMA's auto-sign up feature.

<b>Conclusion</b>

The GMA reduced the amount of human time spent on choosing a speaker while maxmizing flexibility. For our group, it was preferred to following a hard speaker-line up or trying to find a speaker at the end of each meeting.
