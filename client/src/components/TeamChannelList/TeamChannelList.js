import React from "react";
import styles from "./TeamChannelList.module.css";

import { AddChannel } from "../../assets";

const TeamChannelList = ({
  setToggleContainer,
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  if (error) {
    return type === "team" ? (
      <div className={styles.channelList}>
        <p className={styles.listMessage}>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }
  if (loading) {
    return (
      <div className={styles.channelList}>
        <p className={styles.listMessageLoading}>
          {type === "team" ? "Channels" : "Messages"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.channelList}>
      <div className={styles.teamHeader}>
        <p className={styles.teamTitle}>
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === "team" ? "team" : "messaging"}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
