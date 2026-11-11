export type Sponsor = {
  name: string;
  href: string;
  logo: string;
  description: string;
  layout?: "featured" | "wordmark";
  pending?: boolean;
};

export type SponsorGroup = {
  title: string;
  backers: Sponsor[];
};

// Keep sponsor content here and logo attribution in public/marks/SOURCES.md.
export const SPONSOR_GROUPS: SponsorGroup[] = [
  {
    "title": "Partners",
    "backers": [
      {
        "name": "YRI Fellowship",
        "href": "https://www.yriscience.com/?ref=ALMADENHACKS",
        "logo": "/marks/yri-wordmark.png",
        "description": "Research fellowship support",
        "layout": "featured"
      },
      {
        "name": "Hack Club / HCB",
        "href": "https://hackclub.com",
        "logo": "/marks/hackclub.svg",
        "description": "Fiscal sponsorship through HCB",
        "layout": "wordmark"
      }
    ]
  },
  {
    "title": "Gold",
    "backers": [
      {
        "name": "ElevenLabs",
        "href": "https://elevenlabs.io",
        "logo": "/marks/elevenlabs.svg",
        "description": "One free month of Creator for every participant, plus Pro and Scale plans for winners",
        "layout": "wordmark"
      }
    ]
  },
  {
    "title": "Silver",
    "backers": [
      {
        "name": "PCBWay",
        "href": "https://www.pcbway.com",
        "logo": "/marks/pcbway.svg",
        "description": "50–60 PCBs, coupons for winners",
        "layout": "wordmark"
      },
      {
        "name": "iFixit",
        "href": "https://www.ifixit.com",
        "logo": "/marks/ifixit.svg",
        "description": "Mako and Pro Tech toolkits for teams and prizes",
        "layout": "wordmark"
      },
      {
        "name": "Scrimba",
        "href": "https://scrimba.com",
        "logo": "/marks/scrimba.svg",
        "description": "One-year Pro subscriptions for winners",
        "layout": "wordmark"
      },
      {
        "name": "Tumult",
        "href": "https://tumult.com",
        "logo": "/marks/tumult.gif",
        "description": "Hype licenses for prizes",
        "layout": "wordmark"
      },
      {
        "name": "n8n",
        "href": "https://n8n.io",
        "logo": "/marks/n8n.svg",
        "description": "Confirmed sponsor",
        "layout": "wordmark"
      },
      {
        "name": "CodeCrafters",
        "href": "https://codecrafters.io",
        "logo": "/marks/codecrafters.svg",
        "description": "VIP membership prizes"
      },
      {
        "name": "Interview Cake",
        "href": "https://www.interviewcake.com",
        "logo": "/marks/interviewcake.png",
        "description": "Up to 50 seven-day course licenses"
      }
    ]
  },
  {
    "title": "Bronze",
    "backers": [
      {
        "name": "Doorstop Education",
        "href": "https://doorstopeducation.org",
        "logo": "/marks/doorstop.svg",
        "description": "Partnership under discussion",
        "pending": true
      },
      {
        "name": "SunFounder",
        "href": "https://www.sunfounder.com",
        "logo": "/marks/sunfounder-wordmark.png",
        "description": "10% attendee discount on most products",
        "layout": "wordmark"
      },
      {
        "name": "Rosebud AI",
        "href": "https://rosebud.ai",
        "logo": "/marks/rosebud.png",
        "description": "Participant or prize credits"
      },
      {
        "name": "InterviewBuddy",
        "href": "https://interviewbuddy.net",
        "logo": "/marks/interviewbuddy.svg",
        "description": "Interview practice credits and discounts",
        "layout": "wordmark"
      }
    ]
  },
  {
    "title": "Food & Catering",
    "backers": [
      {
        "name": "Los Gatos Meats & Smokehouse",
        "href": "https://www.losgatosmeats.com",
        "logo": "/marks/losgatos.png",
        "description": "Sandwich catering and lunch support under discussion",
        "pending": true
      },
      {
        "name": "TOGO’S",
        "href": "https://togos.com",
        "logo": "/marks/togos.png",
        "description": "Sandwich catering inquiry; referred to a local owner",
        "pending": true
      },
      {
        "name": "In-N-Out Burger",
        "href": "https://www.in-n-out.com",
        "logo": "/marks/innout.svg",
        "description": "Fundraising bundles inquiry; application requested",
        "pending": true
      }
    ]
  }
];
