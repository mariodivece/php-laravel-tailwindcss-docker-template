import React from 'react';
import { createRoot } from 'react-dom/client';
import NewsletterForm from './components/NewsletterForm';
import ContactForm from './components/ContactForm';
import '../css/app.css';

// Initialize React components
document.addEventListener('DOMContentLoaded', function() {
  // Newsletter form
  const newsletterContainer = document.getElementById('newsletter-form-container');
  if (newsletterContainer) {
    const newsletterRoot = createRoot(newsletterContainer);
    newsletterRoot.render(<NewsletterForm />);
  }

  // Contact form
  const contactContainer = document.getElementById('contact-form-container');
  if (contactContainer) {
    const contactRoot = createRoot(contactContainer);
    contactRoot.render(<ContactForm />);
  }
});
