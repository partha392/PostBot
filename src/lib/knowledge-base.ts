export type Knowledge = {
  id: string;
  category: 'Savings & Investment Accounts' | 'Postal Facilities' | 'Other';
  keywords: string[];
  title: string;
  information: string;
  sourceUrl: string;
};

const knowledgeBase: Knowledge[] = [
  {
    id: 'scss',
    category: 'Savings & Investment Accounts',
    keywords: ['scss', 'senior', 'citizen', 'savings', 'scheme'],
    title: 'Senior Citizen Savings Scheme (SCSS)',
    information: `
      - Eligibility: Individuals aged 60 years or above.
      - Interest Rate: 8.2% per annum, paid quarterly.
      - Investment Limit: Minimum INR 1,000, Maximum INR 30 lakh.
      - Tenure: 5 years, can be extended for another 3 years.
      - Tax Benefits: Investment qualifies for deduction under Section 80C of the Income Tax Act.
    `,
    sourceUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',
  },
  {
    id: 'mis',
    category: 'Savings & Investment Accounts',
    keywords: ['mis', 'monthly', 'income', 'scheme'],
    title: 'Post Office Monthly Income Scheme (MIS)',
    information: `
      - Interest Rate: 7.4% per annum, paid monthly.
      - Investment Limit: Maximum INR 9 lakh in a single account; INR 15 lakh in a joint account.
      - Tenure: 5 years.
      - Feature: Provides a regular monthly income to investors.
    `,
    sourceUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',
  },
  {
    id: 'nsc',
    category: 'Savings & Investment Accounts',
    keywords: ['nsc', 'national', 'savings', 'certificate'],
    title: 'National Savings Certificates (NSC)',
    information: `
      - Interest Rate: 7.7% compounded annually but payable at maturity.
      - Investment Limit: Minimum INR 1,000, no maximum limit.
      - Tenure: 5 years.
      - Tax Benefits: Investment qualifies for deduction under Section 80C. Interest earned is reinvested and also eligible for Section 80C deduction (except for the last year).
    `,
    sourceUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',
  },
  {
    id: 'kvp',
    category: 'Savings & Investment Accounts',
    keywords: ['kvp', 'kisan', 'vikas', 'patra'],
    title: 'Kisan Vikas Patra (KVP)',
    information: `
      - Feature: Investment doubles in 115 months (9 years and 7 months).
      - Interest Rate: 7.5% compounded annually.
      - Investment Limit: Minimum INR 1,000, no maximum limit.
      - Transferable: Can be transferred from one person to another.
    `,
    sourceUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',
  },
  {
    id: 'speedpost',
    category: 'Postal Facilities',
    keywords: ['speed', 'post', 'parcel', 'delivery', 'courier'],
    title: 'Speed Post',
    information: `
      - Service: Fast and reliable delivery of documents and parcels.
      - Network: Covers the entire country.
      - Tracking: Provides online tracking facility.
      - Insurance: Option for insurance up to INR 1 lakh.
    `,
    sourceUrl: 'https://www.indiapost.gov.in/vas/Pages/Content/Speed-Post.aspx',
  },
];

export const getKnowledgeForQuery = (query: string, category: string): { information: string; sourceUrls: string[] } => {
  const queryLower = query.toLowerCase();
  const matchedEntries = knowledgeBase.filter(
    (entry) =>
      entry.category === category &&
      entry.keywords.some((keyword) => queryLower.includes(keyword))
  );

  if (matchedEntries.length === 0) {
    return { information: '', sourceUrls: [] };
  }

  const information = matchedEntries
    .map((entry) => `## ${entry.title}\n${entry.information}`)
    .join('\n\n');
  const sourceUrls = [...new Set(matchedEntries.map((entry) => entry.sourceUrl))];

  return { information, sourceUrls };
};

export const SCHEME_ACRONYMS = [...new Set(knowledgeBase.flatMap(item => item.keywords.filter(k => k.length > 1 && k.length < 5)))];
