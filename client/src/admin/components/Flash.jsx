import React from 'react'

const flash = (showError, message) => WrappedComponent => {
    return (
      <WrappedComponent>
          {showError && <div className="error-message">Oops! Something went wrong!</div>}
      </WrappedComponent>
    );
  };

  export default flash