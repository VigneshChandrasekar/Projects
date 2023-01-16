import { useAuth } from '../../src/components/Providers/Auth';
import Layout from '../../src/components/Layout/Layout';

export default function Home() {
  const { user } = useAuth();
  return (
    <Layout title="Storefront">
      <div>
        
      </div>
    </Layout>   
  )
};