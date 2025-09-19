import React, { useState } from 'react';

interface NewsletterFormState {
  email: string;
  isLoading: boolean;
  message: string;
  isSuccess: boolean;
}

const NewsletterForm: React.FC = () => {
  const [state, setState] = useState<NewsletterFormState>({
    email: '',
    isLoading: false,
    message: '',
    isSuccess: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.email) {
      setState(prev => ({ ...prev, message: 'Please enter your email address.', isSuccess: false }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, message: '' }));

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      
      const response = await fetch('/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: state.email })
      });

      const data = await response.json();

      if (data.success) {
        setState(prev => ({
          ...prev,
          email: '',
          message: data.message,
          isSuccess: true,
          isLoading: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          message: data.message || 'Subscription failed. Please try again.',
          isSuccess: false,
          isLoading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        message: 'An error occurred. Please try again.',
        isSuccess: false,
        isLoading: false
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, email: e.target.value, message: '' }));
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={state.email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={state.isLoading}
            required
          />
          <button
            type="submit"
            disabled={state.isLoading}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {state.isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        
        {state.message && (
          <div className={`p-4 rounded-lg text-center ${
            state.isSuccess 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default NewsletterForm;
