export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "delai",
    question: "Combien de temps faut-il pour livrer un site ?",
    answer:
      "Selon la complexité du projet, comptez entre 4 et 10 semaines — de la phase de conception au lancement. Un planning détaillé vous est partagé dès le devis.",
  },
  {
    id: "services",
    question: "Quels services propose AKNO ?",
    answer:
      "UX/UI design, développement web, direction artistique, accompagnement mensuel et optimisation SEO & performance. Nous accompagnons votre projet de A à Z ou sur des missions ciblées.",
  },
  {
    id: "process",
    question: "Comment se déroule un projet ?",
    answer:
      "Échange initial, proposition sur mesure, validation du design, développement itératif avec points réguliers, puis mise en ligne et suivi post-lancement.",
  },
  {
    id: "devis",
    question: "Le devis est-il gratuit ?",
    answer:
      "Oui. Nous répondons sous 24h avec une proposition claire, sans engagement. Chaque devis est adapté à vos objectifs et à votre budget.",
  },
  {
    id: "clients",
    question: "Travaillez-vous avec toutes les tailles d'entreprise ?",
    answer:
      "Oui — startups, PME, marques établies ou créateurs indépendants. L'important, c'est un projet avec une vraie ambition digitale.",
  },
];
