"use client";

import React from "react";

export default function ContactSection() {
  return (
    <section className="min-h-screen bg-[#121212] text-white px-6 py-16 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Send Mail Here</h1>
          <p className="text-gray-300 mb-6">
            Got questions or ready to start something amazing?
          </p>
          <p className="text-gray-300 mb-6">
            Drop us a message or{" "}
            <a href="#" className="text-white underline">
              book a video call here
            </a>{" "}
            to discuss your ideas. We’re here to help bring your vision to life,
            and we’d love to connect with you!
          </p>

          <div className="flex items-center gap-3 mb-4">
            <span>📧</span>
            <a
              href="mailto:hello@nexusdigital.studio"
              className="text-blue-400 underline"
            >
              hello@nexusdigital.studio
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span>📞</span>
            <p className="text-gray-300">+61 413 823 009</p>
          </div>
        </div>

        {/* Right Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full bg-[#2e2e2e] border border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full bg-[#2e2e2e] border border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              required
              rows={5}
              className="w-full bg-[#2e2e2e] border border-gray-600 px-4 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            ></textarea>
          </div>

          {/* Cloudflare CAPTCHA Placeholder */}
          <div className="flex items-center gap-4 bg-[#1e1e1e] border border-gray-700 p-4 rounded">
            <input type="checkbox" id="verify" className="w-5 h-5" />
            <label htmlFor="verify" className="text-sm">
              Verify you are human
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded-full hover:scale-105 transition duration-300 shadow-lg shadow-lime-400/60"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
