import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FormControl, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { checkAlphaNumericNotEmpty } from "helpers/alphanumericCheck";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { editCardOperation } from "store/modules/list/operations";
import { useDispatch, useSelector } from "react-redux";
function CardEdit(props) {
  const { title, desc, listId, id, closeModal } = props;
  const [newName, setNewName] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);
  const [errors, setErrors] = useState({
    nameError: "",
    descError: "",
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 300,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
  const isFetching = useSelector((state) => state.list.isCardEditFetching);

  const dispatch = useDispatch();
  const checkValid = async () => {
    let checkName = checkAlphaNumericNotEmpty(newName);
    let checkDesc = checkAlphaNumericNotEmpty(newDesc);
    if (checkName || checkDesc) {
      return setErrors({
        ...errors,
        nameError: checkName,
        descError: checkDesc,
      });
    }
    let saveData = {
      title: newName,
      description: newDesc,
      id,
      listId,
    };
    await dispatch(editCardOperation(saveData));
    closeModal();
  };
  return (
    <Box sx={style}>
      <div className="relative flex flex-col items-end h-full justify-around">
        <div className="absolute -top-6 -right-6">
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>
        <FormControl className="w-full">
          <TextField
            label="Name"
            variant="standard"
            InputProps={{ style: { fontSize: 23, marginTop: "1rem" } }}
            InputLabelProps={{
              style: { fontSize: 20, paddingBottom: "0.5rem" },
            }}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            fullWidth
            onFocus={() => setErrors({ ...errors, nameError: null })}
            error={!!errors.nameError}
            helperText={errors.nameError}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            InputProps={{ style: { fontSize: 20, marginTop: "1rem" } }}
            InputLabelProps={{
              style: { fontSize: 18, paddingBottom: "0.5rem" },
            }}
            multiline
            maxRows={4}
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            variant="standard"
            onFocus={() => setErrors({ ...errors, descError: null })}
            error={!!errors.descError}
            helperText={errors.descError}
          />
        </FormControl>
        {isFetching ? (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >Saving</LoadingButton>
        ) : (
          <Button
            onClick={(e) => {
              checkValid();
            }}
            variant="contained"
            color="success"
          >
            Save
          </Button>
        )}
      </div>
    </Box>
  );
}

export default CardEdit;
