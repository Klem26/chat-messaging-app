import React, { useState } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";

import { ChannelInfo } from "../../assets";
import styles from "./ChannelInner.module.css";

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    if (channel.type === "messaging") {
      return (
        <div className={styles.teamWrapper}>
          {members.map(({ user }, i) => (
            <div key={i} className={styles.nameUsers}>
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={32}
              />
              <p className={styles.headerName}>{user.fullName || user.id}</p>
            </div>
          ))}

          {additionalMembers > 0 && (
            <p className={styles.headerName}>and {additionalMembers} more</p>
          )}
        </div>
      );
    }

    return (
      <div className={styles.channelWrapper}>
        <p className={styles.channelName}># {channel.data.name}</p>
        <span style={{ display: "flex" }} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  return (
    <div className={styles.messageContainer}>
      <MessagingHeader />
      <div className={styles.teamHeaderRight}>
        <p className={styles.teamText}>{getWatcherText(watcher_count)}</p>
      </div>
    </div>
  );
};

export default ChannelInner;
