import React, { useState } from 'react';

function LogoUpload({ setLogo }) {
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setSelectedLogo(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    //formData.append('logo', selectedLogo);

    setLogo(selectedLogo);

    // Send formData to the server using an API call or fetch()

    // Example API call using axios:
    // axios.post('/api/upload', formData)
    //   .then(response => {
    //     // Handle the response from the server
    //   })
    //   .catch(error => {
    //     // Handle any errors
    //   });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default LogoUpload;
