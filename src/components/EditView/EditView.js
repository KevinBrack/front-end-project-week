import React from "react";
import styled from "styled-components";
import ContentHeading from "../ContentHeading/ContentHeading";
import GlobalButton from "../GlobalButton/GlobalButton";
import axios from "axios";
import { withRouter } from "react-router-dom";

const EditWrapper = styled.div`
  width: 610px;
  position: relative;
  top: 0;
  margin: 0 auto;
  margin-top: 7rem;
`;

const TitleInput = styled.input`
  font-size: 1.6rem;
  width: 35rem;
  border-radius: 5px;
`;

const BodyInput = styled.textarea`
  font-size: 1.6rem;
  border-radius: 5px;
  height: 40rem;
`;

class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // current: this.props.content.find(
      //   x => x.id === this.props.match.params.id
      // ),
      current: {},
      title: "",
      text_body: ""
    };
  }

  getNote(ID) {
    axios
      .get(`https://projweekbackend.herokuapp.com/api/notes/${ID}`)
      .then(res => {
        // console.log("GET NOTE RESPONSE FOR EDIT", res.data[0]);
        this.setState({ current: res.data[0] });
      });
  }

  handleChange = e => {
    // console.log("HANDLE CHANGE EVENT TARGET", e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEdit = note => {
    axios
      .put(
        `https://projweekbackend.herokuapp.com/api/notes/${
          this.state.current.id
        }`,
        note
      )
      .then(res => this.props.postChangeArray(res.data))
      .catch(err => console.log(err));
  };

  // /* make me */
  handleSubmit = e => {
    e.preventDefault();
    let message = {
      tags: this.state.current.tags,
      title: this.state.title,
      id: this.state.current.id,
      text_body: this.state.text_body
    };
    // console.log(message);
    this.handleEdit(message);

    this.props.history.push(`/lambda_notes/note/${this.state.current.id}`);
  };

  componentDidMount() {
    this.getNote(this.props.match.params.id);
    if (!this.state.title) {
      this.setState({ title: this.state.current.title });
    }
    if (!this.state.text_body) {
      this.setState({ text_body: this.state.current.text_body });
    }
  }

  render() {
    return (
      <EditWrapper>
        <ContentHeading message="Edit Note:" />
        <form onSubmit={this.handleSubmit}>
          <TitleInput
            className="form-control"
            name="title"
            placeholder="title"
            value={
              this.state.title ? this.state.title : this.state.current.title
            }
            onChange={this.handleChange}
          />
          <br />
          <BodyInput
            className="form-control"
            name="text_body"
            placeholder="note"
            value={
              this.state.text_body
                ? this.state.text_body
                : this.state.current.text_body
            }
            onChange={this.handleChange}
          />
          <GlobalButton message="Update" type="submit" />
        </form>
      </EditWrapper>
    );
  }
}

export default withRouter(EditView);
