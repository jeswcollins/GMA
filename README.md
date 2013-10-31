GMA
===

Group Meeting Automaton -- Facilitates the Choosing of a Group Member to Lead a Recurring Event and Related Tasks

(so that we can all focus our brains on something else, such as "doing science")

Automated Reminders, Sign Ups, and Latest Presentation Date Tracking for Leading Group Meetings (Google Script)

  - requires Google Calendar and Documents
  - Features:
      - Maintains a spreadsheet of the latest dates each group member gave a presentation (or lead an event more generally)
      - Signs someone up automatically to lead the next event if no one is signed up.  In our experience, the GMA signs up typically the person who has had the most time elapse since they previously lead the event
      - Reminders: reminds the group about upcoming events, gently nudges its choice to sign up before the GMA signs him or her up automatically, and reminds the leader of the upcoming event to describe it if they haven't  


I wrote this code to smooth the process of choosing a speaker for the weekly group meeting of our laboratory group in Applied Physics/Physics at Harvard.

The hope was that more people would volunteer more frequently for group meeting and that we'd spend less time awkwardly waiting for someone to volunteer or for our boss to decide who would "volunteer." I think the GMA did reduce the amount of time spent on scheduling, and may have encouraged people to sign up on their own. 

I did not receive any requests that we go back to the old, GMA-free system. More recently, I have turned off the GMA's Auto-Sign Up feature so that it only provides reminders.  With Auto-Sign Up disabled, more group meetings seem to come to pass without anyone being signed up, at which point the GMA declares the meeting cancelled while asking the group members to reinstate the meeting via a group-wide email if any of them would like to do so.  So far no one besides our boss has chosen to "reinstate" the meeting at that point, and so far he has only attempted to reinstate the meeting once.  In most of those cases, we did not have a group meeting.  It is difficult to say that the lack of participation has been caused by the Auto Sign Up disabling, in part because our boss hasn't been in town during much of the same time.

There was and perhaps continues to be some confusion about whether the GMA is a separate entity from me or just a handle I have been using to sign my emails.
