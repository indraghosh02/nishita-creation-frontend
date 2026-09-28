
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import {
//   LayoutDashboard,
//   ShoppingBag,
//   MessageSquare,
//   Settings,
//   LogOut,
//   Menu,
//   ChevronDown,
//   Home,
//   ChevronRight,
//   Star,
//   Sparkles,
//   Gift,
//   Heart,
//   Award,
//   Cpu,
//   Store,
//   Headphones,
//   Phone,
//   Clock,
//   Users,
//   BarChart3,
//   Bell,
//   UserCog,
//   ShieldCheck,
//   Zap,
//   ChevronUp
// } from 'lucide-react';
// import DynamicLogo from '../components/DynamicLogo';

// export default function AgentLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Helper function to normalize pathname (remove trailing slash)
//   const normalizePath = (path) => {
//     if (path && path !== '/' && path.endsWith('/')) {
//       return path.slice(0, -1);
//     }
//     return path;
//   };

//   // Helper function to check if a route is active
//   const isActive = (href) => {
//     const currentPath = normalizePath(pathname);

//     if (href === '/agent/dashboard') {
//       return currentPath === '/agent/dashboard';
//     }

//     if (href === '/agent/orders') {
//       return currentPath === '/agent/orders' ||
//              currentPath.startsWith('/agent/orders/');
//     }

//     if (href === '/agent/settings') {
//       return currentPath === '/agent/settings' ||
//              currentPath.startsWith('/agent/settings/');
//     }

//     return false;
//   };

//   // Navigation click handler
//   const handleNavigation = (href) => {
//     setSidebarOpen(false);
//     router.push(href);
//   };

//   useEffect(() => {
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';

//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');

//     if (!token || !userData) {
//       logout();
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);

//       // Check if user is call_center_agent
//       if (parsedUser.role !== 'call_center_agent') {
//         logout();
//         return;
//       }

