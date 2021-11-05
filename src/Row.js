import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url_img = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailer] = useState("");

    // A snippet of code which runs based on specific condition/variable

    useEffect(() => {
        // if [], run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // console.log(movies);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailer('');
        }
        else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name)
                .then(
                    url => {
                        const urlPrams = new URLSearchParams(new URL(url).search);
                        setTrailer(urlPrams.get('v'));
                    }
                )
                .catch((error) => console.log(error));
            console.log(movieTrailer(movie?.name || movie?.title || movie?.original_name));
        }
        console.log(movie?.name || movie?.title || movie?.original_name);

    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {/* { Several row posters} */}
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_poster_large"}`}
                        src={`${base_url_img}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div >
    )
}

export default Row
