"use client";

import { useEffect, useState } from "react";

import LinkCard from "@/components/LinkCard";

type Link = {
  title: string;
  url: string;
  icon?: string;
};

export default function LinkList({ links }: { links: Link[] }) {
  // 데이터를 받기 전에는 비어 있고(카드에서 0회로 표시), 응답이 오면 실제 값으로 채운다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let active = true;

    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: Record<string, number>) => {
        if (active) setCounts(data);
      })
      .catch(() => {
        // 실패하면 0회 상태를 그대로 유지한다.
      });

    return () => {
      active = false;
    };
  }, []);

  function handleClick(url: string) {
    // 낙관적으로 먼저 1 올리고, 서버 응답이 오면 실제 값으로 맞춘다.
    setCounts((prev) => ({ ...prev, [url]: (prev[url] ?? 0) + 1 }));

    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { count: number }) => {
        setCounts((prev) => ({ ...prev, [url]: data.count }));
      })
      .catch(() => {
        // 저장 실패 시 낙관적 증가를 되돌린다.
        setCounts((prev) => ({
          ...prev,
          [url]: Math.max(0, (prev[url] ?? 1) - 1),
        }));
      });
  }

  return (
    <ul className="mt-12 flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.title}>
          <LinkCard
            {...link}
            count={counts[link.url] ?? 0}
            onClick={() => handleClick(link.url)}
          />
        </li>
      ))}
    </ul>
  );
}
