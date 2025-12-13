"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Team } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const TeamCard = ({ team, index }: { team: Team; index: number }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <Card className="overflow-hidden relative py-0 border border-primary/20 shadow-sm hover:shadow-lg transition-all">
        <div className="relative h-64 w-full bg-[#f1f1f1]">
          <Image
            src={team.image}
            alt={team.name}
            fill
            className="object-contain"
          />
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100"
          >
            {team.social.twitter && (
              <a href={team.social.twitter} target="_blank">
                <FaTwitter className="text-white text-xl hover:text-primary transition" />
              </a>
            )}
            {team.social.linkedin && (
              <a href={team.social.linkedin} target="_blank">
                <FaLinkedin className="text-white text-xl hover:text-primary transition" />
              </a>
            )}
            {team.social.facebook && (
              <a href={team.social.facebook} target="_blank">
                <FaFacebook className="text-white text-xl hover:text-primary transition" />
              </a>
            )}
            {team.social.instagram && (
              <a href={team.social.instagram} target="_blank">
                <FaInstagram className="text-white text-xl hover:text-primary transition" />
              </a>
            )}
          </motion.div>
        </div>
        <CardContent className="text-center mb-4 px-0">
          <h3 className="text-lg font-semibold">{team.name}</h3>
          <p className="text-sm text-primary/75">{team.designation}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamCard;
