import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      user: {}
    };
  }

  componentDidMount() {
    this.getGitUser();
    this.getGitFollowers();
  }

  getGitUser = async () => {
    let res = await axios.get("https://api.github.com/users/adventurini");
    this.setState({
      user: res.data
    });
  };

  getGitFollowers = async () => {
    let res = await axios.get(
      "https://api.github.com/users/adventurini/followers"
    );
    this.setState({
      followers: res.data
    });
  };

  render() {
    const { user, followers } = this.state;
    return (
      <div className="App">
        <div className="wrapper">
          <h1> GITHUB CARD PROJECT</h1>
          <h2 className="card-title">{user.login}'s Github followers</h2>
          <div className="follower-list">
            {followers.map(follower => (
              <h4 className="followers">{follower.login}</h4>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
