interface Patterns {
  email: RegExp;
  phone: RegExp;
  noSpecialLetters: RegExp;
  url: RegExp;
}

const patterns: Patterns = {
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/,
  noSpecialLetters: /^[a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/,
  url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
};

export default patterns;
