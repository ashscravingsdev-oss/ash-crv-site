import { Footer } from "@/components/footer";
import { Navigation } from "@/components/nav";
import SEO from "@/components/seo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Privacy Policy - FreshPrep | How We Protect Your Data"
        description="Learn how FreshPrep collects, uses, and protects your personal information. Our commitment to your privacy and data security in meal delivery services."
        keywords={[
          "privacy policy freshprep",
          "meal delivery privacy",
          "data protection policy",
          "personal information protection",
          "food delivery privacy",
          "customer data security",
          "privacy statement",
          "data collection policy",
          "gdpr compliance",
          "california privacy rights",
          "privacy practices",
          "information security policy"
        ]}
        url="/privacy-policy"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: December 19, 2024
        </p>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              FreshPrep ("we," "us," or "our") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our website,
              mobile application, and services (collectively, the "Services").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our Services, you consent to the data practices described
              in this Privacy Policy. If you do not agree with our policies and
              practices, please do not use our Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              2.1 Personal Information
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information that identifies, relates to, or could
              reasonably be linked with you ("Personal Information"), including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                <strong className="text-foreground">
                  Contact Information:
                </strong>{" "}
                Name, email address, phone number, delivery address
              </li>
              <li>
                <strong className="text-foreground">
                  Account Information:
                </strong>{" "}
                Username, password, account preferences
              </li>
              <li>
                <strong className="text-foreground">
                  Payment Information:
                </strong>{" "}
                Credit card details, billing address (processed securely through
                third-party payment processors)
              </li>
              <li>
                <strong className="text-foreground">Order Information:</strong>{" "}
                Purchase history, meal preferences, dietary restrictions,
                subscription details
              </li>
              <li>
                <strong className="text-foreground">Communication Data:</strong>{" "}
                Customer service inquiries, feedback, survey responses
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              2.2 Automatically Collected Information
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you access our Services, we automatically collect certain
              information, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                <strong className="text-foreground">Device Information:</strong>{" "}
                IP address, browser type, operating system, device identifiers
              </li>
              <li>
                <strong className="text-foreground">Usage Data:</strong> Pages
                viewed, time spent on pages, links clicked, search queries
              </li>
              <li>
                <strong className="text-foreground">Location Data:</strong>{" "}
                General geographic location based on IP address
              </li>
              <li>
                <strong className="text-foreground">
                  Cookies and Tracking Technologies:
                </strong>{" "}
                Information collected through cookies, web beacons, and similar
                technologies
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              2.3 Information from Third Parties
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We may receive information about you from third-party sources,
              such as social media platforms (if you choose to connect your
              account), marketing partners, and public databases to enhance our
              Services and marketing efforts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                <strong className="text-foreground">Service Delivery:</strong>{" "}
                Process orders, manage subscriptions, arrange deliveries, and
                provide customer support
              </li>
              <li>
                <strong className="text-foreground">Account Management:</strong>{" "}
                Create and maintain your account, authenticate users, and manage
                preferences
              </li>
              <li>
                <strong className="text-foreground">Payment Processing:</strong>{" "}
                Process payments and prevent fraudulent transactions
              </li>
              <li>
                <strong className="text-foreground">Personalization:</strong>{" "}
                Customize your experience, recommend products, and remember your
                preferences
              </li>
              <li>
                <strong className="text-foreground">Communication:</strong> Send
                order confirmations, delivery updates, marketing communications,
                and respond to inquiries
              </li>
              <li>
                <strong className="text-foreground">
                  Analytics and Improvement:
                </strong>{" "}
                Analyze usage patterns, conduct research, and improve our
                Services
              </li>
              <li>
                <strong className="text-foreground">Legal Compliance:</strong>{" "}
                Comply with legal obligations, enforce our terms, and protect
                our rights
              </li>
              <li>
                <strong className="text-foreground">Marketing:</strong> Send
                promotional offers, newsletters, and personalized
                recommendations (with your consent)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. How We Share Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                <strong className="text-foreground">Service Providers:</strong>{" "}
                Third-party vendors who perform services on our behalf (payment
                processing, delivery services, email marketing, analytics)
              </li>
              <li>
                <strong className="text-foreground">Business Transfers:</strong>{" "}
                In connection with a merger, acquisition, reorganization, or
                sale of assets
              </li>
              <li>
                <strong className="text-foreground">Legal Requirements:</strong>{" "}
                When required by law, court order, or government request
              </li>
              <li>
                <strong className="text-foreground">
                  Protection of Rights:
                </strong>{" "}
                To protect our rights, property, or safety, or that of our users
                or others
              </li>
              <li>
                <strong className="text-foreground">With Your Consent:</strong>{" "}
                When you explicitly consent to share your information with third
                parties
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal information to third parties for
              monetary consideration.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Authenticate and secure your account</li>
              <li>Analyze site traffic and user behavior</li>
              <li>Provide personalized content and recommendations</li>
              <li>Deliver targeted advertising</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              Types of Cookies We Use:
            </h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                <strong className="text-foreground">Essential Cookies:</strong>{" "}
                Required for basic site functionality
              </li>
              <li>
                <strong className="text-foreground">
                  Performance Cookies:
                </strong>{" "}
                Help us understand how visitors use our site
              </li>
              <li>
                <strong className="text-foreground">Functional Cookies:</strong>{" "}
                Remember your preferences and choices
              </li>
              <li>
                <strong className="text-foreground">Marketing Cookies:</strong>{" "}
                Track your activity to deliver relevant advertisements
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You can control cookies through your browser settings. However,
              disabling cookies may limit your ability to use certain features
              of our Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to
              protect your information against unauthorized access, alteration,
              disclosure, or destruction, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                Encryption of data in transit and at rest using SSL/TLS
                technology
              </li>
              <li>
                Secure payment processing through PCI-DSS compliant payment
                processors
              </li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              However, no method of transmission over the internet or electronic
              storage is 100% secure. While we strive to protect your
              information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Data Retention
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain your information for as long as necessary to fulfill the
              purposes outlined in this Privacy Policy, unless a longer
              retention period is required or permitted by law. Retention
              periods vary based on:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>The nature of the information collected</li>
              <li>Legal or regulatory requirements</li>
              <li>Business and operational needs</li>
              <li>Whether you have an active account with us</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              When we no longer need your information, we will securely delete
              or anonymize it in accordance with our data retention policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Your Privacy Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                <strong className="text-foreground">Access:</strong> Request a
                copy of the personal information we hold about you
              </li>
              <li>
                <strong className="text-foreground">Correction:</strong> Request
                correction of inaccurate or incomplete information
              </li>
              <li>
                <strong className="text-foreground">Deletion:</strong> Request
                deletion of your personal information (subject to certain
                exceptions)
              </li>
              <li>
                <strong className="text-foreground">Portability:</strong>{" "}
                Receive your information in a structured, commonly used format
              </li>
              <li>
                <strong className="text-foreground">Opt-Out:</strong> Opt out of
                marketing communications and data sharing
              </li>
              <li>
                <strong className="text-foreground">
                  Restrict Processing:
                </strong>{" "}
                Request that we limit how we use your information
              </li>
              <li>
                <strong className="text-foreground">Object:</strong> Object to
                our processing of your information for certain purposes
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise these rights, please contact us using the information
              provided in the Contact section below. We will respond to your
              request within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              9. California Privacy Rights (CCPA)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are a California resident, you have specific rights under
              the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                Right to know what personal information is collected, used,
                shared, or sold
              </li>
              <li>Right to delete personal information held by businesses</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>
                Right to non-discrimination for exercising your CCPA rights
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To submit a request under the CCPA, please email
              privacy@freshprep.com or call 1-800-FRESH-PREP. We may need to
              verify your identity before processing your request.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              10. Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Services are not intended for children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13. If you believe we have collected information from a
              child under 13, please contact us immediately, and we will take
              steps to delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              11. International Data Transfers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries
              other than your country of residence. These countries may have
              data protection laws that differ from those in your country. We
              take appropriate safeguards to ensure your information receives
              adequate protection, including using Standard Contractual Clauses
              approved by the European Commission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              12. Third-Party Links
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Services may contain links to third-party websites,
              applications, or services that are not operated by us. We are not
              responsible for the privacy practices of these third parties. We
              encourage you to review the privacy policies of any third-party
              sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              13. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, or legal requirements. We
              will notify you of any material changes by posting the updated
              policy on our website and updating the "Last Updated" date. Your
              continued use of our Services after such changes constitutes
              acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              14. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-muted rounded-lg p-6">
              <p className="text-foreground font-semibold mb-2">
                FreshPrep Privacy Team
              </p>
              <p className="text-muted-foreground">
                Email: privacy@freshprep.com
              </p>
              <p className="text-muted-foreground">Phone: 1-800-FRESH-PREP</p>
              <p className="text-muted-foreground">
                Address: [Your Business Address]
              </p>
              <p className="text-muted-foreground mt-4">
                For California residents exercising CCPA rights, please use the
                contact information above with "CCPA Request" in the subject
                line.
              </p>
            </div>
          </section>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your Privacy Matters to Us
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              At FreshPrep, we are committed to transparency and protecting your
              privacy. If you have any questions or concerns about how we handle
              your information, please don't hesitate to reach out to our
              privacy team.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
