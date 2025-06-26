# Restaurant Ordering and Management System 🍽️

A web-based system for managing in-person restaurant dining, with features like online ordering from tables, a live kitchen order display, and real-time menu interaction, enhancing efficiency and customer experience.

---

## 👤 Contribution

I was responsible for:

* Creating the overall layout and structure of the system
* Designing the table-to-order flow for customers
* Building the online ordering logic and dynamic menu display
* Implementing the basic Kitchen Order System interface and live status updates

---

## 🔧 Features Implemented

* **Menu Management:**

  * Displays menu items with names, prices, and descriptions
  * Dynamic rendering from data (admin add/edit handled separately)

* **Online Table Ordering:**

  * Customers can browse the menu and place orders from their assigned table
  * Orders persist and can be sent multiple times during a meal
  * Orders are tracked and linked to specific table numbers

* **Kitchen Order System (KOS):**

  * Displays incoming orders in real-time
  * Orders shown by table, sorted by time
  * Kitchen staff can update status: `Preparing` → `Ready`

---

## 🚀 Tech Stack

* **Frontend:** Vite + (React / Vanilla JS)
* **Styling:** CSS / Tailwind / custom
* **Build Tool:** Vite
* **Package Manager:** npm

---

## 🛠️ Setup & Run

```bash
npm install
npm run dev
```

Then open: `http://localhost:5173/`

