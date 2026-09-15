# App Design Guide (Super Simple Version!)

This document explains what every file in our app does. It is written so simply that even a 5-year-old could understand it! We will update this file every time we add or change something big.

## 🚪 Auth (Logging In & Signing Up)

These files are the "front door" of our app. You have to pass through here to get inside!

- **`app/(auth)/create-account.tsx`**: The page where you tell us your name, email, password, birthday, gender, and address so we can make a special key just for you! It also has a smart button that stays locked until you promise to follow our rules.
- **`app/(auth)/signup.tsx`**: The page where you choose Student or Tutor. It safely remembers the choice and opens the login page.
- **`app/(auth)/login.tsx`**: The page where you use your special key (email and password) or tap the Google button to open the door and come inside automatically! It sends students to the student home and tutors to the tutor home.
- **Login email rule**: The login box asks for the same email used during sign-up because Supabase password login uses email, not username.
- **`app/(auth)/verify_email.tsx`**: The page where you prove your email is really yours by typing in a secret 6-digit code we sent to your mailbox, or asking us to resend a new code.

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
- **`components/haptic-tab.tsx`**: A tab button that uses Expo Router's navigation pieces and gives a tiny tap feeling on iPhones.
- **Screen shadows**: Cards and buttons use the newer `boxShadow` style so the app looks good on the web without warning messages.

## ☁️ Database (The Giant Memory Box)

These files talk to our computer in the sky that remembers everything.

- **`supabase/supabaseClient.ts`**: The magical phone wire that connects our app to the giant memory box in the sky.
- **`supabase/authService.ts`**: The friendly guard who checks your password, lets you sign in with Google, sends secret verification numbers to your email, and makes sure you are allowed to enter. Google sign-in remembers the chosen role and returns to the login page through a safe app link.
- **`constants/api/api.ts`**: The signpost that tells the app where the FastAPI backend lives. It uses the right local address for a browser or Android emulator and allows a real device address through `EXPO_PUBLIC_BACKEND_URL`.
- **`supabase/authService.ts`**: After a new account receives a session, it also sends the matching student or tutor profile to the backend with the safe login token.
