import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Upload, FileCode, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const IaCScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<null | any[]>(null);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setResults([
        { id: 1, rule: 'S3 Bucket Public Access', severity: 'Critical', line: 12, file: 'main.tf' },
        { id: 2, rule: 'Hardcoded Secret Detected', severity: 'High', line: 45, file: 'variables.tf' },
        { id: 3, rule: 'Unencrypted EBS Volume', severity: 'Medium', line: 88, file: 'storage.tf' },
      ]);
      showSuccess('Scan completed successfully!');
    }, 2000);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">IaC Security Scanner</h1>
        <p className="text-slate-400">Scan Terraform, CloudFormation, and Kubernetes manifests for misconfigurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Upload Files</h3>
            <p className="text-slate-400 text-sm mb-8">Drag and drop your IaC files or click to browse</p>
            
            <div className="border-2 border-dashed border-slate-800 rounded-2xl p-12 mb-6 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <FileCode className="mx-auto text-slate-600 group-hover:text-cyan-400 mb-4" size={48} />
              <span className="text-slate-500 text-sm">main.tf, k8s.yaml, etc.</span>
            </div>

            <Button 
              onClick={handleScan}
              disabled={isScanning}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-xl h-12"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning...
                </>
              ) : 'Start Security Scan'}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[500px]">
            <h3 className="text-lg font-bold text-white mb-6">Scan Results</h3>
            
            <AnimatePresence mode="wait">
              {!results && !isScanning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-slate-500"
                >
                  <AlertCircle size={48} className="mb-4 opacity-20" />
                  <p>No scan results to display. Upload a file to begin.</p>
                </motion.div>
              )}

              {isScanning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin" />
                  </div>
                  <p className="text-cyan-400 font-medium animate-pulse">Analyzing infrastructure code...</p>
                </motion.div>
              )}

              {results && !isScanning && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {results.map((finding) => (
                    <div key={finding.id} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-2 h-12 rounded-full",
                          finding.severity === 'Critical' ? "bg-red-500" : finding.severity === 'High' ? "bg-orange-500" : "bg-yellow-500"
                        )} />
                        <div>
                          <h4 className="text-white font-bold">{finding.rule}</h4>
                          <p className="text-slate-400 text-sm">{finding.file} • Line {finding.line}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase",
                        finding.severity === 'Critical' ? "text-red-500 bg-red-500/10" : finding.severity === 'High' ? "text-orange-500 bg-orange-500/10" : "text-yellow-500 bg-yellow-500/10"
                      )}>
                        {finding.severity}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IaCScanner;