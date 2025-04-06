import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/services/auth';
import { useAccount } from 'wagmi';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { getSession } = useAuth();
    const { address } = useAccount();

    useEffect(() => {
        const session = getSession();
        
        if (!session || session.address !== address) {
            router.push('/');
        }
    }, [address]);

    return <>{children}</>;
}
