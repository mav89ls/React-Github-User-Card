import React from "react";
import axios from "axios";

// below we are writing out our class component that will use a constructor and super because it is extending react.component, we also will be initializing state in here and setting it to be an object which will include and empty array of followers and the user

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      user: {}
    };
  }

  // below we are stating that once the component mounts in the browser, we then want to execut getgitusers and getgitfollowers which are functions below that make an api call and fetch data from the database

  componentDidMount() {
    this.getGitUser();
    this.getGitFollowers();
  }

  // the function below will make an asynchronous api call {wont tie up the app in long loading times,An API may be asynchronous where data or service availability and connectivity are low or oversaturated with demand.Asynchronous requests are useful in maintaining functionality in an application rather than tie up application resources waiting on a request.} and use our axios tool to fetch the information from our github api and set it to state for the user as the response.data

  getGitUser = async () => {
    let res = await axios.get("https://api.github.com/users/adventurini");
    this.setState({
      user: res.data
    });
  };

  // the below function will do very similar as above function only that it will do it for the users followers and set the state for followers to the returned infomation

  getGitFollowers = async () => {
    let res = await axios.get(
      "https://api.github.com/users/adventurini/followers"
    );
    this.setState({
      followers: res.data
    });
  };

  // once the data is retrieved it will be displayed in our app below
  // in the lines immediately below you will see that we are setting the variables for user and followers to those that exisnt in this.state
  render() {
    const { user, followers } = this.state;
    return (
      <div className="App">
        <div className="wrapper">
          <h1> GITHUB CARD PROJECT</h1>

          {/* below we are setting the title of the card to include whatever user login name is included in state */}
          <h2 className="card-title">{user.login}'s Github followers</h2>
          <div className="follower-list">
            {/* below we are mapping over the followers array in state and displaying the followers login name in an h4 tag */}
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
