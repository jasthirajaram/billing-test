import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react'



const InputComponent = ({ name, placeholder, value, forChange, icon, type, togglePasswordVisibility }) => {
    return (
        <TextField name={name} type={type}
            placeholder={placeholder}
            fullWidth
            value={value || ''}
            onChange={forChange}
            autoComplete="off" InputProps={{
                sx: {
                    height: "45px",
                },
                endAdornment: (
                    <InputAdornment position="end">
                        {name === 'password' ? <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                        >{icon}
                        </IconButton> : icon}
                    </InputAdornment>
                ),
            }}
        />

    )
}

export default InputComponent