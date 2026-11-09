import { EVENT_LINKS } from "@/lib/event";

type EventActionsProps = {
  kind?: "register" | "discord";
  className?: string;
};

export default function EventActions({
  kind = "register",
  className = "button",
}: EventActionsProps) {
  if (kind === "discord") {
    return (
      <a className={className} href={EVENT_LINKS.discord} target="_blank" rel="noreferrer">
        Join our Discord<span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <a
      className={className}
      href={EVENT_LINKS.registration}
      data-luma-action="checkout"
      data-luma-event-id="evt-ZUkyHjCTxcXGzAa"
    >
      Register<span aria-hidden="true">↗</span>
    </a>
  );
}
