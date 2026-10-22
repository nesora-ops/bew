import type { Metadata } from "next";
import Image from "next/image";
import { getCertifications } from "@/content";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { BulletList } from "@/components/content-blocks";
import { Card, FeatureCard } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Better Earth Workplaces certifies organizations that align their operations with real environmental and social responsibility standards.",
  alternates: { canonical: "/about" },
};

/** Source: BEW_Consolidated_Deduplicated.md §2 "How BEW Is Different". */
const differences = [
  {
    title: "Independence",
    description:
      "BEW is a third-party certification authority rather than a consulting firm or trade association. Revenue comes from certification fees rather than remediation services.",
  },
  {
    title: "Science-Backed Standards",
    description:
      "The three certification pathways are based on peer-reviewed research, global best practices, and stakeholder input.",
  },
  {
    title: "Transparent Assessment",
    description:
      "Organizations know what they will be assessed on, choose from qualified assessors, and receive documented, objective results.",
  },
  {
    title: "Global Approach",
    description:
      "Standards are designed for international adoption across industries and continents.",
  },
  {
    title: "Investor-Grade Credibility",
    description:
      "Quantified metrics, standardized reporting, and benchmarkable impact are intended to make certification relevant to institutional investors.",
  },
];

/** Source: §2 "Assessment & Certification Model". */
const model = [
  {
    title: "Application",
    description: "Eligibility assessment and pathway selection.",
  },
  {
    title: "Assignment",
    description: "Matching with a qualified BEW assessor.",
  },
  {
    title: "Assessment",
    description:
      "Structured evaluation, documentation review, and site verification where applicable; detailed feedback report.",
  },
  {
    title: "Certification & Reporting",
    description:
      "Certification badge, impact reporting tools, directory inclusion, and annual recertification.",
  },
];

const advisoryBoard = [
  "Climate scientist or ESG researcher",
  "CFO or institutional investor with ESG mandate",
  "Corporate sustainability officer",
  "Regulatory-body representative",
  "Industry expert in a certification vertical",
];

const platformFeatures = [
  "Secure organization and assessor portals",
  "Public certification registry",
  "Real-time certification verification",
  "Audit-ready records",
  "Investor-transparent reporting",
];

const growthPriorities = [
  "Institutional investors conducting ESG due diligence",
  "Multinational corporations requiring supply-chain verification",
  "Regulatory bodies aligning with international ESG reporting standards",
  "Industry associations seeking standardized compliance frameworks",
  "Educational institutions supporting sustainability research and practice",
];

const integritySafeguards = [
  "No consulting or remediation services for assessed organizations",
  "Conflict-of-interest disclosure and assessor recusal",
  "Public assessment criteria",
  "Independent review before certification",
  "Internal and external process audits",
  "Annual reporting on certification trends, impact metrics, and operational transparency",
];

