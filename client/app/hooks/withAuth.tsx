import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { useSelector } from 'react-redux';

const withAuth = <P extends object>(Component: ComponentType<P>): ComponentType<P> => {
  const WrappedComponent = (props: P) => {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/'); // Redirect to login if not authenticated
      }
    }, [user, router]);

    if (!user) {
      return null; // Or return a loading spinner or a placeholder
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAuth;
