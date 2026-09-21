

// // components/auth/ResetPassword.jsx
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles, CheckCircle } from 'lucide-react';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

// // Font family constants - matching beauty theme
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// export default function ResetPassword({ email, otp, onBack }) {
//   const router = useRouter();
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Validate passwords match
//     if (password !== confirmPassword) {
//       toast.error('Password Mismatch', {
//         description: 'The passwords you entered do not match.'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     // Validate password strength
//     if (password.length < 8) {
//       toast.error('Weak Password', {
//         description: 'Password must be at least 8 characters long.'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     // Validate password has at least one number and one letter
//     const hasNumber = /\d/.test(password);
//     const hasLetter = /[a-zA-Z]/.test(password);
    
//     if (!hasNumber || !hasLetter) {
//       toast.error('Weak Password', {
//         description: 'Password must contain at least one letter and one number.'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const loadingToast = toast.loading('Resetting password...');

//     try {
//       console.log('Sending reset request:', { email, otp, password: '***' });

//       const response = await fetch('http://localhost:5000/api/auth/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           otp,
//           password
//         })
//       });

//       const data = await response.json();
//       console.log('Reset response:', data);
      
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         console.error('Reset failed:', data);
//         toast.error('Reset Failed', {
//           description: data.error || 'Could not reset password'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       // Success path
//       toast.success('Password Reset Successful!', {
//         description: 'You can now login with your new password.',
//         icon: '🔐',
//       });

//       // Clear any stored data
//       sessionStorage.removeItem('resetOTP');
      
