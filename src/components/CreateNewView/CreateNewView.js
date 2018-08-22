import React from "react";
import styled from "styled-components";
import ContentHeading from "../ContentHeading/ContentHeading";
import GlobalButton from "../GlobalButton/GlobalButton";

const CreateNewWrapper = styled.div`
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

class CreateNewView extends React.Component {
  constructor(props) {
    console.log("CREATE NEW VIEW PROPS", props);
    super(props);
    this.state = {
      title: "",
      text_body: ""
    };
  }

  /* make me */
  handleChange = e => {
    // console.log("HANDLE CHANGE EVENT TARGET", e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  /* make me */
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title && this.state.text_body) {
      let message = {
        title: this.state.title,
        text_body: this.state.text_body
      };
      console.log("MESSAGE", message);
      this.props.noteHandler(message);
      this.props.history.push("/");
    } else {
      alert("Please make sure you have entered a title and note body");
    }
  };

  render() {
    return (
      <CreateNewWrapper>
        <ContentHeading message="Create New Note:" />
        <form onSubmit={this.handleSubmit}>
          <TitleInput
            className="form-control"
            name="title"
            placeholder="title"
            onChange={this.handleChange}
          />
          <br />
          <BodyInput
            className="form-control"
            name="text_body"
            placeholder="note"
            onChange={this.handleChange}
          />
          <GlobalButton message="Save" type="submit" />
        </form>
      </CreateNewWrapper>
    );
  }
}

export default CreateNewView;
