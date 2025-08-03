'use client';

import AnimatedButton from '@/components/ui/AnimatedButton';
import router from 'next/router';
import { useState } from 'react';

const faqs = [
  {
    question: 'How long does it take to complete a website project?',
    answer:
      'Typically, a standard website takes between 2 to 6 weeks to complete depending on complexity, feedback cycles, and content readiness.',
  },
  {
    question: 'How much does a website typically cost?',
    answer:
      'Website costs vary depending on design, features, and integrations. Projects usually range from ₹20,000 to ₹1,00,000+.',
  },
  {
    question: 'What do I need to provide to get started on a website?',
    answer:
      'We usually need your business details, content (text, images), branding assets (logo/colors), and preferred design references.',
  },
  {
    question: 'Can you help with branding and logo design?',
    answer:
      'Yes, we offer complete branding packages including logo design, brand colors, typography, and guidelines.',
  },
  {
    question: 'Do you offer ongoing support and maintenance after the website is live?',
    answer:
      'Absolutely. We offer monthly maintenance plans and on-demand support to keep your site updated and secure.',
  },
  {
    question: 'Can I update the website myself after it’s built?',
    answer:
      'Yes, we build user-friendly sites with CMS access so you can edit text, images, and blog content without coding.',
  },
  {
    question: 'Do you build e-commerce websites?',
    answer:
      'Yes! We build e-commerce stores using platforms like Shopify, WooCommerce, and custom solutions with payment integration.',
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer:
      'All our websites are fully responsive and optimized for mobile, tablet, and desktop devices.',
  },
  {
    question: 'Can you help with SEO?',
    answer:
      'Yes. We implement basic SEO practices during development and also offer advanced SEO strategy as an add-on service.',
  },
  {
    question: 'What platform or CMS do you use?',
    answer:
      'We primarily use WordPress, Webflow, and headless CMS options like Sanity or Strapi depending on project needs.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 md:grid-cols-2 ">
      {/* Left Column - 50% width */}
      <div className="md:sticky top-24 self-start space-y-6">
        <h2 className="md:text-6xl text-3xl font-extrabold leading-tight">
          Frequently Asked<br />Questions
        </h2>
        <p className="text-neutral-500">
          Please feel free to contact us if you have further questions.
        </p>
        {/* <button className="border border-neutral-500 text-neutral-500 rounded-full px-6 py-2 hover:bg-black hover:text-white transition">
          Contact Us
        </button> */}
        <AnimatedButton onClick={() => router.push("/contact")} className="shadow-none">
                             Contact Us
                            </AnimatedButton>
      </div>

      {/* Right Column - 50% width */}
      <div className="flex flex-col space-y-4 mt-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full  flex justify-between items-center px-6 py-10 text-left text-xl font-bold text-neutral-500 hover:bg-gray-200"
            >
              {faq.question}
              <span className="text-2xl">
                {openIndex === index ? '×' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-600 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
