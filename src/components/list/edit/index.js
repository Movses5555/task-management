import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { FormControl, Input } from "@mui/material";
import { checkAlphaNumeric } from "helpers/alphanumericCheck";
import { useDispatch, useSelector } from "react-redux";
import { editListOperation } from "store/modules/list/operations";
function EditList(props) {
  const { title, saveEdit, id } = props;
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.list.isFetching);
  const [newListName, setNewListName] = useState(title);
  const [nameError, setNameError] = useState("");
  const checkValid = async (bool) => {
    let result = checkAlphaNumeric(newListName);
    if (result) {
      return setNameError(result);
    }
    if (newListName.length === 0) {
      return setNameError(`Name should't be empty`);
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
          <Input
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter list name"
            type="text"
            onFocus={() => setNameError(null)}
            onBlur={() => checkValid(false)}
          />
          {nameError && (
            <span className="text-sm text-red-600">{nameError}</span>
          )}
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
