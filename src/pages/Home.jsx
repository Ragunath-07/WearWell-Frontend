import Slider from "../components/Slider"
import LatestCollections from "../components/LatestCollections"
import BestSeller from "../components/BestSeller"
import Policy from '../components/Policy'

function Home() {

  return (
    <div>
      <Slider />
      <LatestCollections />
      <BestSeller />
      <Policy />
    </div>
  )
}

export default Home
