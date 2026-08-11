import React from 'react';
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function AnimatedButton({ children, icon, className, ...props }: AnimatedButtonProps) {
