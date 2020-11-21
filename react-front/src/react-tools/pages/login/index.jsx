import React, {useState} from 'react';
import block from 'bem-cn-lite';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withSnackbar} from "notistack";
import {checkLogin} from "../../store/commands/user"
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import {Letter, Exadel} from './icons/index.jsx';
import './login.less';

const b = block('login');

const emailChecker = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignIn({enqueueSnackbar}) {
    const [emailData, emailSetData] = useState('');
    const [passwordData, passwordSetData] = useState('');
    const [isEmailError, emailErrorSetData] = useState(false);
    const [isPasswordError, passwordErrorSetData] = useState(false);

    const doFetch = (e) => {
        e.preventDefault();
        check('both');
        if (emailChecker.test(emailData) && passwordData.length > 3) {
            checkLogin(enqueueSnackbar, {email: emailData, password: passwordData})
        }
    };
    const check = (type) => {
        if (type === 'email') {
            emailChecker.test(emailData) ? emailErrorSetData(false) : emailErrorSetData(true);
        }
        if (type === 'password') {
            passwordData.length < 3 ? passwordErrorSetData(true) : passwordErrorSetData(false);
        }
        if (type === 'both') {
            emailChecker.test(emailData) ? emailErrorSetData(false) : emailErrorSetData(true);
            passwordData.length < 3 ? passwordErrorSetData(true) : passwordErrorSetData(false);
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={b('paper')}>
                <div className={b('logo')}>
                    <Letter propClass={b('letter-icon')}/>
                    <Exadel propClass={b('text-icon')}/>
                </div>
                <form onSubmit={e => {
                    doFetch(e)
                }} className={b('form')} noValidate>
                    <TextField
                        value={emailData}
                        variant="outlined"
                        margin="normal"
                        inputProps={{
                            maxLength: 50,
                        }}
                        required
                        error={isEmailError}
                        helperText={isEmailError ? 'Please put valid email' : ''}
                        fullWidth
                        id="email"
                        type="email"
                        className={b('input')}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={e => emailSetData(e.target.value)}
                        onBlur={() => check('email')}
                        autoFocus
                    />
                    <TextField
                        value={passwordData}
                        variant="outlined"
                        margin="normal"
                        inputProps={{
                            maxLength: 50,
                        }}
                        required
                        fullWidth
                        name="password"
                        className={b('input')}
                        label="Password"
                        type="password"
                        error={isPasswordError}
                        helperText={isPasswordError ? 'it should contain at least 3 characters' : ''}
                        onChange={e => passwordSetData(e.target.value)}
                        onBlur={() => check('password')}
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={b('submit')}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}

SignIn.propTypes = {
    enqueueSnackbar: PropTypes.func
};

export default withSnackbar(SignIn);
