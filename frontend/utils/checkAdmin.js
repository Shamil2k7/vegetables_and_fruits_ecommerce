export const checkAdmin = (router) => {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!token) {
    router.push("/login");
    return false;
  }

  // ✅ Check isAdmin instead of role
  if (!user?.isAdmin) {
    router.push("/");
    return false;
  }

  return true;
};