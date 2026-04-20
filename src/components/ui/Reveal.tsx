"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, fadeUpStagger, revealViewport } from "@/lib/motion";

interface RevealProps
  extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> {
  as?: ElementType;
  delay?: number;
  y?: number;
  children: ReactNode;
}

export function Reveal({
  as,
  delay = 0,
  y = 24,
  children,
  ...rest
}: RevealProps) {
  const Component = motion(as ?? "div");
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      {...rest}
    >
      {children}
    </Component>
  );
}

interface RevealGroupProps extends HTMLMotionProps<"div"> {
  as?: ElementType;
  stagger?: number;
  delayChildren?: number;
  children: ReactNode;
}

export function RevealGroup({
  as,
  stagger = 0.1,
  delayChildren = 0,
  children,
  ...rest
}: RevealGroupProps) {
  const Component = motion(as ?? "div");
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUpStagger(stagger, delayChildren)}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}
