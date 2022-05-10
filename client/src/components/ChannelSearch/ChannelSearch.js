import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import styles from "./ChannelSearch.module.css";
import { SearchIcon } from "../../assets";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const onSearch = (e) => {
    e.preventDefault();

    setLoading(true);
    setQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <div className={styles.icon}>
          <SearchIcon />
        </div>
        <input
          className={styles.inputText}
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default ChannelSearch;
