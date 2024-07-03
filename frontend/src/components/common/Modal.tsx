import * as React from "react";
import { Box, Modal, IconButton, Backdrop } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai"; // Importing close icon from react-icons
import { ModalProps } from "../../schema/component";

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
  buttonLabel = "REGISTER",
  disableClose = false,
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

  const backdropProps = {
    onClick: disableClose ? undefined : handleClose,
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-full h-12"
      >
        {buttonLabel}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="mt-6"
        BackdropComponent={Backdrop}
        BackdropProps={backdropProps}
      >
        <Box sx={customStyle} className="bg-white rounded-lg p-6 relative">
          {!disableClose && (
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
          )}
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
