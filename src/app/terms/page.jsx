import { Footer } from "@/components/footer";
import { Navigation } from "@/components/nav";
import SEO from "@/components/seo";


export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Terms of Service - FreshPrep | Meal Delivery Terms & Conditions"
        description="Read FreshPrep's Terms of Service for meal delivery subscriptions, orders, cancellations, and service policies. Your rights and responsibilities."
        keywords={[
          "terms of service freshprep",
          "meal delivery terms",
          "service agreement",
          "subscription terms",
          "delivery terms and conditions",
          "user agreement",
          "cancellation policy",
          "refund policy",
          "service terms",
          "legal terms",
          "customer agreement",
          "food delivery terms"
        ]}
        url="/terms-of-service"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: December 19, 2024
        </p>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Welcome to FreshPrep. By accessing or using our website, mobile
              application, or services, you agree to be bound by these Terms of
              Service ("Terms"). If you do not agree to these Terms, please do
              not use our services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              These Terms constitute a legally binding agreement between you and
              FreshPrep ("Company," "we," "us," or "our"). We reserve the right
              to modify these Terms at any time, and such modifications will be
              effective immediately upon posting.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Service Description
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              FreshPrep provides meal preparation and cold-pressed juice
              delivery services. Our services include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                Prepared meal delivery on a one-time or subscription basis
              </li>
              <li>Cold-pressed juice and wellness beverage delivery</li>
              <li>Customized meal bundles and packages</li>
              <li>Catering services for events and groups</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect
              of our services at any time without prior notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Account Registration
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To place orders and access certain features, you must create an
              account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                Provide accurate, current, and complete information during
                registration
              </li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>
                Notify us immediately of any unauthorized use of your account
              </li>
              <li>
                Be responsible for all activities that occur under your account
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 18 years old to create an account and use our
              services. We reserve the right to refuse service, terminate
              accounts, or cancel orders at our sole discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Orders and Pricing
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              4.1 Order Placement
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All orders are subject to acceptance and availability. We reserve
              the right to refuse or cancel any order for any reason, including
              but not limited to product availability, errors in pricing or
              product information, or suspected fraudulent activity.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              4.2 Pricing and Payment
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All prices are in USD and are subject to change without notice.
              You agree to pay all charges at the prices in effect when you
              place your order, including applicable taxes and delivery fees. We
              accept major credit cards, debit cards, and other payment methods
              as displayed at checkout.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              4.3 Order Modifications
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Order modifications or cancellations must be made at least 48
              hours before your scheduled delivery time. Changes made after this
              deadline may not be accommodated and may be subject to
              cancellation fees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Subscriptions
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              5.1 Subscription Terms
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Subscription plans automatically renew according to your selected
              billing cycle (weekly, bi-weekly, or monthly) until you cancel.
              You will be charged at the beginning of each billing period.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              5.2 Subscription Management
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may pause, skip, or cancel your subscription at any time
              through your account settings. To avoid being charged for the next
              billing cycle, you must cancel at least 48 hours before your next
              scheduled delivery.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              5.3 Subscription Changes
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify subscription plans, pricing, or
              terms with 30 days notice. Continued use of the subscription
              service after such notice constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Delivery
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              6.1 Delivery Areas
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We deliver to specific geographic areas as indicated on our
              website. Delivery availability and fees vary by location.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              6.2 Delivery Times
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We provide estimated delivery windows but cannot guarantee exact
              delivery times. Delivery schedules may be affected by weather,
              traffic, or other circumstances beyond our control.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              6.3 Delivery Requirements
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You must provide accurate delivery information and be available to
              receive deliveries. We are not responsible for orders left
              unattended at your request or orders affected by incorrect
              delivery information.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              6.4 Missed Deliveries
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              If you miss a delivery or are unable to receive your order, please
              contact us within 24 hours. Refunds or redeliveries for missed
              deliveries are subject to our discretion and may incur additional
              fees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Cancellations and Refunds
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              7.1 Cancellation Policy
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Orders may be cancelled up to 48 hours before the scheduled
              delivery time for a full refund. Cancellations made within 48
              hours of delivery may be subject to a cancellation fee of up to
              50% of the order value.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              7.2 Refund Policy
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We strive for 100% customer satisfaction. If you are unsatisfied
              with your order due to quality issues, please contact us within 24
              hours of delivery. We will review your request and may offer a
              refund, credit, or replacement at our discretion.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              7.3 Refund Processing
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Approved refunds will be processed within 5-10 business days to
              your original payment method. Subscription refunds will be applied
              as account credits unless otherwise specified.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Food Safety and Allergens
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              8.1 Food Safety
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our meals are prepared in facilities that follow strict food
              safety protocols. However, once delivered, proper storage and
              handling are your responsibility. Follow all storage instructions
              provided with your order.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              8.2 Allergen Information
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We provide allergen information for all products. However, our
              kitchen handles common allergens including nuts, dairy, eggs, soy,
              wheat, and shellfish. We cannot guarantee that cross-contamination
              will not occur.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              8.3 Customer Responsibility
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              It is your responsibility to review ingredient lists and allergen
              information before ordering. If you have severe allergies or
              dietary restrictions, please consult with your healthcare provider
              before consuming our products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              9. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All content on our website and applications, including but not
              limited to text, graphics, logos, images, recipes, and software,
              is the property of FreshPrep and is protected by copyright,
              trademark, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative
              works from any content without our express written permission. Our
              recipes and meal preparation methods are proprietary and
              confidential.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To the fullest extent permitted by law, FreshPrep shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or relating to your use of our
              services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Food allergies or adverse reactions</li>
              <li>Foodborne illness or food poisoning</li>
              <li>Delivery delays or missed deliveries</li>
              <li>Loss or spoilage of food products</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Our total liability for any claim arising out of or relating to
              these Terms or our services shall not exceed the amount you paid
              for the specific order giving rise to the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              11. Indemnification
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless FreshPrep, its
              affiliates, officers, directors, employees, and agents from any
              claims, liabilities, damages, losses, and expenses arising out of
              or related to your use of our services, violation of these Terms,
              or violation of any rights of another party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              12. Dispute Resolution
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              12.1 Informal Resolution
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have a dispute with FreshPrep, please contact our customer
              service team first to attempt an informal resolution.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              12.2 Binding Arbitration
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Any dispute that cannot be resolved informally shall be resolved
              through binding arbitration in accordance with the rules of the
              American Arbitration Association. The arbitration shall take place
              in [Your State], and judgment on the award may be entered in any
              court having jurisdiction.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              12.3 Class Action Waiver
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You agree that any arbitration or proceeding shall be limited to
              the dispute between you and FreshPrep individually. You waive any
              right to participate in a class action lawsuit or class-wide
              arbitration.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              13. Governing Law
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of [Your State], without regard to its conflict of law
              provisions. Any legal action or proceeding relating to your access
              to or use of our services shall be instituted in state or federal
              court in [Your State].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              14. Severability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary, and the remaining provisions shall
              remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              15. Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <div className="bg-muted rounded-lg p-6">
              <p className="text-foreground font-semibold mb-2">
                FreshPrep Customer Service
              </p>
              <p className="text-muted-foreground">
                Email: legal@freshprep.com
              </p>
              <p className="text-muted-foreground">Phone: 1-800-FRESH-PREP</p>
              <p className="text-muted-foreground">
                Address: [Your Business Address]
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
