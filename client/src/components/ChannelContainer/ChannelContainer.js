import React from "react";
import { Channel, useChatContext, MessageTeam } from "stream-chat-react";
import styles from "./ChannelContainer.module.css";

import {
  ChannelInner,
  CreateChannel,
  EditChannel,
  // TeamMessage,
} from "../index";

const ChannelContainer = ({
  createType,
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
}) => {
  const { channel } = useChatContext();

  const EmptyState = () => {
    return (
      <div className={styles.containerWrapper}>
        <p className={styles.containerFirst}>
          This is the beginning of your chat history.
        </p>
        <p className={styles.containerSecond}>
          Send messages, attachments, links, emojis, and more!
        </p>
      </div>
    );
  };

  if (isCreating) {
    return (
      <div className={styles.container}>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className={styles.container}>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
