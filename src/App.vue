<template>
  <router-view></router-view>
</template>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body {
  background-color: black;
  color: white;
  max-width: 1000px;
  margin: auto;
}

a {
  font-size: 24px;
  margin-bottom: 15px;
  margin-top: 15px;
  font-weight: 700;
  display: block;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  cursor: pointer;
}

select,
button {
  border: none;
  outline: none;
  font-size: 20px;
  background: none;
  color: white;
  cursor: pointer;
}

button:hover {
  text-decoration: underline;
}

button:disabled {
  cursor: unset;
  text-decoration: none;
  color: gray;
}

button:focus {
  border: none;
  outline: none !important;
}

img {
  border-radius: 10px;
}
</style>
