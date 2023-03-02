import "./Movie.css";
import firebase from 'firebase/app';
import 'firebase/database';

function Movie(): JSX.Element {
    // const firebaseConfig = {
    //     // Your Firebase project configuration
    //   };
      
    //   firebase.initializeApp(firebaseConfig);
      
    //   const db = firebase.database();


  return (
    <div className="Movie">
      <div id="movieContainer">
        <img src="https://upload.wikimedia.org/wikipedia/he/7/77/With_the_zohan.jpg" />
        <img src="https://hips.hearstapps.com/esq.h-cdn.co/assets/17/25/1498165305-19-little-nicky-movie-poster.jpg" />
        <img src="https://m.media-amazon.com/images/M/MV5BMTM3MzM3NDE5MV5BMl5BanBnXkFtZTcwNDE5MTUxNA@@._V1_.jpg" />
        <img src="https://i.ytimg.com/vi/LifunT9NTlE/movieposter.jpg" />
        <img src="https://hips.hearstapps.com/esq.h-cdn.co/assets/17/25/1498167851-36-the-waterboy-movie-poster.jpg" />
        <img src="https://hips.hearstapps.com/esq.h-cdn.co/assets/17/25/1498165028-15-grown-ups-ver2-xlg.jpg" />
        <img src="https://qph.cf2.quoracdn.net/main-qimg-f222da9f24ab624a760c07d54f5a74b1-lq" />
        <img src="https://m.media-amazon.com/images/M/MV5BMjUwMjczMzY5OV5BMl5BanBnXkFtZTgwMjgyMTczNTM@._V1_FMjpg_UX1000_.jpg" />
      </div>
    </div>
  );
}

export default Movie;
