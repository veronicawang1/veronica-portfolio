"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { MovingElement } from "../navbar";
import ShinyText from "@/blocks/TextAnimations/ShinyText/ShinyText";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import Image from "next/image";

export function Header({ data }: { data: Record<string, string> }) {
  const handleChange = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section className="pt-12 grid grid-cols-1 2xl:grid-cols-4 gap-8 justify-items-center items-center">
      <div className="col-span-1 hidden 2xl:block">
        <Image
          src="/frog.jpg"
          alt="Profile Picture"
          className="w-48 h-48 rounded-md mx-auto"
          width={200}
          height={200}
        />
      </div>
      <div className="space-y-2 col-span-3">
        <p className="font-normal text-muted-foreground text-base">
          hi there👋, I&apos;m
        </p>

        <div>
          {/* <h1 className="font-bold text-primary/90 text-7xl tracking-tight">
            {data.NAME}
          </h1> */}
          {/* <ShinyText text={data.NAME} speed={3} /> */}
          <SplitText
            text="Veronica"
            className="text-7xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <h2 className="flex flex-col gap-0 font-normal text-primary/90 text-base">
            <p>
              {data.AGE}, {data.PRONOUN}
            </p>
            <p>{data.HEADLINE}</p>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MovingElement
            className="inline-flex justify-center items-center bg-primary betterhover:hover:bg-primary/90 disabled:opacity-50 shadow px-4 py-2 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 font-medium text-primary-foreground text-sm whitespace-nowrap transition-colors disabled:pointer-events-none"
            change={() => handleChange(data.RESUME)}
            toChange={false}
            ariaLabel="Resume"
          >
            Resume
          </MovingElement>
          <div className="flex gap-2">
            <MovingElement
              change={() => handleChange(data.EMAIL)}
              ariaLabel="Email"
            >
              <Mail />
            </MovingElement>
            <MovingElement
              change={() => handleChange(data.GITHUB)}
              ariaLabel="Github"
            >
              <Github />
            </MovingElement>
            <MovingElement
              change={() => handleChange(data.LINKEDIN)}
              ariaLabel="Linkedin"
            >
              <Linkedin />
            </MovingElement>
          </div>
        </div>
      </div>
    </section>
  );
}
