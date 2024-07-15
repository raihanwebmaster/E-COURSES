import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { useSelector } from 'react-redux';
const withAdmin = <P extends object>(Component: ComponentType<P>): ComponentType<P> => {
  const WrappedComponent = (props: P) => {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!user || user.role !== 'admin') {
        router.push('/');
      }
    }, [user, router]);

    if (!user || user.role !== 'admin') {
      return null;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAdmin;
