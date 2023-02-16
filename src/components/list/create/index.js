import React, { Component } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { FormControl, TextField } from "@mui/material";
import { checkAlphaNumericNotEmpty } from "helpers/alphanumericCheck";
import { connect } from "react-redux";
import { createNewList } from "store/modules/list/operations";
import { namedRequestsInProgress } from "store/modules/request/selectors";
import { requestsEnum } from "store/modules/requestsEnum";

class CreateList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    menuOpen: false,
    listName: "",
    nameError: "",
  };

  checkValid = async (bool) => {
    const { createList } = this.props;
    const { listName } = this.state;
    let result = checkAlphaNumericNotEmpty(listName);
    if (result) {
      this.setState({
        nameError: result,
      });
      return;
    }
    if (bool) {
      await createList(listName);
      this.setState({
        menuOpen: false,
        listName: "",
      });
    }
  };
  closeClickOutSide = (e) => {
    if (!e.target.closest(".create-container")) {
      this.setState({
        menuOpen: false,
        nameError: null,
      });
    }
  };

  componentDidMount() {
    window.addEventListener("click", this.closeClickOutSide);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.closeClickOutSide);
  }
  render() {
    const { menuOpen, listName, nameError } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="min-w-51 flex flex-col create-container">
        <Button
          sx={{ backgroundColor: "primary.main" }}
          onClick={() =>
            this.setState({
              menuOpen: !this.state.menuOpen,
            })
          }
          startIcon={<AddSharpIcon />}
          variant="contained"
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
                onChange={(e) =>
                  this.setState({
                    listName: e.target.value,
                  })
                }
                placeholder="Enter list name"
                type="text"
                onFocus={() =>
                  this.setState({
                    nameError: null,
                  })
                }
                onBlur={() => this.checkValid(false)}
                error={!!nameError}
                helperText={nameError}
              />
              <div className="mt-4">
                {isLoading ? (
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
                      this.checkValid(true);
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
}

const mapStateToProps = (state) => ({
  isLoading: namedRequestsInProgress(state, requestsEnum().createList),
});

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (data) => dispatch(createNewList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);
