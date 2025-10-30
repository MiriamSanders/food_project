# FoodBridge | Real-Time Food Rescue

**FoodBridge** is a real-time platform connecting event halls and caterers with volunteers who collect surplus food and deliver it to families in need.  
An innovative solution to reduce food waste and support communities.

---

## The Problem

Every day, huge amounts of perfectly good **kosher food** are thrown away after events (weddings, bar mitzvahs, community meals).  
At the same time, there are **families struggling to put food on the table**.  
The problem is **logistics** — how to connect the two sides **in real time** before the food is wasted?

---

## The Solution

A **real-time web app** that bridges between food donors and volunteer drivers:

- **Donor (hall/caterer)** posts a message:  
  > “Event just ended. 40 chicken meals and 20 kg of salads available at Street X. Pickup until 11:00 PM.”

- **Volunteers (“kindness drivers”)** get an **instant notification**, click **“On my way”**, collect the food,  
  and deliver it to a local charity or community distributor.

---

## System Architecture

The project follows a **3-Tier Architecture**:

1. **Frontend – React**  
   User interface for donors, volunteers, and charities.

2. **Backend – Node.js (Express)**  
   REST API managing donations, users, and real-time notifications.

3. **Database – MongoDB**  
   Stores users, donations, and location data.

---

## Tech Stack

| Area | Technology |
|------|-------------|
| Frontend | React, Vite, MUI |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Real-Time | Socket.IO |
| Maps | Google Maps API / Leaflet |
| Deployment | Render (Backend), Vercel (Frontend), MongoDB Atlas |

---

## User Roles

- **Donor (hall/caterer):** Publishes available food donations.  
- **Volunteer (driver):** Receives real-time alerts for nearby donations and marks “On my way.”  
- **Charity admin:** Manages collected donations and distribution status.

---

## Features

- Real-time donation feed  
- Location-based matching between donors and volunteers  
- Instant notifications (Socket.IO / Firebase)  
- Secure authentication (JWT)  
- Interactive map view of donations  
- Fully responsive design (mobile-first)
