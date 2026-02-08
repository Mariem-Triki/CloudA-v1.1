import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cloud, 
  ShieldAlert, 
  FileCode, 
  Box, 
  Table, 
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Cloud, label: 'Cloud Accounts', path: '/accounts' },
    { icon: ShieldAlert, label: 'CSPM Engine', path: '/cspm' },
    { icon: FileCode, label: 'IaC Scanner', path: '/iac' },
    { icon: Box, label: 'Container Security', path: '/containers' },
    { icon: Table, label: 'Findings Center', path: '/findings' },
  ];

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <img 
            src="https://files.dyad.sh/7df6f42360fe5c978162c438e308d47b.png" 
            alt="ANCS Logo" 
            className="h-10 w-auto object-contain"
          />
          <span className="text-xl font-bold text-white tracking-tight">ANCS</span>
        </div>
        <span className="text-[10px] text-slate-500 font-medium leading-tight uppercase tracking-wider">
          Cyber Security Agency
        </span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              location.pathname === item.path 
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            )}
          >
            <item.icon size={20} className={cn(
              location.pathname === item.path ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
            )} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white cursor-pointer">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;