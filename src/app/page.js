"use client";
import Image from "next/image";
import Toast from "./components/toast";
import { useState } from "react";
import Loginform from "./components/loginform";
import AdminPanel from "./components/adminPanel";

export default function Home() {

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    setShowToast(true);
  }

  return (
    <div className="h-full">

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

      <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
        {/* <Loginform handleSubmit={handleSubmit} /> */}

        <AdminPanel />
      </div>
    </div>
  );
}
