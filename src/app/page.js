"use client";
import Image from "next/image";
import Toast from "./components/toast";
import { useState } from "react";
import axios from "axios";
import Loginform from "./components/loginform";
import AdminPanel from "./components/adminPanel";
import "@preline/overlay";

export default function Home() {

  const [showToast, setShowToast] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {

    if (host.length === 0 || port.length === 0 || password.length === 0) {
      return;
    }

    var bodyFormData = new FormData();
    bodyFormData.append('host', host);
    bodyFormData.append('port', port);
    bodyFormData.append('password', password);

    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_PORT}/ping.php`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log("response", response);
        setIsConnected(true);
      })
      .catch(function (response) {
        //handle error

        setShowToast(true);
        console.log("err", response);
      });
  }


  return (
    <div className="h-full bg-white">

      {
        showToast && (
          <Toast
            title="Success"
            description="Your account has been created successfully"
            type="success"
            onClose={() => setShowToast(false)}
          />
        )
      }

      <div className="bg-white flex h-full items-center py-16">
        {
          !isConnected ?
            <Loginform
              setPort={setPort}
              setHost={setHost}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
            :
            <AdminPanel
              host={host}
              port={port}
              password={password}
            />
        }
      </div>
    </div>
  );
}
