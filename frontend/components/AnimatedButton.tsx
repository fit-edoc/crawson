import React from 'react';
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function AnimatedButton({ children, icon, className, ...props }: AnimatedButtonProps) {
  return (
    <Button
      {...props}
      className={`group relative overflow-hidden  px-8 py-2 transition-all ${className || ''}`}
    >
      <div className="anim-btn-container w-full h-full flex items-center justify-center">
        <span className="anim-btn-text default-text flex items-center">
          {icon}
          {children}
