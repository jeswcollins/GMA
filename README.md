GMA - Group Meeting Automaton
===

<i>GMA is a web app that chooses a group member to lead a recurring event and sends reminder e-mails
    (so that we can all focus our brains on something else, such as science!)<i>
    
  - Requires: Google Calendar and Documents, Group Member Names and E-mail Addresses
  - Features:
      - Maintains a spreadsheet of the latest dates each group member putatively gave a presentation (or lead an event more generally)
      - Automatically signs up a group member to lead the next event if no one is signed up.  The GMA's algorithm chooses the person who has had the most time elapse since they previously lead the event, unless that person's name is already scheduled on the Google Calendar to present shortly thereafter.  The GMA encourages/warns its choice to sign up voluntarily before the GMA signs them up automatically. 
      - Reminders: the GMA reminds the group about each upcoming meeting via e-mail. The GMA reminds the leader of the upcoming event to describe their event on the calendar if they haven't already. 

<b>Background/Motivation</b>

As the group meeting scheduling Czar/Tsar, I wrote this code to smooth the process of choosing a speaker for the [weekly group meeting](http://www.manoharan.seas.harvard.edu/group-meeting.html) of the [Manoharan laboratory group](http://www.manoharan.seas.harvard.edu/home.html) in Harvard's Department of Physics and School of Engineering and Applied Sciences (SEAS). The hope was that more of us would volunteer more frequently for group meeting and that we'd spend less time awkwardly waiting for someone to volunteer or for our advisor to decide who would "volunteer."

<b>Method/Implementation</b>

The code runs automatically after being set up as a Google App script. Here are the triggers we had set up for a weekly meeting on Thursdays 10:30 am-noon:

    uatoSignUp 10am to 11am Every Sunday
    reminderEmail 10am to 11am Every Wednesday
    overwriteDatesifNewerScraped 11am to noon Every Thursday
    remindifNoDescription 10am to 11am Every Tuesday
    scrapeLatestWritetoSheet 11am to noon Every Thursday
    planNextGroupMeeting Noon to 1pm Every Thursday

When finding a candidate to give the next group meeting, the GMA checks future dates to make sure it doesn't sign someone up for this week if that person is signed up in the near future. The number of days in advance the GMA checks is given in the "xDaysAhead" variable. By default, the GMA checks as many weeks into the future as there are group members: 

'''xDaysAhead : groupNames.length*7'''

Our group had about 11 potential presentators. So the GMA was set to choose the group member who had the most time elapsed since giving a group but also hadn't signed up to give a talk in the next 11 weeks.

<b>Results</b>

In principle one could "outsmart" the GMA by signing their name to give a talk after the current week, but within "xDaysAhead", and continually pushing back their scheduled presentation. I don't think anyone actually did that. 

The GMA seems to have inspired some jokes & laughs among team members. One time the GMA sort of went haywire and kept sending out e-mails to the group. My bad, but it was also kind of funny. Later, a quip may or may not have been made about who would gain the ability to express emotions first, one Harvard Physics PI in particular or the GMA ;)

At least one person seemed to be uncertain whether the GMA was a separate entity from me or just a handle I had been using to sign some emails. This lead to a quasi-philosophical discussion of what or who is or isn't an "automaton." At the time, I hadn't really gone out of my way to convince others that the GMA was anything more than a moniker I suddenly started assuming in emails pertaining to group meetings.

While our advisor was on sabbatical, I had turned off the GMA's Auto-Sign Up feature so that it only provided reminders. Group meetings would then approach without anyone signed up (neither voluntariliy, nor automatically), at which point the GMA declared the meetings cancelled while asking the group members to reinstate the meeting via a group-wide email if any of them would like to do so. After one such cancellation, the group's PI, Vinny, asked we reinstate the meeting. After that the group voted to re-implement the GMA's auto-sign up feature.

<b>Conclusions</b>

The GMA reduced the amount of human time spent choosing a speaker while maintaining schedule flexibility. Flexibility is important because if a new piece of data arises, a student scientist may want to present it right away. On the other hand, a student scientist probably shouldn't go too long without describing their work. They'd benefit from the process of preparing a presentation to their group, from giving the presentation, and from suggestions/feedback. For our group, the GMA algorithm was preferred to following a hard line-up of speakers or trying to "volunteer" a speaker at the end of each meeting.

If a group wants to get away with not having group meetings while their advisor is on sabbatical, it may be best not to automatically send the advisor a group meeting cancellation e-mail every week. This feature could be implemented with a "sabbatical" boolean.
