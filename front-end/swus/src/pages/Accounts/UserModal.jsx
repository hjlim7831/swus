import * as React from "react";
import Button from "@mui/joy/Button";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
// import Stack from "@mui/joy/Stack";
// import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";

// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

// import { indigo } from "@mui/material/colors";

// import logo from "./assets/logo.png";

export default function BasicModalDialog() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      {/* <Button
        variant="outlined"
        color="neutral"
        // startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New project
      </Button> */}

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            minWidth: 400,
            maxWidth: 500,
            minHeight: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // background: "white",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Sign in
              <Link
                href="#"
                variant="h5"
                style={{ textDecoration: "none", color: "black" }}
              >
                Sign Up
              </Link>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              아이디 (이메일)
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              비밀번호
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Link href="#" variant="body2">
                아이디/비밀번호 찾기
              </Link>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
