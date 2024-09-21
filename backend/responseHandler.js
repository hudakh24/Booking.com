const responseHandler = (data, res) => {
  try {
    if (data.error) {
      return res.send({
        error: data.error,
      });
    }
    return res.send({
      response: data,
    });
  } catch (error) {
    console.error(error.message);
    return res.send({
      error: error.message,
    });
  }
};

module.exports = responseHandler;
