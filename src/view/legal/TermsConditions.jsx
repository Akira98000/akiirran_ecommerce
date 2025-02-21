import React from 'react';

function TermsConditions() {
  return (
    <div className="legal-container">
      <h1>Conditions Générales d'Utilisation</h1>
      <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du site et des services par Akirrran et de définir les conditions d'accès et d'utilisation des services par l'Utilisateur.
        </p>
      </section>

      <section>
        <h2>2. Mentions légales</h2>
        <p>
          L'édition et la direction de la publication du site Akirrran est assurée par Akirrran SAS, domiciliée 2 Boulevard de Belgique - 98000 Monaco.
          <br />
          Numéro de téléphone : +377 98 76 54 32
          <br />
          Adresse e-mail : contact@akirran.com
        </p>
      </section>

      <section>
        <h2>3. Accès au site</h2>
        <p>
          Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.
        </p>
      </section>

      <section>
        <h2>4. Collecte des données</h2>
        <p>
          Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion de la relation client. Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au Règlement européen n°2016/679/UE du 27 avril 2016, vous bénéficiez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données.
        </p>
      </section>

      <section>
        <h2>5. Propriété intellectuelle</h2>
        <p>
          Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son...) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
        </p>
      </section>

      <section>
        <h2>6. Responsabilité</h2>
        <p>
          Les sources des informations diffusées sur le site Akirrran sont réputées fiables mais le site ne garantit pas qu'il soit exempt de défauts, d'erreurs ou d'omissions.
        </p>
      </section>

      <section>
        <h2>7. Cookies</h2>
        <p>
          L'Utilisateur est informé que lors de ses visites sur le site, un cookie peut s'installer automatiquement sur son logiciel de navigation. Pour plus d'informations, veuillez consulter notre Politique relative aux cookies.
        </p>
      </section>

      <section>
        <h2>8. Droit applicable et juridiction compétente</h2>
        <p>
          La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents.
        </p>
      </section>
    </div>
  );
}

export default TermsConditions; 