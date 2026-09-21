
// // components/auth/ForgotPassword.jsx
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
// import { toast } from 'sonner';

// // Font family constants - matching beauty theme
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// export default function ForgotPassword({ onOTPSent, onBack }) {
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const loadingToast = toast.loading('Sending reset code...');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email })
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error('Failed', {
//           description: data.error || 'Could not send reset code'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Reset Code Sent!', {
//         description: 'Please check your email for the OTP.',
//         icon: '📧',
//       });

//       onOTPSent(email);

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className="space-y-6"
//     >
//       <div className="text-center">
//         <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#65705d]/10 to-[#8B9D83]/10 rounded-full mb-3 border border-[#65705d]/20">
//           <Sparkles className="w-6 h-6 text-[#65705d]" />
//         </div>
//         <h2 className="text-2xl font-bold text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//           Forgot Password?
//         </h2>
//         <p className="text-[#65705d]/70 text-sm" style={{ fontFamily: FONT_FAMILY }}>
//           Enter your email address and we'll send you a OTP to reset your password.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             Email Address
//           </label>
//           <div className="relative group">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#65705d]/40 group-focus-within:text-[#65705d] transition-colors" />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-[#e2e3dd]/70 rounded-lg focus:ring-2 focus:ring-[#65705d] focus:border-transparent bg-[#FDF7EF] focus:bg-white transition-all hover:border-[#65705d]/30 text-[#263b32] placeholder:text-[#8a9284]"
//               placeholder="your@email.com"
//               style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full py-3 px-4 bg-gradient-to-r from-[#65705d] to-[#8B9D83] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#65705d]/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-5 h-5 animate-spin" />
//               Sending...
//             </>
//           ) : (
//             <>
//               Send Reset Code
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </>
//           )}
//         </button>

//         <button
//           type="button"
//           onClick={onBack}
//           className="w-full text-sm text-[#65705d]/70 hover:text-[#65705d] transition-colors"
//           style={{ fontFamily: FONT_FAMILY }}
//         >
//           ← Back to Login
//         </button>
//       </form>
//     </motion.div>
//   );
// }


// components/auth/ForgotPassword.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// ============================================================
// 🎨 NISHAT'S COLOR PALETTE
// ============================================================
const BRAND = '#CC1D34';
const BRAND_DARK = '#8A2530';
const ACCENT_SAGE = '#8B9D83';
const DARK_TEXT = '#29362f';
const MUTED_TEXT = '#687169';
const CREAM_BG = '#f7f4ef';
const CREAM_BORDER = '#e8e2d6';

// Fonts
const FONT_HEADING = "'Fraunces', serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', sans-serif";

export default function ForgotPassword({ onOTPSent, onBack }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Sending reset code...');

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error('Failed', {
          description: data.error || 'Could not send reset code',
        });
        setIsSubmitting(false);
        return;
      }

      toast.success('Reset Code Sent!', {
        description: 'Please check your email for the OTP.',
        icon: '📧',
      });

      onOTPSent(email);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 shadow-inner"
          style={{ backgroundColor: 'rgba(204, 29, 52, 0.10)' }}
        >
          <Sparkles className="w-6 h-6" style={{ color: BRAND }} />
        </div>
        <h2
          className="text-2xl font-light mb-1.5"
          style={{ fontFamily: FONT_HEADING, color: DARK_TEXT }}
        >
          Forgot Password?
        </h2>
        <p
          className="text-sm leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: FONT_BODY, color: MUTED_TEXT }}
        >
          Enter your email address and we'll send you an OTP to reset your
          password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            className="block text-[10px] font-semibold tracking-wider uppercase mb-1.5"
            style={{
              fontFamily: FONT_BODY,
              color: MUTED_TEXT,
              letterSpacing: '0.12em',
            }}
          >
            Email Address
          </label>
          <div className="relative group">
            <Mail
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors group-focus-within:text-[#CC1D34]"
              style={{ color: `${MUTED_TEXT}99` }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl outline-none transition-all"
              style={{
                fontFamily: FONT_BODY,
                backgroundColor: CREAM_BG,
                border: `1px solid ${CREAM_BORDER}`,
                color: DARK_TEXT,
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = `${BRAND}80`;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND}26`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = CREAM_BG;
                e.currentTarget.style.borderColor = CREAM_BORDER;
                e.currentTarget.style.boxShadow = 'none';
              }}
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 text-white font-semibold text-[13px] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
            fontFamily: FONT_BODY,
            letterSpacing: '0.05em',
            boxShadow: `0 6px 18px -6px ${BRAND}66`,
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.boxShadow = `0 10px 24px -8px ${BRAND}99`;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 6px 18px -6px ${BRAND}66`;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Reset Code
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Back to Login */}
        <button
          type="button"
          onClick={onBack}
          className="w-full text-[11px] font-medium transition-colors text-center"
          style={{ fontFamily: FONT_BODY, color: MUTED_TEXT }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = BRAND;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = MUTED_TEXT;
          }}
        >
          ← Back to Login
        </button>
      </form>
    </motion.div>
  );
}