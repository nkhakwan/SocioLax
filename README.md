# _SocioLax_

#### _Epicodus React Cap Stone Project_

#### By _**Khan Sahab**_

## Description

_This React Project is named "SocioLax" because it is intended to be a chillaxing website for socializing by a group. This website supports signUp and signIn thru Firebase. All the posts by users are stored in Fire store NoSql google database. Initial Screen brings up all the posts on the page. However viewer can only see the posts and cannot perform any operations. He/she has to either signIn or SignUp. After that he/she can

* Add comments,
* Edit/delete his own comments only
* Can "like" his or anybody else's coments
* He/she can view a page that contains only his comments
* Or view page that has all the user's listed.
* And he/she can view a page that lists all comments of any particular user_

## Lessons Learned

1. Firebase/Firestore was used for both Authentication and database and since Firestore needs redux so redux was implemented in the project. But redux was not used for using states accross components. Only local states with react "useState" were used. This at times produced problems as states accross components could not be shared and I didn't know how to use userContext for this purpose. And didn't have time for literature study for that. There it was a regret not to have redux "Actions" and "Reducers" in the project. So bottom line is either to have mastery on userContext or one must use redux Actions and Reducers for sharing states accross components.

2. Using "redirect" and "Link" makes life abundantly easier.  After every delete or Edit action or other actions, the page should be redirected to screen you want; otherwise things are getting updated and the viewer has to click some button to get away from the screen action was done.

3. useEffects, useStates and if one knows how to use useContext are tools that life immensely easy.


## Setup/Installation Requirements

1. Clone this repository from GitHub.
2. In the terminal executs "npm install"
3. Get .env file from me and copy it at the root of the project.
4. Than execute "npm run start". You'll get the website for viewing posts by other users or would get a chance by yourself to add posts.

## Precaution 
#### Adding comments requires you to fill up three boxes. One for the title, second for inputting your picture URL and the post text itself. Since you would most likely not have any URL of your photo handy, I am listing some URL's underneath of Istanbul city pictures. Please input these when adding posts so that you can see that posts are created flawlessly..... so enjoy posting.

https://www.ebrdgreencities.com/assets/Uploads/180881cd07/IZMIR.png
https://www.ephesus.us/upload/1553941149_IMG_7440.jpg
https://comps.canstockphoto.com/sunrise-in-goreme-city-turkey-stock-photograph_csp57462296.jpg
https://z7f7y8d6.stackpathcdn.com/wp-content/uploads/2018/05/Gibraltar-rock-1024x683.jpg

## Known Bugs

When the posts of any particular user is viewed, everything works except "all user page" do not respond. To circumven this all you have to do is to click any other page first and you can view "all users" page again. Issue at core has been identified but the solution requires correct usage of 'userContext' hook.
 
## Support and contact details

_Have a bug or an issue with this application? Email post_khan@yahoo.com_

## Technologies Used

* React
* CSS
* Flex box CSS
* HTML
* React hooks
* React Redux
* Google Firebase/Firestore
* Google Firebase authentication
* Firestore NoSql databases.

# CapStone Proposal
### Copied below as is.

Name of Student: KhanSahab (Nauman Khakwani)
Name of Project: Sociolax

### _*Project's Purpose or Goal: (What will it do for users?)*_

Provide Socializing Plat Form for small groups. My personal goal is to learn as much React as is possible by using Redux, NoSql, Firebase and decorating the pages. I would focus to enhance my skills in Redux, NoSql and Firebase programming and also in beautifying pages thru CSS.

### _*List the absolute minimum features the project requires to meet this purpose or goal:*_

* Users should be able to sign up and log in.
* Not logged in users cannot use the website.
* Users can post messages that is accessible to all users.
* Users can contact individual users for just one to one messaging
* It has all the CRUD ability for each post.

### _*What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.*_

React Only. Redux, Firebase, NoSql mainly. API might be used to pick a facial sketch for each user that the user would be identified with.
### _*If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.*_

Video Communication between two users could be added. Also time would be used to explore how to transform it for React Native.

### _*What additional tools, frameworks, libraries, APIs, or other resources will these additional features require? Is there anything else you'd like your instructor to know?*_

My focus is learning React. I should be a confident user of NoSql, Firebase, Redux and React after getting done with the capstone. That is my main focus. If some time is left I would rather use that time in styling the pages with beauty and animations. That is before i turn to React Native. And i think i might not get time for Native.

### License

This software is licensed under the Epicodus Lincenses.

Copyright (c) 2020 **_Khan Sahab_**