import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter, Download, ExternalLink } from 'lucide-react';
import { FINDINGS } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Findings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFindings = FINDINGS.filter(f => 
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.asset.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Findings Center</h1>
          <p className="text-slate-400">Centralized view of all security risks across your cloud estate</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-800 rounded-xl">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input 
              placeholder="Search findings, assets, or IDs..." 
              className="pl-10 bg-slate-950 border-slate-800 text-slate-200 rounded-xl focus:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-800 rounded-xl">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-950/50">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400 font-bold">Finding</TableHead>
              <TableHead className="text-slate-400 font-bold">Severity</TableHead>
              <TableHead className="text-slate-400 font-bold">Category</TableHead>
              <TableHead className="text-slate-400 font-bold">Asset</TableHead>
              <TableHead className="text-slate-400 font-bold">Status</TableHead>
              <TableHead className="text-right text-slate-400 font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFindings.map((finding) => (
              <TableRow key={finding.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{finding.title}</span>
                    <span className="text-slate-500 text-xs">{finding.id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                    finding.severity === 'Critical' ? "bg-red-500/10 text-red-500" : 
                    finding.severity === 'High' ? "bg-orange-500/10 text-orange-500" : 
                    "bg-yellow-500/10 text-yellow-500"
                  )}>
                    {finding.severity}
                  </span>
                </TableCell>
                <TableCell className="text-slate-300">{finding.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">{finding.asset}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{finding.provider}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "text-xs font-medium",
                    finding.status === 'Open' ? "text-red-400" : 
                    finding.status === 'In Progress' ? "text-cyan-400" : 
                    "text-green-400"
                  )}>
                    {finding.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-cyan-400">
                    <ExternalLink size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Findings;