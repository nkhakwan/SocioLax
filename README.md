# _SocioLax_

#### _Epicodus React Cap Stone Project_

#### By _**Khan Sahab**_

## Description

_This React Project is named "SocioLax" because it is intended to be a chillaxing website for socializing by a group. This website supports signUp and signIn thru Firebase. All the posts by users are stored in Fire store NoSql google database. Initial Screen brings up all the posts on the page. However viewer can only see the posts and cannot perform any operations. He/she has to either signIn or SignUp. After that he/she can
a- Add comments,
b- Edit/delete his own comments only
c- Can "like" his or anybody else's coments
d- He/she can view a page that contains only his comments
e- Or view page that has all the user's listed.
f- And he/she can view a page that lists all comments of any particular user_






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

### Specs

### License

This software is licensed under the Epicodus Lincenses.

Copyright (c) 2020 **_Khan Sahab_**