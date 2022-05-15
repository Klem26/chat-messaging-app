import React from "react";

import { Avatar, useChatContext } from "stream-chat-react";
import styles from "./ResultsDropdown.module.css";

const channelByUser = async ({
  client,
  setActiveChannel,
  channel,
  setChannel,
}) => {
  const filters = {
    type: "messaging",
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel("messaging", {
    members: [channel.id, client.userID],
  });

  setChannel(newChannel);

  return setActiveChannel(newChannel);
};

const SearchResult = ({
  channel,
  focusedId,
  type,
  setChannel,
  setToggleContainer,
}) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === "channel") {
    return (
      <div
        onClick={() => {
          setChannel(channel);
          if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState);
          }
        }}
        className={
          focusedId === channel.id
            ? "searchContainer__focused"
            : "resultContainer"
        }
      >
        <div className={styles.resultHashtag}>#</div>
        <p className={styles.resultText}>{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel });
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
      className={
        focusedId === channel.id
          ? "searchContainer__focused"
          : "resultContainer"
      }
    >
      <div className={styles.resultUser}>
        <Avatar
          image={channel.image || undefined}
          name={channel.name}
          size={24}
        />
        <p className={styles.resultText}>{channel.name}</p>
      </div>
    </div>
  );
};

const ResultsDropdown = ({
  teamChannels,
  directChannels,
  focusedId,
  loading,
  setChannel,
  setToggleContainer,
}) => {
  return (
    <div className={styles.searchResults}>
      <p className={styles.resultsHeader}>Channels</p>
      {loading && !teamChannels.length && (
        <p className={styles.resultsHeader}>
          <i className={styles.text}>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className={styles.resultsHeader}>
          <i className={styles.text}>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="channel"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
      <p className={styles.resultsHeader}>Users</p>
      {loading && !directChannels.length && (
        <p className={styles.resultsHeader}>
          <i className={styles.text}>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className={styles.resultsHeader}>
          <i className={styles.text}>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="user"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </div>
  );
};

export default ResultsDropdown;
