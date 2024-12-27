import { notFound } from 'next/navigation';

import APIListPage from '@/lib/pages/all';

const AllAPIPage = async () => {
    notFound();
    return <APIListPage />;
};

export default AllAPIPage;
