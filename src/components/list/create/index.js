import React, { useState } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { FormControl, Input } from "@mui/material";
import { checkAlphaNumeric } from "helpers/alphanumericCheck";
import { useDispatch, useSelector } from "react-redux";
import { createNewList } from "store/modules/list/operations";
function CreateList() {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.list.isFetching);
  const [menuOpen, setMenuOpen] = useState(false);
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
      setMenuOpen(false);
      setListName("");
    }
  };
  return (
    <div className="max-w-xsm flex flex-col">
      <Button
        onClick={() => setMenuOpen(!menuOpen)}
        startIcon={<AddSharpIcon />}
        variant="outlined"
        color="primary"
      >
        Create new list
      </Button>
      {menuOpen && (
        <div className="p-3 border border-blue-300 border-t-0">
          <FormControl>
            <Input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
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
      )}
    </div>
  );
}

export default CreateList;