export default function AboutPage() {
  const certifications = getCertifications();

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Building trust"
        accent="in sustainability."
        description="Third-party verified certification for organizations serious about environmental and social impact."
      />

      <Section id="leadership">
        <SectionHeading
          eyebrow="Leadership & governance"
          title="The people behind"
          accent="the standard."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Card>
            <Image
              src="/team/ketaki.jpg"
              alt="Ketaki, Founder & CEO"
              width={800}
              height={800}
              sizes="(min-width: 1024px) 18rem, 100vw"
              className="mb-6 aspect-square w-full max-w-xs rounded-card object-cover"
            />
            <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
              Ketaki, Founder &amp; CEO
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-subdued">
              Ketaki founded BEW to address the lack of credible, independent,
              investor-grade sustainability certification. Her stated approach centers on
              verification rather than marketing and on maintaining independence.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-subdued">
              <span className="font-medium text-ink">Credentials and affiliations: </span>
              <PlaceholderText>
                [degree/certification], [board affiliations, if applicable]
              </PlaceholderText>
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
              Advisory Board
            </h3>
            <p className="mt-3 text-[15px] text-ink-subdued">Recommended representation:</p>
            <div className="mt-4">
              <BulletList items={advisoryBoard} />
            </div>
            <p className="mt-5 text-sm text-ink-subdued">
              <PlaceholderText>
                Launch note: 3–4 credible advisors are to be added before launch. A Royal
                Agricultural University (RAU) partnership is suggested as a possible
                research advisory anchor. [Advisory board composition to be confirmed]
              </PlaceholderText>
            </p>
          </Card>
        </div>
      </Section>

      <Section id="mission">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Mission" title="Our mission" />
            <p className="mt-5 text-[17px] leading-relaxed text-ink-subdued">
              Better Earth Workplaces certifies organizations that align their operations
              with real environmental and social responsibility standards. We provide
              third-party verification that cuts through greenwashing and gives investors,
              customers, and employees credible assurance.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Vision" title="Our vision" />
            <p className="mt-5 text-[17px] leading-relaxed text-ink-subdued">
              A world where sustainability claims are independently verified, impact is
              measurable, and organizations are rewarded, not penalized, for genuine progress
              toward a low-carbon, equitable future.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="The market problem"
          title="Business-critical,"
          accent="and hard to prove."
          description="Environmental and social responsibility has become business-critical. Investors screen for ESG risk, customers prefer sustainable brands, and employees expect employers to lead on climate and equity."
        />
        <div className="mt-8 max-w-3xl space-y-5 text-[17px] leading-relaxed text-ink-subdued">
          <p>
            Yet organizations face fragmented frameworks, unclear standards, expensive
            verification, and difficulty distinguishing genuine commitment from marketing.
          </p>
          <p>
            <span className="font-medium text-ink">BEW&apos;s response:</span> rigorous,
            independent, globally oriented certification with transparent assessments,
            science-backed standards, and qualified assessors combining local expertise with
            global standards.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How BEW is different"
          title="Five commitments"
          description="What separates a certification authority from a consultancy."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differences.map((item) => (
            <li key={item.title}>
              <FeatureCard title={item.title} description={item.description} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="portfolio">
        <SectionHeading
          eyebrow="Certification portfolio"
          title="Three programmes"
          description="Each follows the core model of transparent criteria, qualified assessor assessment, independent review, and certification results."
        />
        <ol className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {certifications.map((certification, index) => (
            <li
              key={certification.slug}
              className="flex gap-3 border-b border-line py-3 text-[15px]"
            >
              <span className="font-mono text-xs text-ink-subdued">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-ink">{certification.shortName}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Assessment & certification model"
          title="Four steps, one standard"
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {model.map((step, index) => (
            <li key={step.title}>
              <FeatureCard
                eyebrow={String(index + 1).padStart(2, "0")}
                title={step.title}
                description={step.description}
              />
            </li>
          ))}
        </ol>
      </Section>

      <Section id="assessors">
        <SectionHeading
          eyebrow="Assessor network"
          title="Independent, qualified assessors"
          description="Assessors include sustainability consultants, environmental engineers, auditors, and impact measurement specialists. They work independently within the BEW framework."
        />
        <p className="mt-8 text-[15px] text-ink-subdued">
          BEW also works with{" "}
          <a href="/partners" className="text-accent hover:underline">
            channel partners
          </a>
          .
        </p>
      </Section>

      <Section id="impact">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Impact & reporting"
              title="Measured, then reported"
              description="Certified organizations receive access to an impact dashboard."
            />
            <div className="mt-6">
              <BulletList
                items={[
                  "Tracking progress",
                  "Peer benchmarking",
                  "Investor, regulator, and customer reporting",
                ]}
              />
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-subdued">
              BEW plans annual aggregate impact reports covering cumulative footprint
              reduction, jobs created, communities served, and related measures.
            </p>
          </div>
          <div>
            <SectionHeading
              eyebrow="Technology"
              title="A certification platform"
              description="BEW operates a proprietary certification platform intended to manage the certification lifecycle from application through assessment, review, and ongoing compliance reporting."
            />
            <div className="mt-6">
              <BulletList items={platformFeatures} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Global presence & growth"
          title="Where BEW operates"
        />
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink-subdued">
          <PlaceholderText>
            BEW launched in [year], has certified [X] organizations across [Y] countries,
            and has an assessor network spanning [Z] regions.
          </PlaceholderText>
        </p>
        <h3 className="mt-10 mb-4 font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase">
          Priority relationship areas
        </h3>
        <BulletList items={growthPriorities} columns={2} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Commitment to integrity"
          title="Safeguards we hold ourselves to"
        />
        <div className="mt-8">
          <BulletList items={integritySafeguards} columns={2} />
        </div>
      </Section>

      <Section id="contact" bordered={false}>
        <SectionHeading eyebrow="Contact" title="Talk to the right team" />
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="border-t border-line pt-5">
            <dt className="text-[15px] font-medium text-ink">Organizations</dt>
            <dd className="mt-2 text-[15px] text-ink-subdued">
              <PlaceholderText>[Start Certification / Contact form]</PlaceholderText>
            </dd>
          </div>
          <div className="border-t border-line pt-5">
            <dt className="text-[15px] font-medium text-ink">Assessors &amp; Partners</dt>
            <dd className="mt-2 text-[15px] text-ink-subdued">
              <PlaceholderText>[Partner With Us / Contact form]</PlaceholderText>
            </dd>
          </div>
          <div className="border-t border-line pt-5">
            <dt className="text-[15px] font-medium text-ink">
              Investors, Regulators &amp; Media
            </dt>
            <dd className="mt-2 text-[15px] text-ink-subdued">
              <PlaceholderText>{contact.email}</PlaceholderText>
            </dd>
          </div>
        </dl>
      </Section>

      <CtaSection
        eyebrow="Get started"
        title="Ready to Prove Your Impact?"
        primary={{ label: "Start Your Certification", href: "/organizations#get-started" }}
        secondary={{ label: "Explore Our Certifications", href: "/certifications" }}
      />
    </>
  );
}
