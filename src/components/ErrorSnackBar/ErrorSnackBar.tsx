import * as React from 'react';
import {useState} from 'react';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {setErrorAC} from "../../redux/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackBar() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const [state, setState] = useState<SnackbarOrigin>({
        vertical: 'bottom',
        horizontal: 'center',
    })
    const {vertical, horizontal} = state;

    const isOpen = error !== null
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
        // setOpen(false);
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical, horizontal}}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}