import React from 'react';
import Layout from '@/components/Layout';
import { Plus, MoreVertical, Cloud, Shield } from 'lucide-react';
import { CLOUD_ACCOUNTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CloudAccounts = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Cloud Accounts</h1>
          <p className="text-slate-400">Manage your connected AWS, Azure, and GCP environments</p>
        </div>
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-xl px-6">
          <Plus className="mr-2 h-4 w-4" /> Connect Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CLOUD_ACCOUNTS.map((account, i) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-slate-800 p-3 rounded-xl group-hover:bg-cyan-500/10 transition-colors">
                <Cloud className="text-cyan-400" size={24} />
              </div>
              <button className="text-slate-500 hover:text-white">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">{account.name}</h3>
            <p className="text-slate-400 text-sm mb-6">{account.provider} • {account.assets} Assets</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Status</span>
                <span className={cn(
                  "px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider",
                  account.status === 'Connected' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                )}>
                  {account.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Risk Score</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        account.riskScore < 30 ? "bg-green-500" : account.riskScore < 60 ? "bg-yellow-500" : "bg-red-500"
                      )}
                      style={{ width: `${account.riskScore}%` }}
                    />
                  </div>
                  <span className="text-white font-bold text-sm">{account.riskScore}</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-6 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl">
              View Details
            </Button>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
};

export default CloudAccounts;