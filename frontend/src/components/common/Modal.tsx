import * as React from "react";
import { Box, Modal, IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai"; // Importing close icon from react-icons
import { ModalProps } from "../../schema/component";
import Button from "./Button";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal: React.FC<ModalProps> = ({
  width = 400,
  height,
  title = "Modal Title",
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const customStyle = {
    ...defaultStyle,
    width: width,
    ...(height && { height: height }),
  };

  return (
    <div>
      <Button
        width="w-5/5"
        height="50px"
        bgColor="#bf0000"
        hoverColor="#9A1A1A"
        onClick={handleOpen}
      >
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="mt-6"
      >
        <Box sx={customStyle} className="bg-white rounded-lg p-6 relative">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <AiOutlineClose size={24} />
          </IconButton>
          <div
            id="modal-modal-title"
            className="text-2xl font-bai-bold text-center uppercase mb-4"
          >
            {title}
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
