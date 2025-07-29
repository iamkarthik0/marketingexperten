import { BaseHubImage } from "basehub/next-image";
import clsx from "clsx";

import { Section } from "@/common/layout";
import { fragmentOn } from "basehub";

import s from "./companies.module.scss";

export const companiesFragment = fragmentOn("CompaniesComponent", {
  subtitle: true,
  companies: {
    _title: true,
    url: true,
    image: {
      url: true,
      alt: true,
      width: true,
      height: true,
    },
  },
});

type Companies = fragmentOn.infer<typeof companiesFragment>;

export function Companies(props: Companies) {
  return (
    <Section
      container="full"
      className="from-surface-primary via-surface-secondary to-surface-primary dark:from-dark-surface-primary dark:via-dark-surface-secondary dark:to-dark-surface-primary relative bg-gradient-to-br py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 sm:opacity-25 md:opacity-30 dark:opacity-15 dark:sm:opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.08),transparent_50%)] sm:bg-[radial-gradient(circle_at_40%_50%,rgba(120,119,198,0.1),transparent_50%)] lg:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_40%,rgba(147,197,253,0.08),transparent_50%)] dark:sm:bg-[radial-gradient(circle_at_40%_50%,rgba(147,197,253,0.1),transparent_50%)] dark:lg:bg-[radial-gradient(circle_at_50%_50%,rgba(147,197,253,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.03)_50%,transparent_75%)] sm:bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.04)_50%,transparent_75%)] lg:bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.05)_50%,transparent_75%)] dark:bg-[linear-gradient(45deg,transparent_25%,rgba(147,197,253,0.03)_50%,transparent_75%)] dark:sm:bg-[linear-gradient(45deg,transparent_25%,rgba(147,197,253,0.04)_50%,transparent_75%)] dark:lg:bg-[linear-gradient(45deg,transparent_25%,rgba(147,197,253,0.05)_50%,transparent_75%)]" />
      </div>

      {/* Section Title */}
      {props.subtitle && (
        <div className="relative z-10 mb-6 px-4 text-center sm:mb-7 sm:px-6 md:mb-8 lg:mb-10 lg:px-8">
          <h2 className="text-text-tertiary dark:text-dark-text-tertiary text-xs font-medium opacity-60 sm:text-sm sm:opacity-65 md:text-sm md:opacity-70 lg:text-base">
            {props.subtitle}
          </h2>
        </div>
      )}

      {/* Companies Container */}
      <div className="relative z-10">
        {/* Mobile: 2 column grid */}
        <div className="px-4 sm:hidden">
          <div className="mx-auto grid max-w-sm grid-cols-2 gap-4">
            {props.companies.map((company, index) => (
              <div
                key={company.image?.url ?? `${company._title}-${index}`}
                className="group flex justify-center"
              >
                {company.url ? (
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-transform duration-200 active:scale-95"
                    aria-label={`Visit ${company._title}`}
                  >
                    <CompanyLogo company={company} />
                  </a>
                ) : (
                  <CompanyLogo company={company} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tablet: 3 column grid */}
        <div className="hidden px-6 sm:block lg:hidden">
          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-6">
            {props.companies.map((company, index) => (
              <div
                key={company.image?.url ?? `${company._title}-${index}`}
                className="group flex justify-center"
              >
                {company.url ? (
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-transform duration-200 active:scale-95"
                    aria-label={`Visit ${company._title}`}
                  >
                    <CompanyLogo company={company} />
                  </a>
                ) : (
                  <CompanyLogo company={company} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Original flex layout */}
        <div className="hidden lg:block">
          <div className="relative overflow-hidden">
            <div className="no-scrollbar overflow-x-auto">
              <div
                className={clsx(
                  "flex items-center justify-center gap-8 px-4 lg:gap-12 lg:px-8",
                  "min-w-max lg:min-w-0 lg:flex-wrap",
                  s.scrollbar,
                )}
              >
                {props.companies.map((company, index) => (
                  <div
                    key={company.image?.url ?? `${company._title}-${index}`}
                    className="group flex-shrink-0"
                  >
                    {company.url ? (
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-transform duration-200 hover:scale-105"
                        aria-label={`Visit ${company._title}`}
                      >
                        <CompanyLogo company={company} />
                      </a>
                    ) : (
                      <CompanyLogo company={company} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CompanyLogo({ company }: { company: Companies["companies"][0] }) {
  if (!company.image?.url) {
    return (
      <div className="border-border bg-surface-secondary text-text-tertiary dark:border-dark-border dark:bg-dark-surface-secondary dark:text-dark-text-tertiary flex h-12 w-24 items-center justify-center rounded-md border text-xs sm:h-14 sm:w-28 sm:rounded-lg sm:text-sm md:h-16 md:w-32 lg:h-20 lg:w-40 xl:h-24 xl:w-48">
        <span className="font-medium">{company._title}</span>
      </div>
    );
  }

  return (
    <div className="flex h-12 w-24 items-center justify-center sm:h-14 sm:w-28 md:h-16 md:w-32 lg:h-20 lg:w-40 xl:h-24 xl:w-48">
      <BaseHubImage
        src={company.image.url}
        alt={company.image.alt || company._title}
        width={company.image.width || 160}
        height={company.image.height || 80}
        className="max-h-full max-w-full object-contain grayscale transition-all duration-300 group-hover:cursor-pointer group-hover:grayscale-0 dark:opacity-70 dark:invert dark:group-hover:invert-0 dark:sm:opacity-75 dark:md:opacity-80"
      />
    </div>
  );
}
