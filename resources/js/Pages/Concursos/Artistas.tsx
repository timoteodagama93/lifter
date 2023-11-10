import PlayPause from '@/Components/PlayPause';
import TopArtists from '@/Components/TopArtists';
import axios from 'axios';
import React, { useState } from 'react';

function Artistas() {
  const [artists, setArtistas] = useState([]);
  axios.post('ascensao-artists').then(response => {
    if (response.status === 200) {
      setArtistas(response.data.artists);
    }
  });

  return (
    <div>
      <TopArtists artists={artistas} />;
      <div>
        <div className="container w-full h-full ">
          <h2 className="hidden md:flex heading-text text-center space-x-2 text-white">
            <span>Artistas Inscritos </span>
          </h2>
          <div className="image-gallery p-1 overflow-auto">
            <div className="column">
              <div className="image-item">
                <img src={artists[0].images.artistImage} alt="" />
                <div className="overlay" onClick={() => {}}>
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[1].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[2].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[3].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="image-item">
                <img src={artists[3].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[2].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[1].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[0].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="image-item">
                <img src={artists[2].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[3].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[0].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-item">
                <img src={artists[1].images.artistImage} alt="" />
                <div className="overlay">
                  <span>
                    <PlayPause />
                  </span>
                  <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                    <span className="text-xl">
                      Vamos Longe nessa vida meu niga
                    </span>
                    <div className="flex flex-row space-x-2 text-xs">
                      <span className="text-base">Timóteo Da Gama</span>
                      <span className="text-base">|</span>
                      <span className="text-base">RnB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artistas;
