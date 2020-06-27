import React from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';
import Card from '../../components/Card';

class ProfilePage extends React.Component {
  state = {
    isLoading: false,
    repositories: [],
    followers: [],
    avatar: '',
    hasError: false,
  }

  async componentDidMount(){
    const userName = this.props.match.params.name;

    this.setState({
       isLoading: true
    });

    let userInfo;
    try {
        const { data } = await axios({
          method: 'GET',
          url: `https://api.github.com/users/${userName}`,
          headers: {
            Accept: 'application/vnd.github.v3+json'
          },
        });
        userInfo = data;
    } catch (error) {
        this.setState({
          hasError: true,
          isLoading: false
        })
    }

    if (userInfo) {
      try {
           const { data: followers } = await axios({
             method: 'GET',
             url: userInfo.followers_url,
             headers: {
               Accept: 'application/vnd.github.v3+json'
             },
           });

           const {
             data: repositories
           } = await axios({
             method: 'GET',
             url: userInfo.repos_url,
             headers: {
               Accept: 'application/vnd.github.v3+json'
             },
           });

           this.setState({
             isLoading: false,
             avatar: userInfo.avatar_url,
             followers,
             repositories
           })
      } catch (error) {
          this.setState({
            hasError: true,
          })
      } finally {
        this.setState({
          isLoading: false
        })
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />
    }

    if (!this.state.isLoading && this.state.hasError) {
      return <p>Something went wrong</p>
    }

    return (
     <div>
        <h1>User Info</h1>
        <img src={this.state.avatar} />
        <p>Name: {this.props.match.params.name}</p>
        <p>Followers: </p>
        <ul>
          {this.state.followers.map((follower) => (
            <li>
              <span >
                <img src={follower.avatar_url} />
              </span>
              {follower.login}
            </li>
          ))}
        </ul>
        <p>Repositories: </p>
        <div className="list-repos">
          {this.state.repositories.map((repository) => (
            <Card title={repository.name} description={repository.description} />
          ))}
        </div>
     </div>
    );
  }
}

export default ProfilePage;
