"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { ShieldAlert, RefreshCw, CheckCircle2, AlertTriangle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const CSPM = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      showSuccess('CSPM Scan completed. 12 new findings detected.');
    }, 3000);
  };

  const policies = [
    { id: 1, name: 'S3 Buckets should have public access blocked', status: 'Failed', severity: 'Critical', provider: 'AWS' },
    { id: 2, name: 'Ensure MFA is enabled for all IAM users', status: 'Passed', severity: 'High', provider: 'AWS' },
    { id: 3, name: 'Storage accounts should restrict network access', status: 'Failed', severity: 'High', provider: 'Azure' },
    { id: 4, name: 'Unused security groups should be removed', status: 'Passed', severity: 'Low', provider: 'GCP' },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">CSPM Engine</h1>
          <p className="text-slate-400">Continuous monitoring of cloud configuration security</p>
        </div>
        <Button 
          onClick={handleScan}
          disabled={isScanning}
          className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-xl px-6"
        >
          <RefreshCw className={cn("mr-2 h-4 w-4", isScanning && "animate-spin")} />
          {isScanning ? 'Scanning...' : 'Run Full Scan'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Policy Compliance', value: '84%', color: 'text-green-500' },
          { label: 'Failed Checks', value: '12', color: 'text-red-500' },
          { label: 'Scanned Resources', value: '1,240', color: 'text-cyan-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
            <h3 className={cn("text-3xl font-bold mt-1", stat.color)}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">Security Policies</h3>
        </div>
        <div className="divide-y divide-slate-800">
          {policies.map((policy) => (
            <div key={policy.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  policy.status === 'Passed' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                )}>
                  {policy.status === 'Passed' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                </div>
                <div>
                  <h4 className="text-white font-medium">{policy.name}</h4>
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mt-1">
                    {policy.provider} • {policy.severity} Severity
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  policy.status === 'Passed' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                )}>
                  {policy.status}
                </span>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CSPM;