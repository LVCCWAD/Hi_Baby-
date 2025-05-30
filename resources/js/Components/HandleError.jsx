const Error = ({ message }) => {
    if (!message) return null;
  
    return (
      <div style={{ 
        padding: '10px', 
        backgroundColor: '#FF2C42',
        border: '1px solid #f5c6cb', 
        borderRadius: '5px', 
        marginBottom: '15px' 
      }}>
        {message}
      </div>
    );
  };
  
  export default Error;