# App Design Guide (Super Simple Version!)

This document explains what every file in our app does. It is written so simply that even a 5-year-old could understand it! We will update this file every time we add or change something big.

## 🧹 Project Setup

- **`package.json` and `package-lock.json`**: These files now have one clean list of Expo packages, so the app can read its instructions and start without seeing leftover merge-conflict marks.
- **Expo package versions**: The main Expo package and Expo Router now use the same SDK family, so they can find each other's tools and start the app together.
- **Tutor screens**: Tutor profile, earnings, and sessions no longer contain unfinished merge notes, so the app can turn their screens into Android code.
- **Vercel web build**: Vercel now runs Expo's web export and publishes the `dist` folder, so the website has a real home page instead of an empty folder.
- **Vercel page links**: Vercel removes `.html` from web page links and keeps URLs without a final slash, so links like `/login` point to the exported pages.

- **Template leftovers removed**: the unused Expo starter pages (`app/(tabs)`, `app/modal.tsx`) and the starter components they used are gone. `(tabs)/index.tsx` shared the `/` address with our splash screen, so removing it also removes that clash.

## 🚪 Auth (Logging In & Signing Up)

These files are the "front door" of our app. You have to pass through here to get inside!

- **`app/(auth)/create-account.tsx`**: The page where you tell us your name, email, password, birthday, gender, and address so we can make a special key just for you! It sends everything to the backend in **one** letter (`POST /auth/signup`), which makes your account **and** your student or tutor card together. When it works, you go straight to the **sign-in** page (or to the email-code page first, if your email still needs checking). Any mistake is written in red under the form instead of a pop-up, because pop-ups do not show on the web. On the web the birthday box is the browser's own calendar picker. The Student/Tutor chip starts on whatever you picked on the welcome page.
- **`app/(auth)/signup.tsx`**: The page where you choose Student or Tutor. It remembers the choice (so the create-account page can pre-select it) and opens the login page.
- **`app/(auth)/login.tsx`**: The page where you use your special key (email and password) to come inside. After Supabase says "yes", the app asks the backend **"who am I?"** (`GET /profiles/me`) and the backend answers **student** or **tutor** by looking in the database tables — that answer decides which home you see. If your email is not confirmed yet, it sends you to the code page.
- **`app/(auth)/verify_email.tsx`**: The page where you type the 6-digit code from your email. When the code is right you go to the **sign-in** page.
- **`lib/notify.ts`**: A tiny helper called `showMessage`. On phones it shows a normal pop-up; on the web it uses the browser's own message box, because React Native pop-ups are invisible there. Rule: never put "go to another page" inside a pop-up button.
- **`supabase/authService.ts`**: All the account helpers in one place: `registerUser` (talks to the backend signup), `loginUser` (Supabase sign-in, then "who am I?"), `fetchMyProfile`, `logoutUser`, and the email-code helpers. It also turns backend error lists into one readable sentence.
- **`hooks/useProfile.ts`**: A small hook every screen can call to get the real signed-in person (name, email, role, photo) from the backend.
- **`app/index.tsx`**: The splash screen. After the animation it checks if you are already signed in: if yes, it opens your home straight away; if not, it opens the welcome page.

## 👤 Real names instead of pretend names

The student home, student profile, settings, tutor home, and tutor profile screens now show the **real** signed-in person's name, email, and photo (from `useProfile`). Before, they showed a made-up "Ravindu Munasinghe" no matter who logged in.

The tutor profile and tutor help pages are now called `tutor-profile.tsx` and `tutor-help-center.tsx`. Before, the student and tutor pages shared the same web address (`/profile`), so a tutor tapping their picture opened the **student** page.

Logging out now really signs out of Supabase before going back to the login page.

- **Login email rule**: The login box asks for the same email used during sign-up because Supabase password login uses email, not username.
- **`app/(auth)/verify_email.tsx`**: The page where you prove your email is really yours by typing in a secret 6-digit code we sent to your mailbox, or asking us to resend a new code.
- **Signup success path**: When the backend gives back the new profile, students go to the student home and tutors go to the tutor home. If email checking is still needed, the app shows the code page first.

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
- **`supabase/authService.ts`**: The friendly guard who checks your password, sends secret verification numbers to your email, and makes sure you are allowed to enter.

- **`constants/api/api.ts`**: The signpost that tells the app where the FastAPI backend lives. It uses the right local address for a browser or Android emulator and allows a real device address through `EXPO_PUBLIC_BACKEND_URL`.
- **`supabase/authService.ts`**: After a new account receives a session, it also sends the matching student or tutor profile to the backend with the safe login token.
