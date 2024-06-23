import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../model/Models';
import {Card} from "primereact/card";
import "../App.css"
import { Button } from 'primereact/button';
import {InputText} from "primereact/inputtext";
const MainScreen: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const navigate = useNavigate();

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/movie');
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            // Zaokrąglanie totalRating do jednego miejsca po przecinku
            data.forEach((movie: Movie) => {
                if (movie.totalRating) {
                    movie.totalRating = parseFloat(movie.totalRating.toFixed(1));
                }
            });
            setMovies(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleCardClick = (id: string) => {
        navigate(`/movie?movieId=${id}`);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        // Filtrujemy filmy na podstawie wprowadzonego searchTerm
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMovies(filteredMovies);
    };

    const handleClearSearch = () => {
        // Usuwamy searchTerm i przywracamy pełną listę filmów
        setSearchTerm('');
        fetchMovies();
    };

    return (
        <div>
            <div className="container">
                <h1>Serwis filmowy</h1>
            </div>
            <div className="search-bar">
                <InputText
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by movie title..."
                />
                <Button label="Search" icon="pi pi-search" onClick={handleSearchSubmit} />
                <Button label="Clear" icon="pi pi-times" onClick={handleClearSearch} />
            </div>
            <h2>Lista filmów</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="p-grid">
                    {movies.map(movie => (
                        <div key={movie.id} className="p-col-12 p-md-4 p-lg-3">
                            <Card
                                className="custom-card"
                                title={movie.title}
                                onClick={() => handleCardClick(movie.id)}
                            >
                                <p>{movie.description}</p>
                                <p>Rating: {movie.totalRating}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            <Button onClick={fetchMovies}>Refresh Movies</Button>
        </div>
    );
};

export default MainScreen;