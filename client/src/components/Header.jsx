import React from "react";
import { Link } from "react-router-dom";
import { Brain, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    // Updated header with a clean background and bottom border
    <header className="bg-white/75 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            {/* Updated logo icon to use the indigo accent color */}
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Brain className="h-6 w-6 text-indigo-600" />
            </div>
            {/* Updated brand text to use the primary slate color */}
            <span className="text-xl font-bold text-slate-800">
              Taskflow AI
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Updated navigation links to use slate and hover with indigo */}
            <Link
              to="/"
              className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
            >
              Home
            </Link>
            <a
              href="/#features"
              className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
            >
              How It Works
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Updated Login button to an outline/secondary style */}
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Button>
            </Link>
            {/* Updated Sign Up button to the primary indigo style */}
            <Link to="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {/* This button can be used to trigger a mobile menu */}
            <Link to="/login">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Log In</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
