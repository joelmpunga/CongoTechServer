import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Terms() {
    const Section = ({ title, children }) => (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 uppercase text-blue-700">{title}</h3>
          <p className="text-justify leading-relaxed">{children}</p>
        </div>
      );
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-gray-900">
          <h1 className="text-2xl font-bold text-center mb-6 uppercase">
            Contrat de Prestation de Services
          </h1>
          <h2 className="text-xl font-semibold text-center mb-4">
            Développement d’une Application Web d’Archivage
          </h2>
    
          <p className="mb-4">
            <strong>Entre les soussignés :</strong><br />
            <strong>M. Joël MPUNGA ILUNGA</strong>, développeur web indépendant,
            demeurant à N°12 route KASUMBALESA, Commune Annexe, Lubumbashi, ci-après
            désigné « le Prestataire »,<br />
            <strong>Et</strong><br />
            <strong>M. Jérémie MUGANZA KAHOZI</strong>, représentant légal de
            l’entreprise Inspection Principale Provinciale, sise au 105 Avenue des
            Chutes, Quartier MAKUTANO, Commune Lubumbashi, Ville de Lubumbashi, ci-après
            désigné « le Client ».
          </p>
    
          <Section title="Article 1 – Objet du contrat">
            Le présent contrat a pour objet la réalisation et la livraison par le Prestataire
            d'une application web d'archivage, développée spécifiquement pour les besoins du Client.
          </Section>
    
          <Section title="Article 2 – Délais d’exécution">
            Le délai de livraison de l’application est fixé par le Client au <strong>10 mai 2025</strong>,
            en concertation avec le concepteur. Par ailleurs, un délai d’utilisation de l’application
            est défini par le concepteur, ce qui implique qu’à la date définie, l’application expire
            automatiquement. Seul le concepteur est habilité à prolonger ce délai.
            <br />
            Le Client pourra effectuer une mise à jour selon les instructions fournies par le Prestataire.
            Cette disposition vise à limiter les risques de duplication ou de diffusion non autorisée du projet.
          </Section>
    
          <Section title="Article 3 – Droits d’utilisation">
            L’application livrée est destinée à un usage strictement interne à l’entreprise du Client,
            et exclusivement pour les services ou structures pour lesquels elle a été conçue.
            <ul className="list-disc list-inside mt-2">
              <li>Revendre, louer, céder ou mettre à disposition l’application à d'autres entreprises, services ou tiers est interdit.</li>
              <li>Il est interdit d’en faire bénéficier toute autre structure sans accord écrit du Prestataire.</li>
            </ul>
          </Section>
    
          <Section title="Article 4 – Améliorations et évolutions">
            Toute amélioration majeure de l’application (ajout de fonctionnalités, refonte graphique,
            migration technologique, etc.) souhaitée par le Client après livraison fera l’objet d’une
            facturation distincte, selon un devis préalable validé par les deux parties.
          </Section>
    
          <Section title="Article 5 – Accès Super Administrateur">
            À la demande expresse du Client, le Prestataire pourra intervenir en qualité de Super Administrateur
            de l’application, pour des besoins de maintenance, sécurité ou supervision technique. Cette intervention
            pourra être ponctuelle ou continue, selon les modalités définies entre les parties.
          </Section>
    
          <Section title="Article 6 – Livraison et acceptation">
            Le Prestataire s’engage à livrer l’application dans les délais convenus. Le Client disposera
            d’un délai de <strong>trente (30) jours</strong> pour procéder aux tests et notifier tout dysfonctionnement ou ajustement souhaité.
          </Section>
    
          <Section title="Article 7 – Confidentialité">
            Le Prestataire s’engage à respecter la confidentialité de toutes les données, codes, documents,
            ou informations échangés dans le cadre de ce projet, pendant la durée du contrat ainsi qu’après sa résiliation ou son expiration.
          </Section>
    
          <div className="mt-10">
            <p className="mb-2">Fait à <strong>Lubumbashi</strong>, le <strong>06 mai 2025</strong></p>
            <p className="mb-2">En deux exemplaires originaux, signés par les parties.</p>
            <div className="flex justify-between mt-8">
              <div>
                <p className="font-semibold">Le Prestataire</p>
                <p>Joël MPUNGA ILUNGA</p>
                <p className="italic">(Signature)</p>
              </div>
              <div>
                <p className="font-semibold">Le Client</p>
                <p>Jérémie MUGANZA KAHOZI</p>
                <p className="italic">(Signature)</p>
              </div>
            </div>
          </div>
        </div>
      );
}