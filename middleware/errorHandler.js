module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // Log error untuk debugging
  console.error("Error:", err);
  
  // Jika ada error validasi dari Sequelize
  if (err.errors) {
    return res.status(status).json({ 
      message, 
      errors: err.errors 
    });
  }
  
  res.status(status).json({ message });
}