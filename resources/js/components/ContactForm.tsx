import React, { useState } from 'react';

interface ContactFormState {
  name: string;
  email: string;
  message: string;
  isLoading: boolean;
  responseMessage: string;
  isSuccess: boolean;
}

const ContactForm: React.FC = () => {
  const [state, setState] = useState<ContactFormState>({
    name: '',
    email: '',
    message: '',
    isLoading: false,
    responseMessage: '',
    isSuccess: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.name || !state.email || !state.message) {
      setState(prev => ({
        ...prev,
        responseMessage: 'Please fill in all fields.',
        isSuccess: false
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, responseMessage: '' }));

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          message: state.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setState(prev => ({
          ...prev,
          name: '',
          email: '',
          message: '',
          responseMessage: data.message,
          isSuccess: true,
          isLoading: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          responseMessage: data.message || 'Message failed to send. Please try again.',
          isSuccess: false,
          isLoading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        responseMessage: 'An error occurred. Please try again.',
        isSuccess: false,
        isLoading: false
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value, responseMessage: '' }));
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={state.isLoading}
            required
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={state.isLoading}
            required
          />
        </div>
        
        <div>
          <textarea
            name="message"
            value={state.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            disabled={state.isLoading}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={state.isLoading}
          className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {state.isLoading ? 'Sending...' : 'Send Message'}
        </button>
        
        {state.responseMessage && (
          <div className={`p-4 rounded-lg text-center ${
            state.isSuccess 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {state.responseMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
