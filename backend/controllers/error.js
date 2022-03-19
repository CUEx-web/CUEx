exports.get404 = (req, res, next) => {
  //To do: Add the 404 not found page
  res.status(404).send("<h1>Page not found</h1>");
}