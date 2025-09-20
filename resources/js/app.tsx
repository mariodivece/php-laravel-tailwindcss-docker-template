import React from 'react';
import { createRoot } from 'react-dom/client';
import NewsletterForm from './components/NewsletterForm';
import ContactForm from './components/ContactForm';

// Mount the Newsletter Form
const newsletterContainer = document.getElementById('newsletter-form-container');
if (newsletterContainer) {
  const root = createRoot(newsletterContainer);
  root.render(<NewsletterForm />);
}

// Mount the Contact Form
const contactContainer = document.getElementById('contact-form-container');
if (contactContainer) {
  const root = createRoot(contactContainer);
  root.render(<ContactForm />);
}
