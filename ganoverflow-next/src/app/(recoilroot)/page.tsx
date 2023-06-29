"use client";
import { RecoilRoot } from "recoil";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RecoilRoot>{children}</RecoilRoot>
    </div>
  );
}
