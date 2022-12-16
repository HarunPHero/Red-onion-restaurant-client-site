import { useEffect, useState } from "react";
import axios from "axios";

const useToken = (user) => {
  const [token, setToken] = useState();
  useEffect(() => {
    const getToken = async () => {
      const uid = user?.user?.uid;
      if (uid) {
        const { data } = await axios.post("https://ror-backend-msaj.onrender.com/login", {
          uid: uid,
        });
        setToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
      }
    };
    getToken();
  }, [user]);
  return [token];
};

export default useToken;
