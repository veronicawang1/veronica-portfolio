interface IEducationEntry {
  SCHOOL: string;
  DEGREE: string;
  LOCATION: string;
  DURATION: string;
}

export function Education({ data }: { data: IEducationEntry[] }) {
  return (
    <div id="education" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">education.</h2>

      <ul className="flex flex-col gap-6 mt-4 font-normal text-primary/90 text-base">
        {data.map((entry, i) => (
          <li key={i} className="cursor-target">
            <div className="pl-4 border-l border-muted-foreground hover:border-primary size-full transition-all duration-300">
              <div className="flex sm:flex-row flex-col justify-between items-start">
                <div>
                  <p className="text-primary/90 text-lg">{entry.SCHOOL}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {entry.DEGREE}
                    <span className="inline-block bg-secondary ml-2 px-2 py-0.5 rounded text-xs">
                      {entry.LOCATION}
                    </span>
                  </p>
                </div>
                <p className="text-muted-foreground text-sm max-sm:mt-1">{entry.DURATION}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
