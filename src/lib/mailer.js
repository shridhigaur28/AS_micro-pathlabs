import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendAdminNotification = async (appointment) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail || !process.env.SMTP_USER) {
    console.warn('Email credentials not configured properly. Skipping email notification.');
    return;
  }

  const htmlBody = `
    <h2>New Appointment Request — ${appointment.name}</h2>
    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><td><strong>Patient Name</strong></td><td>${appointment.name}</td></tr>
      <tr><td><strong>Mobile Number</strong></td><td>${appointment.mobile}</td></tr>
      <tr><td><strong>Email</strong></td><td>${appointment.email || 'N/A'}</td></tr>
      <tr><td><strong>City / Area</strong></td><td>${appointment.city}</td></tr>
      <tr><td><strong>Booking Type</strong></td><td>${appointment.bookingType === 'package' ? 'Health Package' : 'Individual Test'}</td></tr>
      ${appointment.testCategory ? `<tr><td><strong>Health Condition</strong></td><td>${appointment.testCategory}</td></tr>` : ''}
      <tr><td><strong>Test Required</strong></td><td>${appointment.testRequired}</td></tr>
      <tr><td><strong>Preferred Date</strong></td><td>${new Date(appointment.preferredDate).toLocaleDateString()}</td></tr>
      <tr><td><strong>Preferred Time Slot</strong></td><td>${appointment.preferredTimeSlot}</td></tr>
      <tr><td><strong>Collection Type</strong></td><td>${appointment.collectionType === 'home' ? 'Home Collection' : 'In-Clinic Visit'}</td></tr>
      <tr><td><strong>Message</strong></td><td>${appointment.message || 'N/A'}</td></tr>
      <tr><td><strong>Submitted At</strong></td><td>${new Date().toLocaleString()}</td></tr>
    </table>
    <br/>
    <p><em>Please call the patient to confirm the appointment.</em></p>
  `;

  try {
    await transporter.sendMail({
      from: `"AS MICRO & PATH LABS" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Appointment Request — ${appointment.name}`,
      html: htmlBody,
    });
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};
