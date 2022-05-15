import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from "../index";
import styles from "./CreateChannel.module.css";
import { CloseCreateChannel } from "../../assets";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Name</p>
      <input
        className={styles.input}
        value={channelName}
        onChange={handleChange}
        placeholder="channel name"
      />
      <p className={styles.text}>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const [channelName, setChannelName] = useState("");
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerText}>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel
          className={styles.icon}
          setIsCreating={setIsCreating}
        />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className={styles.buttonWrapper} onClick={createChannel}>
        <p className={styles.buttonText}>
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
