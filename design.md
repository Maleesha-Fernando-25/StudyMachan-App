# App Design Guide (Super Simple Version!)

This document explains what every file in our app does. It is written so simply that even a 5-year-old could understand it! We will update this file every time we add or change something big.

## 🚪 Auth (Logging In & Signing Up)

These files are the "front door" of our app. You have to pass through here to get inside!

- **`app/(auth)/create-account.tsx`**: The page where you tell us your name, email, password, birthday, gender, and address so we can make a special key just for you! It also has a smart button that stays locked until you promise to follow our rules.
- **`app/(auth)/login.tsx`**: The page where you use your special key (email and password) to open the door and come inside.
- **`app/(auth)/verify_email.tsx`**: The page where you prove your email is really yours by typing in a secret code we sent you.
- **`app/(auth)/terms_and_conditions.tsx`**: The page with the boring rules you promise to follow.

## 🎒 Student Area

These files are only for students who want to learn!

- **`app/(student)/student-home.tsx`**: The student's main playground where they can see what to do next.
- **`app/(student)/schedule.tsx`**: A big calendar that tells the student when it's time to learn.
- **`app/(student)/profile.tsx`**: A mirror that shows the student's own picture and info.
- **`app/(student)/stay-focus.tsx`**: A special tool that helps students pay attention and not get distracted.
- **`app/(student)/alerts.tsx`**: The bell that rings when a student has a new message or reminder.

## 👩‍🏫 Tutor (Teacher) Area

These files are only for the teachers who help students!

- **`app/(tutor)/tutor-home.tsx`**: The teacher's main desk where they organize their day.
- **`app/(tutor)/sessions.tsx`**: The teacher's list of classes they have to teach.
- **`app/(tutor)/earnings.tsx`**: The piggy bank page where teachers see how much money they earned!
- **`app/(tutor)/messages.tsx`**: The mailbox where teachers can talk to their students.

## 🧱 Components (Building Blocks)

These are tiny LEGO pieces we use to build the whole app!

- **`components/common/AppButton.tsx`**: A colorful button that you can tap with your finger to make things happen.
- **`components/hello-wave.tsx`**: A little waving hand to say hello!

## ☁️ Database (The Giant Memory Box)

These files talk to our computer in the sky that remembers everything.

- **`supabase/supabaseClient.ts`**: The magical phone wire that connects our app to the giant memory box in the sky.
- **`supabase/authService.ts`**: The guard who checks your password and makes sure you are allowed to enter.
