import React, {Component} from 'react';
import Particles from 'react-tsparticles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css';


//BACKGROUNF PARTICLES....
const ParticlesOptions ={
  fpsLimit: 60,
  particles: {
    color: {
      value: "#f4ca16",
    },
    links: {
      color: "#556b2f",
      distance: 100,
      enable: true,
      opacity: 0.8,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 4,
      straight: false,
    },
    number: {
      density: {
        enable: false,
        area: 10000,
      },
      value: 100,
    },
    opacity: {
      value: 0.9,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 8,
    },
  },
  detectRetina: true,
}


const initialState = {
    input:'',
    imageUrl:'',
    box: {},
    route: 'signin',
    isSignedin: false,
    user:{
          id: '' ,
          name: '' ,
          email: '',
          entries: 0,
          joinded: ''
    }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }
  
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.imgEntries,
        joinded: data.joined
    }})
  }
  
  faceLocation= (data) =>{
    const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifiFace.left_col * width,
      topRow: clarifiFace.top_row * height,
      rightCol: width - (clarifiFace.right_col * width),
      bottomRow: height - (clarifiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onSubmit = () =>{
    this.setState({imageUrl: this.state.input});
      fetch('https://tranquil-gorge-21521.herokuapp.com/imageUrl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response =>{
      if(response){
        fetch('https://tranquil-gorge-21521.herokuapp.com:3000/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(
          Object.assign(this.state.user,{entries: count}))
      })
      .catch(console.log)
    }
      this.displayFaceBox(this.faceLocation(response))
    })
     .catch(err => console.log(err));
  }
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
       this.setState({route: route})

  }

  render (){
  const  {isSignedIn, imageUrl, route, box } = this.state;
    return(
      <div className="App">
        <Particles
         className='paticles'
          options={ParticlesOptions}
          />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home'
       ?<div>
            <Rank name={this.state.user.name} imgEntries={this.state.user.entries}/>
            <ImageLinkForm 
            onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}/>
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}/>
        </div>
       :(
         route === 'signin'
         ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
         : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       )
      }
     </div>
  
    );
  }
}
export default App;
