export default function(app, key) {
  return app.__container__.lookup(key);
}
