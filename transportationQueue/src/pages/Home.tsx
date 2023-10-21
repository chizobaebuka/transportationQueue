import LogisticsQueue from "../components/LogisticsQueue";
import Planner from "../components/Planner";

function Home() {
    return (
        <div>
            <h2>Welcome to the Transportation Queue Application</h2>
            <LogisticsQueue />
            <Planner />
        </div>
    );
}

export default Home;
