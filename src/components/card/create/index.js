import React, { useState } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { FormControl, Input, TextField } from "@mui/material";
import { checkAlphaNumeric } from "helpers/alphanumericCheck";
import { useDispatch, useSelector } from "react-redux";
import { createNewList } from "store/modules/list/operations";
function CreateCard(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.list.isCreateFetching);
  const [listName, setListName] = useState("");
  const [nameError, setNameError] = useState("");
  const checkValid = async (bool) => {
    let result = checkAlphaNumeric(listName);
    if (result) {
      return setNameError(result);
    }
    if (listName.length === 0) {
      return setNameError(`Name should't be empty`);
    }
    if (bool) {
      await dispatch(createNewList(listName));
      setListName("");
    }
  };
  return (
    <div className="flex flex-col">
      <div className="p-3">
        <FormControl>
          <TextField
            label="Name"
            variant="standard"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
            type="text"
            onFocus={() => setNameError(null)}
            onBlur={() => checkValid(false)}
            error={!!nameError}
            helperText={nameError}
          />
          <div className="mt-4">
            {isFetching ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                color="primary"
              >
                Saving
              </LoadingButton>
            ) : (
              <Button
                onClick={() => checkValid(true)}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            )}
          </div>
        </FormControl>
      </div>
    </div>
  );
}

export default CreateCard;
