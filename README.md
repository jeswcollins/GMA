GMA - Group Meeting Automaton
===

<i>GMA is a web app that chooses a group member to lead a recurring event and sends reminder e-mails
    (so that we can all focus our brains on something else, such as science!)<i>
    
  - Requires: Google Calendar and Documents, Group Member Names and E-mail Addresses
  - Features:
      - Maintains a spreadsheet of the latest dates each group member putatively gave a presentation (or lead an event more generally)
      - Automatically signs up a group member to lead the next event if no one is signed up.  The GMA's algorithm chooses the person who has had the most time elapse since they previously lead the event, unless that person's name is already scheduled on the Google Calendar to present shortly thereafter.  The GMA encourages/warns its choice to sign up voluntarily before the GMA signs them up automatically. 
      - Reminders: The GMA reminds the group about each upcoming meeting.   The GMA reminds the leader of the upcoming event to describe their event if they haven't. 

<b>Background/Motivation</b>

As the group meeting scheduling Czar/Tsar, I wrote this code to smooth the process of choosing a speaker for the [weekly group meeting](http://www.manoharan.seas.harvard.edu/group-meeting.html) of the [Manoharan laboratory group](http://www.manoharan.seas.harvard.edu/home.html) in Harvard's Department of Physics and School of Engineering and Applied Sciences (SEAS). The hope was that more of us would volunteer more frequently for group meeting and that we'd spend less time awkwardly waiting for someone to volunteer or for our advisor to decide who would "volunteer."

<b>Method/Implementation</b>

The code runs automatically after being set up as a Google App script. Here are the triggers we had set up for a weekly meeting on Thursdays 10:30 am-noon:

    autoSignUp 10am to 11am Every Sunday
    reminderEmail 10am to 11am Every Wednesday
    overwriteDatesifNewerScraped 11am to noon Every Thursday
    remindifNoDescription 10am to 11am Every Tuesday
    scrapeLatestWritetoSheet 11am to noon Every Thursday
    planNextGroupMeeting Noon to 1pm Every Thursday

<b>Results</b>

In principle one could "outsmart" the GMA by continuously signing up to lead a meeting a week or a few more after the coming meeting, waiting some days or weeks, then removing their name from that time slot with more than a week to go and quickly signing up for another time slot slightly further in the future. I don't think anyone actually did that.  

I have not received any requests that we go back to the old, GMA-free system.  The GMA seems to have inspired some jokes/laughs among team members.  At least one person seemed to be uncertain whether the GMA is a separate entity from me or just a handle I have been using to sign some emails.  I'm not sure I'd say that I've gone out of my way to convince anyone that the GMA is anything more than a moniker I suddenly started assuming in emails pertaining to group meetings.

Over the GMA's first summer, I had turned off the GMA's Auto-Sign Up feature so that it only provided reminders.  With Auto-Sign Up disabled, more group meetings approached without anyone signed up (neither voluntariliy, nor automatically), at which point the GMA declared the meetings cancelled while asking the group members to reinstate the meeting via a group-wide email if any of them would like to do so. After one such cancellation, the group's PI, Vinny, asked we reinstate the meeting. It is difficult to say that the lack of participation had been caused by the Auto Sign Up disabling, partially because it correlated with Vinny's sabbatical during much of the same time. After that the rest of the group voted to re-implement the GMA's auto-sign up feature.

<b>Conclusions</b>

The GMA reduced the amount of human time spent on choosing a speaker while maintaining schedule flexibility. Flexibility is important because if a new piece of data arises, a student scientist may want to present it right away. On the other hand, even if a student scientist isn't eager to present, they'd benefit from describing their work, any obstacles they're facing, and from suggestions/feedback. For our group, the GMA algorithm was preferred to following a hard line-up of speakers or trying to "volunteer" a speaker at the end of each meeting.

If a group wants to get away with not having group meetings while their advisor is on sabbatical, it may be best not to automatically e-mail them a group meeting cancellation e-mail every week. This could be implemented with a "sabbatical" boolean.
