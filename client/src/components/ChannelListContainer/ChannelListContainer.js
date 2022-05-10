import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch } from "../index";

import HospitalIcon from "../../assets/hospital.png";
import LogoutIcon from "../../assets/logout.png";

import styles from "./ChannelListContainer.module.css";

const SideBar = () => {
  return (
    <div className={styles.list}>
      <div className={styles.sidebar}>
        <div className={styles.icon1}>
          <img src={HospitalIcon} alt=" Hospital" width="30" />
        </div>
      </div>

      <div className={styles.sidebarLogout}>
        <div className={styles.icon1}>
          <img src={LogoutIcon} alt="Logout" width="30" />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => (
  <div className={styles.headerList}>
    <p className={styles.text}>Medical Pager</p>
  </div>
);

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className={styles.wrapper}>
        <CompanyHeader />
        <ChannelSearch />
      </div>
    </>
  );
};

export default ChannelListContainer;
