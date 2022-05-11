import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "../index";

import HospitalIcon from "../../assets/hospital.png";
import LogoutIcon from "../../assets/logout.png";

import styles from "./ChannelListContainer.module.css";
// import TeamChannelPreview from "../TeamChannelPreview";

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
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
