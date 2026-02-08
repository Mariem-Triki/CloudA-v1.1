import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip 
} from 'recharts';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';
import { COMPLIANCE_DATA, FINDINGS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const Index = () => {
  const severityData = [
    { name: 'Critical', value: 3, color: '#ef4444' },
    { name: 'High', value: 5, color: '#f97316' },
    { name: 'Medium', value: 8, color: '#eab308' },
    { name: 'Low', value: 12, color: '#22c55e' },
  ];

  const riskScore = 68;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
        <p className="text-slate-400">Global overview of your cloud security posture</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
          <span className="text-slate-400 text-sm font-medium mb-2">Global Risk Score</span>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * riskScore) / 100}
                className="text-cyan-500 transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-3xl font-bold text-white">{riskScore}</span>
          </div>
          <span className="mt-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">Moderate Risk</span>
        </motion.div>

        {[
          { label: 'Active Findings', value: '28', icon: Shield, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Cloud Assets', value: '655', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
          { label: 'Compliance Rate', value: '78%', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between"
          >
            <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <div>
              <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Findings by Severity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Compliance Overview</h3>
          <div className="space-y-4">
            {COMPLIANCE_DATA.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="text-slate-400 font-medium">{item.score}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full",
                      item.score > 80 ? "bg-green-500" : item.score > 60 ? "bg-yellow-500" : "bg-red-500"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;