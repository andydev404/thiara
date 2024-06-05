import { HardDrive, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";

const features = [
  {
    name: "Categories",
    description:
      "Quickly create new categories for your prompts to help keep them organized.",
    icon: Tag,
  },
  {
    name: "Unlimited private prompts",
    description:
      "Make as many private prompts as you like to effortlessly manage and organize your templates.",
    icon: ShieldCheck,
  },
  {
    name: "Prompt Versioning",
    description:
      "Keep track of all the versions of your prompts and navigate through them easily.",
    icon: HardDrive,
  },
];

export default function Features() {
  return (
    <div className="overflow-hidden py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-amber-400">
                Never forget a Prompt
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
                All you need to manage your prompts
              </p>
              <p className="mt-6 text-lg leading-8 text-neutral-300">
                No more wasting time on creating or redoing prompts! With your
                saved templates, just tweak them as needed—easy peasy, saving
                you a bunch of time!
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-neutral-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-neutral-50">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-amber-500"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src="/thiara.jpeg"
            alt="Product"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
