import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="bg-[var(--color-background-light)] text-[var(--color-secondary)] font-[var(--font-family-sans)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 mb-10">
            Effective Date: <span className="font-medium">Today</span>
          </p>
        </section>

        {/* Content */}
        <section className="space-y-10">
          {/* Introduction */}
          <div className="animate-fade-up animate-delay-1">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="leading-relaxed">
              When you use our services, you're trusting us with your information.
              We understand this responsibility and are committed to protecting
              your data while giving you transparency and control.
            </p>
          </div>

          {/* Information Collected */}
          <div className="animate-fade-up animate-delay-2">
            <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-1">2.1 Information You Provide</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name and contact information</li>
                  <li>Account credentials</li>
                  <li>Payment information (when required)</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">2.2 Automatic Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Device information and identifiers</li>
                  <li>Log data and usage statistics</li>
                  <li>Location information (when enabled)</li>
                  <li>Browser type and settings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="animate-fade-up animate-delay-3">
            <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Provide and personalize services</li>
              <li>Process transactions and confirmations</li>
              <li>Send updates and service notifications</li>
              <li>Ensure security and verify identity</li>
              <li>Analyze and improve platform performance</li>
            </ul>
          </div>

          {/* Sharing */}
          <div className="animate-fade-up">
            <h2 className="text-xl font-semibold mb-2">
              4. Information Sharing & Disclosure
            </h2>
            <p className="mb-3">
              We do not share your personal data except in limited cases:
            </p>

            <div className="space-y-4">
              <p>
                <strong>With Your Consent:</strong> When you explicitly allow us to.
              </p>
              <p>
                <strong>For Legal Reasons:</strong> To comply with laws, enforce
                terms, prevent fraud, or protect user safety.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="animate-fade-up">
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>SSL encryption across services</li>
              <li>Regular security audits and reviews</li>
              <li>Restricted internal access to personal data</li>
            </ul>
          </div>

          {/* Rights */}
          <div className="animate-fade-up">
            <h2 className="text-xl font-semibold mb-2">6. Your Rights & Choices</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request data deletion</li>
              <li>Restrict or object to processing</li>
            </ul>
          </div>

          {/* Changes */}
          <div className="animate-fade-up">
            <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically. Updates will be
              posted here with a revised effective date. Continued use of our
              services implies acceptance of the changes.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-[var(--color-accent-gray)] text-center text-sm text-gray-500">
          © 2026 • PunjabBulls. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default PrivacyPolicy;