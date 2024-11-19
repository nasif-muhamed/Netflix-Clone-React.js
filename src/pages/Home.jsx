import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import tmdbRequests from '../Requests'

const Home = () => {
  return (
    <>
      <Main/>
      <Row rowID='1' title='Upcoming' fetchURL={tmdbRequests?.requestUpcoming} />
      <Row rowID='2' title='Popular' fetchURL={tmdbRequests?.requestPopular} />
      <Row rowID='3' title='Trending' fetchURL={tmdbRequests?.requestTrending} />
      <Row rowID='4' title='Top Rated' fetchURL={tmdbRequests?.requestTopRated} />
      <Row rowID='5' title='Horror' fetchURL={tmdbRequests?.requestHorror} />
    </>
  )
}

export default Home
