import React from "react";
import { Link } from "react-router-dom";
import { Brain, Mail, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-200 border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* Updated logo to match the header's indigo theme */}
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="text-xl font-bold text-slate-800">
                Taskflow AI
              </span>
            </div>
            <p className="text-slate-600 mb-4 max-w-md">
              Taskflow AI converts your natural language into organized,
              actionable tasks. Create a seamless workflow and boost your
              productivity with the power of artificial intelligence.
            </p>
            {/* Updated social media icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/lakshay-tewtiya-1a41b32b8/"
                className="text-slate-400 hover:text-indigo-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/lovin24"
                className="text-slate-400 hover:text-indigo-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:lakshay.lovin@gmail.com"
                className="text-slate-400 hover:text-indigo-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Taskflow AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-slate-500 hover:text-indigo-600 transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-indigo-600 transition-colors text-sm"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-indigo-600 transition-colors text-sm"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
