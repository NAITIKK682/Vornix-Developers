module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        'accent-cyan': '#06B6D4',
        'accent-violet': '#7C3AED',
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#334155',
          700: '#0B1220'
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        ui: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      fontSize: {
        h1: ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '1.15', fontWeight: '600' }],
        h3: ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px'
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px'
      },
      boxShadow: {
        soft: '0 6px 20px rgba(15, 23, 42, 0.06)',
        md: '0 10px 30px rgba(15, 23, 42, 0.12)',
        lg: '0 20px 50px rgba(15, 23, 42, 0.18)'
      },
      animation: {
        'fade-in': 'fadeIn 600ms ease-out',
        'slide-up': 'slideUp 600ms ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [],
}

