"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { Box, ShieldCheck, ShieldAlert, Search, Filter } from 'lucide-react';
import { CONTAINER_IMAGES } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ContainerSecurity = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Container Security</h1>
        <p className="text-slate-400">Vulnerability scanning and runtime protection for container images</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <Input 
            placeholder="Search images or tags..." 
            className="pl-10 bg-slate-900 border-slate-800 text-white rounded-xl"
          />
        </div>
        <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-800 rounded-xl">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {CONTAINER_IMAGES.map((img) => (
          <div key={img.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-slate-800 p-4 rounded-2xl">
              <Box className="text-cyan-400" size={32} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-white">{img.name}</h3>
                <span className="text-slate-500 text-sm bg-slate-800 px-2 py-0.5 rounded">{img.tag}</span>
              </div>
              <p className="text-slate-400 text-sm">Last scanned: 2 hours ago</p>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <span className="block text-red-500 font-bold text-xl">{img.critical}</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold">Critical</span>
              </div>
              <div className="text-center">
                <span className="block text-orange-500 font-bold text-xl">{img.high}</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold">High</span>
              </div>
              <div className="text-center">
                <span className="block text-yellow-500 font-bold text-xl">{img.medium}</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold">Medium</span>
              </div>
            </div>

            <div className="flex items-center gap-4 min-w-[150px] justify-end">
              <div className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase",
                img.status === 'Passing' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              )}>
                {img.status === 'Passing' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                {img.status}
              </div>
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">View Report</Button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ContainerSecurity;