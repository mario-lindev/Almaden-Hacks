import { EVENT_LINKS } from "@/lib/event";

export default function EventActions({ kind = "register", className = "button" }: { kind?: "register" | "discord"; className?: string }) {
  const discord = kind === "discord";
  if (discord) return <a className={className} href={EVENT_LINKS.discord} target="_blank" rel="noreferrer">Join our Discord<span aria-hidden="true">↗</span></a>;
  return <a className={className} href={EVENT_LINKS.registration} data-luma-action="checkout" data-luma-event-id="evt-ZUkyHjCTxcXGzAa">Join the charge<span aria-hidden="true">↗</span></a>;
}
