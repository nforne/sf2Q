# Project Planning

## Descrtiption

- Project title- Safe 2 Ship
- Project description- An app for community shipping (shippers and shipees) 
- Target audience - Mobile app users, companies looking for local logistics solutions
- Team members- Abdullah Khan, Martin Nfome


## MVP

Our app should allow authenticated users to post packages to be delivered (shipee) and picked up and delivered by drivers on the app (shippers).

##### Stack Choices:
Front End- React Native
Back End- Node & Express
Database- PostgreSQL
Google Maps API


## Users (Tables/ERD)

1. Shipper
    - Name
    - Phone Number
    - Avatar
    - Number of Deliveries
    - User rating
    - Bio
    - Company Information (optional) / Personal link
    - Fleet
    - Driving Record

2. Shipee
    - Name
    - Phone Number
    - Avatar
    - Number of Orders
    - User rating
    - Bio
    - Company Information (optional) / Personal link

3. Package
    - size
    - weight range
    - description
    - foreign key -> shipee

4. Order
    - source
    - destination
    - map
    - foreign key -> package
    - foreign key -> shipper
    - foreign key -> shipee

## User stories

##### Shipper 

As a shipper, I should be able to create an account

As a shipper, I should be able to authenticate to log in

As a shipper, I should be able to view my profile

As a shipper, I should be able to view posted packages

As a shipper, I should be able to filter queries to posted packages

As a shipper, I should be able to select a posted package and view it's details

As a shipper, I should be able to add packages to create a delivery order (to wait for shipee confirmation)

As a shipper, once confirmed I should be able to deliver the package

As a shipper, once I deliver the package, I should be able to confirm it's delivery


##### Shipee

As a shippee, I should be able to create an account

As a shippee, I should be able to authenticate to log in

As a shippee, I should be able to view my profile

As a shippee, I should be able to create orders with packages

As a shippee, recieve requests for order by shipper and I should be able to confirm/cancel

As a shippee, recieve confirmation on delivery


##### Stretch Features for both

- Add work schedule for (shipper)

- Add time frame for package to be delivered (by shipee)

- In app messaging


