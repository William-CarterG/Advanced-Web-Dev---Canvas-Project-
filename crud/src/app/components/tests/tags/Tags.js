import React, { useState, useEffect } from 'react';
import startFetch from '../../../../API';

const Tags = ({ sendTags, url }) => {
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    if (url) {
      startFetch(url, 'GET', null, function (data) {
        setTagList(data.tags);
      });
    } else {
      setTagList([]);
    }
  }, [url]);

  const handleInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && tagInput.trim() !== '') {
      addTag(tagInput.trim());
    }
  };

  const addTag = (tag) => {
    const tagExists = tagList.some(
      (t) => t.name.toLowerCase() === tag.toLowerCase()
    );
    if (!tagExists) {
      setTagList([...tagList, { name: tag }]);
    }
    setTagInput('');
  };

  const deleteTag = (tag) => {
    const updatedTags = tagList.filter((t) => t.name !== tag.name);
    setTagList(updatedTags);
  };

  const filteredSuggestions = tagList.filter((tag) =>
    tag.name.toLowerCase().includes(tagInput.toLowerCase())
  );

  useEffect(() => {
    sendTags(tagList);
  }, [tagList, sendTags]);

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 px-2 mt-2 relative">
      {tagList.map((tag, index) => (
        <div
          key={index}
          className="flex items-center rounded-lg bg-teal-200 px-2 py-1 cursor-pointer hover:bg-red-400 hover:text-white"
          onClick={() => deleteTag(tag)}
        >
          <span>{tag.name}</span>
        </div>
      ))}
      <input
        type="text"
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-[#1d232e]"
        placeholder="Ingresa una etiqueta"
        value={tagInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {tagInput && filteredSuggestions.length > 0 && (
        <div className="bg-white w-full max-h-16 overflow-y-auto">
          {filteredSuggestions.map((tag, index) => (
            <div key={index}>
              <div
                className="flex items-center border border-gray-300 rounded-lg bg-teal-100 px-2 py-1 cursor-pointer hover:bg-teal-200"
                onClick={() => addTag(tag.name)}
              >
                <span>{tag.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;
