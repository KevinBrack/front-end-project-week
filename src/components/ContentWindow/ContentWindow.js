import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import axios from "axios";

import ListView from "../ListView/ListView";
import NoteView from "../NoteView/NoteView";
import EditView from "../EditView/EditView";
import CreateNewView from "../CreateNewView/CreateNewView";

// import Sample from "../../placeholder JSON/Sample";

const StyledWindow = styled.div`
  position: relative;
  top: 0;
  left: 220px;
  background-color: #f3f3f3;
  border-top: 1px solid #979797;
  border-right: 1px solid #979797;
  border-bottom: 1px solid #979797;
  height: 100%;
  min-height: 100vh;
  width: 668px;
`;

class ContentWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleViews: ["note", "new", "edit", "list"],
      currentView: "list",
      deleteModalVisible: true,
      content: [],
      selectedNote: "01",
      url: "https://projweekbackend.herokuapp.com/"
    };
  }

  componentDidMount() {
    this.getNotes(this.state.url);
  }

  refreshNotes = () => {
    axios
      .get("https://projweekbackend.herokuapp.com/api/notes")
      .then(res => {
        console.log("GET RESPONSE", res);
        this.setState({ content: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  postChangeArray = array => {
    this.setState({ content: array });
  };

  getNotes = URL => {
    axios
      .get(`${URL}api/notes`)
      .then(res => {
        this.postChangeArray(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleNewNote = note => {
    axios
      .post(`${this.state.url}api/notes`, note)
      .then(res => this.postChangeArray(res.data))
      .catch(err => console.log(err));
  };

  handleDeleteNote = note => {
    console.log("HANDLE DELETE NOTE CALLED!");
    console.log("NOTE PASSED TO HANDLE DELETE", note);
    const ID = note.id;
    axios
      .delete(`https://projweekbackend.herokuapp.com/api/notes/${ID}`)
      .then(res => this.postChangeArray(res.data))
      .catch(error => console.log(error));
    this.refreshNotes();
  };

  render() {
    return (
      <StyledWindow>
        <Route
          exact
          path="/"
          render={props => <ListView {...props} content={this.state.content} />}
        />

        <Route
          path="/note/:id"
          render={props => (
            <NoteView
              {...props}
              content={this.state.content}
              delHandler={this.handleDeleteNote}
            />
          )}
        />

        <Route
          path="/new"
          render={props => (
            <CreateNewView {...props} noteHandler={this.handleNewNote} />
          )}
        />

        <Route
          path="/edit/:id"
          render={props => (
            <EditView
              {...props}
              content={this.state.content}
              editHandler={this.handleEditNote}
              postChangeArray={this.postChangeArray}
            />
          )}
        />
      </StyledWindow>
    );
  }
}

export default ContentWindow;
