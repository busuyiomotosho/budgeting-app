import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        Copyright 2023. Designed by Busuyi Omotosho. All rights reserved.
      </div>
      <div className="social">
        <FacebookIcon className="icon" sx={{ fontSize: 15 }} />
        <InstagramIcon className="icon" sx={{ fontSize: 15 }} />
        <TwitterIcon className="icon" sx={{ fontSize: 15 }} />
      </div>
    </div>
  );
};

export default Footer;
