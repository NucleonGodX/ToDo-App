import React from "react";
import { Link } from "react-router-dom";
import { Brain, FileText, CheckCircle, Zap, Users, Shield } from "lucide-react";
// The only dependency needed is framer-motion for animations
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PublicLayout from "@/components/PublicLayout";

// A reusable animated button created locally within this file.
const AnimatedButton = (props) => (
  <motion.div whileTap={{ scale: 0.95 }}>
    <Button
      {...props}
      className={`${props.className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
    />
  </motion.div>
);

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Intelligent Task Parsing",
      description:
        "Transform unstructured natural language into perfectly organized tasks with Taskflow AI.",
    },
    {
      icon: FileText,
      title: "File Upload Support",
      description:
        "Effortlessly upload your text files, meeting notes, or project documents to generate a task list automatically.",
    },
    {
      icon: CheckCircle,
      title: "Smart Task Management",
      description:
        "Our AI automatically detects priorities, deadlines, and assignees, putting your tasks in a ready-to-go format.",
    },
    {
      icon: Zap,
      title: "Real-time Workflow",
      description:
        "Instantly create and update your task list with high accuracy, keeping your workflow in perfect sync.",
    },
    {
      icon: Users,
      title: "Seamless Team Collaboration",
      description:
        "Assign tasks to team members simply by mentioning them in your text, creating a smooth collaborative flow.",
    },
    {
      icon: Shield,
      title: "Secure & Private by Design",
      description:
        "Your data's security is our top priority. Everything is protected with enterprise-grade encryption.",
    },
  ];

  // Animation variants for the container of the feature cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Animate each child with a 0.1s delay
      },
    },
  };

  // Animation variants for each individual feature card
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <PublicLayout>
      {/* The root div now has a clean slate background */}
      <div className="bg-slate-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            // The original div is preserved, animation is applied via wrapping
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
              Experience the Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 block">
                Task Management
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Welcome to <strong>Taskflow AI</strong>. Stop manually creating
              to-do lists. Simply write or upload your thoughts, and watch our
              AI powered by{" "}
              <span className="text-indigo-600 font-semibold">
                Google Gemini API
              </span>{" "}
              build a perfectly structured workflow for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <AnimatedButton
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  Get Started for Free
                </AnimatedButton>
              </Link>
              <Link to="/login">
                <AnimatedButton
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-8 py-3 text-lg font-semibold"
                >
                  Watch Demo
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">
              A Smarter Way to Organize Your Work
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Taskflow AI provides everything you need to turn unstructured text
              into a seamless, organized workflow.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full bg-white border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
                    <CardHeader>
                      <div className="p-3 bg-indigo-100 rounded-lg w-fit">
                        <feature.icon className="h-8 w-8 text-indigo-600" />
                      </div>
                      <CardTitle className="text-slate-800 pt-2 tracking-tight">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600 text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">
              Get Started in Seconds
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              From raw text to a ready-to-use task list in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Provide Your Input
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Type naturally, paste text, or upload documents containing your
                tasks and ideas.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Let the AI Work
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Taskflow AI analyzes, extracts, and categorizes your tasks,
                priorities, and deadlines instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Start Your Flow
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Receive a perfectly structured task list, ready for you to act
                on and integrate into your workflow.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="bg-white border-slate-200 shadow-md">
            <CardContent className="text-center py-16">
              <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
                Ready to Revolutionize Your Workflow?
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of productive teams and individuals using
                Taskflow AI to manage their work more intelligently.
              </p>
              <Link to="/signup">
                <AnimatedButton
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  Start Your Free Trial
                </AnimatedButton>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Home;
