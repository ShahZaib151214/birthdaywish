import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { memory } from "../memory";
import { themes } from "../data/themes";
import { shortWishes } from "../data/messages";

const Landing = () => {
  const navigate = useNavigate();
  const { month } = memory.date;
  const theme = themes[month];
  const wish = shortWishes[month];
  const cardRef = useRef(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        perspective: "1000px",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: `2px solid ${theme.colors.secondary}`,
          textAlign: "center",
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02, rotateY: 5 }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            color: theme.colors.primary,
            fontFamily: "Dancing Script, cursive",
            fontSize: "3rem",
            marginBottom: "20px",
          }}
        >
          Happy Birthday, {memory.name}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            color: "#333",
            fontSize: "1.2rem",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          {wish}
        </motion.p>

        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: `0 0 20px ${theme.colors.primary}`,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/birthdaywish/memories")}
          style={{
            background: theme.colors.primary,
            color: "#fff",
            padding: "15px 40px",
            fontSize: "1.2rem",
            borderRadius: "50px",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Landing;
