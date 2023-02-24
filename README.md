# Cinema
## General informations
My personal project of cinema site made in purpose of learning Angular framework.
## Table of contents
* [Launch](#launch)
* [Technologies](#technologies)
## Launch
Project is deployed [here](https://gleaming-rabanadas-c6f5e0.netlify.app), but to make it fully functional, you need to run this mocked server: 
## Technologies:
- ***Angular*** 15.1.4,
- ***NgRx*** 15.3.0,
- ***RxJS*** 7.5.0,
- ***Angular Material***,
- TypeScript 4.9.5,
- HTML, CSS,
- Jest 29.4.3

I also used ***jwt-decode***, ***font-awesome*** and ***ng-neat/until-destroy***.
## Features
**For all users, both logged and not logged**:
- Authentication, with saving token in localstorage and checking for its expiration date on each refresh,
- Registration,
- Screenings list for next five days,
- Possibility for reserve seats and choose ticket types for each seat,
- Adding one-time-use discount coupons (example coupon: "super-kupon"),
- Simulated payment with BLiK code,
- On order succes generating link to ordered tickets + QR code for that link,

**For logged users as normal user**:
- Auto form completion when ordering tickets,
- Page with your orders,
- Cart mechanism,
- Feature for adding movies to wish list,
- Possibility to rating the movies in 0-5 scale,
- Settings page, where you can change account details

**For logged as admin user**:
- Adding new rooms,
- Adding new movies,
- Adding new Screenings
