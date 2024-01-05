let pageNotfoundcontoller = {};
pageNotfoundcontoller.apiRoute = (req, res) => {
  return res.status(404).json({
    error: "404 Route not found",
  });
};
module.exports = pageNotfoundcontoller;
