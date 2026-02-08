import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  index: number;
}

const StatCard = ({ label, value, icon: Icon, color, bg, index }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between"
    >
      <div className={`${bg} ${color} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
        <Icon size={20} />
      </div>
      <div>
        <span className="text-slate-400 text-sm font-medium">{label}</span>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
      </div>
    </motion.div>
  );
};

export default StatCard;