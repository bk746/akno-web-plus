"use client";

import { useEffect, useState, type ReactNode } from "react";

type PageEnterProps = {
  children: ReactNode;
};

export function PageEnter({ children }: PageEnterProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={visible ? "page-enter page-enter--visible" : "page-enter"}>
      {children}
    </div>
  );
}
