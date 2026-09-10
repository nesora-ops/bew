import type { Certification } from "./types";

/**
 * The seven certification pathways.
 *
 * Source: BEW_Consolidated_Deduplicated.md §1 "Our Certifications" and
 * §9 "Seven Certifications — Detailed Hub Content".
 *
 * Investment figures and several industry-impact statistics are placeholders in the
 * source and are preserved as such — see the Master Placeholder & Launch Checklist.
 */
export const certifications: Certification[] = [
  {
    slug: "water-neutral",
    name: "Water Neutral Certification",
    shortName: "Water Neutral",
    tagline: "Prove your supply chain is water-secure.",
    category: "environmental",
    description:
      "Demonstrate that you have eliminated water stress in your operations and value chain.",
    audience: [
      "Manufacturers",
      "Food & Beverage companies",
      "Exporters",
      "Agriculture operators",
      "Hospitality providers",
      "Textile & Apparel brands",
    ],
    industryImpact:
      "Water stress affects supply chains across industries. The certification verifies that organizations have identified and eliminated water risk in their operations and value chain.",
    assessmentCriteria: [
      "Water consumption baseline and footprint across Scopes 1, 2, and 3",
      "Water-risk mapping, including supply-chain geography, seasonal stress, and regulatory risk",
      "Water-efficiency initiatives and technology, including recycling, rainwater harvesting, and process optimization",
      "Supplier water management and verification",
      "Stakeholder engagement with communities, regulators, and NGOs",
      "Monitoring, reporting, and continuous improvement",
    ],
    timeline: "10–12 weeks",
    validity: "3 years with annual recertification",
    investment: "[Small org $X | Mid-size $Y | Large org $Z]",
    keyBenefit:
      "Demonstrate to investors, customers, and regulators that operations and supply chains are resilient to water stress.",
    comparison: {
      primaryIndustries: "Manufacturers, F&B, Export, Agriculture",
      smallOrgInvestment: "$X",
      keyStakeholder: "Investors, Customers, Communities",
    },
  },
  {
    slug: "green-real-estate",
    name: "Green Real Estate Certification",
    shortName: "Green Real Estate",
    tagline: "Build and operate for resilience.",
    category: "environmental",
    description:
      "Verify that buildings meet energy efficiency, waste reduction, and resilience standards.",
    audience: [
      "Property developers",
      "Commercial real estate owners",
      "Facility managers",
      "Hospitality operators",
      "Retail & logistics operators",
      "Educational institutions",
      "Healthcare facilities",
    ],
    industryImpact:
      "The source states that buildings account for [X]% of global emissions and consume [Y]% of water.",
    assessmentCriteria: [
      "Energy performance, including baseline, consumption, renewable integration, and efficiency upgrades",
      "Building materials and embodied carbon, including lifecycle assessment, sourcing, and waste diversion",
      "Water systems and management, including fixtures, landscaping, stormwater, and rainwater",
      "Indoor environmental quality, including air quality, lighting, thermal comfort, and health",
      "Waste management and circular-economy practices",
      "Climate resilience and risk mitigation",
      "Tenant engagement and operational practices",
    ],
    timeline: "12–14 weeks, including site inspection",
    validity: "3 years with annual recertification",
    investment: "[Small org $X | Mid-size $Y | Large org $Z]",
    keyBenefit:
      "Signal to tenants, investors, and capital markets that the property is built for the future and addresses ESG factors affecting investment and tenant decisions.",
    comparison: {
      primaryIndustries: "Developers, Property Owners, Facility Management",
      smallOrgInvestment: "$X",
      keyStakeholder: "Tenants, Investors, Customers",
    },
    note: "Building emissions and water-consumption figures require verification before publication.",
  },
  {
    slug: "csr-impact",
    name: "CSR Impact Certification",
    shortName: "CSR Impact",
    tagline: "Measure and verify social impact.",
    category: "social",
    description:
      "Prove that community investment creates measurable, sustained social value through community investment, equity, and stakeholder accountability.",
    audience: [
      "Corporations with CSR programmes",
      "NGOs and social enterprises",
      "Foundations and impact investors",
      "Government agencies",
      "Community development organizations",
      "Industry associations",
    ],
    industryImpact:
      "The source frames corporate social responsibility as a governance and strategic imperative and positions the certification as verification that community investment creates measurable, sustained social value aligned with business strategy.",
    assessmentCriteria: [
      "Impact strategy and alignment with business goals and SDGs",
      "Community needs assessment and stakeholder engagement",
      "Programme design, implementation, and governance",
      "Outcome measurement and impact evaluation",
      "Financial sustainability and resource efficiency",
      "Equity, inclusion, and accountability to beneficiaries",
      "Scalability and systems thinking",
      "Transparency and public reporting",
    ],
    timeline: "10–12 weeks",
    validity: "3 years with annual recertification",
    investment: "[Small org $X | Mid-size $Y | Large org $Z]",
    keyBenefit:
      "Prove to employees, shareholders, and regulators that social investment is strategically managed, outcome-focused, and creating value in communities.",
    comparison: {
      primaryIndustries: "Corporates, NGOs, Foundations",
      smallOrgInvestment: "$X",
      keyStakeholder: "Communities, Employees, Regulators",
    },
  },
  {
    slug: "green-hospitality",
    name: "Green Hospitality Certification",
    shortName: "Green Hospitality",
    tagline: "Hospitality with purpose.",
    category: "environmental",
    description:
      "Demonstrate sustainable operations and guest education leadership in hospitality.",
    audience: [
      "Hotels & Resorts",
      "Restaurants & Food Service",
      "Tourism operators & travel companies",
      "Cruise lines & shipping",
      "Event venues & conference centres",
    ],
    industryImpact:
      "The source states that hospitality and tourism account for [X]% of global emissions and [Y]% of water consumption.",
    assessmentCriteria: [
      "Operational sustainability: energy, water, waste, emissions, and procurement",
      "Supply-chain sustainability and supplier standards",
      "Guest education and engagement programmes",
      "Staff training and awareness",
      "Community relationships and local benefit",
      "Certifications and partnerships with environmental organizations",
      "Transparency and reporting",
      "Innovation and continuous improvement",
    ],
    timeline: "8–10 weeks",
    validity: "3 years with annual recertification",
    investment: "[Small org $X | Mid-size $Y | Large org $Z]",
    keyBenefit:
      "Differentiate the hospitality brand by proving responsible operations and active guest engagement in sustainability.",
    comparison: {
      primaryIndustries: "Hotels, Restaurants, Tourism",
      smallOrgInvestment: "$X",
      keyStakeholder: "Guests, Travel Planners, Investors",
    },
    note: "Hospitality emissions and water-consumption figures require verification before publication.",
  },
  {
    slug: "low-carbon-product",
    name: "Low Carbon Product Certification",
    shortName: "Low Carbon Product",
    tagline: "Prove your product's carbon footprint.",
    category: "environmental",
    description:
      "Meet science-backed carbon intensity standards across the product lifecycle.",
    audience: [
      "Manufacturers",
      "Consumer brands",
      "Exporters",
      "Chemical & specialty materials companies",
      "Electronics & appliance makers",
      "Construction & building materials producers",
    ],
    industryImpact:
      "The source states that supply-chain emissions (Scope 3) represent [X]% of product carbon footprint but are often poorly understood.",
    assessmentCriteria: [
      "Lifecycle assessment covering raw materials, production, transport, use, and end-of-life",
      "Baseline carbon footprint and peer benchmarking",
      "Emission-reduction initiatives in production and supply chain",
      "Renewable energy and alternative-material integration",
      "Third-party verification of claims",
      "Transparency in product labelling and communication",
      "Supply-chain engagement and supplier standards",
      "Continuous-improvement targets",
    ],
    timeline: "12–14 weeks",
    validity: "3 years with annual recertification",
    investment: "[Small org $X | Mid-size $Y | Large org $Z]",
    keyBenefit:
      "Prove to B2B customers and investors that products are genuinely lower-carbon than industry peers. The source also positions the badge as useful for premium pricing, enterprise contracts, and regulated markets.",
    comparison: {
      primaryIndustries: "Manufacturers, Brands, Exporters",
      smallOrgInvestment: "$X",
      keyStakeholder: "B2B Customers, Investors",
    },
    note: "The Scope 3 share of product carbon footprint requires verification before publication.",
  },
  {
    slug: "carbon-neutral-product",
    name: "Carbon Neutral Product Certification",
    shortName: "Carbon Neutral Product",
    tagline: "Zero-net carbon across your lifecycle.",
    category: "environmental",
    description:
      "Achieve verified, measurable carbon neutrality from raw materials to end-of-life.",
    audience: [
      "Premium & luxury brands",
      "Export leaders",
      "Food & Beverage brands targeting conscious consumers",
      "Specialty and high-value products",
      "B2B companies with sustainability-focused customers",
    ],
    industryImpact:
      "The source positions carbon neutrality as an increasingly important market expectation for premium products and describes this certification as verification of measurable, verifiable net-zero carbon emissions across the product lifecycle using high-quality offsets.",
    assessmentCriteria: [
      "Comprehensive lifecycle carbon accounting",
      "Baseline emissions and reduction initiatives, targeting at least [X]% reduction",
      "Offset strategy and quality, including VCS, Gold Standard, or equivalent",
      "Third-party verification of offsets and claims",
      "Supply-chain transparency and partner engagement",
      "Innovation in low-carbon alternatives",
      "Product labelling and customer communication",
      "Annual verification and offset updates",
    ],
    timeline: "14–16 weeks",
    validity: "3 years with annual recertification",
    investment: "[Small org $X | Mid-size $Y | Large org $Z]",
    keyBenefit:
      "Support premium positioning and pricing by proving authentic carbon neutrality and appeal to ESG-focused investors, conscious consumers, and B2B buyers.",
    comparison: {
      primaryIndustries: "Premium Brands, Export Leaders",
      smallOrgInvestment: "$X",
      keyStakeholder: "Investors, Conscious Consumers",
    },
    note: "The carbon reduction target percentage requires confirmation before publication.",
  },
  {
    slug: "organisation-of-choice",
    name: "Organisation of Choice™ Workplace Certification",
    shortName: "Workplace Certification",
    tagline: "Be an employer of choice.",
    category: "workplace",
    description:
      "Recognition for ethical workplace practices, employee wellbeing, and inclusive culture.",
    audience: [
      "All industries and organization sizes",
      "Employers",
      "HR leaders",
      "Companies competing for talent",
      "Companies with social-impact goals",
      "Government and public-sector organizations",
    ],
    industryImpact:
      "Workplace culture, equity, and employee wellbeing are described as material business factors. The certification is positioned as verification of ethical practices, employee development, and inclusive culture.",
    assessmentCriteria: [
      "Fair compensation and benefits",
      "Workplace safety and health",
      "Employee development and career progression",
      "Work-life balance and flexibility",
      "Diversity, equity, and inclusion",
      "Governance and employee voice",
      "Community engagement and social impact",
      "Innovation and continuous improvement",
      "Culture and engagement outcomes",
    ],
    timeline: "8–10 weeks",
    validity: "3 years with annual recertification",
    investment: "[Small org $X | Mid-size $Y | Large org $Z]",
    keyBenefit:
      "Attract and retain talent, support recruitment, reduce turnover, improve engagement, and demonstrate commitment to employees.",
    comparison: {
      primaryIndustries: "All Industries, All Sizes",
      smallOrgInvestment: "$X",
      keyStakeholder: "Employees, Investors, Talent Market",
    },
    note: "Operated in partnership with Organisation of Choice™. The exact legal and brand relationship requires confirmation before publication.",
  },
];
