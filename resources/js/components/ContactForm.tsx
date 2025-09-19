import React, { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormState extends ContactFormData {
  isLoading: boolean;
  statusMessage: string;
  isSuccess: boolean;
}

const ContactForm: React.FC = () => {
  const [state, setState] = useState<ContactFormState>({
    name: '',
    email: '',
    message: '',
    isLoading: false,
    statusMessage: '',
    isSuccess: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.name || !state.email || !state.message) {
      setState(prev => ({ 
        ...prev, 
        statusMessage: 'Please fill in all required fields.', 
        isSuccess: false 
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, statusMessage: '' }));

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
          statusMessage: data.message,
          isSuccess: true,
          isLoading: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          statusMessage: data.message || 'Failed to send message. Please try again.',
          isSuccess: false,
          isLoading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        statusMessage: 'An error occurred. Please try again.',
        isSuccess: false,
        isLoading: false
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState(prev => ({ 
      ...prev, 
      [name]: value, 
      statusMessage: '' 
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={state.isLoading}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={state.isLoading}
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={state.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={state.isLoading}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={state.isLoading}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {state.isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {state.statusMessage && (
          <div className={`p-4 rounded-lg text-center ${
            state.isSuccess 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {state.statusMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
