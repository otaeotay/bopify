import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUserPlaylists, getCurrentUserProfile } from '../spotify';
import { catchErrors } from '../utils';
import { PlaylistsGrid, Modal } from '../components';
import styled from 'styled-components/macro';

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    setModal(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserPlaylists();
      setPlaylistsData(data);
      const userID = await getCurrentUserProfile();
      window.sessionStorage.setItem('userID', userID.data.id);
    };

    catchErrors(fetchData());
  }, []);

  // Updates the playlists object
  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    // Get next 20 (if applicable)
    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    // Grab the .items from playlistData aka the stuff we want to know/use
    setPlaylists((playlists) => [
      ...(playlists ? playlists : []),
      ...playlistsData.items,
    ]);
    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData());
  }, [playlistsData]);

  const StyledPlaylistsHeader = styled.div`
    color: white;
    font-size: 36px;
    display: flex;
    align-items: center;
    padding: 0 5vw 2vh;
  `;

  return (
    <main>
      <div>
        <Modal>
          <div>welcome!</div>
        </Modal>
        <StyledPlaylistsHeader>
          Choose a playlist to&nbsp;
          <span style={{ fontFamily: 'Changa One, cursive', fontSize: '46px' }}>
            BOPIFY!
          </span>
        </StyledPlaylistsHeader>
        {playlists && <PlaylistsGrid playlists={playlists} />}
      </div>
    </main>
  );
};

export default Playlists;
