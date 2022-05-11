import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import styles from "./TeamChannelPreview.module.css";

const TeamChannelPreview = ({ channel, type }) => {
  const { activeChannel, client } = useChatContext();

  const ChannelPreview = () => {
    <p className={styles.previewItem}>
      #{channel?.data?.name || channel?.data?.id}
    </p>;
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.user.ID
    );
    return (
      <div className={styles.previewItem}>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>name={members[0]?.user?.fullName}</p>
      </div>
    );
  };
  return (
    <div
      className={
        channel?.id === activeChannel?.id ? "channelSelected" : "channel"
      }
      onClick={() => {
        console.log(channel);
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