//       // Close modal and redirect
//       setTimeout(() => {
//         // Force a hard redirect to login
//         window.location.href = '/login';
//       }, 1500);

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       console.error('Reset error:', error);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const EyeIcon = ({ isVisible }) => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       {isVisible ? (
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//       ) : (
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//       )}
//     </svg>
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className="space-y-6"
//     >
//       <div className="text-center">
//         <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#65705d]/10 to-[#8B9D83]/10 rounded-full mb-3 border border-[#65705d]/20">
//           <Lock className="w-6 h-6 text-[#65705d]" />
//         </div>
//         <h2 className="text-2xl font-bold text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//           Reset Password
//         </h2>
//         <p className="text-[#65705d]/70 text-sm" style={{ fontFamily: FONT_FAMILY }}>
//           Create a new password for<br />
//           <span className="font-semibold text-[#65705d]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{email}</span>
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             New Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#65705d]/40" />
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               autoComplete="new-password"
//               className="w-full pl-10 pr-12 py-3 border border-[#e2e3dd]/70 rounded-lg focus:ring-2 focus:ring-[#65705d] focus:border-transparent bg-[#FDF7EF] focus:bg-white transition-all hover:border-[#65705d]/30 text-[#263b32] placeholder:text-[#8a9284]"
//               placeholder="Min. 8 characters with letters & numbers"
//               style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65705d]/40 hover:text-[#65705d] transition-colors"
//             >
//               <EyeIcon isVisible={showPassword} />
//             </button>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             Confirm New Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#65705d]/40" />
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               autoComplete="new-password"
//               className="w-full pl-10 pr-12 py-3 border border-[#e2e3dd]/70 rounded-lg focus:ring-2 focus:ring-[#65705d] focus:border-transparent bg-[#FDF7EF] focus:bg-white transition-all hover:border-[#65705d]/30 text-[#263b32] placeholder:text-[#8a9284]"
//               placeholder="Re-enter password"
//               style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65705d]/40 hover:text-[#65705d] transition-colors"
//             >
//               <EyeIcon isVisible={showConfirmPassword} />
//             </button>
//           </div>
//         </div>

//         {/* Password requirements hint - Sage theme */}
//         <div className="text-xs bg-[#FDF7EF] p-3 rounded-lg border border-[#e2e3dd]/60">
//           <p className="font-medium mb-1 text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             Password must contain:
//           </p>
//           <ul className="list-disc list-inside space-y-1 text-[#65705d]/70" style={{ fontFamily: FONT_FAMILY }}>
//             <li className={password.length >= 8 ? 'text-[#5b7d4f] font-medium' : ''}>
//               ✓ At least 8 characters
//             </li>
//             <li className={/[a-zA-Z]/.test(password) ? 'text-[#5b7d4f] font-medium' : ''}>
//               ✓ At least one letter
//             </li>
//             <li className={/\d/.test(password) ? 'text-[#5b7d4f] font-medium' : ''}>
//               ✓ At least one number
//             </li>
//           </ul>
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
//               Resetting...
//             </>
//           ) : (
//             <>
//               Reset Password
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
//           ← Back
//         </button>
//       </form>
//     </motion.div>
//   );
// }


// components/auth/ResetPassword.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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

export default function ResetPassword({ email, otp, onBack }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error('Password Mismatch', {
        description: 'The passwords you entered do not match.',
      });
      setIsSubmitting(false);
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      toast.error('Weak Password', {
        description: 'Password must be at least 8 characters long.',
      });
      setIsSubmitting(false);
      return;
    }

    // Validate password has at least one number and one letter
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    if (!hasNumber || !hasLetter) {
      toast.error('Weak Password', {
        description:
          'Password must contain at least one letter and one number.',
      });
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Resetting password...');

    try {
      console.log('Sending reset request:', { email, otp, password: '***' });

      const response = await fetch(
        'http://localhost:5000/api/auth/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            otp,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log('Reset response:', data);

      toast.dismiss(loadingToast);

      if (!response.ok) {
        console.error('Reset failed:', data);
        toast.error('Reset Failed', {
          description: data.error || 'Could not reset password',
        });
        setIsSubmitting(false);
        return;
      }

      // Success path
      toast.success('Password Reset Successful!', {
        description: 'You can now login with your new password.',
        icon: '🔐',
      });

      // Clear any stored data
      sessionStorage.removeItem('resetOTP');

      // Close modal and redirect
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Reset error:', error);
      toast.error('Connection Error', {
        description: 'Unable to connect to server',
      });
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // INLINE EYE ICON (kept from original)
  // ============================================================
  const EyeIcon = ({ isVisible }) => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {isVisible ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      )}
    </svg>
  );

  // ============================================================
  // PASSWORD STRENGTH CHECK
  // ============================================================
  const checks = {
    length: password.length >= 8,
    letter: /[a-zA-Z]/.test(password),
    number: /\d/.test(password),
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
          <Lock className="w-6 h-6" style={{ color: BRAND }} />
        </div>
        <h2
          className="text-2xl font-light mb-1.5"
          style={{ fontFamily: FONT_HEADING, color: DARK_TEXT }}
        >
          Reset Password
        </h2>
        <p
          className="text-sm leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: FONT_BODY, color: MUTED_TEXT }}
        >
          Create a new password for
          <br />
          <span
            className="font-semibold"
            style={{ fontFamily: FONT_BODY, color: BRAND }}
          >
            {email}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div>
          <label
            className="block text-[10px] font-semibold tracking-wider uppercase mb-1.5"
            style={{
              fontFamily: FONT_BODY,
              color: MUTED_TEXT,
              letterSpacing: '0.12em',
            }}
          >
            New Password
          </label>
          <div className="relative group">
            <Lock
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors group-focus-within:text-[#CC1D34]"
              style={{ color: `${MUTED_TEXT}99` }}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full pl-10 pr-11 py-3 text-sm rounded-xl outline-none transition-all"
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
              placeholder="Min. 8 characters with letters & numbers"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: `${MUTED_TEXT}99` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = BRAND;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `${MUTED_TEXT}99`;
              }}
            >
              <EyeIcon isVisible={showPassword} />
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            className="block text-[10px] font-semibold tracking-wider uppercase mb-1.5"
            style={{
              fontFamily: FONT_BODY,
              color: MUTED_TEXT,
              letterSpacing: '0.12em',
            }}
          >
            Confirm New Password
          </label>
          <div className="relative group">
            <Lock
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors group-focus-within:text-[#CC1D34]"
              style={{ color: `${MUTED_TEXT}99` }}
            />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full pl-10 pr-11 py-3 text-sm rounded-xl outline-none transition-all"
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
              placeholder="Re-enter password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: `${MUTED_TEXT}99` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = BRAND;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `${MUTED_TEXT}99`;
              }}
            >
              <EyeIcon isVisible={showConfirmPassword} />
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div
          className="text-xs p-3 rounded-xl"
          style={{
            backgroundColor: CREAM_BG,
            border: `1px solid ${CREAM_BORDER}`,
          }}
        >
          <p
            className="font-semibold mb-1.5 text-[11px] uppercase tracking-wider"
            style={{ fontFamily: FONT_BODY, color: DARK_TEXT, letterSpacing: '0.1em' }}
          >
            Password must contain:
          </p>
          <ul
            className="space-y-1"
            style={{ fontFamily: FONT_BODY, color: MUTED_TEXT }}
          >
            <li
              className="flex items-center gap-1.5 transition-colors"
              style={{
                color: checks.length ? BRAND : MUTED_TEXT,
                fontWeight: checks.length ? 600 : 400,
              }}
            >
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: checks.length ? BRAND : 'transparent',
                  border: `1px solid ${
                    checks.length ? BRAND : CREAM_BORDER
                  }`,
                }}
              />
              At least 8 characters
            </li>
            <li
              className="flex items-center gap-1.5 transition-colors"
              style={{
                color: checks.letter ? BRAND : MUTED_TEXT,
                fontWeight: checks.letter ? 600 : 400,
              }}
            >
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: checks.letter ? BRAND : 'transparent',
                  border: `1px solid ${
                    checks.letter ? BRAND : CREAM_BORDER
                  }`,
                }}
              />
              At least one letter
            </li>
            <li
              className="flex items-center gap-1.5 transition-colors"
              style={{
                color: checks.number ? BRAND : MUTED_TEXT,
                fontWeight: checks.number ? 600 : 400,
              }}
            >
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: checks.number ? BRAND : 'transparent',
                  border: `1px solid ${
                    checks.number ? BRAND : CREAM_BORDER
                  }`,
                }}
              />
              At least one number
            </li>
          </ul>
        </div>

        {/* Submit */}
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
              Resetting...
            </>
          ) : (
            <>
              Reset Password
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
          ← Back
        </button>
      </form>
    </motion.div>
  );
}