import { useQuery } from '@tanstack/react-query';
import { securityApi } from '@/lib/api';

export const useFindings = () => {
  return useQuery({
    queryKey: ['findings'],
    queryFn: securityApi.getFindings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};