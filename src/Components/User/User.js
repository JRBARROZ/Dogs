import React from "react";
import UserHeader from "./UserHeader.js";
import { Routes, Route } from "react-router-dom";
import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost.js";
import UserStats from "./UserStats.js";
import NotFound from "../NotFound.js";
import { useSelector } from "react-redux";
const User = () => {
  const { data } = useSelector((state) => state.user);
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
