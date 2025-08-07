// utils/LoggedOutUser.js
export default function LoggedOutUser(navigate) {
  sessionStorage.clear();
  navigate("/login");
}
