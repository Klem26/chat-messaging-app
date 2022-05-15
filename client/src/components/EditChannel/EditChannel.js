import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "../index";
import { CloseCreateChannel } from "../../assets";
import styles from "./EditChannel.module.css";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
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

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (event) => {
    event.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.text}>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className={styles.userList} onClick={updateChannel}>
        <p className={styles.btnText}>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;
