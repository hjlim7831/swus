import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Box from "@mui/material/Box";
import logo from "./../../../logo.png";
import { Outlet } from "react-router";
import NavBar from "./../../../components/NavBar/NavBar";

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <NavBar />
      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            sx={{
              minWidth: 650,
              maxWidth: 650,
              height: 550,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              display: "flex",
              backgroundColor: '#1A1E33',
            }}
          >
            <Box
              sx={{
                marginRight: 6,
                marginLeft: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={logo} width="180px" heigth="180px" alt="react"/>
            </Box>
            <Outlet></Outlet>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </>
    
  );
}
