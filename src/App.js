import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

const colorsList = ['yellow', 'green', 'blue', 'orange', 'brown']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    showPassword: false,
    searchValue: '',
    passwordsList: [],
  }

  forWebsite = event => {
    this.setState({website: event.target.value})
  }

  forUserName = event => {
    this.setState({username: event.target.value})
  }

  forPassword = event => {
    this.setState({password: event.target.value})
  }

  forSearchingPassword = event => {
    this.setState({searchValue: event.target.value})
  }

  forCheckBox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  addDetails = event => {
    event.preventDefault()
    const {website, username, password, showPassword} = this.state
    const classValue = colorsList[Math.floor(Math.random() * 5)]

    const newPasswordList = {
      id: uuidv4(),
      website,
      username,
      password,
      classAdd: classValue,
      showPassword,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordList],
      username: '',
      website: '',
      password: '',
      searchValue: '',
    }))
  }

  deleteCredentials = id => {
    const {passwordsList} = this.state
    const updatePasswordList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: updatePasswordList})
  }

  addDetailsOfCredentials = each => {
    const startingLetter = each.website.slice(0, 1).toUpperCase()
    const showingPassword = each.showPassword
      ? each.password
      : '*'.repeat(each.password.length)

    return (
      <li className="container-li" id={each.id} key={each.id}>
        <div className="credentials-container">
          <p className={`firstLetter ${each.classAdd}`}>{startingLetter}</p>
          <div>
            <p>{each.website}</p>
            <p>{each.username}</p>
            <p>{showingPassword}</p>
          </div>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={() => this.deleteCredentials(each.id)}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="icons"
          />
        </button>
      </li>
    )
  }

  render() {
    const {
      website,
      username,
      password,

      searchValue,
      passwordsList,
    } = this.state
    const filterBasedOnSearch = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchValue.toLowerCase()),
    )
    const lengthOFpasswordList = passwordsList.length

    return (
      <div className="bg-con">
        <div className="password-manager">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="add-password-image">
          <div className="short-container">
            <h1>Add New Password</h1>
            <form onSubmit={this.addDetails}>
              <div className="flex-items for_inputs ">
                <label htmlFor="website">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="icons"
                  />
                </label>
                <input
                  type="text"
                  placeholder="Enter Website"
                  id="website"
                  onChange={this.forWebsite}
                  value={website}
                />
              </div>
              <div className="flex-items for_inputs ">
                <label htmlFor="username">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="icons"
                  />
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  id="username"
                  onChange={this.forUserName}
                  value={username}
                />
              </div>
              <div className="flex-items for_inputs ">
                <label htmlFor="password">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="icons"
                  />
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  onChange={this.forPassword}
                  value={password}
                />
              </div>
              <div className="for-button">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
        <div className="your-password">
          <div className="length-search-bar">
            <h1 className="p">
              Your Passwords: <span>{lengthOFpasswordList}</span>
            </h1>
            <div className="flex-items for_inputs">
              <label htmlFor="search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="icons"
                />
              </label>
              <input
                type="search"
                placeholder="Search"
                id="search"
                onChange={this.forSearchingPassword}
                value={searchValue}
                className=""
              />
            </div>
          </div>

          <hr />

          <div>
            {filterBasedOnSearch.length === 0 ? (
              <div>
                <div className="empty">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="password-manager-image"
                  />
                  <p>No Passwords</p>
                </div>
              </div>
            ) : (
              <ul>
                {filterBasedOnSearch.map(each =>
                  this.addDetailsOfCredentials(each),
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
