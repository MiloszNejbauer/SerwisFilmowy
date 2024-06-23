import React, {ChangeEvent, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Movie, Review} from "../model/Models";
import {Card} from "primereact/card";
import {Button} from "primereact/button";


const MovieScreen: React.FC = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewText, setReviewText] = useState<string>('');
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [enteredUsername, setEnteredUsername] = useState<string>('');
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const movieId = searchParams.get('movieId');

    const fetchMovieReviews = async () => {
        const url = new URL('http://localhost:8080/review');
        if (movieId) {
            url.searchParams.append('movieId', movieId);
        }
        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch movie reviews');
            }
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching movie reviews:', error);
        }
    };

    const fetchMovie = async () => {
        const url = new URL('http://localhost:8080/movie/get');
        if (movieId) {
            url.searchParams.append('id', movieId);
        }
        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch movie');
            }
            const data = await response.json();
            // Ustawienie filmu
            if (data.totalRating) {
                data.totalRating = parseFloat(data.totalRating.toFixed(1));
            }
            setMovie(data as Movie);
            if (data.reviews) {
                setReviews(data.reviews);
            }
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
    };

    useEffect(() => {
        fetchMovie();
        fetchMovieReviews();
    }, []);

    const goToMainScreen = () => {
        navigate('/main');
    };

    const handleReviewTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(event.target.value);
    };

    const handleRatingChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedRating(Number(event.target.value));
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredUsername(event.target.value);
    };

    const addReview = async () => {
        try {
            const response = await fetch('http://localhost:8080/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: movie?.id,
                    description: reviewText,
                    rating: selectedRating,
                    username: enteredUsername,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add review');
            }
            fetchMovie()
                .then(fetchMovieReviews);
            setReviewText('');
            setEnteredUsername('');
            setSelectedRating(0);
            console.log('Review added successfully');
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <div>
            <h1>Movie Screen</h1>
            {movie ? (
                <div>
                    <Card className="movie-card">
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <p>Rating: {movie.totalRating}</p>
                    </Card>

                    <div className="review-section">
                        <h3>Add Review</h3>
                        <textarea
                            rows={4}
                            cols={50}
                            value={reviewText}
                            onChange={handleReviewTextChange}
                            placeholder="Write your review here..."
                        ></textarea>
                        <div>
                            <label htmlFor="rating">Rating:</label>
                            <select id="rating" value={selectedRating} onChange={handleRatingChange}>
                                <option value={0}>Select Rating...</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="username">Your Name:</label>
                            <input
                                type="text"
                                id="username"
                                value={enteredUsername}
                                onChange={handleUsernameChange}
                                placeholder="Enter your name..."
                            />
                        </div>
                        <Button label="Add Review" onClick={addReview} />
                    </div>

                    <div className="reviews-list">
                        <h3>Reviews</h3>
                        {reviews.length > 0 ? (
                            <ul>
                                {reviews.map((review) => (
                                    <li key={review.id}>
                                        <p>{review.description}</p>
                                        <p>Rating: {review.rating}</p>
                                        <p>Username: {review.username}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews yet</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={goToMainScreen}>Go To Main Screen</button>
        </div>
    );
};

export default MovieScreen;