//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/agent/dashboard', icon: LayoutDashboard },
//     { name: 'Orders', href: '/agent/orders', icon: ShoppingBag },
//     { name: 'Settings', href: '/agent/settings', icon: Settings }
//   ];

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8f7f2]">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-[#53645a] font-medium">Loading Agent Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style jsx global>{`
//         html, body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow-x: hidden;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>

//       <div className="min-h-screen bg-[#f8f7f2]" style={{ margin: 0, padding: 0 }}>
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar - Green Theme */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-[#c5d5be]/40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//           {/* Sidebar header with dynamic logo */}
//           <div className="h-20 flex items-center justify-center px-6 border-b border-[#c5d5be]/40 bg-white">
//             <DynamicLogo 
//               className="justify-center"
//               textClassName="text-xl font-bold text-[#263b32]"
//               iconClassName="w-8 h-8 text-[#8B9D83]"
//               linkClassName="justify-center"
//             />
//           </div>

//           {/* User info - In sidebar below header */}
//           {user && (
//             <div className="px-4 py-4 border-b border-[#c5d5be]/40 bg-[#f0f5ed]">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-[#8B9D83] to-[#6b7d63]">
//                   {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-[#263b32] truncate">
//                     {user.companyName || user.contactPerson || 'Agent'}
//                   </p>
//                   <p className="text-xs text-[#53645a] truncate mt-0.5">
//                     {user.email}
//                   </p>
//                   <div className="flex items-center gap-1.5 mt-1.5">
//                     <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-[#c5d5be]/30 text-[#8B9D83] border-[#8B9D83]/30">
//                       Call Center Agent
//                     </span>
//                     <Headphones className="w-3 h-3 text-[#8B9D83]" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
//             <div className="flex items-center gap-2 px-3 mb-4">
//               <Headphones className="w-3 h-3 text-[#8B9D83]" />
//               <p className="text-xs font-semibold text-[#8B9D83]/60 uppercase tracking-wider">AGENT MENU</p>
//             </div>
//             <div className="space-y-1">
//               {navigation.map((item) => {
//                 const active = isActive(item.href);
//                 return (
//                   <div
//                     key={item.name}
//                     onClick={() => handleNavigation(item.href)}
//                     className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
//                       active
//                         ? 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white shadow-md shadow-[#8B9D83]/20'
//                         : 'text-[#263b32] hover:bg-[#c5d5be]/30'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className={`w-5 h-5 ${
//                         active ? 'text-white' : 'text-[#8B9D83]'
//                       }`} />
//                       <span>{item.name}</span>
//                     </div>
//                     {active && <ChevronRight className="w-4 h-4 text-white" />}
//                   </div>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Logout button at bottom */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#c5d5be]/40 bg-white">
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#263b32] rounded-xl hover:bg-[#c5d5be]/30 hover:text-[#8B9D83] w-full transition-all group"
//             >
//               <div className="w-8 h-8 rounded-lg bg-[#c5d5be]/20 group-hover:bg-[#c5d5be]/50 flex items-center justify-center">
//                 <LogOut className="w-4 h-4 text-[#8B9D83] group-hover:text-[#8B9D83]" />
//               </div>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="lg:ml-72 min-h-screen -mt-16">
//           {/* Top header - Green Theme */}
//           <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#c5d5be]/40 shadow-sm" style={{ margin: 0 }}>
//             <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
//               <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     className="lg:hidden w-10 h-10 rounded-lg bg-[#c5d5be]/20 flex items-center justify-center text-[#8B9D83] hover:bg-[#c5d5be]/40 transition-colors"
//                   >
//                     <Menu className="w-5 h-5" />
//                   </button>

//                   {/* Dynamic Logo in header (visible on mobile when sidebar closed) */}
//                   <div className="lg:hidden">
//                     <DynamicLogo 
//                       textClassName="text-lg font-bold text-[#263b32]"
//                       iconClassName="w-6 h-6 text-[#8B9D83]"
//                     />
//                   </div>

//                   {/* Welcome Message */}
//                   {user && (
//                     <div className="hidden lg:flex items-center gap-2">
//                       <span className="text-lg md:text-2xl font-light text-[#263b32]">Welcome back,</span>
//                       <span className="text-lg md:text-2xl font-medium text-[#8B9D83]">{user.companyName || user.contactPerson || 'Agent'}</span>
//                       <Headphones className="w-5 h-5 text-[#8B9D83] hidden md:block" />
//                       <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full border bg-[#c5d5be]/30 text-[#8B9D83] border-[#8B9D83]/30 hidden md:inline-flex items-center gap-1">
//                         <Headphones className="w-3 h-3" />
//                         Call Center Agent
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right section */}
//                 <div className="flex items-center gap-3">
//                   {/* Agent Status Badge - Green themed */}
//                   <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#c5d5be]/20 border border-[#8B9D83]/20 rounded-full">
//                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//                     <span className="text-xs font-medium text-[#8B9D83]">Online</span>
//                   </div>

//                   <Link
//                     href="/"
//                     className="w-10 h-10 rounded-lg bg-[#c5d5be]/20 flex items-center justify-center text-[#8B9D83] hover:bg-[#c5d5be]/40 transition-colors group"
//                     title="Go to Homepage"
//                   >
//                     <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   </Link>

//                   {/* User Dropdown */}
//                   {user && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setUserMenuOpen(!userMenuOpen)}
//                         className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-[#c5d5be]/20 transition-colors"
//                       >
//                         <div className="text-right hidden md:block">
//                           <p className="text-sm font-medium text-[#263b32]">{user.companyName || user.contactPerson || 'Agent'}</p>
//                           <p className="text-xs text-[#53645a]">{user.email}</p>
//                         </div>
//                         <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] shadow-md shadow-[#8B9D83]/20">
//                           {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <ChevronDown className={`w-4 h-4 text-[#8B9D83] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {userMenuOpen && (
//                         <>
//                           <div
//                             className="fixed inset-0 z-40"
//                             onClick={() => setUserMenuOpen(false)}
//                           />
//                           <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#c5d5be]/40 py-2 z-50">
//                             <div className="px-4 py-3 border-b border-[#c5d5be]/40 bg-[#f0f5ed] rounded-t-2xl">
//                               <p className="text-sm font-semibold text-[#263b32]">{user.companyName || user.contactPerson || 'Agent'}</p>
//                               <p className="text-xs text-[#53645a] truncate mt-0.5">{user.email}</p>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="px-2 py-0.5 text-xs font-medium rounded-full border bg-[#c5d5be]/30 text-[#8B9D83] border-[#8B9D83]/30">
//                                   Call Center Agent
//                                 </span>
//                                 <Headphones className="w-3 h-3 text-[#8B9D83]" />
//                               </div>
//                             </div>

//                             <div
//                               onClick={() => {
//                                 setUserMenuOpen(false);
//                                 handleNavigation('/agent/settings');
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#263b32] hover:bg-[#c5d5be]/20 transition-colors cursor-pointer"
//                             >
//                               <Settings className="w-4 h-4 text-[#8B9D83]" />
//                               <span>Settings</span>
//                             </div>

//                             <button
//                               onClick={() => {
//                                 setUserMenuOpen(false);
//                                 logout();
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left border-t border-[#c5d5be]/40 mt-1 pt-2 rounded-b-2xl"
//                             >
//                               <LogOut className="w-4 h-4" />
//                               <span>Logout</span>
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="" style={{ margin: 0, padding: 0 }}>
//             {children}
//           </main>
//         </div>
//       </div>

//       {/* Add custom scrollbar styles - Green */}
//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 5px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #8B9D83, #6b7d63);
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #7a8c72, #5a6b53);
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  Home,
  ChevronRight,
  Star,
  Sparkles,
  Gift,
  Heart,
  Award,
  Cpu,
  Store,
  Headphones,
  Phone,
  Clock,
  Users,
  BarChart3,
  Bell,
  UserCog,
  ShieldCheck,
  Zap,
  ChevronUp
} from 'lucide-react';
import DynamicLogo from '../components/DynamicLogo';

export default function AgentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to normalize pathname (remove trailing slash)
  const normalizePath = (path) => {
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  // Helper function to check if a route is active
  const isActive = (href) => {
    const currentPath = normalizePath(pathname);

    if (href === '/agent/dashboard') {
      return currentPath === '/agent/dashboard';
    }

    if (href === '/agent/orders') {
      return currentPath === '/agent/orders' ||
             currentPath.startsWith('/agent/orders/');
    }

    if (href === '/agent/settings') {
      return currentPath === '/agent/settings' ||
             currentPath.startsWith('/agent/settings/');
    }

    return false;
  };

  // Navigation click handler
  const handleNavigation = (href) => {
    setSidebarOpen(false);
    router.push(href);
  };

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);

      if (parsedUser.role !== 'call_center_agent') {
        logout();
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const navigation = [
    { name: 'Dashboard', href: '/agent/dashboard', icon: LayoutDashboard },
    { name: 'Orders', href: '/agent/orders', icon: ShoppingBag },
    { name: 'Settings', href: '/agent/settings', icon: Settings }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#CF1B34] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6b6b6b] font-medium">Loading Agent Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
          font-family: 'Raleway', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <div className="min-h-screen bg-[#fdfdfd]" style={{ margin: 0, padding: 0 }}>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - White + Red */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-[#e6e6e6] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar header */}
          <div className="h-20 flex items-center justify-center px-6 border-b border-[#e6e6e6] bg-white">
            <DynamicLogo 
              className="justify-center"
              textClassName="text-xl font-bold text-[#1a1a1a]"
              iconClassName="w-8 h-8 text-[#CF1B34]"
              linkClassName="justify-center"
            />
          </div>

          {/* User info */}
          {user && (
            <div className="px-4 py-4 border-b border-[#e6e6e6] bg-[#fafafa]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-[#a81428] to-[#CF1B34]">
                  {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1a1a1a] truncate">
                    {user.companyName || user.contactPerson || 'Agent'}
                  </p>
                  <p className="text-xs text-[#6b6b6b] truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-[#faf0f1] text-[#CF1B34] border-[#CF1B34]/30">
                      Call Center Agent
                    </span>
                    <Headphones className="w-3 h-3 text-[#CF1B34]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
            <div className="flex items-center gap-2 px-3 mb-4">
              <Headphones className="w-3 h-3 text-[#CF1B34]" />
              <p className="text-xs font-semibold text-[#CF1B34]/70 uppercase tracking-wider">AGENT MENU</p>
            </div>
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <div
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-[#a81428] to-[#CF1B34] text-white shadow-md shadow-[#CF1B34]/20'
                        : 'text-[#1a1a1a] hover:bg-[#faf0f1]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${
                        active ? 'text-white' : 'text-[#CF1B34]'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-white" />}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#e6e6e6] bg-white">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1a1a1a] rounded-xl hover:bg-[#faf0f1] hover:text-[#CF1B34] w-full transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#faf0f1] group-hover:bg-[#f5dcdf] flex items-center justify-center">
                <LogOut className="w-4 h-4 text-[#CF1B34]" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen -mt-16">
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e6e6e6] shadow-sm" style={{ margin: 0 }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-lg bg-[#faf0f1] flex items-center justify-center text-[#CF1B34] hover:bg-[#f5dcdf] transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>

                  <div className="lg:hidden">
                    <DynamicLogo 
                      textClassName="text-lg font-bold text-[#1a1a1a]"
                      iconClassName="w-6 h-6 text-[#CF1B34]"
                    />
                  </div>

                  {user && (
                    <div className="hidden lg:flex items-center gap-2">
                      <span className="text-lg md:text-2xl font-light text-[#1a1a1a]">Welcome back,</span>
                      <span className="text-lg md:text-2xl font-medium text-[#CF1B34]">{user.companyName || user.contactPerson || 'Agent'}</span>
                      <Headphones className="w-5 h-5 text-[#CF1B34] hidden md:block" />
                      <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full border bg-[#faf0f1] text-[#CF1B34] border-[#CF1B34]/30 hidden md:inline-flex items-center gap-1">
                        <Headphones className="w-3 h-3" />
                        Call Center Agent
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Agent Status Badge */}
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#faf0f1] border border-[#CF1B34]/20 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#4c8a5b] animate-pulse"></span>
                    <span className="text-xs font-medium text-[#CF1B34]">Online</span>
                  </div>

                  <Link
                    href="/"
                    className="w-10 h-10 rounded-lg bg-[#faf0f1] flex items-center justify-center text-[#CF1B34] hover:bg-[#f5dcdf] transition-colors group"
                    title="Go to Homepage"
                  >
                    <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>

                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-[#faf0f1] transition-colors"
                      >
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-medium text-[#1a1a1a]">{user.companyName || user.contactPerson || 'Agent'}</p>
                          <p className="text-xs text-[#6b6b6b]">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-r from-[#a81428] to-[#CF1B34] shadow-md shadow-[#CF1B34]/20">
                          {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#CF1B34] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {userMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#e6e6e6] py-2 z-50">
                            <div className="px-4 py-3 border-b border-[#e6e6e6] bg-[#fafafa] rounded-t-2xl">
                              <p className="text-sm font-semibold text-[#1a1a1a]">{user.companyName || user.contactPerson || 'Agent'}</p>
                              <p className="text-xs text-[#6b6b6b] truncate mt-0.5">{user.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full border bg-[#faf0f1] text-[#CF1B34] border-[#CF1B34]/30">
                                  Call Center Agent
                                </span>
                                <Headphones className="w-3 h-3 text-[#CF1B34]" />
                              </div>
                            </div>

                            <div
                              onClick={() => {
                                setUserMenuOpen(false);
                                handleNavigation('/agent/settings');
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1a1a1a] hover:bg-[#faf0f1] transition-colors cursor-pointer"
                            >
                              <Settings className="w-4 h-4 text-[#CF1B34]" />
                              <span>Settings</span>
                            </div>

                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#CF1B34] hover:bg-[#faf0f1] transition-colors w-full text-left border-t border-[#e6e6e6] mt-1 pt-2 rounded-b-2xl"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="" style={{ margin: 0, padding: 0 }}>
            {children}
          </main>
        </div>
      </div>

      {/* Custom scrollbar styles - Red */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #CF1B34, #a81428);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a81428, #8a0f1f);
        }
      `}</style>
    </>
  );
}