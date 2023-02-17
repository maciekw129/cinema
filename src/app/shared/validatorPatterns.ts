interface Patterns {
  email: RegExp;
  phone: RegExp;
  noSpecialLetters: RegExp;
}

const patterns: Patterns = {
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/,
  noSpecialLetters: /^[a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/,
};

export default patterns;
