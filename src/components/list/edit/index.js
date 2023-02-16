import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { FormControl, TextField } from "@mui/material";
import { checkAlphaNumericNotEmpty } from "helpers/alphanumericCheck";
import { useDispatch, useSelector } from "react-redux";
import { editListOperation } from "store/modules/list/operations";
import { namedRequestsInProgress } from "store/modules/request/selectors";
import { requestsEnum } from "store/modules/requestsEnum";
function EditList(props) {
  const { title, saveEdit, id } = props;
  const dispatch = useDispatch();
  const isFetching = useSelector((state) =>
    namedRequestsInProgress(state, requestsEnum().editList)
  );
  const [newListName, setNewListName] = useState(title);
  const [nameError, setNameError] = useState("");
  const checkValid = async (bool) => {
    let result = checkAlphaNumericNotEmpty(newListName);
    if (result) {
      return setNameError(result);
    }
    if (bool) {
      let saveData = {
        title: newListName,
        id,
      };
      await dispatch(editListOperation(saveData));
      saveEdit();
    }
  };
  return (
    <div className="flex flex-col">
      <div className="p-3">
        <FormControl>
          <TextField
            label="Name"
            variant="standard"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
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
              <div className="flex gap-2 justify-end">
                <Button
                  size="small"
                  onClick={() => checkValid(true)}
                  variant="contained"
                  color="primary"
                  disabled={title === newListName}
                >
                  Save
                </Button>
                <Button
                  size="small"
                  onClick={() => saveEdit()}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </FormControl>
      </div>
    </div>
  );
}

export default EditList;
