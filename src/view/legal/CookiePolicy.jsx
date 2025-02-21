import React from 'react';

function CookiePolicy() {
  return (
    <div className="legal-container">
      <h1>Politique relative aux Cookies</h1>
      <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <section>
        <h2>1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou mobile) lors de la visite d'un site web. Il permet au site de mémoriser des informations sur votre visite, comme votre langue préférée et d'autres paramètres.
        </p>
      </section>

      <section>
        <h2>2. Pourquoi utilisons-nous des cookies ?</h2>
        <p>
          Nous utilisons différents types de cookies pour les finalités suivantes :
        </p>
        <ul>
          <li>
            <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification, panier d'achat)
          </li>
          <li>
            <strong>Cookies de performance :</strong> Pour améliorer les performances et l'expérience utilisateur
          </li>
          <li>
            <strong>Cookies de fonctionnalité :</strong> Pour mémoriser vos préférences et personnaliser votre expérience
          </li>
          <li>
            <strong>Cookies analytiques :</strong> Pour comprendre comment les visiteurs utilisent notre site
          </li>
          <li>
            <strong>Cookies publicitaires :</strong> Pour diffuser des publicités pertinentes (avec votre consentement)
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Liste des cookies utilisés</h2>
        <div className="cookie-table">
          <table>
            <thead>
              <tr>
                <th>Nom du cookie</th>
                <th>Finalité</th>
                <th>Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>session_id</td>
                <td>Gestion de la session utilisateur</td>
                <td>Session</td>
              </tr>
              <tr>
                <td>cart_items</td>
                <td>Sauvegarde du panier</td>
                <td>30 jours</td>
              </tr>
              <tr>
                <td>language</td>
                <td>Préférence de langue</td>
                <td>1 an</td>
              </tr>
              <tr>
                <td>_ga</td>
                <td>Analyse d'audience (Google Analytics)</td>
                <td>13 mois</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>4. Vos choix concernant les cookies</h2>
        <p>
          Conformément aux recommandations de la CNIL, vous pouvez configurer votre navigateur pour :
        </p>
        <ul>
          <li>Accepter ou refuser les cookies</li>
          <li>Être alerté lors de la réception d'un cookie</li>
          <li>Supprimer régulièrement les cookies</li>
        </ul>
        <p>
          Pour gérer les cookies selon votre navigateur, consultez :
        </p>
        <ul>
          <li>Chrome : chrome://settings/cookies</li>
          <li>Firefox : about:preferences#privacy</li>
          <li>Safari : Préférences & Confidentialité</li>
          <li>Edge : edge://settings/privacy</li>
        </ul>
      </section>

      <section>
        <h2>5. Durée de conservation</h2>
        <p>
          Les cookies ont une durée de vie limitée qui varie selon leur finalité. Conformément aux recommandations de la CNIL :
        </p>
        <ul>
          <li>Les cookies de mesure d'audience sont conservés 13 mois maximum</li>
          <li>Les cookies de session expirent à la fermeture du navigateur</li>
          <li>Les autres cookies sont conservés 6 mois maximum</li>
        </ul>
      </section>

      <section>
        <h2>6. Mise à jour de notre politique</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications prendront effet immédiatement après leur publication sur notre site.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          Pour toute question concernant notre utilisation des cookies, contactez-nous à :
          <br />
          Email : privacy@akirran.com
          <br />
          Adresse : 2 Boulevard de Belgique - 98000 Monaco
        </p>
      </section>
    </div>
  );
}

export default CookiePolicy; 