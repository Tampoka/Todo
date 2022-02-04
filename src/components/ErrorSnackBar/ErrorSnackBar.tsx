import * as React from 'react';
import {useState} from 'react';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../redux/store';
import {setAppErrorAC} from '../../redux/app-reducer';
import s from './ErrorSnackBar.module.css'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackBar() {
    const error = useAppSelector(state => state.app.error)
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
        dispatch(setAppErrorAC({error:null}))
        // setOpen(false);
    };

    return (
        <div className={s.barContainer}>
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical, horizontal}}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
        </div>
    );
}