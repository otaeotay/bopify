import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { catchErrors } from '../utils';
import {
  getPlaylistById,
  getKidzBopTracks,
  postNewPlaylist,
  postNewPlaylistSongs,
} from '../spotify';
import { TrackList, PlaylistSuccess, PlaylistFail } from '../components';
import { StyledHeader, StyledBackButton } from '../styles';
import styled from 'styled-components/macro';

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const tracksForTracklist = useMemo(() => {
    if (!tracks) {
      return;
    }
    return tracks.map(({ track }) => track);
  }, [tracks]);

  const createPlaylist = async () => {
    try {
      const newPlaylistTracks = kidzBopData.map((e) => e.uri);
      const newPlaylistTitle = playlist.name + ' Bopified!';
      const newPlaylist = await postNewPlaylist(
        window.sessionStorage.getItem('userID'),
        newPlaylistTitle
      );
      await postNewPlaylistSongs(newPlaylist.data.id, newPlaylistTracks);
      setSuccess(true);
    } catch (error) {
      setFail(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setPlaylist(data);
      setTracksData(data.tracks);
    };

    catchErrors(fetchData());
  }, [id]);

  // When tracksData updates, compile arrays of tracks and audioFeatures
  useEffect(() => {
    if (!tracksData) {
      return;
    }

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state variable
    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data);
      }
    };

    setTracks((tracks) => [...(tracks ? tracks : []), ...tracksData.items]);

    catchErrors(fetchMoreData());
  }, [tracksData]);

  const [kidzBopData, setKidzBopData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!tracksForTracklist) {
        return;
      }
      await tracksForTracklist.forEach(async (e) => {
        const { data } = await getKidzBopTracks(
          encodeURIComponent(e.name.substring(0, 15))
        );

        if (
          e.name.substring(0, 3).toLowerCase() !==
            data.tracks.items[0].name.substring(0, 3).toLowerCase() ||
          data.tracks.items[0].artists[0].name !== 'Kidz Bop Kids'
        ) {
          return;
        }

        setKidzBopData((tracks) => [
          ...(tracks ? tracks : []),
          data.tracks.items[0],
        ]);
      });
    };

    catchErrors(fetchData());
  }, [tracks]);

  const BopifyButton = styled.button`
    height: 50px;
    width: 400px;
    font-size: var(--fz-xl);
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover,
    &:focus {
      transform: scale(105%);
    }
  `;

  return (
    <>
      {playlist && (
        <>
          {fail ? <PlaylistFail setFail={setFail}></PlaylistFail> : null}
          {success ? (
            <PlaylistSuccess setSuccess={setSuccess}></PlaylistSuccess>
          ) : null}
          <StyledBackButton onClick={() => window.history.back()}>
            Back to Playlists
          </StyledBackButton>
          <StyledHeader>
            <div className="header__inner">
              {playlist.images.length && playlist.images[0].url && (
                <img
                  className="header__img"
                  src={playlist.images[0].url}
                  alt="Playlist Artwork"
                />
              )}
              <div>
                <div className="header__overline">Playlist</div>
                <h1 className="header__name">{playlist.name}</h1>
                <p className="header__meta">
                  <span>
                    {playlist.tracks.total}{' '}
                    {`song${playlist.tracks.total !== 1 ? 's' : ''}`}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10vh 0',
            }}
          >
            <BopifyButton
              onClick={catchErrors(createPlaylist)}
              disabled={success ? true : false}
            >
              Click here to Bopify this playlist!
            </BopifyButton>
          </div>

          <main>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flex: '1 1 0px',
              }}
            >
              <div>
                <h2 style={{ color: 'var(--lighter-purple)' }}>
                  {playlist.name}
                </h2>
                {tracksForTracklist && (
                  <TrackList tracks={tracksForTracklist} />
                )}
              </div>
              <div>
                <h2 style={{ color: 'var(--lighter-purple)' }}>
                  Bopify <u>Preview</u>
                </h2>
                {kidzBopData && <TrackList tracks={kidzBopData} />}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Playlist;
