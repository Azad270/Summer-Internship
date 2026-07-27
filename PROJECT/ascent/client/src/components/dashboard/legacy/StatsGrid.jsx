import {
    FaBolt,
    FaStar,
    FaBullseye,
    FaFire
} from "react-icons/fa6";

import StatsCard from "./StatsCard";

function StatsGrid() {

    return (

       <section className="stats-grid">

            <StatsCard
                icon={<FaBolt />}
                title="LEVEL"
                value="01"
                subtitle="Current Level"
            />

            <StatsCard
                icon={<FaStar />}
                title="XP"
                value="180 / 500"
                subtitle="Experience"
            />

            <StatsCard
                icon={<FaBullseye />}
                title="MISSIONS"
                value="04"
                subtitle="Today's Missions"
            />

            <StatsCard
                icon={<FaFire />}
                title="STREAK"
                value="12"
                subtitle="Days Active"
            />

        </section>

    );

}

export default StatsGrid;