import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

router.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    const mailOptions = {
      from: '"Akirrran" <noreply.adm.akiirranshop@gmail.com>',
      to,
      subject,
      html
    };
    

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
});

export default router; 