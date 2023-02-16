import React, { useEffect, useState } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { FormControl, TextField } from "@mui/material";
import { checkAlphaNumericNotEmpty } from "helpers/alphanumericCheck";
import { useDispatch, useSelector } from "react-redux";
import { createNewList } from "store/modules/list/operations";
function CreateList() {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.list.isCreateFetching);
  const [menuOpen, setMenuOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [nameError, setNameError] = useState("");
  const checkValid = async (bool) => {
    let result = checkAlphaNumericNotEmpty(listName);
    if (result) {
      return setNameError(result);
    }
    if (bool) {
      await dispatch(createNewList(listName));
      setMenuOpen(false);
      setListName("");
    }
  };
  const closeClickOutSide = (e) => {
    if (!e.target.closest(".create-container")) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", closeClickOutSide);
    return () => {
      window.removeEventListener("click", closeClickOutSide);
    };
  });
  return (
    <div className="max-w-xsm flex flex-col create-container">
      <Button
        onClick={() => setMenuOpen(!menuOpen)}
        startIcon={<AddSharpIcon />}
        variant="contained"
        color="primary"
      >
        Create new list
      </Button>
      {menuOpen && (
        <div className="p-3 border shadow-md bg-white border-t-0">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    checkValid(true);
                  }}
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
