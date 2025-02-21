import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="legal-container">
      <h1>Politique de Confidentialité</h1>
      <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <section>
        <h2>1. Collecte des données personnelles</h2>
        <p>
          Nous collectons les données personnelles suivantes :
        </p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Adresse postale</li>
          <li>Numéro de téléphone</li>
          <li>Données de paiement (cryptées)</li>
          <li>Historique des commandes</li>
          <li>Préférences de navigation</li>
        </ul>
      </section>

      <section>
        <h2>2. Utilisation des données</h2>
        <p>
          Vos données sont collectées pour les finalités suivantes :
        </p>
        <ul>
          <li>Gestion des commandes et de la relation client</li>
          <li>Envoi de newsletters (avec votre consentement)</li>
          <li>Amélioration de nos services</li>
          <li>Prévention de la fraude</li>
          <li>Respect de nos obligations légales</li>
        </ul>
      </section>

      <section>
        <h2>3. Base légale du traitement</h2>
        <p>
          Le traitement de vos données personnelles est justifié par :
        </p>
        <ul>
          <li>Votre consentement</li>
          <li>L'exécution du contrat entre vous et nous</li>
          <li>Le respect de nos obligations légales</li>
          <li>Notre intérêt légitime (amélioration de nos services)</li>
        </ul>
      </section>

      <section>
        <h2>4. Durée de conservation</h2>
        <p>
          Nous conservons vos données personnelles pour la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, augmentée de la durée de conservation imposée par les règles applicables.
        </p>
      </section>

      <section>
        <h2>5. Vos droits</h2>
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
        </p>
        <ul>
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement (droit à l'oubli)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité</li>
          <li>Droit d'opposition</li>
          <li>Droit de retirer votre consentement à tout moment</li>
        </ul>
      </section>

      <section>
        <h2>6. Sécurité</h2>
        <p>
          Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données personnelles contre la perte, l'accès non autorisé, la modification ou la divulgation non autorisée.
        </p>
      </section>

      <section>
        <h2>7. Transfert de données</h2>
        <p>
          Vos données peuvent être transférées à nos sous-traitants situés dans l'Union Européenne. Aucun transfert hors UE n'est réalisé sans garanties appropriées conformément au RGPD.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          Pour toute question relative à la protection de vos données ou pour exercer vos droits, vous pouvez contacter notre Délégué à la Protection des Données :
          <br />
          Email : dpo@akirran.com
          <br />
          Adresse : 2 Boulevard de Belgique - 98000 Monaco
        </p>
        <p>
          Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy; 