function errorHandler(err, req, res, next) {
  console.log("test");
  if (err.name === "SequelizeValidationError") {
    let errorMessage = [];
    for (let i = 0; i < err.errors.length; i++) {
      errorMessage.push(err.errors[i].message);
    }
    console.log(errorMessage, "ini pesan error");
    return res.status(400).json({ message: errorMessage });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    let errorMessage = [];
    for (let i = 0; i < err.errors.length; i++) {
      errorMessage.push(err.errors[i].message);
    }
    return res.status(400).json({ message: errorMessage });
  } else if (err.name === "email/password wrong") {
    return res.status(404).json({ message: "Wrong Email/Password" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Please login first!" });
  } else if (err.name === "token not found") {
    return res.status(404).json({ message: "token not found" });
  } else if (err.name === "forbidden access") {
    return res.status(403).json({ message: "forbidden access" });
  } else if (err.name === "data not found") {
    return res.status(404).json({ message: "data not found" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
