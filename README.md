# 🧘 Yoga Sequencing App

A modular yoga sequencing platform built with **Next.js**, **MongoDB**, and **Tailwind CSS**, designed to help yoga teachers and practitioners build intelligent, structured yoga classes.

---

## 🌿 Overview

This project aims to create a **structured yoga sequencing system** using reusable components such as:

- Poses (atomic units)
- Modules (flow sequences)
- Templates (full class structures)

The long-term vision includes **rule-based sequencing and AI-assisted class generation**.

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 🧠 Core Concept

Instead of manually building yoga classes from scratch each time, this system uses:

### 1. Poses
Atomic yoga postures stored with metadata.

### 2. Modules
Reusable flow segments such as:
- Sun Salutation A
- Hip Opening Flow
- Standing Warrior Series

### 3. Templates
Full class structures composed of modules.

---

## 🏗️ Architecture (Future Vision)

The system is designed to evolve through three phases:

### Phase 1 — Templates (MVP)
- Fixed yoga class templates
- Manual sequencing
- Basic UI builder

### Phase 2 — Rule-Based Engine
- Dynamic module selection
- Pose relationships
- Safety + sequencing logic

### Phase 3 — AI-Assisted Sequencing
- AI-generated variations
- Intelligent transitions
- Teaching cues and flow optimisation

---

## 🏗️ Project Structure

```text
app/
  (public)/
    mat-hire/
    success/
    (auth)/
  (admin)/
    dashboard/
  api/
    checkout/
    stripe-webhook/

lib/
  db.ts
  auth.ts
  utils.ts
  models/
    MatHire.ts
```

## 🎯 MVP Goals

- Build pose database structure
- Create reusable sequence modules
- Implement class templates
- Build a simple sequence builder UI
- Enable saving and loading sequences

---

## 🌱 Future Enhancements

- AI-powered sequencing assistant
- Drag-and-drop flow builder
- Pose illustration library (200–300 poses)
- Export to PDF / class cards
- Teacher personalization modes
- Voice-guided classes

---

## 🧘 Philosophy

This project is built around the idea that yoga sequencing is:

> A structured system of movement, breath, and intention — not just a list of poses.

---

## 📌 Status

🚧 Early-stage development (MVP phase)

---

## 🤝 Contributing

This is currently a solo project, but contributions may open in the future.

---

## 📜 License

MIT

# 🚀 Getting Started


## 1. Clone the repository


```bash
git clone https://github.com/yourusername/yoga-sequencing-app.git
cd matflow
```


## 2. Install dependencies
```bash
npm install
```


## 3. Add environment variables
```bash
Create a .env.local file:


STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_URL=http://localhost:3000
MONGODB_URI=your_mongo_connection
```


## 4. Run the development server
```bash
npm run dev
```
