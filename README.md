# Cinema
## Table of contents
* [General informations](#1-general-informations)
* [Launch](#2-launch)
* [Technologies](#3-technologies)
* [Features](#4-features)
* [Todo](#5-todo)

## 1. General informations
 My personal project of cinema site made in purpose of **learning Angular framework**, which i.a. includes: angular components, services, stateful-services, dependency injection, reactive-forms, async validators, NgRx, RxJS, Angular Material, directives, routing, guards, pipes, async pipies, content-projection, standalone components, modules, lazy-loading.  
 
To make this app functional, I have implemented **simple json database** with [json-server](https://www.npmjs.com/package/json-server) and [json-server-auth](https://www.npmjs.com/package/json-server-auth)

## 2. Launch
### Starting the project
- To launch this project, you first have to **clone mocked server** from this github [repository](https://github.com/maciekw129/cinema-mock-server),

- next from the cloned project run `npm run server` command,

- then, you can launch deployed app by clicking on this link: https://cinema-maciekw129.netlify.app.
### Logging to different user types
App provides two different accout types: ***user*** and ***admin***.  

|Account type| Login | Password |
| --- | --- | --- |
|user| user@email.com | password123 |
|admin| maciej@email.com  | password123 |

## 3. Technologies:
- **Angular** 15.1.4,
- **NgRx** 15.3.0,
- **RxJS** 7.5.0,
- **Angular Material**,
- **TypeScript** 4.9.5,
- **HTML**, **CSS**,
- **Jest** 29.4.3 for unit tests

I also used ***jwt-decode***, ***font-awesome*** and ***ng-neat/until-destroy***.
## 4. Features
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

## 5. Todo
- English language,
- Dark theme mode,
- Feature for adding coupons in the admin panel,
- Feature for editing existing movies, screening and rooms in the admin panel
- Change CSS to SCSS styling
- functional backend server instead od mocked json-server
