"use client";

import { TEAM_DATA } from "@/constant/teamData";
import TeamCard from "./TeamCard";

const OurTeam = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Meet with our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {TEAM_DATA.map((team , index) => (
            <TeamCard key={team.id} team={team} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
