"use client";
import Image from "next/image";
import Toast from "./components/toast";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import axios from "axios";
import Loginform from "./components/loginform";
import AdminPanel from "./components/adminPanel";
import GoogleAnalytics from "./components/GoogleAnalytics";

export default function Home() {

  const [showToast, setShowToast] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const isStored = localStorage.getItem("palworldtools");


    if (isStored) {

      try {
        var ciphertext = CryptoJS.AES.decrypt(isStored, process.env.NEXT_PUBLIC_ENCRYPT);
        var originalText = ciphertext.toString(CryptoJS.enc.Utf8);

        var fetchedJson = JSON.parse(originalText);

        // Check if all required keys are present in the fetched JSON
        const requiredKeys = ['host', 'port', 'password'];

        if (requiredKeys.every((key) => fetchedJson.hasOwnProperty(key))) {
          setHost(fetchedJson.host);
          setPort(fetchedJson.port);
          setPassword(fetchedJson.password);
        }
      } catch (error) {
        // Code to handle the exception
        localStorage.removeItem("palworldtools");
        console.error('An error occurred:', error.message);
      }
    }
  }, [])

  const handleSubmit = () => {

    // setIsConnected(true);


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

        var creds = JSON.stringify({ "host": host, "port": port, "password": password });
        var ciphertext = CryptoJS.AES.encrypt(creds, process.env.NEXT_PUBLIC_ENCRYPT).toString();

        if (remember) {
          localStorage.setItem("palworldtools", ciphertext);
        }
        setIsConnected(true);

      })
      .catch(function (response) {
        //handle error

        setShowToast(true);
        console.log("err", response);
      });
  }

  useEffect(() => {
    if (showToast) {
      setShowToast(false);
    }
  }, [isConnected])


  return (
    <div className="h-full bg-white">
      <GoogleAnalytics />

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
              host={host}
              port={port}
              password={password}
              setPort={setPort}
              setHost={setHost}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              setRemember={setRemember}
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
