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
        <FacebookIcon width={15} height={15} className="icon" />
        <InstagramIcon width={15} height={15} className="icon" />
        <TwitterIcon width={15} height={15} className="icon" />
      </div>
    </div>
  );
};

export default Footer;
