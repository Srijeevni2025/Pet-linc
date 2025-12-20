import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { GoogleLogin } from "../Features/Authentication/mutationFunction";
import queryClient from "../Store/queryClient";
import { GlobalContext } from "../Store/Context";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const {isLoggedInRef} = useContext(GlobalContext)

  const { mutate, isPending } = useMutation({
    mutationFn:GoogleLogin,
    onSuccess:async()=>{
        queryClient.invalidateQueries(["userData"]);
    }
  });
      useEffect(() => {
    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(interval);

        window.google?.accounts?.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: (response) => {
            mutate(response.credential, {
             
              onSuccess: () =>{ 
                isLoggedInRef.current = true;
                navigate("/", {replace:true})},
            });
          },
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleBtn"),
          { theme: "outline", size: "large" }
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
   
 
  return <div id="googleBtn">{isPending && "Logging in..."}</div>;
}
