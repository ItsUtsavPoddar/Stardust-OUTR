import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { navigation } from "../data";
import ContactInfo from "./ContactInfo";

export default function Footer() {
  return (
    <section className="py-8 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
        <img src='https://i.postimg.cc/4yn8CCnb/20221130-143509.png' alt="stardust" style = {{width: "15rem"}} />
        <div className="text-center">
          <h3 className="text-slate-100 mb-8 px-8">
            By Government of Odisha
          </h3>
          <div className="block space-x-4 sm:space-x-8">
            {navigation.map((item  ) => (
              <Link
                key={item.name}
                to={item.to}
                className="font-medium text-slate-300 hover:text-secondary"
              >
                {item.name}
              </Link>
            ))}
            {!localStorage.getItem('auth-token') ?"":
            <Link
                key={"Log Out"}
                to="/"
                onClick={() => {
                  localStorage.removeItem('auth-token');
                }}
                className="font-medium text-slate-300 hover:text-secondary"
              >
                {"Log Out"}
              </Link>
              }
          </div>
        </div>
        <div>
          <h3 className="text-slate-100 hidden lg:block">Follow us</h3>

          <div className="mt-8">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
