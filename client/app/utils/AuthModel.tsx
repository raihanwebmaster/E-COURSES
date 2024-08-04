import React, { useMemo, useCallback, FC } from 'react';
import CustomModal from '../utils/CustomModal';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import Verification from '../components/Auth/Verification';
type Props = {
    open: boolean,
    setOpen: (open: boolean) => void
    route: string,
    setRoute: (route: string) => void
}
const AuthModal:FC<Props> = ({ open, setOpen, route, setRoute }) => {
    const getModalComponent = useCallback(() => {
        switch (route) {
            case 'Login':
                return Login;
            case 'Sign-Up':
                return SignUp;
            case 'Verification':
                return Verification;
            default:
                return null;
        }
    }, [route]);

    const ModalComponent = useMemo(() => getModalComponent(), [getModalComponent]);

    return (
        open && ModalComponent && (
            <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} route={route} component={ModalComponent} />
        )
    );
};

export default AuthModal;
