import {useState, useEffect} from 'react';
import Header from './Header';
import Map from './Map';
import Loading from './Loading';
import Footer from './Footer';
import './App.css';

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async() => {
      setLoading(true);
      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events');
      const {events} = await res.json();
      setEventData(events);
      setLoading(false);
    }
    fetchEvents();
  }, []);
  return (
    <div className='app'>
      <Header />
      {!loading ? <Map eventData={eventData} /> : <Loading />}
      <Footer />
    </div>
  );
}
export default App;
