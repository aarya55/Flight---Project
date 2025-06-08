import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
// import { motion } from "framer-motion";
// import "../styles/flight-background.css";
import "./FlightSearchPage.css"; // New stylesheet

const mockFlights = [
  {
    id: 1,
    airline: "SkyAir",
    from: "New York",
    to: "London",
    time: "10:00 AM",
    price: "$450",
    date: "2025-06-01",
    stops: 1,
    duration: 7
  },
  {
    id: 2,
    airline: "FlyJet",
    from: "New York",
    to: "London",
    time: "2:00 PM",
    price: "$500",
    date: "2025-06-01",
    stops: 0,
    duration: 6
  },
  {
    id: 3,
    airline: "Air Nova",
    from: "New York",
    to: "Paris",
    time: "6:00 PM",
    price: "$520",
    date: "2025-06-02",
    stops: 2,
    duration: 9
  },
  {
    id: 4,
    airline: "All india",
    from: "Up",
    to: "Up",
    time: "6:00 PM",
    price: "$210",
    date: "2025-06-02",
    stops: 2,
    duration: 9
  },
  {
    id: 5,
    airline: "Nova",
    from: "York",
    to: "Pewris",
    time: "1:00 PM",
    price: "$220",
    date: "2025-06-02",
    stops: 21,
    duration: 1
  },
  {
    id: 6,
    airline: "Air Line",
    from: "New Delhi",
    to: "Punjab",
    time: "2:00 PM",
    price: "$220",
    date: "2025-06-02",
    stops:3,
    duration: 3
  },
];

export default function FlightSearchPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [airline, setAirline] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxStops, setMaxStops] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 2;

  const handleSearch = () => {
    let filtered = mockFlights.filter((flight) => {
      const matchesFrom = flight.from.toLowerCase().includes(from.toLowerCase());
      const matchesTo = flight.to.toLowerCase().includes(to.toLowerCase());
      const matchesDate = date ? flight.date === date : true;
      const matchesAirline = airline ? flight.airline.toLowerCase().includes(airline.toLowerCase()) : true;
      const matchesPrice = maxPrice ? parseInt(flight.price.replace("$", "")) <= parseInt(maxPrice) : true;
      const matchesStops = maxStops ? flight.stops <= parseInt(maxStops) : true;
      const matchesDuration = maxDuration ? flight.duration <= parseInt(maxDuration) : true;
      return matchesFrom && matchesTo && matchesDate && matchesAirline && matchesPrice && matchesStops && matchesDuration;
    });

    if (sortBy === "price") {
      filtered.sort((a, b) => parseInt(a.price.replace("$", "")) - parseInt(b.price.replace("$", "")));
    } else if (sortBy === "time") {
      filtered.sort((a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`));
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "stops") {
      filtered.sort((a, b) => a.stops - b.stops);
    }

    setResults(filtered);
    setCurrentPage(1);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  return (
    <div className="flight-background">
      <div className="search-container">
        <h1 className="title">Flight Search</h1>
        <div className="form-grid">
          <Input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
          <Input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input placeholder="Airline" value={airline} onChange={(e) => setAirline(e.target.value)} />
          <Input placeholder="Max Price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          <Input placeholder="Max Stops" type="number" value={maxStops} onChange={(e) => setMaxStops(e.target.value)} />
          <Input placeholder="Max Duration (hrs)" type="number" value={maxDuration} onChange={(e) => setMaxDuration(e.target.value)} />
          <select className="custom-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price">Price (Low to High)</option>
            <option value="time">Departure Time</option>
            <option value="duration">Duration (Short to Long)</option>
            <option value="stops">Number of Stops (Fewest First)</option>
          </select>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {results.length > 0 && (
          <p className="results-count">
            Showing {indexOfFirstResult + 1}-{Math.min(indexOfLastResult, results.length)} of {results.length} results
          </p>
        )}

        <div className="results-list">
          {results.length === 0 && <p className="no-results">No flights found.</p>}
          {currentResults.map((flight) => (
            <div key={flight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardContent>
                  <div className="flight-header">
                    <span className="airline">{flight.airline}</span>
                    <span className="price">{flight.price}</span>
                  </div>
                  <div className="flight-details">
                    {flight.from} → {flight.to} at {flight.time} on {flight.date}
                  </div>
                  <div className="flight-meta">
                    Stops: {flight.stops}, Duration: {flight.duration} hrs
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {results.length > resultsPerPage && (
          <div className="pagination">
            <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </Button>
            <Button variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
