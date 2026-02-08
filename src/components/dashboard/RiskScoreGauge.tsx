import React from 'react';
import { motion } from 'framer-motion';

interface RiskScoreGaugeProps {
  score: number;
}

const RiskScoreGauge = ({ score }: RiskScoreGaugeProps) => {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * score) / 100;

  return (
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
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-800"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-cyan-500 transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-3xl font-bold text-white">{score}</span>
      </div>
      <span className="mt-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
        {score > 70 ? 'High Risk' : score > 40 ? 'Moderate Risk' : 'Low Risk'}
      </span>
    </motion.div>
  );
};

export default RiskScoreGauge;