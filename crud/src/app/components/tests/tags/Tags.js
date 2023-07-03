import React, { useState } from 'react';

const tagsList = ['Science', 'Physics'];

const Tags = () => {
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState(tagsList);

  const handleInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && tagInput.trim() !== '') {
      addTag(tagInput.trim());
    }
  };

  const addTag = (tag) => {
    if (!tagList.includes(tag)) {
      setTagList([...tagList, tag]);
    }
    setTagInput('');
  };

  const deleteTag = (tag) => {
    const updatedTags = tagList.filter((t) => t !== tag);
    setTagList(updatedTags);
  };

  const filteredSuggestions = tagsList.filter(
    (tag) => tag.toLowerCase().includes(tagInput.toLowerCase())
  );

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 px-2 mt-2 relative">
      {tagList.map((tag, index) => (
        <div
          key={index}
          className="flex items-center rounded-lg bg-teal-200 px-2 py-1 cursor-pointer hover:bg-red-400 hover:text-white"
          onClick={() => deleteTag(tag)}
        >
          <span>{tag}</span>
        </div>
      ))}
      <input
        type="text"
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-[#1d232e]"
        placeholder="Enter a tag"
        value={tagInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {tagInput && filteredSuggestions.length > 0 && (
        <div className="bg-white w-full">
          {filteredSuggestions.map((tag, index) => (
            <div
              key={index}
              className="flex items-center border border-gray-300 rounded-lg bg-teal-100 px-2 py-1 cursor-pointer hover:bg-teal-200"
              onClick={() => addTag(tag)}
            >
              <span>{tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;
