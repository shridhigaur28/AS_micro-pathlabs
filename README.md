# AS MICRO & PATH LABS

A modern, professional, fully responsive lead collection website for a pathology and diagnostic lab built with Next.js (App Router), Tailwind CSS, and MongoDB.

## Features
- Fully responsive design using Tailwind CSS
- Advanced contact form with dynamic appointment booking
- MongoDB integration for storing appointment requests
- Nodemailer integration for admin email notifications
- Interactive sections (Hero, Services, Facilities, Testimonials, About)
- Floating WhatsApp chat button

## Setup Instructions

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd project_2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory (one is provided with placeholders). You need to update it with your real credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_EMAIL=admin@asmicropathlabs.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   NEXT_PUBLIC_WHATSAPP_NUMBER=919602753579
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Notes
- This project is configured to run out-of-the-box on Vercel. 
- Make sure you add all the environment variables in the Vercel dashboard (`Settings` -> `Environment Variables`) before deploying.
- Ensure your MongoDB instance allows connections from your deployment IP (0.0.0.0/0 for Vercel).
