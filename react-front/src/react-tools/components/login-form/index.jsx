import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {withSnackbar} from "notistack";
import {checkLogin} from "../../store/commands/user"
import block from 'bem-cn-lite';
import './login-form.less';

const b = block('login__form');

function LoginForm({enqueueSnackbar}) {
    const [formData, setFormData] = useState({
            email: '',
            password: ''
        }
    );

    function setLogin(e) {
        setFormData({...formData, email: e.target.value});
    }

    function setPassword(e) {
        setFormData({...formData, password: e.target.value});
    }

    function handler() {
        checkLogin(enqueueSnackbar, formData)
            .then(res => console.log(res));
    }

    return (<div className={b()}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={setLogin}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={setPassword}
        />

        <Button
            type="submit"
            fullWidth
            variant="contained"
            className={b('submit')}
            onClick={handler}
        >
            Sign In
        </Button>
    </div>);
}

export default withSnackbar(LoginForm);