"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { MovingElement } from "../navbar";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import Image from "next/image";

export function Header({ data }: { data: Record<string, string> }) {
  const handleChange = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-2">
        <p className="font-normal text-muted-foreground text-base">
          hi there👋, I&apos;m
        </p>

        <div>
          <SplitText
            text="Veronica"
            className="text-[clamp(2rem,5vw,3.8rem)] font-semibold"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
          {data.HEADLINE && (
            <h2 className="font-normal text-primary/90 text-base mt-1">
              <p>{data.HEADLINE}</p>
            </h2>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm pt-1">
          <MovingElement
            className="inline-flex justify-center items-center bg-primary betterhover:hover:bg-primary/90 disabled:opacity-50 shadow px-4 py-2 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 font-medium text-primary-foreground text-sm whitespace-nowrap transition-colors disabled:pointer-events-none"
            change={() => handleChange(data.RESUME)}
            toChange={false}
            ariaLabel="Resume"
          >
            Resume
          </MovingElement>
          <div className="flex gap-2">
            <MovingElement change={() => handleChange(data.EMAIL)} ariaLabel="Email">
              <Mail />
            </MovingElement>
            <MovingElement change={() => handleChange(data.GITHUB)} ariaLabel="Github">
              <Github />
            </MovingElement>
            <MovingElement change={() => handleChange(data.LINKEDIN)} ariaLabel="Linkedin">
              <Linkedin />
            </MovingElement>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <figure
          className="group m-0 cursor-pointer"
          style={{
            background: 'hsl(245 45% 14%)',
            padding: '14px 14px 0',
            border: '1px solid hsl(245 35% 35%)',
            borderRadius: '4px',
            boxShadow: '0 22px 50px rgba(20, 20, 70, 0.5)',
            transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease',
            width: '220px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 28px 60px rgba(20, 20, 70, 0.7)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = '';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 50px rgba(20, 20, 70, 0.5)';
          }}
        >
          <Image
            src="/art/profilepicture.jpg"
            alt="Profile Picture"
            width={220}
            height={260}
            style={{
              width: '100%',
              height: '260px',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block',
              borderRadius: '2px',
            }}
          />
          <figcaption
            style={{
              display: 'block',
              textAlign: 'center',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: 'hsl(245 35% 70%)',
              padding: '0.6rem 0 0.75rem',
            }}
          >
            veronica ✿
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
