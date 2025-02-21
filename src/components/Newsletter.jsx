import React, { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const sendConfirmationEmail = async (email) => {
    const emailData = {
      to: email,
      subject: "Confirmation d'inscription à la newsletter Akirrran",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">Merci de votre inscription !</h1>
          <p>Bonjour,</p>
          <p>Nous sommes ravis de vous compter parmi nos abonnés. Vous recevrez désormais nos dernières actualités et offres exclusives.</p>
          <p>À très bientôt,</p>
          <p>L'équipe Akirrran</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>Pour vous désabonner, cliquez <a href="https://akirrran.com/unsubscribe?email=${email}">ici</a></p>
            <p>Akirrran - 2 Boulevard de Belgique - 98000 Monaco</p>
          </div>
        </div>
      `
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }

      return true;
    } catch (error) {
      console.error('Erreur:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setStatus('');

    try {
      const emailSent = await sendConfirmationEmail(email);
      
      if (emailSent) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      setStatus('error');
    }

    setIsLoading(false);
  };

  return (
    <div className="newsletter">
      <div className="logo-footer">
        <h1>Akirrran&copy;</h1>
      </div>
      <p id="newsletter-text">
        Recevez les dernières mises à jour sur nos produits et les meilleures réductions
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email ici"
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
      {status === 'success' && (
        <p className="newsletter-message success">
          Merci pour votre inscription ! Un email de confirmation vous a été envoyé.
        </p>
      )}
      {status === 'error' && (
        <p className="newsletter-message error">
          Une erreur s'est produite. Veuillez réessayer.
        </p>
      )}
    </div>
  );
}

export default Newsletter; 